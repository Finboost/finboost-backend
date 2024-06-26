import { handleVerifyOwnerTokenError } from "../exceptions/auth.exception.js";
import { handleNotFoundError } from "../exceptions/client.exception.js";
import {
    createBlankProfileWithUserId,
    deleteUserById,
    deleteUserProfileByUserId,
    findUserByEmail,
    findUserById,
    findUserByRefreshToken,
    findUserProfileByUserId,
    findUsers,
    updateAvatarUserByUserId,
    updateUserById,
    updateUserProfileByUserId,
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

export const getUserProfileByUserId = async (userId, res) => {
    await getUserById(userId, res);
    const profile = await findUserProfileByUserId(userId);

    return profile;
};

export const editUserProfileByUserId = async (userId, userData, res) => {
    await getUserById(userId, res);
    const newUserProfile = await updateUserProfileByUserId(userId, userData);

    return newUserProfile;
};

export const removeUserProfileByUserId = async (userId, res) => {
    await getUserById(userId, res);
    const profile = await deleteUserProfileByUserId(userId);

    return profile;
};

export const editAvatarUser = async (userId, imageUrl, res) => {
    await getUserById(userId, res);
    const userProfile = await findUserProfileByUserId(userId);

    if (!userProfile) {
        await createBlankProfileWithUserId(userId);
    }

    const updateAvatarUser = await updateAvatarUserByUserId(userId, imageUrl);

    return updateAvatarUser;
};
