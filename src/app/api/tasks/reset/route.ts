import { prismaClient } from "@/db/prisma-client";

export async function POST(request: Request) {
  const body = JSON.parse(await request.text());

  await prismaClient.user.update({
    where: { Id: body.userId },
    data: {
      taskStartTime: new Date(),
    },
  });

  await prismaClient.task.deleteMany({
    where: {
      User: {
        Id: body.userId,
      },
    },
  });

  return Response.json(null);
}
