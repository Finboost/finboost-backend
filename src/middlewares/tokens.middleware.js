import jwt from "jsonwebtoken";
import {
    MissingAccessTokenError,
    VerifyTokenError,
    handleMissingAccessTokenError,
    handleVerifyTokenError,
} from "../exceptions/auth.exception.js";
import { handleServerError } from "../exceptions/server.exception.js";

export const verifyAccessTokenHandler = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader && authHeader.split(" ")[1]; // empty token && take token

        if (accessToken == null) {
            handleMissingAccessTokenError(undefined, res);
        }

        jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    handleVerifyTokenError(undefined, res);
                }

                req.email = decoded.email;
                next();
            }
        );
    } catch (error) {
        if (
            error instanceof MissingAccessTokenError ||
            error instanceof VerifyTokenError
        ) {
            console.log(error);
            return;
        }
        console.log(error);
        handleServerError(error, res);
    }
};
