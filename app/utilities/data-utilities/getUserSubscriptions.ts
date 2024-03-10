import prisma from "@/prisma/prismaGlobal";

export default async function getUserSubscriptions({
  email,
}: {
  email: string;
}) {
  const allSubscriptions = await prisma.user.findMany({
    where: { followedBy: { some: { email } } },
  });

  return allSubscriptions;
}
