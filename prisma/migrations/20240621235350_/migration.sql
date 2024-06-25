-- DropForeignKey
ALTER TABLE `ReservationHisory` DROP FOREIGN KEY `ReservationHisory_spotId_fkey`;

-- AddForeignKey
ALTER TABLE `ReservationHisory` ADD CONSTRAINT `ReservationHisory_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `Spot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
