import prisma from "../../db/prisma.js";

export const findEducations = async () => {
    const educations = await prisma.education.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return educations;
};

export const findEducationsByName = async (name) => {
    const educations = await prisma.education.findMany({
        where: {
            name,
        },
    });

    return educations;
};

export const createEducation = async (newEducationData) => {
    const newEducation = await prisma.education.create({
        data: newEducationData,
    });

    return newEducation;
};

export const findEducationById = async (educationId) => {
    const education = await prisma.education.findUnique({
        where: {
            id: educationId,
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return education;
};

export const updateEducationById = async (educationId, newEducationData) => {
    const education = await prisma.education.update({
        where: {
            id: educationId,
        },
        data: newEducationData,
    });

    return education;
};

export const deleteEducationById = async (educationId) => {
    const education = await prisma.education.delete({
        where: {
            id: educationId,
        },
    });

    return education;
};
