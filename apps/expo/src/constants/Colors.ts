/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import resolveConfig from "tailwindcss/resolveConfig";

import { type TailwindColorPallette } from "@acme/tailwind-config/types";

import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig) as unknown;
// @ts-ignore
const tailwindColors = fullConfig.theme.colors as {
  brand: TailwindColorPallette;
  gray: TailwindColorPallette;
  zinc: TailwindColorPallette;
};

const theme = {
  light: {
    text: tailwindColors.gray["900"],
    background: "#fff",
    statusBarStyle: "dark",
    tabIconDefault: "#777",
    tabIconSelected: tailwindColors.brand[700],
    chatLeftBubble: "#000",
    chatLeftBubbleBackground: "#eee",
    chatLeftBubbleBorder: "#999",
    chatRightBubble: "#fff",
    chatRightBubbleBackground: tailwindColors.brand[700],
    chatRightBubbleBorder: tailwindColors.brand[700],
    chatToolbarIcon: tailwindColors.brand[700],
    chatToolbarBackgound: "#eee",
    chatToolbarBorder: "#999",
    chatToolbarInput: "#000",
    chatToolbarInputBackgound: "#eee",
    chatToolbarInputBorder: "#999",
    refreshControlBackground: "#fff",
    refreshControlForground: "#000",
    inputPlaceholder: tailwindColors.gray[500],
    inputCursor: tailwindColors.brand[500],
    activityIndicatorColor: tailwindColors.brand[700],
  },
  dark: {
    text: "#fff",
    background: "#000",
    statusBarStyle: "light",
    tabIconDefault: "#ccc",
    tabIconSelected: tailwindColors.brand[600],
    chatLeftBubble: "#fff",
    chatLeftBubbleBackground: "#444",
    chatLeftBubbleBorder: "#444",
    chatRightBubble: "#fff",
    chatRightBubbleBackground: tailwindColors.brand[600],
    chatRightBubbleBorder: tailwindColors.brand[600],
    chatToolbarIcon: tailwindColors.brand[600],
    chatToolbarBackgound: "#222",
    chatToolbarBorder: "#444",
    chatToolbarInput: "#fff",
    chatToolbarInputBackgound: "#444",
    chatToolbarInputBorder: "#444",
    refreshControlBackground: "#333",
    refreshControlForground: "#fff",
    inputPlaceholder: tailwindColors.zinc[400],
    inputCursor: tailwindColors.brand[500],
    activityIndicatorColor: tailwindColors.brand[700],
  },
};

export default theme;
