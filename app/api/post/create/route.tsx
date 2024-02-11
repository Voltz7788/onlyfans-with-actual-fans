import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const postData = {
    text: data.get("text") as string,
    images: data.getAll("image"),
    video: data.get("video") as string,
  };

  const userEmail = data.get("userEmail") as string;

  const user = await prisma?.user.findUnique({ where: { email: userEmail } });

  if (!user) {
    return new NextResponse(null, {
      status: 400,
      statusText: "No user",
    });
  }

  await prisma?.post.create({
    data: {
      userId: user.id,
      text: postData.text,
      numOfLikes: 0,
    },
  });

  return new NextResponse(null, {
    status: 200,
    statusText: "Post created",
  });
}
