-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "transactionDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "walletConnected" BOOLEAN NOT NULL DEFAULT false;
