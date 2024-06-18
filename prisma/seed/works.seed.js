import prisma from "../../db/prisma.js";

const seedWorks = async () => {
    await prisma.work.createMany({
        data: [
            { name: "Pelajar / Mahasiswa" },
            { name: "Ibu Rumah Tangga" },
            { name: "Wirausaha / Wiraswasta" },
            { name: "Pegawai Negeri Sipil" },
            { name: "TNI / Polri" },
            { name: "Pensiunan" },
            { name: "Guru" },
            { name: "Pegawai Swasta" },
            { name: "Pegawai Otoritas / Lembaga / BUMN / BUMD" },
            { name: "Profesional" },
            { name: "Pekerja Seni" },
            { name: "Lainnya" },
        ],
    });
};

export { seedWorks };
