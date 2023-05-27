import { z } from "zod";

export const CREATE = "CREATE";
export const READ = "READ";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";

export const actionSchema = z.enum([CREATE, READ, UPDATE, DELETE]);

export type Action = z.infer<typeof actionSchema>;
