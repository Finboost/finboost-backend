-- AlterTable
ALTER TABLE `profiles` MODIFY `avatar` VARCHAR(191) NULL,
    MODIFY `maritalStatus` ENUM('Lajang', 'Menikah', 'Cerai') NULL,
    MODIFY `certifiedStatus` VARCHAR(191) NULL;
