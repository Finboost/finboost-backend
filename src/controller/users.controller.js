import bcrypt from "bcrypt";
import { NotFoundError } from "../exceptions/client.exception.js";
import { handleServerError } from "../exceptions/server.exception.js";
import { handleZodError } from "../exceptions/zod.exception.js";
import {
    UpdateAllFieldUserSchema,
    UpdatePartialFieldUserSchema,
} from "../schema/users.schema.js";
import {
    editAvatarUser,
    editUserById,
    getAllUsers,
    getUserById,
    getUserProfileByUserId,
    removeUserById,
} from "../service/users.service.js";
import { findUserProfileByUserId } from "../repository/users.repository.js";
import {
    deleteFileFromBucket,
    getFileNameFromUrl,
    getPublicUrl,
} from "../utils/bucket.util.js";

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

export const removeUserByIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;

        const userProfile = await findUserProfileByUserId(userId);
        const userAvatar = userProfile?.avatar;

        const fileName = getFileNameFromUrl(userAvatar);
        const maleAvatarUrl = getPublicUrl("male.png");
        const femaleAvatarUrl = getPublicUrl("female.png");

        if (
            userAvatar &&
            userAvatar !== maleAvatarUrl &&
            userAvatar !== femaleAvatarUrl
        ) {
            await deleteFileFromBucket(fileName);
        }

        await removeUserById(userId, res);

        res.status(200).send({
            status: "success",
            message: "Successfully delete user data",
            data: {
                id: userId,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};

export const getUserProfileByUserIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;

        const profile = await getUserProfileByUserId(userId, res);

        res.status(200).send({
            status: "success",
            message: "Get user data by id",
            data: {
                profile,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};

export const editAvatarUserHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        let imageUrl = "";

        if (req.file && req.file.cloudStoragePublicUrl) {
            imageUrl = req.file.cloudStoragePublicUrl;
        }

        const userProfile = await findUserProfileByUserId(userId);
        const oldAvatar = userProfile?.avatar;

        const fileName = getFileNameFromUrl(oldAvatar);
        const maleAvatarUrl = getPublicUrl("male.png");
        const femaleAvatarUrl = getPublicUrl("female.png");

        if (
            oldAvatar &&
            oldAvatar !== maleAvatarUrl &&
            oldAvatar !== femaleAvatarUrl
        ) {
            await deleteFileFromBucket(fileName);
        }

        const newAvatarUserData = await editAvatarUser(userId, imageUrl, res);

        res.status(200).send({
            status: "success",
            message: "Avatar user updated successfully",
            data: {
                id: newAvatarUserData.userId,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};
