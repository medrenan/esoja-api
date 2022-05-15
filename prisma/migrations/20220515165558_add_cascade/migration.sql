-- DropForeignKey
ALTER TABLE "cultiveCoordinates" DROP CONSTRAINT "cultiveCoordinates_cultiveId_fkey";

-- DropForeignKey
ALTER TABLE "cultiveSamples" DROP CONSTRAINT "cultiveSamples_cultiveId_fkey";

-- DropForeignKey
ALTER TABLE "cultives" DROP CONSTRAINT "cultives_propertyId_fkey";

-- AddForeignKey
ALTER TABLE "cultives" ADD CONSTRAINT "cultives_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cultiveCoordinates" ADD CONSTRAINT "cultiveCoordinates_cultiveId_fkey" FOREIGN KEY ("cultiveId") REFERENCES "cultives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cultiveSamples" ADD CONSTRAINT "cultiveSamples_cultiveId_fkey" FOREIGN KEY ("cultiveId") REFERENCES "cultives"("id") ON DELETE CASCADE ON UPDATE CASCADE;
