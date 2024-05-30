import express from "express";
import { verifyAccessTokenHandler } from "../../middlewares/tokens.middleware.js";
import { getAllUsersHandler } from "../../controller/users.controller.js";

const router = express.Router();

router.get("/users", verifyAccessTokenHandler, getAllUsersHandler);

export default router;
