import prisma from "../../db/prisma.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { getPublicUrl } from "../../src/utils/bucket.util.js";

const seedUsers = async (count) => {
    try {
        const roles = await prisma.role.findMany();

        if (roles.length === 0) {
            throw new Error("No roles found in database");
        }

        for (let i = 0; i < count; i++) {
            const randomRole = roles[Math.floor(Math.random() * roles.length)];
            const roleId = randomRole.id;

            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash("12345", salt);

            const fullName = faker.person.fullName();
            const email = faker.internet.email();
            const gender = faker.helpers.arrayElement([
                "Laki_laki",
                "Perempuan",
            ]);
            const age = faker.datatype.number({ min: 18, max: 80 });
            const phoneNumber = faker.phone.number();
            const password = hashPassword;
            const avatarDefault =
                gender === "Laki_laki"
                    ? getPublicUrl("male.png")
                    : getPublicUrl("female.png");

            await prisma.user.create({
                data: {
                    fullName,
                    email,
                    gender,
                    age,
                    phoneNumber,
                    password,
                    roleId,
                    profile: {
                        create: {
                            avatar: avatarDefault,
                        },
                    },
                },
            });

            console.log(`${count} users have been seeded successfully`);
        }
    } catch (error) {
        console.error(`Error seeding users: ${error}`);
    }
};

export { seedUsers };
