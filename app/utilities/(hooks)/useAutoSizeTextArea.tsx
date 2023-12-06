import { useEffect } from "react";

export const useAutoSizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const { scrollHeight } = textAreaRef;

      textAreaRef.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};
