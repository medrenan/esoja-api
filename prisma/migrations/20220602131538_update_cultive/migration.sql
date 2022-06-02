/*
  Warnings:

  - You are about to drop the column `realProduction` on the `cultives` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cultives" DROP COLUMN "realProduction",
ADD COLUMN     "expectedBagsPerHectares" DOUBLE PRECISION,
ADD COLUMN     "idCultivar" INTEGER;
