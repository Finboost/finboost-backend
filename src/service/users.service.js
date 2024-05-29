import { handleNotFoundError } from "../exceptions/client.exception.js";
import {
    findUserByEmail,
    findUserById,
} from "../repository/users.repository.js";

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
