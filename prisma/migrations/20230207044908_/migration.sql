/*
  Warnings:

  - A unique constraint covering the columns `[path,userId]` on the table `Nasin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Nasin" ADD COLUMN     "path" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Nasin_path_userId_key" ON "Nasin"("path", "userId");
