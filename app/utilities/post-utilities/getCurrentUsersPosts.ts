import prisma from "@/prisma/prismaGlobal";
import { getPostDate } from "./getPostDate";
import formatPostImages from "./formatPostImages";

export async function getCurrentUsersPosts(userEmail: string) {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  const unformattedPosts = (
    await prisma.post.findMany({
      where: { userId: user?.id },
      include: { User: true, images: true },
    })
  ).reverse();

  const timedPosts = unformattedPosts.map((post) => ({
    ...post,
    timePosted: getPostDate(post.timePosted),
  }));

  const formattedPosts = formatPostImages(timedPosts);

  return { posts: formattedPosts };
}
