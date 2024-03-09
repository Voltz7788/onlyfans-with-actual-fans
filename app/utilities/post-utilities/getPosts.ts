import prisma from "@/prisma/prismaGlobal";
import { getPostDate } from "./getPostDate";
import { generatePresignedGetUrl } from "@/app/libs/aws/getPresignedUrls";
import formatPostImages from "./formatPostImages";

export async function getPosts() {
  const unformattedPosts = (
    await prisma.post.findMany({ include: { User: true, images: true } })
  ).reverse();

  const timedPosts = unformattedPosts.map((post) => ({
    ...post,
    timePosted: getPostDate(post.timePosted),
  }));

  const formattedPosts = formatPostImages(timedPosts);

  return { posts: formattedPosts };
}
