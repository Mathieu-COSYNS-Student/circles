import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import Logo from "~assets/images/Circles_logo_round.svg";

import { Button, Text } from "~/components/ui";
import { type RootStackParamList } from "~/navigators/RootNavigator";

type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>;

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  return (
    <View className="flex flex-grow bg-brand-600 dark:bg-brand-700">
      <View className="flex flex-grow items-center justify-center">
        <Animatable.View
          duration={1500}
          animation="bounceIn"
          className="aspect-square max-h-[220] w-1/2 max-w-[220]"
        >
          <Logo width="100%" height="100%" />
        </Animatable.View>
      </View>
      <Animatable.View
        className="flex h-2/5 justify-between rounded-t-3xl bg-brand-50 p-8 dark:bg-zinc-950"
        animation="fadeInUpBig"
      >
        <View>
          <Text type="heading1">Stay connected and organized with Circles</Text>
          <Text>Sign in with an account</Text>
        </View>
        <Button
          title="Get Started"
          iconEnd="chevron-forward-outline"
          onPress={() => navigation.navigate("SignIn")}
        />
      </Animatable.View>
    </View>
  );
};

export default OnboardingScreen;
