import express from "express";
import {
    getAllRolesHandler,
    getRoleByIdHandler,
    insertRoleHandler,
} from "../../controller/roles.controller.js";

const router = express.Router();

router.get("/roles", getAllRolesHandler);
router.post("/roles", insertRoleHandler);
router.get("/roles/:roleId", getRoleByIdHandler);

export default router;
