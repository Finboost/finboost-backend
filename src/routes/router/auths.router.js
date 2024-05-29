import express from "express";
import {
    signInUserHandler,
    signOutUserHandler,
    signUpUserHandler,
} from "../../controller/auths.controller.js";

const router = express.Router();

router.post("/auth/signup", signUpUserHandler);
router.post("/auth/signin", signInUserHandler);
router.delete("/auth/signout", signOutUserHandler);

export default router;
