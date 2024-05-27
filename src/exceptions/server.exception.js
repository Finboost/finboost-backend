import { Prisma } from "@prisma/client";

export const handleServerError = (error, res) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known request errors (e.g., unique constraint violation)
        if (error.code === "P2002") {
            return res.status(409).send({
                status: "fail",
                message: "Unique constraint violation",
                details: error.meta,
            });
        }
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Handle unknown request errors
        return res.status(500).send({
            status: "fail",
            message: "An unknown error occurred",
            details: error.message,
        });
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
        // Handle Rust panic errros
        return res.status(500).send({
            status: "fail",
            message: "A database error occured",
            details: error.message,
        });
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        // Handle initialization errors (e.g., connection failed)
        return res.status(500).send({
            status: "fail",
            message: "Failed to initialize database connection",
            details: error.message,
        });
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        // Handle validation errors
        return res.status(500).send({
            status: "fail",
            message: "Validation error",
            details: error.message,
        });
    }

    res.status(500).send({
        status: "fail",
        message: error.message,
    });
};
