import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@circles/express/src/api/router';

export const trpc = createTRPCReact<AppRouter>();
