/*
  Warnings:

  - You are about to drop the `samples` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "samples" DROP CONSTRAINT "samples_cultiveId_fkey";

-- DropTable
DROP TABLE "samples";

-- CreateTable
CREATE TABLE "cultiveSamples" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "grainsPlant1" INTEGER NOT NULL,
    "grainsPlant2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "cultiveId" TEXT,

    CONSTRAINT "cultiveSamples_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cultiveSamples" ADD CONSTRAINT "cultiveSamples_cultiveId_fkey" FOREIGN KEY ("cultiveId") REFERENCES "cultives"("id") ON DELETE SET NULL ON UPDATE CASCADE;
