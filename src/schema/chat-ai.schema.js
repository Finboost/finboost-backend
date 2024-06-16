import { z } from "zod";

export const GenerativeAiInput = z.object({
    prompt: z.string(),
});

export const SugesstionQuestionInput = z.object({
    user_input: z.string(),
    total_questions: z.number()
});