"use client";
import { FormEvent, useRef, useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import { IconContext } from "react-icons";
import { Tooltip } from "react-tooltip";
import { useAutoSizeTextArea } from "@/app/utilities/(hooks)/useAutoSizeTextArea";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "next-auth";
import DropzoneModal from "./DropzoneModal";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilesToBeUploaded,
  toggle,
} from "@/app/libs/redux/uploadMediaModalSlice";
import { RootState } from "@/app/libs/redux/store";

export default function CreatePost({ session }: { session: Session }) {
  const filesToBeUploaded = useSelector(
    (state: RootState) => state.uploadMediaModal.filesToBeUploaded
  );
  const dispatch = useDispatch();

  const [post, setPost] = useState({ text: "", video: "" });
  const pathname = usePathname();

  const router = useRouter();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutoSizeTextArea(textAreaRef.current, post.text);

  const handleSubmitPost = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("text", post.text);
    formData.append("video", post.video);
    formData.append("image", filesToBeUploaded[0]);

    formData.append("userEmail", session?.user?.email as string);

    dispatch(clearFilesToBeUploaded());

    try {
      const res = await fetch("/api/post/create", {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-3 pl-4 pr-1 border-b">
      <IconContext.Provider value={{ className: "text-gray-400 text-2xl" }}>
        <form onSubmit={handleSubmitPost}>
          <textarea
            ref={textAreaRef}
            id="postText"
            name="postText"
            placeholder="Compose new post..."
            onChange={(e) => setPost({ ...post, text: e.target.value })}
            value={post.text}
            required
            autoFocus={pathname === "/create-post" ? true : false}
            className=" pr-4 focus:placeholder-gray-300 outline-none caret-onlyfans-blue text-onlyfans-black w-full 
            resize-none max-h-52 scrollbar scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-w-1"
            aria-label="Compose new post"
          />
          <div className="flex items-center justify-between mt-5">
            <button
              type="button"
              onClick={() => dispatch(toggle())}
              className=""
              data-tooltip-id="imageUploadTooltip"
              data-tooltip-content={"Upload image"}
              aria-label="Upload image"
            >
              <Tooltip
                id="imageUploadTooltip"
                style={{ padding: "4px", fontSize: "0.7rem" }}
              />
              <MdOutlineImage />
            </button>
            {pathname === "/" ? (
              <></>
            ) : (
              <button className="uppercase bg-onlyfans-light-blue hover:bg-onlyfans-blue transition-colors font-medium text-white mr-4 px-5 py-2 text-sm rounded-full">
                Post
              </button>
            )}
          </div>
        </form>
        <DropzoneModal />
      </IconContext.Provider>
    </section>
  );
}
