/*
  Warnings:

  - You are about to drop the column `metersBetweenPlants` on the `samples` table. All the data in the column will be lost.
  - You are about to drop the column `plantsPerMeter` on the `samples` table. All the data in the column will be lost.
  - Added the required column `metersBetweenPlants` to the `cultives` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plantsPerMeter` to the `cultives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cultives" ADD COLUMN     "metersBetweenPlants" INTEGER NOT NULL,
ADD COLUMN     "plantsPerMeter" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "samples" DROP COLUMN "metersBetweenPlants",
DROP COLUMN "plantsPerMeter";
