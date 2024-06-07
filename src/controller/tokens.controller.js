import jwt from "jsonwebtoken";
import {
    MissingRefreshTokenError,
    VerifyOwnerTokenError,
    VerifyTokenError,
    handleMissingRefreshTokenError,
    handleVerifyTokenError,
} from "../exceptions/auth.exception.js";
import { getUserByRefreshToken } from "../service/users.service.js";
import { generateJwtToken } from "../utils/jwt.util.js";
import { handleServerError } from "../exceptions/server.exception.js";

export const refreshTokenHandler = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            handleMissingRefreshTokenError(undefined, res);
        }

        const user = await getUserByRefreshToken(refreshToken, res);

        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    console.log(err);
                    handleVerifyTokenError(undefined, res);
                }

                const payloadJwt = {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role.name,
                };

                const accessToken = generateJwtToken(
                    payloadJwt,
                    process.env.JWT_ACCESS_TOKEN_SECRET,
                    { expiresIn: "1h" }
                );

                res.status(200).send({
                    status: "success",
                    message: "Refresh token successfully",
                    data: {
                        accessToken,
                    },
                });
            }
        );
    } catch (error) {
        if (
            error instanceof MissingRefreshTokenError ||
            error instanceof VerifyOwnerTokenError ||
            error instanceof VerifyTokenError
        ) {
            console.log(error);
            return;
        }
        console.log(error);
        handleServerError(error, res);
    }
};
