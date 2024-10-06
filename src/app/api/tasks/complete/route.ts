import { prismaClient } from "@/db/prisma-client";

export async function POST(request: Request) {
  const body = JSON.parse(await request.text());

  await prismaClient.task.create({
    data: {
      hourIndex: body.hour,
      User: {
        connect: {
          Id: body.userId,
        },
      },
    },
  });

  return Response.json(null);
}
