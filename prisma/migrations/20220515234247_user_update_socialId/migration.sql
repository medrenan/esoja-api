/*
  Warnings:

  - A unique constraint covering the columns `[socialId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "socialId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_socialId_key" ON "users"("socialId");
