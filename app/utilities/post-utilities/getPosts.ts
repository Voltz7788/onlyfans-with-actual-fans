import prisma from "@/prisma/prismaGlobal";
import { getPostDate } from "./getPostDate";

export async function getPosts(userEmail: string) {
  // const user = await prisma.user.findUnique({ where: { email: userEmail } });

  // const unformattedPosts = (
  //   await prisma.post.findMany({ where: { userId: user?.id } })
  // ).reverse();

  const unformattedPosts = (
    await prisma.post.findMany({ include: { User: true } })
  ).reverse();

  const formattedPosts = unformattedPosts.map((post) => ({
    ...post,
    timePosted: getPostDate(post.timePosted),
  }));

  return { posts: formattedPosts };
}
