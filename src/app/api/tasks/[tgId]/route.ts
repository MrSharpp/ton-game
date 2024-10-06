import { prismaClient } from "@/db/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const tasks = await prismaClient.task.findMany({
    where: {
      User: {
        tgId: +params?.tgId,
      },
    },
  });

  return NextResponse.json(tasks);
}
