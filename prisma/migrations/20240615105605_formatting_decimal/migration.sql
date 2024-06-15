/*
  Warnings:

  - You are about to alter the column `incomePerMonth` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(25,2)`.
  - You are about to alter the column `totalDebt` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(25,2)`.
  - You are about to alter the column `totalSaving` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(25,2)`.

*/
-- AlterTable
ALTER TABLE `profiles` MODIFY `incomePerMonth` DECIMAL(25, 2) NULL,
    MODIFY `totalDebt` DECIMAL(25, 2) NULL,
    MODIFY `totalSaving` DECIMAL(25, 2) NULL;
