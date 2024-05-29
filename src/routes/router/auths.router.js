import express from "express";
import {
    signInUserHandler,
    signUpUserHandler,
} from "../../controller/auths.controller.js";

const router = express.Router();

router.post("/auth/signup", signUpUserHandler);
router.post("/auth/signin", signInUserHandler);

export default router;
