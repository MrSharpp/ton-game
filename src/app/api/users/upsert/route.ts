import {
  FEN_TASK_ADDITION_NUMBER,
  FRIENDS_STREAK_THRESHHOLD,
} from "@/app/constants";
import { prismaClient } from "@/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

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
      refererId: referId,
    },
  });

  if (!!referId && !isNaN(+referId)) {
    await prismaClient.friend.create({
      data: {
        Friend: { connect: { Id: user.Id } },
        User: { connect: { Id: +referId } },
      },
    });

    await prismaClient.user.update({
      where: { Id: +referId },
      data: { friendStreaks: { increment: FEN_TASK_ADDITION_NUMBER } },
    });
  }

  return NextResponse.json(user, { status: 201 });
}
