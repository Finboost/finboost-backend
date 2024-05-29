import express from "express";
import { refreshTokenHandler } from "../../controller/tokens.controller.js";
import { verifyAccessTokenHandler } from "../../middlewares/tokens.middleware.js";

const router = express.Router();

router.get("/token/refresh", verifyAccessTokenHandler, refreshTokenHandler);

export default router;
