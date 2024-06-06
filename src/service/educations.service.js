import {
    NotFoundError,
    handleNotFoundError,
} from "../exceptions/client.exception.js";
import {
    createEducation,
    deleteEducationById,
    findEducationById,
    findEducations,
    findEducationsByName,
    updateEducationById,
} from "../repository/educations.repository.js";

export const getAllEducations = async () => {
    const educations = await findEducations();

    return educations;
};

export const getAllEducationsByName = async (name) => {
    const educations = await findEducationsByName(name);

    return educations;
};

export const insertEducation = async (newEducationData) => {
    const newEducation = await createEducation(newEducationData);

    return newEducation;
};

export const getEducationById = async (educationId, res) => {
    const education = await findEducationById(educationId);

    if (!education) {
        handleNotFoundError("Edcuation not found", res);
    }

    return education;
};

export const editEducationById = async (educationId, newEducationData, res) => {
    await getEducationById(educationId, res);
    const education = await updateEducationById(educationId, newEducationData);

    return education;
};

export const removeEducationById = async (educationId, res) => {
    await getEducationById(educationId, res);
    await deleteEducationById(educationId);
};
