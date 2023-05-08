import { Image, View } from "react-native";
import { HeaderTitle, type HeaderTitleProps } from "@react-navigation/elements";

export const renderIconHeaderTitle = ({
  name,
  pictureUrl,
}: {
  name: string;
  pictureUrl: string;
}) => {
  const IconHeaderTitle = ({ ...props }: HeaderTitleProps) => {
    return (
      <View className="flex flex-row">
        <Image
          className="mr-2 aspect-square h-full rounded-full"
          source={{ uri: pictureUrl }}
          alt={`${name} icon`}
        />
        <HeaderTitle {...props} />
      </View>
    );
  };
  return IconHeaderTitle;
};
