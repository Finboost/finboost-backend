import express from "express";
import {
    editEducationByIdHandler,
    getAllEducationsHandler,
    getEducationByIdHandler,
    insertEducationHandler,
    removeEducationByIdHandler,
} from "../../controller/educations.controller.js";

const router = express.Router();

router.get("/educations", getAllEducationsHandler);
router.post("/educations", insertEducationHandler);
router.get("/educations/:educationId", getEducationByIdHandler);
router.put("/educations/:educationId", editEducationByIdHandler);
router.delete("/educations/:educationId", removeEducationByIdHandler);

export default router;
