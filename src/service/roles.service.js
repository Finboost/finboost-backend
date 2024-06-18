import {
    NotFoundError,
    handleNotFoundError,
} from "../exceptions/client.exception.js";
import {
    createRole,
    deleteRole,
    findRoleById,
    findRoles,
    findRolesByName,
    updateRole,
} from "../repository/roles.repository.js";

export const getAllRoles = async () => {
    const roles = await findRoles();

    return roles;
};

export const getAllRolesByName = async (name) => {
    const roles = await findRolesByName(name);

    return roles;
};

export const insertRole = async (newRoleData) => {
    const newRole = await createRole(newRoleData);

    return newRole;
};

export const getRoleById = async (roleId, res) => {
    const role = await findRoleById(roleId);

    if (!role) {
        handleNotFoundError("Role not found", res);
    }

    return role;
};

export const editRoleById = async (roleId, newRoleData, res) => {
    await getRoleById(roleId, res);
    const role = await updateRole(roleId, newRoleData);

    return role;
};

export const removeRoleById = async (roleId, res) => {
    await getRoleById(roleId, res);
    await deleteRole(roleId);
};
