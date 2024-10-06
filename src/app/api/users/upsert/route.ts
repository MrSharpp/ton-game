import { prismaClient } from "@/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = JSON.parse(await request.text());
  const referId = request.nextUrl.searchParams.get("referId");

  let user = await prismaClient.user.findFirst({ where: { tgId: body.id } });

  if (!!user) return NextResponse.json(user, { status: 200 });

  user = await prismaClient.user.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      tgId: body.id,
      username: body.username,
    },
  });

  if (!!referId && !isNaN(+referId)) {
    await prismaClient.friend.create({
      data: {
        Friend: { connect: { Id: +referId } },
        User: { connect: { Id: user.Id } },
      },
    });
  }

  return NextResponse.json(user, { status: 201 });
}
