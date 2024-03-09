import type { Post } from "@/@types/types";
import PostList from "../home-page/posts/PostList";

export default function ProfilePostsContainer({ posts }: { posts: Post[] }) {
  return (
    <section>
      <div className="p-3 text-center border-b border-black uppercase">
        <p className="font-medium">
          {posts.length < 1
            ? "No Posts"
            : `${posts.length} ${posts.length === 1 ? "Post" : "Posts"}`}
        </p>
      </div>
      <PostList posts={posts} />
    </section>
  );
}
