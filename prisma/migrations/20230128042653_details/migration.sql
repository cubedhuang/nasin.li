/*
  Warnings:

  - Made the column `commentary` on table `Nasin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Nasin" ALTER COLUMN "commentary" SET NOT NULL;

-- CreateTable
CREATE TABLE "NasinDetails" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "nasinId" INTEGER NOT NULL,

    CONSTRAINT "NasinDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NasinDetails_nasinId_key" ON "NasinDetails"("nasinId");

-- CreateIndex
CREATE INDEX "NasinDetails_nasinId_idx" ON "NasinDetails"("nasinId");

-- CreateIndex
CREATE UNIQUE INDEX "NasinDetails_title_nasinId_key" ON "NasinDetails"("title", "nasinId");

-- AddForeignKey
ALTER TABLE "NasinDetails" ADD CONSTRAINT "NasinDetails_nasinId_fkey" FOREIGN KEY ("nasinId") REFERENCES "Nasin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
