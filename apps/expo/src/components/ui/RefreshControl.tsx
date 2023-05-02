import React, { type FC } from "react";
import {
  RefreshControl as DefaultRefreshControl,
  type RefreshControlProps as DefaultRefreshControlProps,
} from "react-native";

import { useThemeColors } from "~/hooks/Theme";

export type RefreshControlProps = Omit<DefaultRefreshControlProps, "className">;

const RefreshControl: FC<RefreshControlProps> = ({ ...props }) => {
  const { refreshControlBackground, refreshControlForground } = useThemeColors([
    "refreshControlBackground",
    "refreshControlForground",
  ]);
  return (
    <DefaultRefreshControl
      {...props}
      colors={[refreshControlForground || "black"]}
      progressBackgroundColor={refreshControlBackground}
    />
  );
};

export default RefreshControl;
