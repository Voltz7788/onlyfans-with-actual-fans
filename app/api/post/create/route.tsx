import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const postData = {
    text: data.get("text") as string,
    images: data.getAll("image") as File[],
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

  const imageKeys = await uploadDataToS3(postData.images);

  await prisma?.post.create({
    data: {
      userId: user.id,
      text: postData.text,
      images: imageKeys,
      numOfLikes: 0,
    },
  });

  return new NextResponse(null, {
    status: 200,
    statusText: "Post created",
  });
}

async function uploadDataToS3(images: File[]) {
  const s3Client = new S3({
    region: process.env.NEXT_PUBLIC_AWS_REGION || "eu-north-1",
  });
  const bucket =
    process.env.NEXT_PUBLIC_AWS_BUCKET || "onlyfans-with-actual-fans";

  const imageKeys: string[] = [];

  images.forEach(async (image: File) => {
    const key = `${uuidv4()}-${image.name}`;
    imageKeys.push(key);
    const formattedImage = Buffer.from(await image.arrayBuffer());
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: formattedImage,
      })
    );
  });
  return imageKeys;
}
