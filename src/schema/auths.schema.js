import { z } from "zod";

export const SignUpUserSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    gender: z.enum(["Laki_laki", "Perempuan"]),
    age: z.number(),
    phoneNumber: z.string(),
    password: z.string(),
    roleId: z.string(),
});
