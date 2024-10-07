/*
  Warnings:

  - You are about to drop the column `transactionDone` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `walletConnected` on the `Friend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "transactionDone",
DROP COLUMN "walletConnected";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "transactionDone" BOOLEAN NOT NULL DEFAULT false;
