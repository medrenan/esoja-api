/*
  Warnings:

  - The values [main] on the enum `ImeaLogsTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ImeaLogsTypes_new" AS ENUM ('conventionalSeed', 'availableSoybeanPack');
ALTER TABLE "imeaLogs" ALTER COLUMN "type" TYPE "ImeaLogsTypes_new" USING ("type"::text::"ImeaLogsTypes_new");
ALTER TYPE "ImeaLogsTypes" RENAME TO "ImeaLogsTypes_old";
ALTER TYPE "ImeaLogsTypes_new" RENAME TO "ImeaLogsTypes";
DROP TYPE "ImeaLogsTypes_old";
COMMIT;
