import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const post = {
    id: data.get("postId") as string,
    updatedText: data.get("updatedText") as string,
  };

  await prisma.post.update({
    where: { id: post.id },
    data: { text: post.updatedText },
  });

  return new NextResponse(null, {
    status: 200,
    statusText: "Post updated",
  });
}
