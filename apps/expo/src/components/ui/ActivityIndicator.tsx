import { type FC } from "react";
import {
  ActivityIndicator as DefaultActivityIndicator,
  type ActivityIndicatorProps as DefaultActivityIndicatorProps,
} from "react-native";

import { useThemeColor } from "~/hooks/Theme";

export type ActivityIndicatorProps = DefaultActivityIndicatorProps;

const ActivityIndicator: FC<ActivityIndicatorProps> = ({ color, ...props }) => {
  const activityIndicatorColor = useThemeColor("activityIndicatorColor");
  return (
    <DefaultActivityIndicator
      color={color ?? activityIndicatorColor}
      {...props}
    />
  );
};

export default ActivityIndicator;
