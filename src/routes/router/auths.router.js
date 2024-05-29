import express from "express";
import { signUpUserHandler } from "../../controller/auths.controller.js";

const router = express.Router();

router.post("/auth/signup", signUpUserHandler);

export default router;
