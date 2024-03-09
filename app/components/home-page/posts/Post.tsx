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
import { Modal } from "antd";
import { PostComponentProps } from "@/@types/types";
import { useRouter } from "next/navigation";
import useDeletePost from "@/app/utilities/(hooks)/data-hooks/useDeletePost";
import useUpdatePost from "@/app/utilities/(hooks)/data-hooks/useUpdatePost";
import Link from "next/link";

export default function Post({
  post,
  isLiked,
  postedByCurrentUser,
}: PostComponentProps) {
  const router = useRouter();

  const { deleteIsOpen, setDeleteIsOpen, handleDeletePost } = useDeletePost({
    postId: post.id,
    image: post.images?.[0] || null,
    router,
  });

  const {
    optimisticText,
    newPostText,
    textAreaRef,
    setNewPostText,
    handleUpdatePost,
    updateActive,
    setUpdateActive,
  } = useUpdatePost({
    postId: post.id,
    postText: post.text,
    router,
  });

  return (
    <section key={post.id} className="py-4 border-b">
      {/* Header */}
      <div className="flex items-center px-4">
        <Image
          src={post.User?.image || defaultAvatar}
          width={11}
          height={11}
          unoptimized
          alt="User profile picture"
          className="rounded-full w-11"
          loading="lazy"
        />
        <Link href={`/${post.User?.username}`} className="ml-3">
          <p>{post.User?.name}</p>
          <p className="text-sm text-onlyfans-light-gray">
            {`@${post.User?.username}`}
          </p>
        </Link>
        <p className="text-sm text-onlyfans-light-gray ml-auto">
          {post.timePosted}
        </p>
      </div>

      {/* Image */}
      {post.images === null || post.images?.length > 0 ? (
        <div className="relative w-full max-h-[600px] aspect-square h-full my-5 -z-10">
          <Image
            src={post.images![0].url!}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            blurDataURL={post.images![0].url!}
            className="w-full h-full object-cover absolute top-0 left-0 opacity-20"
          />
          <Image
            src={post.images![0].url!}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="relative  w-full h-full object-contain backdrop-blur-xl"
            placeholder="blur"
            blurDataURL={post.images![0].url!}
          />
        </div>
      ) : (
        <></>
      )}

      {/* Post Text */}
      {updateActive && postedByCurrentUser ? (
        <form onSubmit={handleUpdatePost} className="px-4">
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
            <button className="mt-1.5 ml-auto uppercase bg-onlyfans-light-blue hover:bg-onlyfans-blue transition-colors font-semibold text-white mr-4 px-5 py-2 text-sm rounded-full">
              Update
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-4 px-4 text-onlyfans-black leading-[26px]">
          {optimisticText}
        </p>
      )}

      {/* Video */}
      {post.video ? <p>{post.video}</p> : <></>}

      {/* Buttons */}
      <div>
        <div className="flex items-center gap-5 mt-5 px-4">
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
                onClick={() => setUpdateActive(!updateActive)}
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

        {/* Likes */}
        <p className="text-sm mt-3 px-4">
          <span className="font-medium">{post.numOfLikes}</span> likes
        </p>
      </div>
    </section>
  );
}
