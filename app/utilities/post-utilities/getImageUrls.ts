import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getImagesUrls(imageKey: string) {
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION || "eu-north-1",
  });

  const s3Params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET || "onlyfans-with-actual-fans",
    Key: imageKey,
  };

  const command = new GetObjectCommand(s3Params);

  const signedUrl = await getSignedUrl(s3, command);

  return signedUrl;
}
