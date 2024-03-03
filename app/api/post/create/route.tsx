import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";
import { v4 as uuidv4 } from "uuid";
import { generatePreSignedPutUrl } from "@/app/libs/aws/getPresignedUrls";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const postData = {
    text: data.get("text") as string,
    image: data.getAll("image") as File[],
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

  const imageKeys = [];

  if (postData.image.length > 0) {
    const fileExtension = postData.image[0].name
      .split(".")
      .pop()
      ?.toLowerCase();
    imageKeys.push(`${uuidv4()}.${fileExtension}`);
  }

  const signedPutUrl = await generatePreSignedPutUrl(imageKeys[0]);

  await prisma?.post.create({
    data: {
      userId: user.id,
      text: postData.text,
      images: imageKeys,
      numOfLikes: 0,
    },
  });

  return NextResponse.json({ signedPutUrl });
}
