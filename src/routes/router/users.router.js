import express from "express";
import { verifyAccessTokenHandler } from "../../middlewares/tokens.middleware.js";
import {
    editUserAllFieldByIdHandler,
    editUserPartialFieldByIdHandler,
    getAllUsersHandler,
    getUserByIdHandler,
    removeUserByIdHandler,
} from "../../controller/users.controller.js";

const router = express.Router();

router.get("/users", verifyAccessTokenHandler, getAllUsersHandler);
router.get("/users/:userId", verifyAccessTokenHandler, getUserByIdHandler);
router.put(
    "/users/:userId",
    verifyAccessTokenHandler,
    editUserAllFieldByIdHandler
);
router.patch(
    "/users/:userId",
    verifyAccessTokenHandler,
    editUserPartialFieldByIdHandler
);
router.delete(
    "/users/:userId",
    verifyAccessTokenHandler,
    removeUserByIdHandler
);

export default router;
