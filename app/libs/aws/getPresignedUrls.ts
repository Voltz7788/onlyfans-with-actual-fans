import {
  S3,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3({
  region: process.env.NEXT_PUBLIC_AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCES_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function generatePresignedGetUrl(image: {
  key: string;
  url: string | null;
}) {
  if (!image) {
    return null;
  }

  const s3Params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET || "onlyfans-with-actual-fans",
    Key: image.key,
  };

  const command = new GetObjectCommand(s3Params);

  const signedUrl = await getSignedUrl(s3Client, command);
  return signedUrl;
}

async function generatePreSignedPutUrl(key: string) {
  if (!key) {
    return null;
  }

  const s3Params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET || "onlyfans-with-actual-fans",
    Key: key,
  };

  const command = new PutObjectCommand(s3Params);

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return signedUrl;
}

async function deleteObjectFromBucket(key: string) {
  const s3Params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET || "onlyfans-with-actual-fans",
    Key: key,
  };

  try {
    const data = await s3Client.send(new DeleteObjectCommand(s3Params));
  } catch (err) {
    console.error(err);
  }
}

export {
  generatePreSignedPutUrl,
  generatePresignedGetUrl,
  deleteObjectFromBucket,
};
