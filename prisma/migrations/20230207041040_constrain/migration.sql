/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Nasin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Nasin_name_userId_key" ON "Nasin"("name", "userId");
