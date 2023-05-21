import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import Logo from "~assets/images/Circles_logo_round.svg";

import { Button, ScreenContentContainer, Text } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>;

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  return (
    <ScreenContentContainer
      hero={
        <View className="flex flex-grow items-center justify-center">
          <Animatable.View
            duration={1500}
            animation="bounceIn"
            className="aspect-square max-h-[220] w-1/2 max-w-[220]"
          >
            <Logo width="100%" height="100%" />
          </Animatable.View>
        </View>
      }
      heroGrow={2}
      contentTopRounded={true}
      contentAnimate={true}
      contentClassName="justify-between"
    >
      <View>
        <Text type="heading1">Stay connected and organized with Circles</Text>
        <Text className="mb-3 mt-1">Sign in with an account</Text>
      </View>
      <Button
        title="Get Started"
        iconEnd="chevron-forward-outline"
        onPress={() => navigation.navigate("SignIn")}
      />
    </ScreenContentContainer>
  );
};

export default OnboardingScreen;
