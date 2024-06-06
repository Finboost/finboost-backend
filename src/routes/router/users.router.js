import express from "express";
import { verifyAccessTokenHandler } from "../../middlewares/tokens.middleware.js";
import {
    editAvatarUserHandler,
    editUserAllFieldByIdHandler,
    editUserPartialFieldByIdHandler,
    getAllUsersHandler,
    getUserByIdHandler,
    getUserProfileByUserIdHandler,
    removeUserByIdHandler,
} from "../../controller/users.controller.js";
import {
    uploadAvatar,
    uploadToGcs,
} from "../../middlewares/images.middleware.js";

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
router.get(
    "/users/:userId/profile",
    verifyAccessTokenHandler,
    getUserProfileByUserIdHandler
);
router.put(
    "/users/:userId/profile/avatar",
    verifyAccessTokenHandler,
    uploadAvatar.single("avatar"),
    uploadToGcs,
    editAvatarUserHandler
);

export default router;
