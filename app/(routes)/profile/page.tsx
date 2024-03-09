import React from "react";
import TopNav from "@/app/components/shared/TopNav";
import { auth } from "../../utilities/getServerSessionHelper";
import { redirect } from "next/navigation";
import ProfileHeader from "@/app/components/profile-page/ProfileHeader";
import { getCurrentUsersPosts } from "@/app/utilities/post-utilities/getCurrentUsersPosts";
import ProfilePostsContainer from "@/app/components/profile-page/ProfilePostsContainer";

const demoPosts: any[] = [];

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { currentUsersPosts } = await getCurrentUsersPosts(
    session.user?.email!
  );

  return (
    <main className="border-x w-full xl:w-1/3 min-h-screen">
      <TopNav pageTitle="Profile" session={session} />
      <ProfileHeader session={session} />
      <ProfilePostsContainer posts={currentUsersPosts} />
    </main>
  );
}
