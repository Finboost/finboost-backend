import {
    NotFoundError,
    handleNotFoundError,
} from "../exceptions/client.exception.js";
import {
    createChatRoom,
    deleteChatRoomById,
    findChatRoomById,
    findChatRooms,
    findChatRoomsByUserId,
    updateChatRoomById,
} from "../repository/chat-rooms.repository.js";

export const getAllChatRooms = async () => {
    const chatRooms = await findChatRooms();

    return chatRooms;
};

export const getAllChatRoomsByUserId = async (userId) => {
    const chatRooms = await findChatRoomsByUserId(userId);

    return chatRooms;
};

export const insertChatRoom = async (newChatRoomData) => {
    const newChatRoom = await createChatRoom(newChatRoomData);

    return newChatRoom;
};

export const getChatRoomById = async (chatRoomId, res) => {
    const chatRoom = await findChatRoomById(chatRoomId);

    if (!chatRoom) {
        handleNotFoundError("Chat Room not found", res);
    }

    return chatRoom;
};

export const editChatRoomById = async (chatRoomId, newChatRoomData, res) => {
    await getChatRoomById(chatRoomId, res);
    const chatRoom = await updateChatRoomById(chatRoomId, newChatRoomData);

    return chatRoom;
};

export const removeChatRoomById = async (chatRoomId, res) => {
    await getChatRoomById(chatRoomId, res);
    await deleteChatRoomById(chatRoomId);
};