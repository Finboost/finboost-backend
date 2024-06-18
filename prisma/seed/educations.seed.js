import prisma from "../../db/prisma.js";

const seedEducations = async () => {
    await prisma.education.createMany({
        data: [
            { name: "SD" },
            { name: "SMP / Sederajat" },
            { name: "SMA / Sederajat" },
            { name: "Diploma" },
            { name: "S1" },
            { name: "S2" },
            { name: "S3" },
            { name: "Lainnya" },
        ],
    });
};

export { seedEducations };
