/*
  Warnings:

  - You are about to drop the column `description` on the `Nasin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nimi,nasinId]` on the table `Nimi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Nimi` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NimiType" AS ENUM ('PARTICLE', 'CONTENT', 'PREPOSITION', 'PREVERB', 'NUMBER', 'OTHER');

-- AlterTable
ALTER TABLE "Nasin" DROP COLUMN "description",
ADD COLUMN     "commentary" TEXT;

-- AlterTable
ALTER TABLE "Nimi" ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "type" "NimiType"[];

-- CreateIndex
CREATE INDEX "Nasin_userId_idx" ON "Nasin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Nimi_nimi_nasinId_key" ON "Nimi"("nimi", "nasinId");
