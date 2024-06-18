import { handleServerError } from "../exceptions/server.exception.js";
import { handleZodError } from "../exceptions/zod.exception.js";
import { NotFoundError } from "../exceptions/client.exception.js";
import {
    editChatRoomById,
    getAllChatRooms,
    getAllChatRoomsByUserId,
    getChatRoomById,
    insertChatRoom,
    removeChatRoomById,
} from "../service/chat-rooms.service.js";
import {
    EditChatRoomSchema,
    InsertChatRoomSchema,
} from "../schema/chat-rooms.schema.js";

export const getAllChatRoomsHandler = async (req, res) => {
    try {
        const userId = req.query.userId;

        let chatRooms;
        if (userId) {
            chatRooms = await getAllChatRoomsByUserId(userId);
        } else {
            chatRooms = await getAllChatRooms();
        }

        res.status(200).send({
            status: "success",
            message: "Get all chat room profile user",
            data: {
                chatRooms,
            },
        });
    } catch (error) {
        console.log(error);
        handleServerError(error, res);
    }
};

export const insertChatRoomHandler = async (req, res) => {
    try {
        const validateData = InsertChatRoomSchema.parse(req.body);

        const newChatRoomData = await insertChatRoom(validateData);

        res.status(201).send({
            status: "success",
            message: "Chat room created successfully",
            data: {
                id: newChatRoomData.id,
            },
        });
    } catch (error) {
        try {
            handleZodError(error, res);
        } catch (err) {
            handleServerError(err, res);
        }
    }
};

export const getChatRoomByIdHandler = async (req, res) => {
    try {
        const chatRoomId = req.params.chatRoomId;
        const chatRoom = await getChatRoomById(chatRoomId, res);

        res.status(200).send({
            status: "success",
            message: "Get chat room data by id",
            data: {
                chatRoom,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};

export const editChatRoomByIdHandler = async (req, res) => {
    try {
        const chatRoomId = req.params.chatRoomId;
        const validateData = EditChatRoomSchema.parse(req.body);

        const newChatRoomData = await editChatRoomById(
            chatRoomId,
            validateData,
            res
        );

        res.status(200).send({
            status: "success",
            message: "Chat room updated successfully",
            data: {
                id: newChatRoomData.id,
            },
        });
    } catch (error) {
        try {
            handleZodError(error, res);
        } catch (err) {
            if (err instanceof NotFoundError) {
                return;
            }
            handleServerError(err, res);
        }
    }
};

export const removeChatRoomByIdHandler = async (req, res) => {
    try {
        const chatRoomId = req.params.chatRoomId;
        await removeChatRoomById(chatRoomId, res);

        res.status(200).send({
            status: "success",
            message: "Chat room deleted successfully",
            data: {
                id: chatRoomId,
            },
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
        handleServerError(error, res);
    }
};