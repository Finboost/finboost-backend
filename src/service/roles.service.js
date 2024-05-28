import {
    NotFoundError,
    handleNotFoundError,
} from "../exceptions/client.exception.js";
import {
    createRole,
    findRoleById,
    findRoles,
} from "../repository/roles.repository.js";

export const getAllRoles = async () => {
    const roles = await findRoles();

    return roles;
};

export const insertRole = async (newRoleData) => {
    const newRole = await createRole(newRoleData);

    return newRole;
};

export const getRoleById = async (roleId) => {
    const role = await findRoleById(roleId);

    if (!role) {
        // handleNotFoundError(res, "Role not found");
        // throw new NotFoundError("Role not found");
        throw Error("Role not found");
    }

    return role;
};
