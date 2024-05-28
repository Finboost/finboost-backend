export const handleAuthError = (error, res) => {
    if (error.name === "VerifyTokenError") {
        return res.status(403).send({
            status: "fail",
            message:
                "Forbidden. Can't decode or compare token with secret (expired or invalid token)",
        });
    }

    if (error.name === "MissingTokenError") {
        return res.status(401).send({
            status: "fail",
            message:
                "Unauthorized. Please provide Bearer `accessToken` on Authorization header",
        });
    }

    if (error.name === "VerifyOwnerTokenError") {
        return res.status(403).send({
            status: "fail",
            message: "Fobidden. Can't find who the owner `refreshToken`",
        });
    }
};
