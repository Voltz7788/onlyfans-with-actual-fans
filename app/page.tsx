import React from "react";
import Link from "next/link";
import CreatePost from "./components/shared/CreatePost";
import TopNav from "./components/shared/TopNav";
import Post from "./components/home-page/posts/Post";

export default function Home() {
  return (
    <main className="relative border-x w-full xl:w-1/3 h-[2000px]">
      <TopNav pageTitle="home" />
      <div className="mt-16">
        <Link
          href={"/create-post"}
          className="focus:outline-1 focus:outline-onlyfans-light-blue"
        >
          <CreatePost />
        </Link>
        <div className="bg-gray-100 h-1.5 w-full"></div>
        <Post>
          <Post.Header
            username={"yannismadu"}
            handle={"@yannismadu"}
            timePosted={"2 hours ago"}
          />
          <Post.Text postText={"This is some text."} />
          <Post.Image />
          <Post.Video />
          <Post.Buttons />
        </Post>
      </div>
    </main>
  );
}
