import { z } from "zod";

export const InsertWorkSchema = z.object({
    name: z.string(),
});

export const EditWorkSchema = z.object({
    name: z.string(),
});
