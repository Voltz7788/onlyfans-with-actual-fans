import React from "react";
import Link from "next/link";
import CreatePost from "../components/shared/CreatePost";
import TopNav from "../components/shared/TopNav";
import Post from "../components/home-page/posts/Post";
import { auth } from "../utilities/getServerSessionHelper";
import { redirect } from "next/navigation";
import defaultAvatar from "../../public/defaultAvatar.png";
import { CustomSession } from "@/@types/types";
import GrayBar from "../components/shared/aesthetic/GrayBar";
import { getPosts } from "../utilities/getPosts";

export default async function Home() {
  const session = (await auth()) as CustomSession;
  const { posts, user } = await getPosts(session?.user?.email!);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="relative border-x w-full xl:w-1/3 h-[2000px] overflow-">
      <TopNav pageTitle="home" />

      <Link
        href={"/create-post"}
        className="focus:outline-1 focus:outline-onlyfans-light-blue"
      >
        <CreatePost session={session} />
      </Link>
      <GrayBar />
      {posts.map((post) => (
        <Post key={post.id}>
          <Post.Header
            name={user?.name!}
            username={user?.username!}
            timePosted={post.timePosted.toString()}
            profilePic={user?.image!}
          />
          <Post.Text postText={post.text} />
          <Post.Image />
          <Post.Video />
          <Post.Buttons isLiked={false} numOfLikes={post.numOfLikes} />
        </Post>
      ))}
      {/* <Post>
        <Post.Header
          name={session.user?.name as string}
          username={`@${session.user?.username}`}
          timePosted={"2 hours ago"}
          profilePic={session.user?.image || defaultAvatar}
        />
        <Post.Text postText={"This is some text."} />
        <Post.Image />
        <Post.Video />
        <Post.Buttons isLiked numOfLikes={269} />
      </Post>
      <Post>
        <Post.Header
          name={session.user?.name as string}
          username={`@${session.user?.username}`}
          timePosted={"2 hours ago"}
          profilePic={session.user?.image || defaultAvatar}
        />
        <Post.Text postText={"This is some text."} />
        <Post.Image />
        <Post.Video />
        <Post.Buttons numOfLikes={125} />
      </Post> */}
    </main>
  );
}
