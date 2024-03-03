import { useState, useEffect, useOptimistic, useRef, FormEvent } from "react";
import { useAutoSizeTextArea } from "../useAutoSizeTextArea";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type UseUpdatePostProps = {
  postId: string;
  postText: string;
  router: AppRouterInstance;
};

export default function useUpdatePost({
  postText,
  postId,
  router,
}: UseUpdatePostProps) {
  const [newPostText, setNewPostText] = useState(postText);
  const [optimisticText, addOptimisitcText] = useOptimistic(
    newPostText,
    (text: string) => text
  );

  const [updateActive, setUpdateActive] = useState(false);
  const [textAreaVal, setTextAreaVal] = useState(newPostText);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutoSizeTextArea(textAreaRef.current, newPostText);

  // useEffect(() => {
  //   // textAreaRef.current?.setSelectionRange(
  //   //   newPostText.length,
  //   //   newPostText.length
  //   // );
  //   // textAreaRef.current?.focus();
  // }, [newPostText]);

  const handleUpdatePost = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("updatedText", newPostText);
    addOptimisitcText(newPostText);

    try {
      const res = await fetch("/api/post/update", {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        setUpdateActive(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateTextAreaVal = (val: string) => {
    setTextAreaVal(val);
    setNewPostText(val);
  };

  return {
    optimisticText,
    newPostText,
    textAreaRef,
    setNewPostText,
    handleUpdatePost,
    updateActive,
    setUpdateActive,
    textAreaVal,
    updateTextAreaVal,
  };
}
