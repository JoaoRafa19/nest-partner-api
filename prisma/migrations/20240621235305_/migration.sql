-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_spotId_fkey`;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `Spot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
