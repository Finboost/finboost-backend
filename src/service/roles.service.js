import { createRole, findRoles } from "../repository/roles.repository.js";

export const getAllRoles = async () => {
    const roles = await findRoles();

    return roles;
};

export const insertRole = async (newRoleData) => {
    const newRole = await createRole(newRoleData);

    return newRole;
};
