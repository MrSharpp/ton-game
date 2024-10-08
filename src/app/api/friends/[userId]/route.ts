import { prismaClient } from "@/db/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const friends = await prismaClient.friend.findMany({
    where: {
      User: {
        Id: +params.userId,
      },
    },
    include: {
      Friend: true,
    },
  });

  return NextResponse.json(friends);
}
