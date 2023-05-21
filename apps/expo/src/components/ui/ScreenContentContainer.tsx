import { type FC, type ReactNode } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";

import { useThemeColors } from "~/hooks/Theme";
import Text from "./Text";

export type ScreenContentContainerProps = {
  children: ReactNode;
  hero?: ReactNode | string;
  heroGrow?: number;
  contentGrow?: number;
  contentTopRounded?: boolean;
  contentAnimate?: boolean;
  contentClassName?: string;
};

export const ScreenContentContainer: FC<ScreenContentContainerProps> = ({
  children,
  hero,
  heroGrow = 0,
  contentGrow = 1,
  contentTopRounded = false,
  contentAnimate = false,
  contentClassName,
}) => {
  const { primary, background } = useThemeColors();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: primary }}
      keyboardShouldPersistTaps="handled"
    >
      {hero && (
        <View
          className={`min-h-[180px] justify-center px-2 py-5`}
          style={{ flexGrow: heroGrow }}
        >
          {typeof hero === "string" ? (
            <Text type="heading1" className="text-center text-white">
              {hero}
            </Text>
          ) : (
            <>{hero}</>
          )}
        </View>
      )}
      <Animatable.View
        className={`p-5 ${
          contentTopRounded ? "rounded-t-3xl" : ""
        } ${contentClassName}`}
        style={{ backgroundColor: background, flexGrow: contentGrow }}
        animation={contentAnimate ? "fadeInUpBig" : undefined}
      >
        {children}
      </Animatable.View>
    </ScrollView>
  );
};
