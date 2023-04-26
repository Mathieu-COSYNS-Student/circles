import { type ReactNode } from "react";
import Constants from "expo-constants";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { ClerkProvider } from "@clerk/clerk-expo";
import { z } from "zod";

const stringSchema = z.string();

const publishableKey = stringSchema.parse(
  Constants.manifest?.extra?.CLERK_PUBLISHABLE_KEY,
);

const tokenCache = {
  async getToken(key: string) {
    try {
      return await getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, token: string) {
    try {
      return await setItemAsync(key, token);
    } catch (err) {
      return;
    }
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
};
