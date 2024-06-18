import prisma from "../../db/prisma.js";

export const findChatRooms = async () => {
    const chatRooms = await prisma.chatRoom.findMany({
        select: {
            id: true,
            type: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            expertId: true,
            expert: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            createdAt: true,
            updatedAt: true,
        }
    });

    return chatRooms;
};

export const findChatRoomsByUserId = async (userId) => {
    const chatRooms = await prisma.chatRoom.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            type: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            expertId: true,
            expert: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            createdAt: true,
            updatedAt: true,
        },
    });

    return chatRooms;
};

export const createChatRoom = async (newChatRoomData) => {
    const newChatRoom = await prisma.chatRoom.create({
        data: newChatRoomData,
    });

    return newChatRoom;
};

export const findChatRoomById = async (chatRoomId) => {
    const chatRoom = await prisma.chatRoom.findUnique({
        where: {
            id: chatRoomId,
        },
        select: {
            id: true,
            type: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            expertId: true,
            expert: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            createdAt: true,
            updatedAt: true,
        },
    });

    return chatRoom;
};

export const updateChatRoomById = async (chatRoomId, newChatRoomData) => {
    console.log(chatRoomId, newChatRoomData);
    const chatRoom = await prisma.chatRoom.update({
        where: {
            id: chatRoomId,
        },
        data: newChatRoomData,
    });

    return chatRoom;
};

export const deleteChatRoomById = async (chatRoomId) => {
    const chatRoom = await prisma.chatRoom.delete({
        where: {
            id: chatRoomId,
        },
    });

    return chatRoom;
};