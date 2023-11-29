"use client";
import React, { useRef, useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import { IconContext } from "react-icons";
import { Tooltip } from "react-tooltip";
import { useAutoSizeTextArea } from "@/app/(utilities)/(hooks)/useAutoSizeTextArea";
import { usePathname } from "next/navigation";

export default function CreatePost() {
  const [post, setPost] = useState("");
  const pathname = usePathname();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutoSizeTextArea(textAreaRef.current, post);
  return (
    <section className="py-3 pl-4 pr-1 border-b">
      <IconContext.Provider value={{ className: "text-gray-400 text-2xl" }}>
        <form action="">
          <label htmlFor="postText" aria-label="Compose new post" />
          <textarea
            ref={textAreaRef}
            id="postText"
            name="postText"
            placeholder="Compose new post..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            autoFocus={pathname === "/create-post" ? true : false}
            className=" pr-4 focus:placeholder-gray-300 outline-none caret-onlyfans-blue text-onlyfans-black w-full 
            resize-none max-h-52 scrollbar scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-w-1"
          />
          <div className="flex items-center justify-between mt-5">
            <button
              className=""
              data-tooltip-id="imageUploadTooltip"
              data-tooltip-content={"Upload image"}
            >
              <Tooltip
                id="imageUploadTooltip"
                style={{ padding: "4px", fontSize: "0.7rem" }}
              />
              <MdOutlineImage />
            </button>
            <button className="uppercase bg-onlyfans-light-blue hover:bg-onlyfans-blue transition-colors font-medium text-white mr-4 px-5 py-2 text-sm rounded-full">
              Post
            </button>
          </div>
        </form>
      </IconContext.Provider>
    </section>
  );
}
