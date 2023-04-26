import { publicProcedure, router } from "../trpc";

export const getHealthStatus = () => {
  return {
    server: "running",
  };
};

export const healthRouter = router({
  check: publicProcedure.query(() => getHealthStatus()),
});
