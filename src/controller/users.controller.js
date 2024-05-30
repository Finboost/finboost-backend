import { NotFoundError } from "../exceptions/client.exception.js";
import { handleServerError } from "../exceptions/server.exception.js";
import { getAllUsers, getUserById } from "../service/users.service.js";

export const getAllUsersHandler = async (req, res) => {
    try {
        const { role, fullName } = req.query;

        const filters = {
            role,
            fullName,
        };

        const users = await getAllUsers(filters);

        res.status(200).send({
            status: "success",
            message: "Get all user data",
            data: {
                users,
            },
        });
    } catch (error) {
        handleServerError(error, res);
    }
};

export const getUserByIdHandler = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await getUserById(userId, res);

        res.status(200).send({
            status: "success",
            message: "Get user data by id",
            data: {
                user,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};
