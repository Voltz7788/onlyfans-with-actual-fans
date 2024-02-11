import prisma from "@/prisma/prismaGlobal";

export async function getPosts(userEmail: string) {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  const posts = (
    await prisma.post.findMany({ where: { userId: user?.id } })
  ).reverse();

  return { posts, user };
}
