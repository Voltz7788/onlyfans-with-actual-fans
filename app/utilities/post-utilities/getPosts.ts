import prisma from "@/prisma/prismaGlobal";
import { getPostDate } from "./getPostDate";
import { generatePresignedGetUrl } from "@/app/libs/aws/getPresignedUrls";

export async function getPosts() {
  const unformattedPosts = (
    await prisma.post.findMany({ include: { User: true, images: true } })
  ).reverse();

  const formattedPosts = unformattedPosts.map((post) => ({
    ...post,
    timePosted: getPostDate(post.timePosted),
  }));

  formattedPosts.forEach(async (post) => {
    console.log(post.images[0]);
    const imageUrls = await generatePresignedGetUrl(post.images[0]);

    post.images = imageUrls
      ? [
          {
            id: post.images[0].id,
            key: post.images[0].key,
            url: imageUrls,
            postId: post.id,
          },
        ]
      : [];
  });

  return { posts: formattedPosts };
}
