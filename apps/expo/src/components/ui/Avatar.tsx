import { type FC } from "react";
import { Image, View, type ImageProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "color";

import { toColor } from "~/utils/colors";
import { Text } from "./Text";

export type AvatarProps = {
  alt: string;
  source?: ImageProps["source"] | keyof typeof Ionicons.glyphMap;
  backgroundColor?: string;
};

const textTo2Letters = (str: string) => {
  str = str.trim();
  str = str.replace(/[^a-zA-Z0-9 -]/gi, "");
  if (str.length === 0) return "";

  const words = str.split(/[\s,-]+/);
  const capitalizedRegex = /^[A-Z]/;
  let letters = str;

  if (words.length > 1) {
    letters = "";
    const capitalizedWords = words.filter((word) =>
      capitalizedRegex.test(word),
    );
    for (const word of capitalizedWords) {
      letters += word[0];
      if (letters.length > 1) break;
    }
    if (letters.length < 2) {
      for (const word of words) {
        letters += word[0];
        if (letters.length > 1) break;
      }
    }
  }

  return letters.substring(0, 2).toUpperCase();
};

export const Avatar: FC<AvatarProps> = ({
  alt,
  backgroundColor = toColor(alt),
  source,
}) => {
  const color = Color(backgroundColor).isLight() ? "black" : "white";
  return (
    <View
      className="aspect-square w-full items-center justify-center overflow-hidden rounded-full"
      style={{ backgroundColor }}
    >
      {source ? (
        <>
          {typeof source !== "string" ? (
            <Image className="h-full w-full" alt={alt} source={source} />
          ) : (
            <Ionicons name={source} color={color} size={32} />
          )}
        </>
      ) : (
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={{ fontSize: 1000 }}
          className="p-[15%]"
        >
          {textTo2Letters(alt)}
        </Text>
      )}
    </View>
  );
};
