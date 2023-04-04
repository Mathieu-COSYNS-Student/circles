import { test, expect } from '@jest/globals';
import { appRouter } from '../../router';
import { createInnerTRPCContext } from '../../trpc';

test('health check test', async () => {
  const caller = appRouter.createCaller(createInnerTRPCContext());

  const result = await caller.health.check();

  expect(result).toStrictEqual({ server: 'running' });
});
