/*
  Warnings:

  - Made the column `name` on table `Nasin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
-- ALTER TABLE "Nasin" ALTER COLUMN "name" SET NOT NULL,
-- ALTER COLUMN "name" SET DEFAULT 'nasin mi';

-- simply add the default value to the existing rows
UPDATE "Nasin" SET "name" = 'nasin mi' WHERE "name" IS NULL;
-- then make the column required
ALTER TABLE "Nasin" ALTER COLUMN "name" SET NOT NULL;
