import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { IconContext } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { BsBookmarkStar } from "react-icons/bs";
import { PiFan } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";

type NavProps = {
  linkStyles: string;
  profilePic: StaticImageData;
  pathname: string;
};

export default function DesktopNav({
  linkStyles,
  profilePic,
  pathname,
}: NavProps) {
  return (
    <nav className="hidden sm:flex flex-col items-end text-lg max-w-xs px-3 py-10">
      <IconContext.Provider value={{ className: "text-3xl -mt-0.5" }}>
        <Link
          href={"/profile"}
          className="max-w-[250px] xl:w-full rounded-full focus:outline-onlyfans-blue text-base flex items-center gap-4"
          aria-label="My Profile"
        >
          <Image
            src={profilePic}
            alt="Your profile picture"
            className="w-11 rounded-full"
          />
        </Link>
        <Link
          href={"/"}
          className={`${
            pathname === "/"
              ? "text-onlyfans-black"
              : "text-onlyfans-light-gray"
          } ${linkStyles}`}
          aria-label="Home"
        >
          <AiOutlineHome /> <p className="hidden xl:block">Home</p>
        </Link>
        <Link
          href={"/messages"}
          className={`${
            pathname === "/messages"
              ? "text-onlyfans-black"
              : "text-onlyfans-light-gray"
          } ${linkStyles}`}
        >
          <BiMessageDetail />
          <p className="hidden xl:block">Messages</p>
        </Link>
        <Link
          href={"/collections"}
          className={`${
            pathname === "/collections"
              ? "text-onlyfans-black"
              : "text-onlyfans-light-gray"
          } ${linkStyles}`}
          aria-label="Collections"
        >
          <BsBookmarkStar />
          <p className="hidden xl:block">Collections</p>
        </Link>
        <Link
          href={"/subscriptions"}
          className={`${
            pathname === "/subscriptions"
              ? "text-onlyfans-black"
              : "text-onlyfans-light-gray"
          } ${linkStyles}`}
          aria-label="Subscriptions"
        >
          <PiFan />
          <p className="hidden xl:block">Subscriptions</p>
        </Link>
        <Link
          href={"/profile"}
          className={`${
            pathname === "/profile"
              ? "text-onlyfans-black"
              : "text-onlyfans-light-gray"
          } ${linkStyles}`}
          aria-label="My Profile"
        >
          <CgProfile />
          <p className="hidden xl:block">My Profile</p>
        </Link>
        {pathname === "/create-post" ? (
          <button
            disabled
            className={`relative flex font-medium justify-center items-center gap-5 text-sm max-w-[250px] xl:w-full rounded-full p-2 xl:py-3.5 xl:px-3 mt-4 
    text-white transition-colors duration-100 bg-gray-500 opacity-20 `}
          >
            <FiPlus className="xl:absolute left-3" />
            <p className="hidden xl:block">NEW POST</p>
          </button>
        ) : (
          <Link
            href={`${pathname === "/create-post" ? "" : "/create-post"}`}
            className={`relative flex font-medium justify-center items-center gap-5 text-sm max-w-[250px] xl:w-full rounded-full p-2 xl:py-3.5 xl:px-3 mt-4 
    text-white transition-colors duration-100 bg-onlyfans-light-blue hover:bg-onlyfans-blue focus:bg-onlyfans-blue focus:outline-1 `}
            aria-label="New Post"
          >
            <FiPlus className="xl:absolute left-3" />
            <p className="hidden xl:block">NEW POST</p>
          </Link>
        )}
      </IconContext.Provider>
    </nav>
  );
}
