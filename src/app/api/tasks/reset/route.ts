import { prismaClient } from "@/db/prisma-client";

export async function POST(request: Request) {
  const body = JSON.parse(await request.text());

  console.log(body);

  await prismaClient.user.update({
    where: { Id: body.userId },
    data: {
      taskStartTime: new Date(),
      ...(body.completedAll == true && {
        taskStreaks: {
          increment: 1,
        },
      }),
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
