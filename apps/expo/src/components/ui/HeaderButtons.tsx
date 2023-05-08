import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  HeaderButtons as DefaultHeaderButtons,
  HeaderButton,
  type HeaderButtonProps,
  type HeaderButtonsProps,
} from "react-navigation-header-buttons";

const IoniconsHeaderButton = (props: HeaderButtonProps) => (
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

export const HeaderButtons = ({
  fixStack = false,
  ...props
}: HeaderButtonsProps & { fixStack?: boolean }) => (
  <View className={fixStack ? "relative -right-4" : undefined}>
    <DefaultHeaderButtons
      HeaderButtonComponent={IoniconsHeaderButton}
      {...props}
    />
  </View>
);
