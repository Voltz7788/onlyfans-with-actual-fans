import CreatePost from "@/app/components/shared/CreatePost";
import TopNav from "@/app/components/shared/TopNav";
import React from "react";

export default function CreatePostPage() {
  return (
    <main className="border-x w-full xl:w-1/3">
      <TopNav pageTitle="New Post" />
      <CreatePost />
    </main>
  );
}
