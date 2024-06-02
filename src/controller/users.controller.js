import bcrypt from "bcrypt";
import { NotFoundError } from "../exceptions/client.exception.js";
import { handleServerError } from "../exceptions/server.exception.js";
import { handleZodError } from "../exceptions/zod.exception.js";
import {
    UpdateAllFieldUserSchema,
    UpdatePartialFieldUserSchema,
} from "../schema/users.schema.js";
import {
    editUserById,
    getAllUsers,
    getUserById,
} from "../service/users.service.js";

export const getAllUsersHandler = async (req, res) => {
    try {
        const { role, fullName } = req.query;

        const filters = {
            role,
            fullName,
        };

        const users = await getAllUsers(filters);

        res.status(200).send({
            status: "success",
            message: "Get all user data",
            data: {
                users,
            },
        });
    } catch (error) {
        handleServerError(error, res);
    }
};

export const getUserByIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await getUserById(userId, res);

        res.status(200).send({
            status: "success",
            message: "Get user data by id",
            data: {
                user,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};

export const editUserAllFieldByIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;

        const validateData = UpdateAllFieldUserSchema.parse(req.body);

        const user = await editUserById(userId, validateData, res);

        res.status(200).send({
            status: "success",
            message: "User data updated successfully",
            data: {
                id: user.id,
            },
        });
    } catch (error) {
        try {
            handleZodError(error, res);
        } catch (err) {
            if (err instanceof NotFoundError) {
                return;
            }
            handleServerError(err, res);
        }
    }
};

export const editUserPartialFieldByIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;

        let validateData = UpdatePartialFieldUserSchema.parse(req.body);

        if (validateData.password) {
            const salt = await bcrypt.genSalt();
            validateData.password = await bcrypt.hash(
                validateData.password,
                salt
            );
        }

        const user = await editUserById(userId, validateData, res);

        res.status(200).send({
            status: "success",
            message: "User data partially updated successfully",
            data: {
                id: user.id,
            },
        });
    } catch (error) {
        try {
            handleZodError(error, res);
        } catch (err) {
            if (err instanceof NotFoundError) {
                return;
            }
            handleServerError(err, res);
        }
    }
};
