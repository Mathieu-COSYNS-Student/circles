/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const brandColors: {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
  // @ts-ignore
} = fullConfig.theme.colors.brand;

const theme = {
  light: {
    // @ts-ignore
    text: fullConfig.theme.colors.gray[900] as string,
    background: "#fff",
    statusBarStyle: "dark",
    tabIconDefault: "#777",
    tabIconSelected: brandColors[700],
    chatLeftBubble: "#000",
    chatLeftBubbleBackground: "#eee",
    chatLeftBubbleBorder: "#999",
    chatRightBubble: "#fff",
    chatRightBubbleBackground: brandColors[700],
    chatRightBubbleBorder: brandColors[700],
    chatToolbarIcon: brandColors[700],
    chatToolbarBackgound: "#eee",
    chatToolbarBorder: "#999",
    chatToolbarInput: "#000",
    chatToolbarInputBackgound: "#eee",
    chatToolbarInputBorder: "#999",
    refreshControlBackground: "#fff",
    refreshControlForground: "#000",
    // @ts-ignore
    inputPlaceholder: fullConfig.theme.colors.gray[500] as string,
    inputCursor: brandColors[500],
    activityIndicatorColor: brandColors[700],
  },
  dark: {
    text: "#fff",
    background: "#000",
    statusBarStyle: "light",
    tabIconDefault: "#ccc",
    tabIconSelected: brandColors[600],
    chatLeftBubble: "#fff",
    chatLeftBubbleBackground: "#444",
    chatLeftBubbleBorder: "#444",
    chatRightBubble: "#fff",
    chatRightBubbleBackground: brandColors[600],
    chatRightBubbleBorder: brandColors[600],
    chatToolbarIcon: brandColors[600],
    chatToolbarBackgound: "#222",
    chatToolbarBorder: "#444",
    chatToolbarInput: "#fff",
    chatToolbarInputBackgound: "#444",
    chatToolbarInputBorder: "#444",
    refreshControlBackground: "#333",
    refreshControlForground: "#fff",
    // @ts-ignore
    inputPlaceholder: fullConfig.theme.colors.zinc[400] as string,
    inputCursor: brandColors[500],
    activityIndicatorColor: brandColors[700],
  },
};

export default theme;
