import { z } from "zod";

export const InsertRoleSchema = z.object({
    name: z.string(),
});

export const EditRoleSchema = z.object({
    name: z.string(),
});
