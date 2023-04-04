import { ClerkProvider } from '@clerk/clerk-expo';
import { ReactNode } from 'react';
import { getItemAsync, setItemAsync } from 'expo-secure-store';

const publishableKey = 'pk_test_c3R1bm5pbmctcmFtLTU0LmNsZXJrLmFjY291bnRzLmRldiQ';

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
