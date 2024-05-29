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

export const handleBadRequestError = (
    message = "Resource are bad request",
    res
) => {
    res.status(400).send({
        status: "fail",
        message: message,
    });

    throw new BadRequestError(message);
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

export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
    }
}
