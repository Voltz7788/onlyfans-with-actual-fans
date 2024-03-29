"use client";
import { useRef, useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import { IconContext } from "react-icons";
import { Tooltip } from "react-tooltip";
import { useAutoSizeTextArea } from "@/app/utilities/(hooks)/useAutoSizeTextArea";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "next-auth";
import DropzoneModal from "./DropzoneModal";
import { useDispatch } from "react-redux";
import { toggle } from "@/app/libs/redux/uploadMediaModalSlice";
import useCreatePost from "@/app/utilities/(hooks)/data-hooks/useCreatePost";
import Image from "next/image";
import useImagePreview from "@/app/utilities/(hooks)/data-hooks/useImagePreview";

export default function CreatePost({ session }: { session: Session }) {
  const [post, setPost] = useState({ text: "", video: "" });

  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { previewFiles } = useImagePreview();

  const { handleSubmitPost } = useCreatePost({
    post,
    router,
    userEmail: session.user?.email as string,
  });

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutoSizeTextArea(textAreaRef.current, post.text);

  return (
    <section className="py-3 pl-4 pr-4 border-b">
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
              <button
                className="uppercase bg-onlyfans-light-blue hover:bg-onlyfans-blue transition-colors 
              font-medium text-white px-5 py-2 text-sm rounded-full"
              >
                Post
              </button>
            )}
          </div>
        </form>
        {previewFiles && pathname === "/create-post" ? (
          <div className="relative w-full max-h-[600px] aspect-square h-full my-5 -z-10">
            <Image
              src={previewFiles}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              blurDataURL={previewFiles}
              className="w-full h-full object-cover absolute top-0 left-0 opacity-20"
            />
            <Image
              src={previewFiles}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="relative  w-full h-full object-contain backdrop-blur-xl"
              placeholder="blur"
              blurDataURL={previewFiles}
            />
          </div>
        ) : (
          <></>
        )}
        <DropzoneModal />
      </IconContext.Provider>
    </section>
  );
}
