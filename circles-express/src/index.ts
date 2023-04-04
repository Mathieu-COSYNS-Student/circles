import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { getConfig } from './config';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './api/router';
import { createTRPCContext } from './api/trpc';

dotenv.config({ path: path.join(__dirname, './.env') });
const config = getConfig();
console.debug(config);

const app = express();

app.use(
  cors({
    origin: config.CORS_ORIGIN,
  })
);

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

app.listen(config.PORT, () => {
  console.log(`Server is listening on port: ${config.PORT}`);
});
