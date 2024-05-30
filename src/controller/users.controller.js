import { handleServerError } from "../exceptions/server.exception.js";
import { getAllUsers } from "../service/users.service.js";

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
