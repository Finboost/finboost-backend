import prisma from "../../db/prisma.js";

export const findUsers = async (filters) => {
    const { role, fullName } = filters;

    const users = await prisma.user.findMany({
        where: {
            AND: [
                role
                    ? {
                          role: {
                              name: { contains: role },
                          },
                      }
                    : {},
                fullName ? { fullName: { contains: fullName } } : {},
            ],
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            gender: true,
            age: true,
            phoneNumber: true,
            createdAt: true,
            updatedAt: true,
            role: true,
        },
    });

    return users;
};

export const findUserById = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            gender: true,
            age: true,
            phoneNumber: true,
            password: true,
            createdAt: true,
            updatedAt: true,
            role: true,
        },
    });

    return user;
};

export const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            gender: true,
            age: true,
            phoneNumber: true,
            password: true,
            createdAt: true,
            updatedAt: true,
            role: true,
        },
    });

    return user;
};

export const findUserByRefreshToken = async (refreshToken) => {
    const user = await prisma.user.findFirst({
        where: {
            refreshToken,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            gender: true,
            age: true,
            phoneNumber: true,
            password: true,
            createdAt: true,
            updatedAt: true,
            role: true,
        },
    });

    return user;
};

export const updateUserById = async (userId, userData) => {
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: userData,
    });

    return user;
};

export const deleteUserById = async (userId) => {
    const user = await prisma.user.delete({
        where: {
            id: userId,
        },
    });

    return user;
};

export const findUserProfileByUserId = async (userId) => {
    const profile = await prisma.profile.findUnique({
        where: {
            userId,
        },
        select: {
            id: true,
            avatar: true,
            maritalStatus: true,
            certifiedStatus: true,
            work: true,
            education: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return profile;
};

export const createBlankProfileWithUserId = async (userId) => {
    const user = await prisma.profile.create({
        data: {
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    return user;
};

export const updateAvatarUserByUserId = async (userId, imageUrl) => {
    const user = await prisma.profile.update({
        where: {
            userId,
        },
        data: {
            avatar: imageUrl,
        },
    });

    return user;
};
