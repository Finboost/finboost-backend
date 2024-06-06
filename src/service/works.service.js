import {
    NotFoundError,
    handleNotFoundError,
} from "../exceptions/client.exception.js";
import {
    createWork,
    deleteWorkById,
    findWorkById,
    findWorks,
    findWorksByName,
    updateWorkById,
} from "../repository/works.repository.js";

export const getAllWorks = async () => {
    const works = await findWorks();

    return works;
};

export const getAllWorksByName = async (name) => {
    const works = await findWorksByName(name);

    return works;
};

export const insertWork = async (newWorkData) => {
    const newWork = await createWork(newWorkData);

    return newWork;
};

export const getWorkById = async (workId, res) => {
    const work = await findWorkById(workId);

    if (!work) {
        handleNotFoundError("Work not found", res);
    }

    return work;
};

export const editWorkById = async (workId, newWorkData, res) => {
    await getWorkById(workId, res);
    const work = await updateWorkById(workId, newWorkData);

    return work;
};

export const removeWorkById = async (workId, res) => {
    await getWorkById(workId, res);
    await deleteWorkById(workId);
};
