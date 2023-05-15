import { type FC, type ReactNode } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Text from "./Text";

export type ScreenContentContainerProps = {
  children: ReactNode;
  hero?: ReactNode | string;
};

export const ScreenContentContainer: FC<ScreenContentContainerProps> = ({
  children,
  hero,
}) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {hero && (
        <View className="bg-brand-700 dark:bg-brand-600">
          {typeof hero === "string" ? (
            <View className="min-h-[180px] justify-center px-2 py-5">
              <Text type="heading1" className="text-center text-white">
                {hero}
              </Text>
            </View>
          ) : (
            <>{hero}</>
          )}
        </View>
      )}
      <View className="m-5 flex-grow">{children}</View>
    </ScrollView>
  );
};
