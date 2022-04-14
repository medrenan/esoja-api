/*
  Warnings:

  - You are about to drop the column `areaCoordinates` on the `cultives` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cultives" DROP COLUMN "areaCoordinates";

-- CreateTable
CREATE TABLE "cultiveCoordinates" (
    "id" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "cultiveId" TEXT NOT NULL,

    CONSTRAINT "cultiveCoordinates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cultiveCoordinates" ADD CONSTRAINT "cultiveCoordinates_cultiveId_fkey" FOREIGN KEY ("cultiveId") REFERENCES "cultives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
