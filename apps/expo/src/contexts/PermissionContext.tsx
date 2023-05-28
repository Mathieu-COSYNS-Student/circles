import { useEffect, useState, type ReactNode } from "react";
import { useUser } from "@clerk/clerk-expo";

import {
  AccessControl,
  type UserAccessControlRequest,
} from "@acme/accesscontrol";

import { trpc } from "~/utils/trpc";
import { createCtx } from "./utils";

type PermissionContextType = {
  ac: UserAccessControlRequest<string, string> | null;
};

const [usePermissionContext, Provider] = createCtx<PermissionContextType>();
export { usePermissionContext };

export const PermissionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user, isSignedIn } = useUser();
  const [ac, setAc] = useState<UserAccessControlRequest<string, string> | null>(
    null,
  );
  const permissionsQuery = trpc.permissions.get.useQuery();

  console.log(JSON.stringify({ permissions: permissionsQuery.data }, null, 2));

  useEffect(() => {
    if (isSignedIn)
      setAc(
        new AccessControl<string, string>({
          grants: ({ context, permission }) => {
            if (!permissionsQuery.data) return false;
            const permissions =
              context && context in permissionsQuery.data
                ? permissionsQuery.data[context]
                : Object.values(permissionsQuery.data).flat();
            return (
              permissions === true ||
              (permissions?.find(
                (perm) =>
                  perm === true ||
                  (perm.action === permission.action &&
                    perm.resource === permission.resource &&
                    (permission.ownership
                      ? perm.ownership === permission.ownership
                      : true)),
              ) ?? null) !== null
            );
          },
        }).can(user.id),
      );
    else {
      setAc(null);
    }
  }, [isSignedIn, permissionsQuery.data, user?.id]);

  return <Provider value={{ ac }}>{children}</Provider>;
};
