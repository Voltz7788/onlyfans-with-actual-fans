import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/libs/redux/store";
import { clearFilesToBeUploaded } from "@/app/libs/redux/uploadMediaModalSlice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormEvent } from "react";

type UseCreatePostProps = {
  post: { text: string; video: string };
  userEmail: string;
  router: AppRouterInstance;
};

export default function useCreatePost({
  post,
  userEmail,
  router,
}: UseCreatePostProps) {
  const dispatch = useDispatch();

  const filesToBeUploaded = useSelector(
    (state: RootState) => state.uploadMediaModal.filesToBeUploaded
  );

  const handleSubmitPost = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("text", post.text);
    formData.append("video", post.video);
    filesToBeUploaded.forEach((file) => {
      formData.append("image", file);
    });

    formData.append("userEmail", userEmail);

    dispatch(clearFilesToBeUploaded());

    try {
      const res = await fetch("/api/post/create", {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        const data: { signedPutUrl: string | null } = await res.json();
        await uploadFile(filesToBeUploaded[0], data.signedPutUrl);
        router.push("/");
      }

      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async (file: File, signedPutUrl: string | null) => {
    if (!signedPutUrl) {
      return;
    }

    try {
      const res = await fetch(signedPutUrl, { method: "put", body: file });
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { handleSubmitPost };
}
