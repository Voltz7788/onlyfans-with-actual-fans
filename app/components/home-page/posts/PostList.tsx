import Post from "./Post";
import type { Post as PostType, User as UserType } from "@prisma/client";

type PostListProps = {
  posts: PostType[];
  user: UserType;
};

export default function PostList({ posts, user }: PostListProps) {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id}>
          <Post.Header
            name={user?.name!}
            username={`@${user?.username!}`}
            timePosted={post.timePosted.toString()}
            profilePic={user?.image!}
          />
          <Post.Text postText={post.text} />
          <Post.Image />
          <Post.Video />
          <Post.Buttons isLiked={false} numOfLikes={post.numOfLikes} />
        </Post>
      ))}
    </>
  );
}
