import { z } from 'zod';

const corsSchema = z.string();

const configSchema = z.object({
  PORT: z.coerce.number().finite().int(),
  CORS_ORIGIN: z.array(corsSchema).or(corsSchema),
});

export const getConfig = () => {
  let corsOrigin = process.env.EXPRESS_CORS_ORIGIN || '*';
  try {
    corsOrigin = JSON.parse(corsOrigin);
  } catch (e) {
    /* empty */
  }

  const config = {
    PORT: process.env.EXPRESS_PORT || '3000',
    CORS_ORIGIN: corsOrigin,
  };

  return configSchema.parse(config);
};
