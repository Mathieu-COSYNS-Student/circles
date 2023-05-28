import { z } from "zod";

export const NETWORK_INVITE = "network_invite";

export const resourceSchema = z.enum([NETWORK_INVITE]);

export type Resource = z.infer<typeof resourceSchema>;
