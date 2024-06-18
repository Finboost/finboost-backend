import prisma from "../../db/prisma.js";

export const createUser = async (newUserData) => {
    const newUser = await prisma.user.create({
        data: {
            ...newUserData,
            profile: {
                create: {
                    avatar: newUserData.profile.create.avatar,
                },
            },
        },
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

export const updateNullRefreshTokenUser = async (userId) => {
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            refreshToken: null,
        },
    });

    return user;
};
