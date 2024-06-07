import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignInUserSchema, SignUpUserSchema } from "../schema/auths.schema.js";
import { editRefreshTokenUser, signUpUser } from "../service/auths.service.js";
import { handleZodError } from "../exceptions/zod.exception.js";
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
    handleBadRequestError,
} from "../exceptions/client.exception.js";
import {
    getUserByEmail,
    getUserByRefreshToken,
} from "../service/users.service.js";
import { handleServerError } from "../exceptions/server.exception.js";
import { generateJwtToken } from "../utils/jwt.util.js";
import { updateNullRefreshTokenUser } from "../repository/auths.repository.js";
import {
    MissingRefreshTokenError,
    VerifyOwnerTokenError,
    handleMissingRefreshTokenError,
} from "../exceptions/auth.exception.js";

export const signUpUserHandler = async (req, res) => {
    try {
        req.body.age = parseInt(req.body.age, 10);
        const validateData = SignUpUserSchema.parse(req.body);

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(validateData.password, salt);

        validateData.password = hashPassword;

        const newUserData = await signUpUser(validateData, res);

        res.status(201).send({
            status: "success",
            message: "User signup successfully",
            data: {
                id: newUserData.id,
            },
        });
    } catch (error) {
        try {
            console.log(error);
            handleZodError(error, res);
        } catch (err) {
            if (err instanceof ConflictError) {
                console.log(err);
                return;
            }
            console.log(err);
            handleServerError(err, res);
        }
    }
};

export const signInUserHandler = async (req, res) => {
    try {
        const validateData = SignInUserSchema.parse(req.body);

        const user = await getUserByEmail(validateData.email, res);

        const match = await bcrypt.compare(
            validateData.password,
            user.password
        );

        if (!match) {
            handleBadRequestError("Wrong password", res);
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
            { expiresIn: "30s" }
        );

        const refreshToken = generateJwtToken(
            payloadJwt,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: "30d" }
        );

        await editRefreshTokenUser(user.id, refreshToken, res);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day in miliseconds
            secure: process.env.NODE_ENV === "production", // this is for HTTPS
        });

        res.status(200).send({
            status: "success",
            message: "Login successfully",
            data: {
                accessToken,
            },
        });
    } catch (error) {
        try {
            console.log(error);
            handleZodError(error, res);
        } catch (err) {
            if (
                err instanceof BadRequestError ||
                err instanceof NotFoundError
            ) {
                console.log(err);
                return;
            }
            console.log(err);
            handleServerError(err, res);
        }
    }
};

export const signOutUserHandler = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            handleMissingRefreshTokenError(undefined, res);
        }

        const user = await getUserByRefreshToken(refreshToken, res);

        await updateNullRefreshTokenUser(user.id);
        res.clearCookie("refreshToken");

        res.status(200).send({
            status: "success",
            message: "Logout successfully",
        });
    } catch (error) {
        if (
            error instanceof MissingRefreshTokenError ||
            error instanceof VerifyOwnerTokenError
        ) {
            console.log(error);
            return;
        }
        console.log(error);
        handleServerError(error, res);
    }
};
