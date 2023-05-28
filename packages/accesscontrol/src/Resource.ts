import { z } from "zod";

export const NETWORK_INVITE = "NETWORK_INVITE";
export const NETWORK_CIRCLES = "NETWORK_CIRCLES";

export const resourceSchema = z.enum([NETWORK_INVITE, NETWORK_CIRCLES]);

export type Resource = z.infer<typeof resourceSchema>;
