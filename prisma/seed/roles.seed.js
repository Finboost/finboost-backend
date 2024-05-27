import prisma from "../../db/prisma.js";

const seedRoles = async () => {
    await prisma.role.create({
        data: {
            name: "User",
        },
    });

    await prisma.role.create({
        data: {
            name: "Expert",
        },
    });
};

export { seedRoles };
