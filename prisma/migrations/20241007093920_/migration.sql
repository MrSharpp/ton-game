/*
  Warnings:

  - You are about to drop the column `hourIndex` on the `Task` table. All the data in the column will be lost.
  - Added the required column `taskIndex` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "hourIndex",
ADD COLUMN     "taskIndex" INTEGER NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
