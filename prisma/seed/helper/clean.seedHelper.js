import prisma from "../../../db/prisma.js";

const cleanDatabase = async () => {
    console.log(`\nStart cleaning database...`);
    console.log(`\nDeleting table users`);
    await prisma.user.deleteMany();
    console.log(`\nDeleting table roles`);
    await prisma.role.deleteMany();
    console.log(`\nDeleting table works`);
    await prisma.work.deleteMany();
    console.log(`\nDeleting table educations`);
    await prisma.education.deleteMany();
};

export { cleanDatabase };
