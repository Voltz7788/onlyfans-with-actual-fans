import prisma from "@/prisma/prismaGlobal";
import { getPostDate } from "./getPostDate";
import { generatePresignedGetUrl } from "@/app/libs/aws/getPresignedUrls";

export async function getPosts() {
  const unformattedPosts = (
    await prisma.post.findMany({ include: { User: true } })
  ).reverse();

  const formattedPosts = unformattedPosts.map((post) => ({
    ...post,
    timePosted: getPostDate(post.timePosted),
  }));

  formattedPosts.forEach(async (post) => {
    const imageUrls = await generatePresignedGetUrl(post.images[0]);

    post.images = imageUrls ? [imageUrls] : [];
  });

  return { posts: formattedPosts };
}
