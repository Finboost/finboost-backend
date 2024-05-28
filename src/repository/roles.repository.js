import prisma from "../../db/prisma.js";

export const findRoles = async () => {
    const roles = await prisma.role.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return roles;
};

export const createRole = async (newRoledata) => {
    const newRole = await prisma.role.create({
        data: {
            nama: newRoledata,
        },
    });

    return newRole;
};

export const findRoleById = async (roleId) => {
    const role = await prisma.role.findUnique({
        where: {
            id: roleId,
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return role;
};
