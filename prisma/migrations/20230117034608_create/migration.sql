-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "discordId" BIGINT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nasin" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,

    CONSTRAINT "Nasin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nimi" (
    "id" SERIAL NOT NULL,
    "nimi" TEXT NOT NULL,
    "commentary" TEXT NOT NULL,
    "nasinId" INTEGER,

    CONSTRAINT "Nimi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_url_key" ON "User"("url");

-- CreateIndex
CREATE INDEX "User_url_idx" ON "User"("url");

-- AddForeignKey
ALTER TABLE "Nasin" ADD CONSTRAINT "Nasin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nimi" ADD CONSTRAINT "Nimi_nasinId_fkey" FOREIGN KEY ("nasinId") REFERENCES "Nasin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
