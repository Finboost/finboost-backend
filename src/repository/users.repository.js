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
            profile: true,
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
            profile: true,
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
            profile: true,
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
            profile: true,
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

export const updateUserProfileByUserId = async (userId, userData) => {
    const newUserProfile = await prisma.profile.update({
        where: {
            userId,
        },
        data: {
            ...(userData.maritalStatus && {
                maritalStatus: userData.maritalStatus,
            }),
            ...(userData.certifiedStatus && {
                certifiedStatus: userData.certifiedStatus,
            }),
            ...(userData.workId && {
                work: { connect: { id: userData.workId } },
            }),
            ...(userData.educationId && {
                education: { connect: { id: userData.educationId } },
            }),
        },
    });

    return newUserProfile;
};

export const deleteUserProfileByUserId = async (userId) => {
    const userProfile = await prisma.profile.update({
        where: {
            userId,
        },
        data: {
            maritalStatus: null,
            certifiedStatus: null,
            workId: null,
            educationId: null,
        },
    });

    return userProfile;
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
