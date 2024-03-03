import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { addFilesToBeUploaded } from "@/app/libs/redux/uploadMediaModalSlice";
import { RootState } from "@/app/libs/redux/store";

export default function DropzoneUploader() {
  const filesToBeUploaded = useSelector(
    (state: RootState) => state.uploadMediaModal.filesToBeUploaded
  );
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      dispatch(addFilesToBeUploaded(acceptedFiles));
    },
    [dispatch]
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
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}

      {filesToBeUploaded.map((file, index) => (
        <p key={index}>{file.name}</p>
      ))}
    </div>
  );
}
