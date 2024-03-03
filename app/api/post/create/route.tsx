import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";
import { S3, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import mime from "mime";
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

  // const imageUrls =
  //   postData.image.length > 0 ? await uploadDataToS3(postData.image) : [];
  // console.log(postData.image === null);
  // console.log(postData.image);
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

  // return new NextResponse(null, {
  //   status: 200,
  //   statusText: "Post created",
  // });

  return NextResponse.json({ signedPutUrl });
}

async function uploadDataToS3(images: File[]) {
  const region = process.env.NEXT_PUBLIC_AWS_REGION || "eu-north-1";
  console.log("wrong");
  const s3Client = new S3({
    region,
  });
  const bucket =
    process.env.NEXT_PUBLIC_AWS_BUCKET || "onlyfans-with-actual-fans";

  const imageUrls: string[] = [];

  const key = `${uuidv4()}-${images[0].name.replace(/\s+/g, "-")}`;

  const formattedImage = Buffer.from(await images[0].arrayBuffer());
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: formattedImage,
    })
  );

  const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  imageUrls.push(url);

  return imageUrls;
}

async function generatePreSignedPutUrl(key: string) {
  if (!key) {
    return null;
  }

  const s3Params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET || "onlyfans-with-actual-fans",
    Key: key,
  };

  const s3Client = new S3({
    region: process.env.NEXT_PUBLIC_AWS_REGION || "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCES_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new PutObjectCommand(s3Params);

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  console.log(signedUrl);

  return signedUrl;
}
