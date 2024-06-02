import express from "express";
import { verifyAccessTokenHandler } from "../../middlewares/tokens.middleware.js";
import {
    editUserAllFieldByIdHandler,
    getAllUsersHandler,
    getUserByIdHandler,
} from "../../controller/users.controller.js";

const router = express.Router();

router.get("/users", verifyAccessTokenHandler, getAllUsersHandler);
router.get("/users/:userId", verifyAccessTokenHandler, getUserByIdHandler);
router.put(
    "/users/:userId",
    verifyAccessTokenHandler,
    editUserAllFieldByIdHandler
);

export default router;
