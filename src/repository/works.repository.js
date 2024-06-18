import prisma from "../../db/prisma.js";

export const findWorks = async () => {
    const works = await prisma.work.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return works;
};

export const findWorksByName = async (name) => {
    const works = await prisma.work.findMany({
        where: {
            name,
        },
    });

    return works;
};

export const createWork = async (newWorkData) => {
    const newWork = await prisma.work.create({
        data: newWorkData,
    });

    return newWork;
};

export const findWorkById = async (workId) => {
    const work = await prisma.work.findUnique({
        where: {
            id: workId,
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return work;
};

export const updateWorkById = async (workId, newWorkData) => {
    const work = await prisma.work.update({
        where: {
            id: workId,
        },
        data: newWorkData,
    });

    return work;
};

export const deleteWorkById = async (workId) => {
    const work = await prisma.work.delete({
        where: {
            id: workId,
        },
    });

    return work;
};
