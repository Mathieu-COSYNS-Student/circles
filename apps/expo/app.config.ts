import { type ConfigContext, type ExpoConfig } from "expo/config";
import { z } from "zod";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_c3R1bm5pbmctcmFtLTU0LmNsZXJrLmFjY291bnRzLmRldiQ";

const defineConfig = ({ config }: ConfigContext): ExpoConfig => {
  const configSchema = z.object({
    name: z.string(),
    slug: z.string(),
  });

  return {
    ...configSchema.parse(config),
    ...config,
    android: {
      ...config.android,
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
    },
    extra: {
      ...config.extra,
      CLERK_PUBLISHABLE_KEY,
    },
  };
};

export default defineConfig;
