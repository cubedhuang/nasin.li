/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Nasin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nasin" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_url_key" ON "User"("url");

-- CreateIndex
CREATE INDEX "User_url_idx" ON "User"("url");

-- AddForeignKey
ALTER TABLE "Nasin" ADD CONSTRAINT "Nasin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
