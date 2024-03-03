import Post from "./Post";
import { auth } from "@/app/utilities/getServerSessionHelper";
import { PostListProps } from "@/@types/types";

export default async function PostList({ posts }: PostListProps) {
  const session = await auth();
  return (
    <>
      {posts.map((post) => (
        // <Post key={post.id}>
        //   <Post.Header
        //     name={post.User?.name!}
        //     username={`@${post.User?.username}`}
        //     timePosted={post.timePosted.toString()}
        //     profilePic={post.User?.image || defaultAvatar}
        //   />
        //   <Post.Text
        //     postText={post.text}
        //     postedByCurrentUser={
        //       post.User?.email === session?.user?.email ? true : false
        //     }
        //     postId={post.id}
        //   />
        //   <Post.Image image={post.images![0]} />
        //   <Post.Video />
        //   <Post.Buttons
        //     isLiked={false}
        //     numOfLikes={post.numOfLikes}
        //     postedByCurrentUser={
        //       post.User?.email === session?.user?.email ? true : false
        //     }
        //     postId={post.id}
        //   />
        // </Post>
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
