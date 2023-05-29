import { type ReactNode } from "react";

import { createCtx } from "./utils";

type NetworkContextType = {
  id: string;
  name: string;
};

const [useNetworkContext, Provider] = createCtx<NetworkContextType>();
export { useNetworkContext };

export const NetworkContextProvider = ({
  children,
  id,
  name,
}: {
  id: string;
  name: string;
  children: ReactNode;
}) => {
  return (
    <Provider
      value={{
        id,
        name,
      }}
    >
      {children}
    </Provider>
  );
};
