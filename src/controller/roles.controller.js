import { handleServerError } from "../exceptions/server.exception.js";
import { handleZodError } from "../exceptions/zod.exception.js";
import { NotFoundError } from "../exceptions/client.exception.js";
import {
    editRoleById,
    getAllRoles,
    getAllRolesByName,
    getRoleById,
    insertRole,
    removeRoleById,
} from "../service/roles.service.js";
import { EditRoleSchema, InsertRoleSchema } from "../schema/roles.schema.js";

export const getAllRolesHandler = async (req, res) => {
    try {
        const name = req.query.name;

        let roles;
        if (name) {
            roles = await getAllRolesByName(name);
        } else {
            roles = await getAllRoles();
        }

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
        const validateData = InsertRoleSchema.parse(req.body);

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
        const role = await getRoleById(roleId, res);

        res.status(200).send({
            status: "success",
            message: "Get role data by id",
            data: {
                role,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};

export const editRoleByIdHandler = async (req, res) => {
    try {
        const roleId = req.params.roleId;
        const validateData = EditRoleSchema.parse(req.body);

        const newRoleData = await editRoleById(roleId, validateData, res);

        res.status(200).send({
            status: "success",
            message: "Role updated successfully",
            data: {
                id: newRoleData.id,
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

export const removeRoleByIdHandler = async (req, res) => {
    try {
        const roleId = req.params.roleId;
        await removeRoleById(roleId, res);

        res.status(200).send({
            status: "success",
            message: "Role deleted successfully",
            data: {
                id: roleId,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};
