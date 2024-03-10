import React from "react";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { IconContext } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { BsBookmarkStar } from "react-icons/bs";
import { PiFan } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import MoreOptionsModal from "./MoreOptionsModal";

type NavProps = {
  linkStyles: string;
  profilePic: string | StaticImageData;
  pathname: string;
};

export default function DesktopNav({
  linkStyles,
  profilePic,
  pathname,
}: NavProps) {
  return (
    <nav className="sticky top-0 sm:max-w-[70px] lg:max-w-[300px] sm:w-full xl:w-1/3 xl:max-w-none bg-white ">
      <div className="hidden lg:w-full sm:sticky sm:flex flex-col sm:items-center lg:items-end text-lg py-10 px-2.5 xl:px-10">
        <IconContext.Provider value={{ className: "text-3xl -mt-0.5" }}>
          <MoreOptionsModal profilePic={profilePic} />

          <Link
            href={"/"}
            className={`${
              pathname === "/"
                ? "text-onlyfans-black"
                : "text-onlyfans-light-gray"
            } ${linkStyles}`}
            aria-label="Home"
          >
            <AiOutlineHome /> <p className="hidden lg:block">Home</p>
          </Link>
          <Link
            href={"/messages"}
            className={`${
              pathname === "/messages"
                ? "text-onlyfans-black"
                : "text-onlyfans-light-gray"
            } ${linkStyles}`}
            aria-label="Messages"
          >
            <BiMessageDetail />
            <p className="hidden lg:block">Messages</p>
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
            <p className="hidden lg:block">Collections</p>
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
            <p className="hidden lg:block">Subscriptions</p>
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
            <p className="hidden lg:block">My Profile</p>
          </Link>
          <Link
            href={"/settings"}
            className={`${
              pathname === "/settings"
                ? "text-onlyfans-black"
                : "text-onlyfans-light-gray"
            } ${linkStyles}`}
            aria-label="Settings"
          >
            <IoSettingsOutline />
            <p className="hidden lg:block">Settings</p>
          </Link>
          {pathname === "/create-post" ? (
            <button
              disabled
              className={`relative flex font-medium justify-center items-center gap-5 text-sm max-w-[250px] lg:w-full rounded-full p-2 lg:py-3.5 lg:px-3 mt-4 
    text-white transition-colors duration-100 bg-gray-500 opacity-20 `}
            >
              <FiPlus className="lg:absolute left-3" />
              <p className="hidden lg:block">NEW POST</p>
            </button>
          ) : (
            <Link
              href={`${pathname === "/create-post" ? "" : "/create-post"}`}
              className={`relative flex font-medium justify-center items-center gap-5 text-sm max-w-[250px] lg:w-full rounded-full p-2 lg:py-3.5 lg:px-3 mt-4 
                        text-white transition-colors duration-100 bg-onlyfans-light-blue hover:bg-onlyfans-blue focus:bg-onlyfans-blue focus:outline-1`}
              aria-label="New Post"
            >
              <FiPlus className="lg:absolute left-3" />
              <p className="hidden lg:block">NEW POST</p>
            </Link>
          )}
        </IconContext.Provider>
      </div>
    </nav>
  );
}
