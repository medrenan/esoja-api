-- CreateEnum
CREATE TYPE "enumCultiveStatus" AS ENUM ('pending', 'inProduction', 'finished');

-- AlterTable
ALTER TABLE "cultives" ADD COLUMN     "status" "enumCultiveStatus" NOT NULL DEFAULT E'pending',
ALTER COLUMN "metersBetweenPlants" SET DATA TYPE DOUBLE PRECISION;
