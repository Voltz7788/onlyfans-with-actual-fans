import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";
import { S3, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

  const imageUrls = await uploadDataToS3(postData.image);
  console.log(imageUrls);

  await prisma?.post.create({
    data: {
      userId: user.id,
      text: postData.text,
      images: imageUrls,
      numOfLikes: 0,
    },
  });

  return new NextResponse(null, {
    status: 200,
    statusText: "Post created",
  });
}

async function uploadDataToS3(images: File[]) {
  const region = process.env.NEXT_PUBLIC_AWS_REGION || "eu-north-1";

  const s3Client = new S3({
    region,
  });
  const bucket =
    process.env.NEXT_PUBLIC_AWS_BUCKET || "onlyfans-with-actual-fans";

  const imageUrls: string[] = [];

  const key = `${uuidv4()}-${images[0].name}`;

  const formattedImage = Buffer.from(await images[0].arrayBuffer());
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: formattedImage,
    })
  );

  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  imageUrls.push(url);

  return imageUrls;
}
