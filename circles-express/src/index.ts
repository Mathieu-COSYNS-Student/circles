import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { appRouter } from './api/router';
import { createTRPCContext } from './api/trpc';

const PORT = 4000;

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
