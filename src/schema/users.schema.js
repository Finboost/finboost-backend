import { z } from "zod";

export const UpdateAllFieldUserSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    age: z.number(),
    phoneNumber: z.string(),
});

export const UpdatePartialFieldUserSchema = z
    .object({
        fullName: z.string().optional(),
        email: z.string().email().optional(),
        age: z.number().optional(),
        phoneNumber: z.string().optional(),
        password: z.string().optional(),
    })
    .strict();

export const UpdatePartialFieldUserProfileSchema = z
    .object({
        maritalStatus: z.enum(["Lajang", "Menikah", "Cerai"]).optional(),
        certifiedStatus: z.string().nullable().optional(),
        workId: z.string().optional(),
        educationId: z.string().optional(),
    })
    .strict();
