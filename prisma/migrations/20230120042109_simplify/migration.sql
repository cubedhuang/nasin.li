/*
  Warnings:

  - You are about to drop the column `isDefault` on the `Nasin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Nasin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Nasin" DROP COLUMN "isDefault";

-- CreateIndex
CREATE UNIQUE INDEX "Nasin_userId_key" ON "Nasin"("userId");
