import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";
import { auth } from "@/app/utilities/getServerSessionHelper";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const postId = data.get("postId") as string;

  await prisma.post.delete({ where: { id: postId } });

  return new NextResponse(null, {
    status: 200,
    statusText: "Post deleted",
  });
}
