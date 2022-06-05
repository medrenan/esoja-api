-- CreateTable
CREATE TABLE "cultiveProductionAgritec" (
    "id" TEXT NOT NULL,
    "data" JSONB,
    "cultiveId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "cultiveProductionAgritec_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cultiveProductionAgritec" ADD CONSTRAINT "cultiveProductionAgritec_cultiveId_fkey" FOREIGN KEY ("cultiveId") REFERENCES "cultives"("id") ON DELETE CASCADE ON UPDATE CASCADE;
