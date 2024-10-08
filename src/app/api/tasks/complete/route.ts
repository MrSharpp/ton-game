import { prismaClient } from "@/db/prisma-client";

export async function POST(request: Request) {
  const body = JSON.parse(await request.text());

  await prismaClient.task.upsert({
    create: {
      taskIndex: body.hour,
      User: {
        connect: {
          Id: body.userId,
        },
      },
    },
    where: {
      userId_taskIndex: {
        userId: body.userId,
        taskIndex: body.hour,
      },
    },
    update: {},
  });

  await prismaClient.user.update({
    where: { Id: body.userId },
    data: { taskStreaks: { increment: 1 }, lastTaskCompleted: new Date() },
  });

  return Response.json(null);
}
