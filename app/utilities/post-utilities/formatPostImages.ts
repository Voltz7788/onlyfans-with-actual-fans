import { generatePresignedGetUrl } from "@/app/libs/aws/getPresignedUrls";
import type { Post as CustomPost } from "@/@types/types";
import type { Post } from "@prisma/client";

export default function formatPostImages(posts: CustomPost[]) {
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
