import prisma from "../../../db/prisma.js";

const cleanDatabase = async () => {
    console.log(`\nStart cleaning database...`);
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    console.log(`\nDeleting table roles`);
};

export { cleanDatabase };
