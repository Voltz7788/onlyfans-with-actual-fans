import Post from "./Post";
import defaultAvatar from "../../../../public/defaultAvatar.png";
import { auth } from "@/app/utilities/getServerSessionHelper";

type PostListProps = {
  posts: {
    id: string;
    timePosted: string;
    User: {
      id: string;
      name: string | null;
      username: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      password: string | null;
    } | null;
    text: string;
    images: string[] | null;
    video: string | null;
    numOfLikes: number;
    userId: string | null;
  }[];
};

export default async function PostList({ posts }: PostListProps) {
  const session = await auth();
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id}>
          <Post.Header
            name={post.User?.name!}
            username={`@${post.User?.username}`}
            timePosted={post.timePosted.toString()}
            profilePic={post.User?.image || defaultAvatar}
          />
          <Post.Text
            postText={post.text}
            postedByCurrentUser={
              post.User?.email === session?.user?.email ? true : false
            }
            postId={post.id}
          />
          <Post.Image />
          <Post.Video />
          <Post.Buttons
            isLiked={false}
            numOfLikes={post.numOfLikes}
            postedByCurrentUser={
              post.User?.email === session?.user?.email ? true : false
            }
            postId={post.id}
          />
        </Post>
      ))}
    </>
  );
}
