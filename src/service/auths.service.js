import { handleConflictError } from "../exceptions/client.exception.js";
import {
    createUser,
    updateRefreshTokenUser,
} from "../repository/auths.repository.js";
import { findUserByEmail } from "../repository/users.repository.js";
import { getUserById } from "./users.service.js";

export const signUpUser = async (newUserData, res) => {
    const findUser = await findUserByEmail(newUserData.email);

    if (findUser) {
        handleConflictError("Email already exist", res);
    }

    const newUser = await createUser(newUserData);

    return newUser;
};

export const editRefreshTokenUser = async (userId, newRefreshToken, res) => {
    await getUserById(userId, res);

    updateRefreshTokenUser(userId, newRefreshToken);
};
