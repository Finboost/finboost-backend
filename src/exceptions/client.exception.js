export const handleNotFoundError = (res, message = "Resource not found") => {
    res.status(404).send({
        status: "fail",
        message: message,
    });

    throw new NotFoundError(message);
};

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
