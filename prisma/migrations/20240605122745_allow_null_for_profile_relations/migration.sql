-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_educationId_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_workId_fkey`;

-- AlterTable
ALTER TABLE `profiles` MODIFY `workId` VARCHAR(191) NULL,
    MODIFY `educationId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `works`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_educationId_fkey` FOREIGN KEY (`educationId`) REFERENCES `educations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
