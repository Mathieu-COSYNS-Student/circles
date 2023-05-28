import React, { forwardRef } from "react";
import {
  RefreshControl as DefaultRefreshControl,
  type RefreshControlProps as DefaultRefreshControlProps,
} from "react-native";

import { useThemeColors } from "~/hooks/Theme";

export type RefreshControlProps = Omit<DefaultRefreshControlProps, "className">;

const RefreshControl = forwardRef<DefaultRefreshControl, RefreshControlProps>(
  function RefreshControl({ ...props }, ref) {
    const { refreshControlBackground, refreshControlForeground } =
      useThemeColors(["refreshControlBackground", "refreshControlForeground"]);
    return (
      <DefaultRefreshControl
        ref={ref}
        {...props}
        colors={[refreshControlForeground || "black"]}
        progressBackgroundColor={refreshControlBackground}
      />
    );
  },
);

export default RefreshControl;
