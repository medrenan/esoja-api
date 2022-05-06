-- CreateEnum
CREATE TYPE "enumUserRoles" AS ENUM ('owner', 'admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "enumUserRoles" NOT NULL DEFAULT E'owner',
ALTER COLUMN "picture" DROP NOT NULL;

UPDATE users SET role = 'admin' WHERE id ='fb1191a3-fc24-4fa4-9769-c9e205089057';