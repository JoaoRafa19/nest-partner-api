-- DropForeignKey
ALTER TABLE `Spot` DROP FOREIGN KEY `Spot_eventId_fkey`;

-- AddForeignKey
ALTER TABLE `Spot` ADD CONSTRAINT `Spot_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
