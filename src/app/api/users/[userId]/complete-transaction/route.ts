import { prismaClient } from "@/db/prisma-client";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: any) {
  const userId = params.userId;

  await prismaClient.user.update({
    where: { Id: +userId },
    data: { transactionDone: true },
  });

  return Response.json(null);
}
