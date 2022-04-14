/*
  Warnings:

  - The primary key for the `cultives` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `properties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `samples` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `name` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cultives" DROP CONSTRAINT "cultives_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_userId_fkey";

-- DropForeignKey
ALTER TABLE "samples" DROP CONSTRAINT "samples_cultiveId_fkey";

-- AlterTable
ALTER TABLE "cultives" DROP CONSTRAINT "cultives_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "propertyId" DROP NOT NULL,
ALTER COLUMN "propertyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "cultives_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "cultives_id_seq";

-- AlterTable
ALTER TABLE "properties" DROP CONSTRAINT "properties_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "properties_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "properties_id_seq";

-- AlterTable
ALTER TABLE "samples" DROP CONSTRAINT "samples_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "cultiveId" DROP NOT NULL,
ALTER COLUMN "cultiveId" SET DATA TYPE TEXT,
ADD CONSTRAINT "samples_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "samples_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cultives" ADD CONSTRAINT "cultives_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "samples" ADD CONSTRAINT "samples_cultiveId_fkey" FOREIGN KEY ("cultiveId") REFERENCES "cultives"("id") ON DELETE SET NULL ON UPDATE CASCADE;
