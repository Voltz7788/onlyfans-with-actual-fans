import CreatePost from "@/app/components/shared/CreatePost";
import TopNav from "@/app/components/shared/TopNav";
import React from "react";

export default function CreatePostPage() {
  return (
    <main className="border-x w-full xl:w-1/3 h-[2000px]">
      <TopNav pageTitle="New Post" />
      <div className="mt-16">
        <CreatePost />
      </div>
    </main>
  );
}
