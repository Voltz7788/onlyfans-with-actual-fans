import React from "react";
import Link from "next/link";
import CreatePost from "./components/shared/CreatePost";
import TopNav from "./components/shared/TopNav";

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
      </div>
    </main>
  );
}
