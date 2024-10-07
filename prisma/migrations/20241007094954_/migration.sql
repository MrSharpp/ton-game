/*
  Warnings:

  - You are about to drop the column `time` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "time",
ADD COLUMN     "completeTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
