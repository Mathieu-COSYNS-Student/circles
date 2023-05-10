import { AccessControl, type IQueryInfo } from "accesscontrol";
import merge from "lodash.merge";

export const NETWORK_INVITE = "network/invite";

export type { IQueryInfo as AccessControlQuery };
export type ExtraGrants = Record<string, Record<string, string[]>>;

export const ac = (extraGrants?: ExtraGrants) => {
  const ac = new AccessControl();

  ac.grant("ADMIN")
    .updateOwn("network")
    .create(NETWORK_INVITE)
    .grant("OWNER")
    .extend("ADMIN");

  ac.setGrants(merge(extraGrants, ac.getGrants()));

  return ac;
};

export const grantedWithCustomRoles = async (
  queryInfo: IQueryInfo,
  getExtraGrants: (queryInfo: IQueryInfo) => Promise<ExtraGrants>,
) => {
  try {
    return ac().permission(queryInfo).granted;
  } catch (err) {
    return ac(await getExtraGrants(queryInfo)).permission(queryInfo).granted;
  }
};
