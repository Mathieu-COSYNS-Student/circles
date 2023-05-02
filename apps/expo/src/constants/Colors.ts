import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const brandColors: {
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
} = fullConfig.theme.colors.brand;

const theme = {
  light: {
    text: "#000",
    background: "#fff",
    statusBarStyle: "dark",
    tabIconDefault: "#ccc",
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
  },
};

export default theme;
