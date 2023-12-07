import React from "react";
import Image, { StaticImageData } from "next/image";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa6";
import { AiOutlineDollar } from "react-icons/ai";

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
      <p className="text-sm text-onlyfans-light-gray mr-5 ml-auto">
        {timePosted}
      </p>
    </div>
  );
};

export const PostText = ({ postText }: { postText: string }) => {
  return <p className="mt-4 text-onlyfans-black leading-[26px]">{postText}</p>;
};

export const PostImage = ({ image }: { image?: StaticImageData }) => {
  return image ? <Image src={image} alt="" /> : <></>;
};

export const PostVideo = ({ videoLink }: { videoLink?: string }) => {
  return videoLink ? <p>{videoLink}</p> : <></>;
};

type PostButtonsProps = {
  isLiked?: boolean;
  numOfLikes: number;
};

export const PostButtons = ({ isLiked, numOfLikes }: PostButtonsProps) => {
  return (
    <div>
      <div className="flex items-center gap-5 mt-5">
        <button>
          {isLiked ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-onlyfans-light-gray text-xl" />
          )}
        </button>
        <button>
          <FaRegComment className="text-onlyfans-light-gray text-xl" />
        </button>
        <button className="text-onlyfans-light-gray flex gap-2 items-center">
          <AiOutlineDollar className="text-xl" />{" "}
          <p className="text-sm uppercase font-medium">Send Tip</p>
        </button>
      </div>
      <p className="text-sm mt-3">
        <span className="font-medium">{numOfLikes}</span> likes
      </p>
    </div>
  );
};
