import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const currentUsername = data.get("currentUsername") as string;
  const subscribeeUsername = data.get("subscribeeUsername") as string;

  const currentUser = await prisma.user.findUnique({
    where: { username: currentUsername },
  });

  const subscribee = await prisma.user.findUnique({
    where: { username: subscribeeUsername },
  });

  const follow = await prisma.follows.create({
    data: { followedBy: currentUser?.id },
  });
}
