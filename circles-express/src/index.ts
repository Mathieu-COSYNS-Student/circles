import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'ws';
import { getConfig } from './config';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { AppRouter, appRouter } from './api/router';
import { createTRPCContext } from './api/trpc';
import { getHealthStatus } from './api/routers/health';

dotenv.config({ path: path.join(__dirname, '.env') });
const config = getConfig();
console.debug('Config:\n' + JSON.stringify(config, undefined, 2));

const app = express();

app.use(
  cors({
    origin: config.CORS_ORIGIN,
  })
);

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

app.get('/health', (req, res) => {
  res.send(getHealthStatus());
});

const server = http.createServer(app);

const wss = new Server({ server });
const wsHandler = applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext: createTRPCContext,
});

server.listen(config.PORT, () => {
  console.log(`Server is listening at http://localhost:${config.PORT}`);
});
server.on('error', console.error);

process.on('SIGTERM', () => {
  wsHandler.broadcastReconnectNotification();
  wss.close();
  server.close();
});
