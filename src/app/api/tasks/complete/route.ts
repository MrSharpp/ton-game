import { prismaClient } from "@/db/prisma-client";

export async function POST(request: Request) {
  const body = JSON.parse(await request.text());

  await prismaClient.task.create({
    data: {
      taskIndex: body.hour,
      User: {
        connect: {
          Id: body.userId,
        },
      },
    },
  });

  await prismaClient.user.update({
    where: { Id: body.userId },
    data: { taskStreaks: { increment: 1 } },
  });

  return Response.json(null);
}
