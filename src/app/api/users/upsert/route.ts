import { prismaClient } from "@/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = JSON.parse(await request.text());
  const referId = request.nextUrl.searchParams.get("referId");

  const user = await prismaClient.user.upsert({
    where: { tgId: body.id },
    create: {
      firstName: body.firstName,
      lastName: body.lastName,
      tgId: body.id,
      username: body.username,
      ...(!!referId && {
        Friends: {
          connect: {
            User: {
              Id: +referId,
            },
          },
        },
      }),
    },
    update: {},
  });

  return NextResponse.json(user, { status: 201 });
}
