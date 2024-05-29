import prisma from "../../db/prisma.js";

export const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    return user;
};
