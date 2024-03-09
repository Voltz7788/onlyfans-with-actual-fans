import { generatePresignedGetUrl } from "@/app/libs/aws/getPresignedUrls";
import type { Post } from "@/@types/types";

export default function formatPostImages(posts: Post[]) {
  posts.forEach(async (post) => {
    const imageUrls = await generatePresignedGetUrl(post.images![0]);

    post.images = imageUrls
      ? [
          {
            id: post.images![0].id,
            key: post.images![0].key,
            url: imageUrls,
            postId: post.id,
          },
        ]
      : [];
  });

  return posts;
}
