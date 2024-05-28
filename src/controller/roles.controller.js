import { handleServerError } from "../exceptions/server.exception.js";
import { handleZodError } from "../exceptions/zod.exception.js";
import {
    NotFoundError,
    handleNotFoundError,
} from "../exceptions/client.exception.js";
import {
    getAllRoles,
    getRoleById,
    insertRole,
} from "../service/roles.service.js";
import { z, string, object } from "zod";

const roleSchema = object({
    name: string(),
});

export const getAllRolesHandler = async (req, res) => {
    try {
        const roles = await getAllRoles();

        res.status(200).send({
            status: "success",
            message: "Get all user role",
            data: {
                roles,
            },
        });
    } catch (error) {
        handleServerError(error, res);
    }
};

export const insertRoleHandler = async (req, res) => {
    try {
        const validateData = roleSchema.parse(req.body);

        const newRoleData = await insertRole(validateData);

        res.status(201).send({
            status: "success",
            message: "Role created successfully",
            data: {
                id: newRoleData.id,
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

export const getRoleByIdHandler = async (req, res) => {
    try {
        const roleId = req.params.roleId;
        const role = await getRoleById(res, roleId);

        res.status(200).send({
            status: "success",
            message: "Get role data by id",
            data: {
                role,
            },
        });
    } catch (error) {
        // if (error instanceof NotFoundError) {
        //     return;
        // }
        console.log(error);
        handleServerError(error, res);
    }
};
