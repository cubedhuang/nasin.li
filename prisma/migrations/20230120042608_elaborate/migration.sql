/*
  Warnings:

  - Added the required column `definition` to the `Nimi` table without a default value. This is not possible if the table is not empty.
  - Made the column `nasinId` on table `Nimi` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Nimi" DROP CONSTRAINT "Nimi_nasinId_fkey";

-- AlterTable
ALTER TABLE "Nimi" ADD COLUMN     "definition" TEXT NOT NULL,
ALTER COLUMN "commentary" DROP NOT NULL,
ALTER COLUMN "nasinId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Nimi" ADD CONSTRAINT "Nimi_nasinId_fkey" FOREIGN KEY ("nasinId") REFERENCES "Nasin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
