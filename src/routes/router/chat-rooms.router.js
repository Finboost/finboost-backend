import express from "express";
import {
    editChatRoomByIdHandler,
    getAllChatRoomsHandler,
    getChatRoomByIdHandler,
    insertChatRoomHandler,
    removeChatRoomByIdHandler,
} from "../../controller/chat-rooms.controller.js";
import { verifyAccessTokenHandler } from "../../middlewares/tokens.middleware.js";

const router = express.Router();

router.get(
    "/chat-rooms", 
    verifyAccessTokenHandler,
    getAllChatRoomsHandler
);
router.post(
    "/chat-rooms", 
    verifyAccessTokenHandler,
    insertChatRoomHandler
);

router.get(
    "/chat-rooms/:chatRoomId", 
    verifyAccessTokenHandler,
    getChatRoomByIdHandler
);

router.put(
    "/chat-rooms/:chatRoomId", 
    verifyAccessTokenHandler,
    editChatRoomByIdHandler
);

router.delete(
    "/chat-rooms/:chatRoomId", 
    verifyAccessTokenHandler,
    removeChatRoomByIdHandler
);

export default router;