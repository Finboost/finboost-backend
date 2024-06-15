-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `incomePerMonth` INTEGER NULL,
    ADD COLUMN `insurance` ENUM('Saham', 'Reksadana', 'Obligasi', 'Emas', 'Cryptocurrency') NULL,
    ADD COLUMN `investment` ENUM('Saham', 'Reksadana', 'Obligasi', 'Emas', 'Cryptocurrency') NULL,
    ADD COLUMN `totalDebt` INTEGER NULL,
    ADD COLUMN `totalSaving` INTEGER NULL;
