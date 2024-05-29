import { handleConflictError } from "../exceptions/client.exception.js";
import { createUser } from "../repository/auths.repository.js";
import { findUserByEmail } from "../repository/users.repository.js";

export const signUpUser = async (newUserData, res) => {
    const findUser = await findUserByEmail(newUserData.email);

    if (findUser) {
        handleConflictError("Email already exist", res);
    }

    const newUser = await createUser(newUserData);

    return newUser;
};
