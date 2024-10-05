import { prismaClient } from "@/db/prisma-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = JSON.parse(await request.text());

  const user = await prismaClient.user.upsert({
    where: { tgId: body.id },
    create: {
      firstName: body.firstName,
      lastName: body.lastName,
      tgId: body.id,
    },
    update: {},
  });

  return NextResponse.json(user, { status: 201 });
}
