import { useEffect, type ReactNode } from "react";
import Constants from "expo-constants";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import auth from "@react-native-firebase/auth";
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

const Firebase = ({ children }: { children: ReactNode }) => {
  const { getToken, userId } = useAuth();

  useEffect(() => {
    const firebaseSignInWithClerk = async () => {
      const token = await getToken({ template: "integration_firebase" });
      if (token) await auth().signInWithCustomToken(token);
      else await auth().signOut();
    };

    firebaseSignInWithClerk()
      .then(() =>
        console.log(`firebaseSignInWithClerk ${auth().currentUser?.uid}`),
      )
      .catch(() => console.log("error in firebaseSignInWithClerk"));
  }, [userId, getToken]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log(`firebase_user=${user?.uid}`);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return <>{children}</>;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Firebase>{children}</Firebase>
    </ClerkProvider>
  );
};
