import { z } from "zod";

export const GenerativeAiInput = z.object({
    question: z.string(),
});

export const SugesstionQuestionInput = z.object({
    user_input: z.string(),
    total_questions: z.number()
});