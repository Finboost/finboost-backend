import express from "express";
import { refreshTokenHandler } from "../../controller/tokens.controller.js";

const router = express.Router();

router.get("/token/refresh", refreshTokenHandler);

export default router;
