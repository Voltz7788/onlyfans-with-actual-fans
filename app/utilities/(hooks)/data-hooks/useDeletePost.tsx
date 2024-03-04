import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useState } from "react";

type UseDeletePostProps = {
  postId: string;
  image: { key: string; url: string | null } | null;
  router: AppRouterInstance;
};

export default function useDeletePost({
  postId,
  image,
  router,
}: UseDeletePostProps) {
  const [imageKey, setImageKey] = useState(image?.key || null);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  useEffect(() => {
    setImageKey(image?.key || null);
  }, [image]);

  const handleDeletePost = async () => {
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("key", imageKey as string);

    try {
      const res = await fetch("/api/post/delete", {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        setDeleteIsOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    deleteIsOpen,
    setDeleteIsOpen,
    handleDeletePost,
  };
}
