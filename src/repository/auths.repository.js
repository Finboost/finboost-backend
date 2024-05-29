import prisma from "../../db/prisma.js";

export const createUser = async (newUserData) => {
    const newUser = await prisma.user.create({
        data: newUserData,
    });

    return newUser;
};
