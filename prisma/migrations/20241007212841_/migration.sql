/*
  Warnings:

  - A unique constraint covering the columns `[userId,taskIndex]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Task_userId_taskIndex_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Task_userId_taskIndex_key" ON "Task"("userId", "taskIndex");
