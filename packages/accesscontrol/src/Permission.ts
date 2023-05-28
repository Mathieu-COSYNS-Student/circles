import { z } from "zod";

import { actionSchema } from "./Action";
import { resourceSchema } from "./Resource";

const permissionSchema = z.object({
  action: actionSchema,
  resource: resourceSchema,
  ownership: z.boolean().optional(),
});

export type Permission = z.infer<typeof permissionSchema>;
