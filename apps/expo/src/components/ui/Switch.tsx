import {
  Switch as DefaultSwitch,
  type SwitchProps as DefaultSwitchProps,
} from "react-native";

import { useThemeColors } from "~/hooks/Theme";

export type SwitchProps = Omit<
  DefaultSwitchProps,
  "thumbColor" | "trackColor" | "ios_backgroundColor" | "style"
>;

export const Switch = (props: SwitchProps) => {
  const { switchTrack, switchThumbOn, switchThumbOff } = useThemeColors();
  return (
    <DefaultSwitch
      trackColor={{ true: switchTrack, false: switchTrack }}
      thumbColor={props.value ? switchThumbOn : switchThumbOff}
      ios_backgroundColor={switchTrack}
      {...props}
    />
  );
};
