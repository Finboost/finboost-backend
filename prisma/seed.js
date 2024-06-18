import prisma from "../db/prisma.js";
import { seedEducations } from "./seed/educations.seed.js";
import { cleanDatabase } from "./seed/helper/clean.seedHelper.js";
import { seedRoles } from "./seed/roles.seed.js";
import { seedUsers } from "./seed/users.seed.js";
import { seedWorks } from "./seed/works.seed.js";

async function main() {
    await cleanDatabase();
    await seedRoles();
    await seedWorks();
    await seedEducations();
    await seedUsers(10);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
