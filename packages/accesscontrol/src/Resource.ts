import { z } from "zod";

export const NETWORK_INVITE = "NETWORK_INVITE";
export const NETWORK_CIRCLES = "NETWORK_CIRCLES";
export const NETWORK_MEMBERS = "NETWORK_MEMBERS";
export const NETWORK_ROLES = "NETWORK_ROLES";

export const resourceSchema = z.enum([
  NETWORK_INVITE,
  NETWORK_CIRCLES,
  NETWORK_MEMBERS,
  NETWORK_ROLES,
]);

export type Resource = z.infer<typeof resourceSchema>;
