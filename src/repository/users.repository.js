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
