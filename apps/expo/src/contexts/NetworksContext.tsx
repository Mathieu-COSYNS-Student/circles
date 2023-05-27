import { useEffect, useMemo, useState, type ReactNode } from "react";

import { trpc } from "~/utils/trpc";
import { createCtx } from "./utils";

export type SimpleNetwork = {
  id: string;
  name: string;
};

export type StatefulSimpleNetworks = {
  [id: string]: {
    name: string;
    active: boolean;
  };
};

type NetworksContextType = {
  networks: (SimpleNetwork & { active: boolean })[];
  activeNetworks: SimpleNetwork[];
  isNetworkOwner: boolean;
  toggleAllNetworks: () => void;
  toggleNetwork: (networkId: string) => void;
};

const [useNetworksContext, Provider] = createCtx<NetworksContextType>();
export { useNetworksContext };

export const NetworksContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const networksQuery = trpc.networks.getAll.useQuery();
  const fetchedNetworks = networksQuery.data;
  const [storedNetworks, setNetworks] = useState<StatefulSimpleNetworks>({});

  useEffect(() => {
    const networks: StatefulSimpleNetworks = {};
    fetchedNetworks?.forEach((network) => {
      networks[network.id] = {
        name: network.name,
        active: true,
      };
    });
    setNetworks(networks);
  }, [fetchedNetworks]);

  const toggleAllNetworks = () => {
    setNetworks((networks) => {
      let state: "all" | "none" | "partial" | undefined = undefined;

      for (const networkId in networks) {
        if (typeof state === "undefined") {
          state = networks[networkId]?.active ? "all" : "none";
        } else if (networks[networkId]?.active && state === "none") {
          state = "partial";
          break;
        } else if (!networks[networkId]?.active && state === "all") {
          state = "partial";
          break;
        }
      }

      for (const networkId in networks) {
        const network = networks[networkId];
        if (network) network.active = state !== "all";
      }

      return { ...networks };
    });
  };

  const toggleNetwork = (networkId: string) => {
    setNetworks((networks) => {
      const network = networks[networkId];
      if (network) {
        network.active = !network.active;
      }
      return { ...networks };
    });
  };

  const networks = useMemo(
    () =>
      Object.keys(storedNetworks).map((networkId) => ({
        id: networkId,
        name: storedNetworks[networkId]?.name as string,
        active: storedNetworks[networkId]?.active ?? false,
      })),
    [storedNetworks],
  );

  const activeNetworks = useMemo(
    () => networks.filter((network) => network.active),
    [networks],
  );

  return (
    <Provider
      value={{
        networks,
        activeNetworks,
        toggleAllNetworks,
        toggleNetwork,
        isNetworkOwner: false,
      }}
    >
      {children}
    </Provider>
  );
};
