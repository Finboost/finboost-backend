import express from "express";
import {
    editWorkByIdHandler,
    getAllWorksHandler,
    getWorkByIdHandler,
    insertWorkHandler,
    removeWorkByIdHandler,
} from "../../controller/works.controller.js";

const router = express.Router();

router.get("/works", getAllWorksHandler);
router.post("/works", insertWorkHandler);
router.get("/works/:workId", getWorkByIdHandler);
router.put("/works/:workId", editWorkByIdHandler);
router.delete("/works/:workId", removeWorkByIdHandler);

export default router;
