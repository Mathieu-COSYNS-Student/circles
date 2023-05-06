import React, { type FC } from "react";
import {
  RefreshControl as DefaultRefreshControl,
  type RefreshControlProps as DefaultRefreshControlProps,
} from "react-native";

import { useThemeColors } from "~/hooks/Theme";

export type RefreshControlProps = Omit<DefaultRefreshControlProps, "className">;

const RefreshControl: FC<RefreshControlProps> = ({ ...props }) => {
  const { refreshControlBackground, refreshControlForeground } = useThemeColors(
    ["refreshControlBackground", "refreshControlForeground"],
  );
  return (
    <DefaultRefreshControl
      {...props}
      colors={[refreshControlForeground || "black"]}
      progressBackgroundColor={refreshControlBackground}
    />
  );
};

export default RefreshControl;
