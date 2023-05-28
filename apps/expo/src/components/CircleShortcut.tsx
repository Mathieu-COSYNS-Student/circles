import { type Circle } from "@acme/schema";

import { Shortcut } from "~/components/ui";
import { useRootNavigation } from "~/navigators/useRootNavigation";

export const CircleShortcut = ({ circle }: { circle: Circle }) => {
  const navigation = useRootNavigation();

  return (
    <Shortcut
      text={circle.name}
      numberOfLines={2}
      onPress={() => {
        navigation.navigate("Chat", {
          id: circle.chatId,
          name: circle.name,
          pictureUrl: circle.pictureUrl,
          type: "circle",
        });
      }}
    />
  );
};
