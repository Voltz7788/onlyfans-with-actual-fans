import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DropzoneUploader() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log("File");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
}
