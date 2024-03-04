import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearFilesToBeUploaded } from "@/app/libs/redux/uploadMediaModalSlice";
import { RootState } from "@/app/libs/redux/store";

export default function useImagePreview() {
  const dispatch = useDispatch();

  const filesToBeUploaded = useSelector(
    (state: RootState) => state.uploadMediaModal.filesToBeUploaded
  );
  const [previewFiles, setPreviewFiles] = useState<string | null>("");
  const pathname = usePathname();
  useEffect(() => {
    if (filesToBeUploaded.length > 0) {
      setPreviewFiles(URL.createObjectURL(filesToBeUploaded[0]));
    }
  }, [filesToBeUploaded]);

  useEffect(() => {
    return () => {
      dispatch(clearFilesToBeUploaded());
    };
  }, [pathname, dispatch]);

  return { previewFiles };
}
