import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const currentUsername = data.get("currentUsername") as string;
  const subscribeeUsername = data.get("subscribeeUsername") as string;

  await prisma.user.update({
    where: { username: currentUsername },
    data: { following: { connect: { username: subscribeeUsername } } },
  });

  // await prisma.user.update({
  //   where: { username: subscribeeUsername },
  //   data: { followedBy: { connect: { username: currentUsername } } },
  // });

  return new NextResponse();
}
