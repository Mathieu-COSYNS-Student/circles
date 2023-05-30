import { type FC, type ReactNode } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import { ScrollView } from "react-native-gesture-handler";

import { useThemeColors } from "~/hooks/Theme";
import RefreshControl, { type RefreshControlProps } from "./RefreshControl";
import Text from "./Text";

export type ScreenContentContainerProps = {
  children: ReactNode;
  hero?: ReactNode | string;
  heroGrow?: number;
  heroBrand?: boolean;
  contentGrow?: number;
  contentTopRounded?: boolean;
  contentAnimate?: boolean;
  contentClassName?: string;
  scrollable?: boolean;
} & Partial<Pick<RefreshControlProps, "onRefresh" | "refreshing">>;

export const ScreenContentContainer: FC<ScreenContentContainerProps> = ({
  scrollable = true,
  refreshing,
  onRefresh,
  ...props
}) => {
  const { primary } = useThemeColors();

  if (!scrollable)
    return (
      <View style={{ flexGrow: 1, backgroundColor: primary }}>
        <ScreenContentContainerInternal {...props} />
      </View>
    );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: primary }}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing || false}
            onRefresh={onRefresh}
          />
        ) : undefined
      }
    >
      <ScreenContentContainerInternal {...props} />
    </ScrollView>
  );
};

const ScreenContentContainerInternal: FC<
  Pick<
    ScreenContentContainerProps,
    | "children"
    | "hero"
    | "heroBrand"
    | "heroGrow"
    | "contentGrow"
    | "contentTopRounded"
    | "contentAnimate"
    | "contentClassName"
  >
> = ({
  children,
  hero,
  heroBrand = true,
  heroGrow = 0,
  contentGrow = 1,
  contentTopRounded = false,
  contentAnimate = false,
  contentClassName,
}) => {
  const { background } = useThemeColors();

  return (
    <>
      {hero && (
        <View
          className={`min-h-[180px] justify-center px-3 py-5`}
          style={{
            flexGrow: heroGrow,
            backgroundColor: heroBrand ? undefined : background,
          }}
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
    </>
  );
};
