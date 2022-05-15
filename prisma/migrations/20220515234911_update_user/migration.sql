-- CreateEnum
CREATE TYPE "enumProviderUser" AS ENUM ('google', 'facebook');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "provider" "enumProviderUser";
