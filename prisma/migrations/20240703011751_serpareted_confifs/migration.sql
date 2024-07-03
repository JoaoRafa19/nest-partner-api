-- DropForeignKey
ALTER TABLE `ReservationHisory` DROP FOREIGN KEY `ReservationHisory_spotId_fkey`;

-- DropForeignKey
ALTER TABLE `Spot` DROP FOREIGN KEY `Spot_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_spotId_fkey`;

-- AddForeignKey
ALTER TABLE `Spot` ADD CONSTRAINT `Spot_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `Spot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationHisory` ADD CONSTRAINT `ReservationHisory_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `Spot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
