import prisma from "../../db/prisma.js";

export const createUser = async (newUserData) => {
    const newUser = await prisma.user.create({
        data: newUserData,
    });

    return newUser;
};

export const updateRefreshTokenUser = async (userId, newRefreshToken) => {
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            refreshToken: newRefreshToken,
        },
    });

    return user;
};
