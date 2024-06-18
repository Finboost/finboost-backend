import express from "express";
import {
    editRoleByIdHandler,
    getAllRolesHandler,
    getRoleByIdHandler,
    insertRoleHandler,
    removeRoleByIdHandler,
} from "../../controller/roles.controller.js";

const router = express.Router();

router.get("/roles", getAllRolesHandler);
router.post("/roles", insertRoleHandler);
router.get("/roles/:roleId", getRoleByIdHandler);
router.put("/roles/:roleId", editRoleByIdHandler);
router.delete("/roles/:roleId", removeRoleByIdHandler);

export default router;
