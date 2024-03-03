"use client";
import { useState, useRef, useEffect, useOptimistic } from "react";
import { useAutoSizeTextArea } from "@/app/utilities/(hooks)/useAutoSizeTextArea";
import Image, { StaticImageData } from "next/image";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegTrashCan,
  FaPencil,
} from "react-icons/fa6";
import { AiOutlineDollar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@/app/libs/redux/postButtonsSlice";
import { RootState } from "../../../libs/redux/store";

type PostHeaderProps = {
  name: string;
  username: string;
  timePosted: string;
  profilePic: string | StaticImageData;
};

export const PostHeader = ({
  name,
  username,
  timePosted,
  profilePic,
}: PostHeaderProps) => {
  return (
    <div className="flex items-center">
      <Image
        src={profilePic}
        width={11}
        height={11}
        unoptimized
        alt="User profile picture"
        className="rounded-full w-11"
      />
      <div className="ml-3">
        <p>{name}</p>
        <p className="text-sm text-onlyfans-light-gray">{username}</p>
      </div>
      <p className="text-sm text-onlyfans-light-gray ml-auto">{timePosted}</p>
    </div>
  );
};

type PostTextProps = {
  postText: string;
  postedByCurrentUser: boolean;
  postId: string;
};

export const PostText = ({
  postText,
  postedByCurrentUser,
  postId,
}: PostTextProps) => {
  const updateActive = useSelector(
    (state: RootState) => state.postButtons.updateActive
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const [newPostText, setNewPostText] = useState(postText);
  const [optimisticText, addOptimisitcText] = useOptimistic(
    newPostText,
    (text: string) => text
  );

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutoSizeTextArea(textAreaRef.current, newPostText);

  useEffect(() => {
    textAreaRef.current?.setSelectionRange(
      newPostText.length,
      newPostText.length
    );
    textAreaRef.current?.focus();
  }, [newPostText, updateActive]);

  const handleUpdatePost = async () => {
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("updatedText", newPostText);
    addOptimisitcText(newPostText);
    dispatch(toggle());
    try {
      const res = await fetch("/api/post/update", {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        // dispatch(toggle());
        // router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {updateActive && postedByCurrentUser ? (
        <form>
          <textarea
            ref={textAreaRef}
            id="postText"
            name="postText"
            placeholder="Edit post..."
            onChange={(e) => setNewPostText(e.target.value)}
            value={newPostText}
            className="border p-1.5 rounded mt-4 focus:placeholder-gray-300 outline-none caret-onlyfans-blue text-onlyfans-black w-full 
            resize-none max-h-52 scrollbar scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-w-1"
            aria-label="Edit post"
            rows={1}
          />
          <div className="flex w-full">
            <button
              onClick={handleUpdatePost}
              className="mt-1.5 ml-auto uppercase bg-onlyfans-light-blue hover:bg-onlyfans-blue transition-colors font-semibold text-white mr-4 px-5 py-2 text-sm rounded-full"
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-4 text-onlyfans-black leading-[26px]">
          {optimisticText}
        </p>
      )}
    </>
  );
};

export const PostImage = ({ image }: { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt=""
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-full"
      placeholder="blur"
      blurDataURL={image}
    />
  ) : (
    <></>
  );
};

export const PostVideo = ({ videoLink }: { videoLink?: string }) => {
  return videoLink ? <p>{videoLink}</p> : <></>;
};

type PostButtonsProps = {
  isLiked?: boolean;
  numOfLikes: number;
  postedByCurrentUser: boolean;
  postId: string;
};

export const PostButtons = ({
  isLiked,
  numOfLikes,
  postedByCurrentUser,
  postId,
}: PostButtonsProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleDeletePost = async () => {
    const formData = new FormData();
    formData.append("postId", postId);

    try {
      const res = await fetch("/api/post/delete", {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        setIsOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-5 mt-5">
        <button>
          {isLiked ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-onlyfans-light-gray text-xl hover:text-gray-500 active:text-gray-600 transition-all" />
          )}
        </button>
        <button>
          <FaRegComment className="text-onlyfans-light-gray text-xl hover:text-gray-500 active:text-gray-600 transition-all" />
        </button>
        <button className="text-onlyfans-light-gray flex gap-2 items-center hover:text-gray-500 active:text-gray-600 transition-all">
          <AiOutlineDollar className="text-xl" />{" "}
          <p className="text-sm uppercase font-medium">Send Tip</p>
        </button>
        {postedByCurrentUser ? (
          <div className="flex ml-auto gap-4">
            {/* Update Button */}
            <button
              onClick={() => dispatch(toggle())}
              className="text-onlyfans-light-gray flex gap-2 items-center hover:text-gray-500 active:text-gray-600 transition-all"
            >
              <FaPencil className="text-lg" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="text-onlyfans-light-gray flex gap-2 items-center hover:text-gray-500 active:text-gray-600 transition-all"
            >
              <FaRegTrashCan className="text-lg" />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        className="max-w-lg p-10"
        footer={false}
      >
        <p className="text-center py-5 text-lg">
          Are you sure you want to delete this post?
        </p>
        <div className="flex w-full justify-evenly">
          <button
            onClick={handleDeletePost}
            className="text-white bg-red-500 hover:bg-red-600 active:bg-red-700 font-semibold w-20 py-1 rounded-md transition-all"
          >
            Yes
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white bg-onlyfans-light-blue hover:bg-onlyfans-blue active:bg-sky-500 font-semibold w-20 py-1 rounded-md transition-all"
          >
            No
          </button>
        </div>
      </Modal>
      <p className="text-sm mt-3">
        <span className="font-medium">{numOfLikes}</span> likes
      </p>
    </div>
  );
};
