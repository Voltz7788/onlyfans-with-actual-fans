"use client";
import Image from "next/image";
import type { Post } from "@/@types/types";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegTrashCan,
  FaPencil,
} from "react-icons/fa6";
import { AiOutlineDollar } from "react-icons/ai";
import defaultAvatar from "../../../../public/defaultAvatar.png";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { useState } from "react";
import { PostComponentProps } from "@/@types/types";
import { useRouter } from "next/navigation";

export default function Post({
  post,
  isLiked,
  postedByCurrentUser,
}: PostComponentProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeletePost = async () => {
    const formData = new FormData();
    formData.append("postId", post.id);

    try {
      const res = await fetch("/api/post/delete", {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        setDeleteIsOpen(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  return (
    <section key={post.id} className="p-4 border-b">
      {/* Header */}
      <div className="flex items-center">
        <Image
          src={post.User?.image || defaultAvatar}
          width={11}
          height={11}
          unoptimized
          alt="User profile picture"
          className="rounded-full w-11"
        />
        <div className="ml-3">
          <p>{post.User?.name}</p>
          <p className="text-sm text-onlyfans-light-gray">
            {`@${post.User?.username}`}
          </p>
        </div>
        <p className="text-sm text-onlyfans-light-gray ml-auto">
          {post.timePosted}
        </p>
      </div>
      <p className="mt-4 text-onlyfans-black leading-[26px]">{post.text}</p>
      {/* Image */}
      {post.images ? (
        <Image
          src={post.images[0]}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full"
          placeholder="blur"
          blurDataURL={post.images[0]}
        />
      ) : (
        <></>
      )}

      {/* Video */}
      {post.video ? <p>{post.video}</p> : <></>}

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
                // onClick={() => dispatch(toggle())}
                className="text-onlyfans-light-gray flex gap-2 items-center hover:text-gray-500 active:text-gray-600 transition-all"
              >
                <FaPencil className="text-lg" />
              </button>

              {/* Delete Button */}
              <button
                onClick={() => setDeleteIsOpen(true)}
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
          open={deleteIsOpen}
          onCancel={() => setDeleteIsOpen(false)}
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
              onClick={() => setDeleteIsOpen(false)}
              className="text-white bg-onlyfans-light-blue hover:bg-onlyfans-blue active:bg-sky-500 font-semibold w-20 py-1 rounded-md transition-all"
            >
              No
            </button>
          </div>
        </Modal>
        <p className="text-sm mt-3">
          <span className="font-medium">{post.numOfLikes}</span> likes
        </p>
      </div>
    </section>
  );
}
