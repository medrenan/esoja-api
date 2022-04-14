/*
  Warnings:

  - You are about to drop the column `cultiveArea` on the `cultives` table. All the data in the column will be lost.
  - You are about to drop the column `cultiveTotalArea` on the `cultives` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `cultives` table. All the data in the column will be lost.
  - You are about to drop the column `hectares` on the `properties` table. All the data in the column will be lost.
  - Added the required column `areaCoordinates` to the `cultives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaTotal` to the `cultives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cultives" DROP COLUMN "cultiveArea",
DROP COLUMN "cultiveTotalArea",
DROP COLUMN "zipcode",
ADD COLUMN     "areaCoordinates" JSONB NOT NULL,
ADD COLUMN     "areaTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "realProduction" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "hectares";
