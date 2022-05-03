-- CreateEnum
CREATE TYPE "enumUserRoles" AS ENUM ('owner', 'admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "enumUserRoles" NOT NULL DEFAULT E'owner',
ALTER COLUMN "picture" DROP NOT NULL;
