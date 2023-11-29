import React from "react";
import Link from "next/link";
import CreatePost from "./components/shared/CreatePost";

export default function Home() {
  return (
    <main className="border-x w-full xl:w-1/3">
      <h1 className="text-lg px-6 py-4 border-b font-medium">HOME</h1>
      <Link
        href={"/create-post"}
        className="focus:outline-1 focus:outline-onlyfans-light-blue"
      >
        <CreatePost />
      </Link>
    </main>
  );
}
