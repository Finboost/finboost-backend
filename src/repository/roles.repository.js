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

export const findRolesByName = async (name) => {
    const roles = await prisma.role.findMany({
        where: {
            name,
        },
    });

    return roles;
};

export const createRole = async (newRoledata) => {
    const newRole = await prisma.role.create({
        data: newRoledata,
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

export const updateRole = async (roleId, newRoleData) => {
    const role = await prisma.role.update({
        where: {
            id: roleId,
        },
        data: newRoleData,
    });

    return role;
};

export const deleteRole = async (roleId) => {
    const role = await prisma.role.delete({
        where: {
            id: roleId,
        },
    });

    return role;
};
