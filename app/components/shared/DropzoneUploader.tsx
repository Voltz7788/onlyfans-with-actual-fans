import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { addFilesToBeUploaded } from "@/app/libs/redux/uploadMediaModalSlice";
import { RootState } from "@/app/libs/redux/store";
import Image from "next/image";

export default function DropzoneUploader() {
  const filesToBeUploaded = useSelector(
    (state: RootState) => state.uploadMediaModal.filesToBeUploaded
  );
  const dispatch = useDispatch();

  const [previewFiles, setPreviewFiles] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      dispatch(addFilesToBeUploaded(acceptedFiles));
      setPreviewFiles(URL.createObjectURL(acceptedFiles[0]));
      console.log(URL.createObjectURL(filesToBeUploaded[0]));
    },
    [dispatch, filesToBeUploaded]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
  });

  useEffect(() => {
    return () => URL.revokeObjectURL(previewFiles);
  }, [previewFiles]);

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col justify-center py-3 px-6 mt-3 text-gray-500 text-base border cursor-pointer min-h-[8rem]
       hover:border-onlyfans-blue hover:text-onlyfans-blue 
      border-dashed transition-all duration-300 rounded-md ${
        filesToBeUploaded ? "text-onlyfans-blue border-onlyfans-blue" : ""
      }`}
    >
      <input {...getInputProps()} />

      {filesToBeUploaded.length > 0 ? (
        <p className="text-center">Click to change image</p>
      ) : isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}

      {filesToBeUploaded.length > 0 ? (
        <Image
          src={previewFiles}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full border rounded mt-3"
          alt=""
        />
      ) : (
        <></>
      )}
    </div>
  );
}
