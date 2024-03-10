import TopNav from "@/app/components/shared/TopNav";
import ProfileHeader from "@/app/components/profile-page/ProfileHeader";
import ProfilePostsContainer from "@/app/components/profile-page/ProfilePostsContainer";
import { auth } from "@/app/utilities/getServerSessionHelper";
import { notFound, redirect } from "next/navigation";
import { getSingleUsersPosts } from "@/app/utilities/post-utilities/getSingleUsersPosts";
import verifyUser from "@/app/utilities/data-utilities/verifyUser";
import ProfileSubscribe from "@/app/components/profile-page/ProfileSubscribe";
import { CustomSession } from "@/@types/types";
import checkIfSubscribed from "@/app/utilities/data-utilities/checkIfSubscribed";

export default async function Page({
  params,
}: {
  params: { userSlug: string };
}) {
  const session: CustomSession = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await verifyUser(params.userSlug);

  if (!user) {
    return notFound();
  }

  if (user.email === session.user?.email) {
    redirect("/profile");
  }

  const { currentUsersPosts: usersPosts } = await getSingleUsersPosts(
    user.email!
  );

  const isSubscribedDB = await checkIfSubscribed({
    currentUserEmail: session.user?.email!,
    followedUserEmail: user.email!,
  });

  return (
    <main className="border-x w-full xl:w-1/3 min-h-screen">
      <TopNav pageTitle="Profile" user={user} />
      <ProfileHeader user={user} />
      <ProfileSubscribe
        currentUsername={session.user?.username!}
        isSubscribedDB={isSubscribedDB}
      />
      <ProfilePostsContainer posts={usersPosts} />
    </main>
  );
}
