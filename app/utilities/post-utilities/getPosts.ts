import prisma from "@/prisma/prismaGlobal";
import { getPostDate } from "./getPostDate";

export async function getPosts(userEmail: string) {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  const posts = (
    await prisma.post.findMany({ where: { userId: user?.id } })
  ).reverse();

  const formattedPosts = posts.map((post) => ({
    ...post,
    timePosted: getPostDate(post.timePosted),
  }));

  return { formattedPosts, user };
}
