import prisma from "@/prisma/prismaGlobal";

export default async function verifyUser(username: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  return user;
}
