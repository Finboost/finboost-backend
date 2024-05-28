import express from "express";
import {
    getAllRolesHandler,
    insertRoleHandler,
} from "../../controller/roles.controller.js";

const router = express.Router();

router.get("/roles", getAllRolesHandler);
router.post("/roles", insertRoleHandler);

export default router;
