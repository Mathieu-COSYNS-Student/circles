import { createTRPCReact, createWSClient, httpBatchLink, wsLink } from '@trpc/react-query';
import type { AppRouter } from '@circles/express/src/api/router';
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SuperJSON from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

export const TRPCProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: 'http://192.168.1.62:4000/trpc',
        }),
        wsLink<AppRouter>({
          client: createWSClient({
            url: 'ws://192.168.1.62:4000/trpc',
          }),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
