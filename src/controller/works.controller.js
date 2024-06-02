import { handleServerError } from "../exceptions/server.exception.js";
import { handleZodError } from "../exceptions/zod.exception.js";
import { NotFoundError } from "../exceptions/client.exception.js";
import {
    editWorkById,
    getAllWorks,
    getAllWorksByName,
    getWorkById,
    insertWork,
    removeWorkById,
} from "../service/works.service.js";
import { EditWorkSchema, InsertWorkSchema } from "../schema/works.schema.js";

export const getAllWorksHandler = async (req, res) => {
    try {
        const name = req.query.name;

        let works;
        if (name) {
            works = await getAllWorksByName(name);
        } else {
            works = await getAllWorks();
        }

        res.status(200).send({
            status: "success",
            message: "Get all work profile user",
            data: {
                works,
            },
        });
    } catch (error) {
        handleServerError(error, res);
    }
};

export const insertWorkHandler = async (req, res) => {
    try {
        const validateData = InsertWorkSchema.parse(req.body);

        const newWorkData = await insertWork(validateData);

        res.status(201).send({
            status: "success",
            message: "Work created successfully",
            data: {
                id: newWorkData.id,
            },
        });
    } catch (error) {
        try {
            handleZodError(error, res);
        } catch (err) {
            handleServerError(err, res);
        }
    }
};

export const getWorkByIdHandler = async (req, res) => {
    try {
        const workId = req.params.workId;
        const work = await getWorkById(workId, res);

        res.status(200).send({
            status: "success",
            message: "Get work data by id",
            data: {
                work,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};

export const editWorkByIdHandler = async (req, res) => {
    try {
        const workId = req.params.workId;
        const validateData = EditWorkSchema.parse(req.body);

        const newWorkData = await editWorkById(workId, validateData, res);

        res.status(200).send({
            status: "success",
            message: "Work updated successfully",
            data: {
                id: newWorkData.id,
            },
        });
    } catch (error) {
        try {
            handleZodError(error, res);
        } catch (err) {
            if (err instanceof NotFoundError) {
                return;
            }
            handleServerError(err, res);
        }
    }
};

export const removeWorkByIdHandler = async (req, res) => {
    try {
        const workId = req.params.workId;
        await removeWorkById(workId, res);

        res.status(200).send({
            status: "success",
            message: "Work deleted successfully",
            data: {
                id: workId,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};
