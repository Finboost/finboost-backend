export const handleNotFoundError = (message = "Resource not found", res) => {
    res.status(404).send({
        status: "fail",
        message: message,
    });

    throw new NotFoundError(message);
};

export const handleConflictError = (message = "Resource are conflict", res) => {
    res.status(409).send({
        status: "fail",
        message: message,
    });

    throw new ConflictError(message);
};

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
    }
}
