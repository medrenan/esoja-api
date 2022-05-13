/*
  Warnings:

  - Added the required column `cropYear` to the `cultives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cultives" ADD COLUMN     "cropYear" TEXT NOT NULL;
ALTER TABLE "cultives" ADD COLUMN     "plantingDate" TEXT NOT NULL;
