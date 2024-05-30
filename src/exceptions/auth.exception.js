export const handleVerifyTokenError = (
    message = "Forbidden. Can't decode or compare token with secret (expired or invalid token)",
    res
) => {
    res.status(403).send({
        status: "fail",
        message: message,
    });

    throw new VerifyTokenError(message);
};

export const handleMissingAccessTokenError = (
    message = "Unauthorized. Please provide Bearer `accessToken` on Authorization header",
    res
) => {
    res.status(401).send({
        status: "fail",
        message: message,
    });

    throw new MissingAccessTokenError(message);
};

export const handleMissingRefreshTokenError = (
    message = "Unauthorized. Please provide `refreshToken` on cookies before request",
    res
) => {
    res.status(401).send({
        status: "fail",
        message: message,
    });

    throw new MissingRefreshTokenError(message);
};

export const handleVerifyOwnerTokenError = (
    message = "Forbidden. Can't find who the owner `refreshToken`",
    res
) => {
    res.status(403).send({
        status: "fail",
        message: message,
    });

    throw new VerifyOwnerTokenError(message);
};

export class VerifyTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "VerifyTokenError";
    }
}

export class MissingAccessTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "MissingAccessTokenError";
    }
}

export class MissingRefreshTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "MissingRefreshTokenError";
    }
}

export class VerifyOwnerTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "VerifyOwnerTokenError";
    }
}
