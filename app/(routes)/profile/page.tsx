import React from "react";
import TopNav from "@/app/components/shared/TopNav";
import { auth } from "../../utilities/getServerSessionHelper";
import { redirect } from "next/navigation";
import ProfileHeader from "@/app/components/profile-page/ProfileHeader";

const demoPosts: any[] = [];

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="border-x w-full xl:w-1/3 min-h-screen">
      <TopNav pageTitle="Profile" session={session} />
      <ProfileHeader />
      <ProfilePostsContainer posts={demoPosts} />
    </main>
  );
}

type PostsTabProps = {
  postsCount: number;
};

const PostsTab = ({ postsCount }: PostsTabProps) => {
  return (
    <div className="p-3 text-center border-b border-black uppercase">
      <p className="font-medium">
        {postsCount < 1
          ? "No Posts"
          : `${postsCount} ${postsCount === 1 ? "Post" : "Posts"}`}
      </p>
    </div>
  );
};

type ProfilePostsContainer = {
  posts: any[];
};

const ProfilePostsContainer = ({ posts }: ProfilePostsContainer) => {
  return <PostsTab postsCount={posts.length} />;
};
