import prisma from "../../db/prisma.js";

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
