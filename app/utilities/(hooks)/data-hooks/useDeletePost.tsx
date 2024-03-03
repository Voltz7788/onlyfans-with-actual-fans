import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";

type UseDeletePostProps = {
  postId: string;
  key?: string;
  router: AppRouterInstance;
};

export default function useDeletePost({
  postId,
  key,
  router,
}: UseDeletePostProps) {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const handleDeletePost = async () => {
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("key", key as string);

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
