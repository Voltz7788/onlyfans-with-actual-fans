import Link from "next/link";
import CreatePost from "../components/shared/CreatePost";
import TopNav from "../components/shared/TopNav";
import { auth } from "../utilities/getServerSessionHelper";
import { redirect } from "next/navigation";
import { CustomSession } from "@/@types/types";
import GrayBar from "../components/shared/aesthetic/GrayBar";
import { getPosts } from "../utilities/post-utilities/getPosts";
import PostList from "../components/home-page/posts/PostList";

export default async function Home() {
  const session = (await auth()) as CustomSession;

  if (!session) {
    redirect("/login");
  }

  const { formattedPosts: posts, user } = await getPosts(session?.user?.email!);

  return (
    <main className="relative border-x w-full xl:w-1/3 min-h-screen overflow-">
      <TopNav pageTitle="home" />
      <Link
        href={"/create-post"}
        className="focus:outline-1 focus:outline-onlyfans-light-blue"
      >
        <CreatePost session={session} />
      </Link>
      <GrayBar />
      <PostList posts={posts} user={user!} />
    </main>
  );
}
