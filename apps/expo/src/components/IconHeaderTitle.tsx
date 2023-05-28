import { View } from "react-native";
import { HeaderTitle, type HeaderTitleProps } from "@react-navigation/elements";

import { Avatar } from "./ui/Avatar";

export const renderIconHeaderTitle = ({
  name,
  pictureUrl,
}: {
  name: string;
  pictureUrl?: string | null;
}) => {
  const IconHeaderTitle = ({ ...props }: HeaderTitleProps) => {
    return (
      <View className="flex-row items-center">
        <View className="my-2 mr-2 h-9 w-9">
          <Avatar
            source={pictureUrl ? { uri: pictureUrl } : undefined}
            alt={name}
          />
        </View>
        <HeaderTitle {...props} />
      </View>
    );
  };
  return IconHeaderTitle;
};
