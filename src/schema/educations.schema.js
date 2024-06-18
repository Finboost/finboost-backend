import { z } from "zod";

export const InsertEducationSchema = z.object({
    name: z.string(),
});

export const EditEducationSchema = z.object({
    name: z.string(),
});
