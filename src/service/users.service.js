import { handleVerifyOwnerTokenError } from "../exceptions/auth.exception.js";
import { handleNotFoundError } from "../exceptions/client.exception.js";
import {
    deleteUserById,
    findUserByEmail,
    findUserById,
    findUserByRefreshToken,
    findUsers,
    updateUserById,
} from "../repository/users.repository.js";

export const getAllUsers = async (filters) => {
    const users = await findUsers(filters);

    return users;
};

export const getUserById = async (userId, res) => {
    const user = await findUserById(userId);

    if (!user) {
        handleNotFoundError("User not found", res);
    }

    return user;
};

export const getUserByEmail = async (email, res) => {
    const user = await findUserByEmail(email);

    if (!user) {
        handleNotFoundError("Email not found", res);
    }

    return user;
};

export const getUserByRefreshToken = async (refreshToken, res) => {
    const user = await findUserByRefreshToken(refreshToken);

    if (!user) {
        handleVerifyOwnerTokenError(undefined, res);
    }

    return user;
};

export const editUserById = async (userId, userData, res) => {
    await getUserById(userId, res);

    const user = await updateUserById(userId, userData);

    return user;
};

export const removeUserById = async (userId, res) => {
    await getUserById(userId, res);
    await deleteUserById(userId);
};
