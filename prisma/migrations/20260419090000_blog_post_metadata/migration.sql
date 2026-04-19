ALTER TABLE `Post`
    ADD COLUMN `featuredImgAlt` VARCHAR(191) NULL,
    ADD COLUMN `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `readTimeMinutes` INTEGER NULL;

UPDATE `Post`
SET `publishedAt` = `createdAt`
WHERE `publishedAt` IS NULL;
