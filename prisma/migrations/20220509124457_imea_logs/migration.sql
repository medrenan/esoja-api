-- CreateEnum
CREATE TYPE "ImeaLogsTypes" AS ENUM ('main');

-- CreateTable
CREATE TABLE "imeaLogs" (
    "id" TEXT NOT NULL,
    "data" JSONB,
    "type" "ImeaLogsTypes" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "imeaLogs_pkey" PRIMARY KEY ("id")
);
