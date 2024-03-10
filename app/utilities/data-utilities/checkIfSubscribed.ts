import prisma from "@/prisma/prismaGlobal";

export default async function checkIfSubscribed({
  currentUserEmail,
  followedUserEmail,
}: {
  currentUserEmail: string;
  followedUserEmail: string;
}) {
  const followedUser = await prisma.user.findUnique({
    where: {
      email: followedUserEmail,
      followedBy: { some: { email: currentUserEmail } },
    },
  });

  return followedUser ? true : false;
}
