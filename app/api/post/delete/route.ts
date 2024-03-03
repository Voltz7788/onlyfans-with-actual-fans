import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";
import { deleteObjectFromBucket } from "@/app/libs/aws/getPresignedUrls";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const postId = data.get("postId") as string;
  const key = data.get("key");

  await prisma.post.delete({ where: { id: postId } });

  if (key) {
    console.log(key);
    deleteObjectFromBucket(key as string);
  }

  return new NextResponse(null, {
    status: 200,
    statusText: "Post deleted",
  });
}
