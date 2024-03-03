import Post from "./Post";
import { auth } from "@/app/utilities/getServerSessionHelper";
import { PostListProps } from "@/@types/types";

export default async function PostList({ posts }: PostListProps) {
  const session = await auth();
  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          isLiked={false}
          postedByCurrentUser={
            post.User?.email === session?.user?.email ? true : false
          }
        />
      ))}
    </>
  );
}
