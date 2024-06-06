import { handleConflictError } from "../exceptions/client.exception.js";
import {
    createUser,
    updateRefreshTokenUser,
} from "../repository/auths.repository.js";
import { findUserByEmail } from "../repository/users.repository.js";
import { getPublicUrl } from "../utils/bucket.util.js";
import { getUserById } from "./users.service.js";

export const signUpUser = async (newUserData, res) => {
    const findUser = await findUserByEmail(newUserData.email);

    if (findUser) {
        handleConflictError("Email already exist", res);
    }

    const avatarDefault =
        newUserData.gender === "Laki_laki"
            ? getPublicUrl("male.png")
            : getPublicUrl("female.png");

    const newUser = await createUser({
        ...newUserData,
        profile: {
            create: {
                avatar: avatarDefault,
            },
        },
    });

    return newUser;
};

export const editRefreshTokenUser = async (userId, newRefreshToken, res) => {
    await getUserById(userId, res);

    updateRefreshTokenUser(userId, newRefreshToken);
};
