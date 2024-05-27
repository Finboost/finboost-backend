import { z } from "zod";

export const handleZodError = (error, res) => {
    if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => {
            return {
                field: err.path.join("."),
                message: err.message,
            };
        });

        res.status(400).send({
            status: "fail",
            message: "Validation error",
            errors: errorMessage,
        });
    } else {
        throw error;
    }
};
