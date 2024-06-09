import { z } from "zod";

export const InsertChatRoomSchema = z.object({
    type: z.enum(['Expert', 'AI']),
    userId: z.string(),
    expertId: z.string().optional(),
});

export const EditChatRoomSchema = z.object({
    type: z.enum(['Expert', 'AI']),
    userId: z.string(),
    expertId: z.string().optional(),
});