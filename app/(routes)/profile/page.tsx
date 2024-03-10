import React from "react";
import TopNav from "@/app/components/shared/TopNav";
import { auth } from "../../utilities/getServerSessionHelper";
import { redirect } from "next/navigation";
import ProfileHeader from "@/app/components/profile-page/ProfileHeader";
import { getSingleUsersPosts } from "@/app/utilities/post-utilities/getSingleUsersPosts";
import ProfilePostsContainer from "@/app/components/profile-page/ProfilePostsContainer";
import { CustomSession } from "@/@types/types";

export default async function ProfilePage() {
  const session = (await auth()) as CustomSession;

  if (!session) {
    redirect("/login");
  }

  const { currentUsersPosts } = await getSingleUsersPosts(session.user?.email!);

  return (
    <main className="border-x w-full xl:w-1/3 min-h-screen">
      <TopNav pageTitle="Profile" user={session.user!} />
      <ProfileHeader user={session.user!} />
      <ProfilePostsContainer posts={currentUsersPosts} />
    </main>
  );
}
