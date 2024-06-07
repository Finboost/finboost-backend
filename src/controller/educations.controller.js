import { handleServerError } from "../exceptions/server.exception.js";
import { handleZodError } from "../exceptions/zod.exception.js";
import { NotFoundError } from "../exceptions/client.exception.js";
import {
    editEducationById,
    getAllEducations,
    getAllEducationsByName,
    getEducationById,
    insertEducation,
    removeEducationById,
} from "../service/educations.service.js";
import {
    EditEducationSchema,
    InsertEducationSchema,
} from "../schema/educations.schema.js";

export const getAllEducationsHandler = async (req, res) => {
    try {
        const name = req.query.name;

        let educations;
        if (name) {
            educations = await getAllEducationsByName(name);
        } else {
            educations = await getAllEducations();
        }

        res.status(200).send({
            status: "success",
            message: "Get all education profile user",
            data: {
                educations,
            },
        });
    } catch (error) {
        console.log(error);
        handleServerError(error, res);
    }
};

export const insertEducationHandler = async (req, res) => {
    try {
        const validateData = InsertEducationSchema.parse(req.body);

        const newEducationData = await insertEducation(validateData);

        res.status(201).send({
            status: "success",
            message: "Education created successfully",
            data: {
                id: newEducationData.id,
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

export const getEducationByIdHandler = async (req, res) => {
    try {
        const educationId = req.params.educationId;
        const education = await getEducationById(educationId, res);

        res.status(200).send({
            status: "success",
            message: "Get education data by id",
            data: {
                education,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};

export const editEducationByIdHandler = async (req, res) => {
    try {
        const educationId = req.params.educationId;
        const validateData = EditEducationSchema.parse(req.body);

        const newEducationData = await editEducationById(
            educationId,
            validateData,
            res
        );

        res.status(200).send({
            status: "success",
            message: "Education updated successfully",
            data: {
                id: newEducationData.id,
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

export const removeEducationByIdHandler = async (req, res) => {
    try {
        const educationId = req.params.educationId;
        await removeEducationById(educationId, res);

        res.status(200).send({
            status: "success",
            message: "Education deleted successfully",
            data: {
                id: educationId,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};
