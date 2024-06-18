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
        about: z.string().optional(),
        maritalStatus: z.enum(["Lajang", "Menikah", "Cerai"]).optional(),
        certifiedStatus: z.string().nullable().optional(),
        workId: z.string().optional(),
        educationId: z.string().optional(),
        investment: z
            .enum(["Saham", "Reksadana", "Obligasi", "Emas", "Cryptocurrency"])
            .optional(),
        insurance: z
            .enum(["Saham", "Reksadana", "Obligasi", "Emas", "Cryptocurrency"])
            .optional(),
        incomePerMonth: z.union([z.string(), z.number()]).optional(),
        totalSaving: z.union([z.string(), z.number()]).optional(),
        totalDebt: z.union([z.string(), z.number()]).optional(),
    })
    .strict();
