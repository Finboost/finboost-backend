import express from "express";
import { verifyAccessTokenHandler } from "../../middlewares/tokens.middleware.js";
import { getGenerativeAiHandler, getSugesstionQuestionHandler } from "../../controller/chat-ai.controller.js";

const router = express.Router();

router.post(
    "/chats/ai/predict", 
    verifyAccessTokenHandler,
    getGenerativeAiHandler
);

router.post(
    "/chats/ai/suggestions",
    verifyAccessTokenHandler,
    getSugesstionQuestionHandler
);

export default router;