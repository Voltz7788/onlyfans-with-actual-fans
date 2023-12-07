import React from "react";
import TopNav from "@/app/components/shared/TopNav";
import { auth } from "../../utilities/getServerSessionHelper";
import { redirect } from "next/navigation";
import ProfileHeader from "@/app/components/profile-page/ProfileHeader";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="border-x w-full xl:w-1/3 h-screen">
      <TopNav pageTitle="Profile" session={session} />
      <ProfileHeader />
    </main>
  );
}
