import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { IconContext } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { PiFan } from "react-icons/pi";
import { FiPlusSquare } from "react-icons/fi";

type NavProps = {
  linkStyles: string;
  profilePic: StaticImageData;
  pathname: string;
};

export default function MobileNav({
  linkStyles,
  profilePic,
  pathname,
}: NavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 sm:hidden text-lg w-full px-6 pt-1 pb-4 border-t ">
      <IconContext.Provider value={{ className: "text-3xl -mt-0.5" }}>
        <div className="max-w-md flex justify-between items-end mx-auto">
          <Link
            href={"/"}
            className={`${
              pathname === "/"
                ? "text-onlyfans-black"
                : "text-onlyfans-light-gray"
            } ${linkStyles}`}
            aria-label="Home"
          >
            <AiOutlineHome /> <p className="hidden xl:block ">Home</p>
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
          </Link>
          {pathname === "/create-post" ? (
            <button
              disabled
              className={`${
                pathname === "/create-post"
                  ? "text-onlyfans-black"
                  : "text-onlyfans-light-gray"
              } flex items-center gap-5 font-medium max-w-[250px] xl:w-full rounded-full p-2 xl:py-2 xl:px-3 mt-3 transition-colors duration-100`}
            >
              <FiPlusSquare className="xl:absolute left-3" />
            </button>
          ) : (
            <Link
              href={`${pathname === "/create-post" ? "" : "/create-post"}`}
              className={`${
                pathname === "/create-post"
                  ? "text-onlyfans-black"
                  : "text-onlyfans-light-gray"
              } ${linkStyles}`}
              aria-label="New Post"
            >
              <FiPlusSquare className="xl:absolute left-3" />
            </Link>
          )}
          <Link
            href={"/messages"}
            className={`${
              pathname === "/messages"
                ? "text-onlyfans-black"
                : "text-onlyfans-light-gray"
            } ${linkStyles}`}
          >
            <BiMessageDetail />
          </Link>
          <Link
            href={"/profile"}
            className="max-w-[250px] xl:w-full rounded-full focus:outline-onlyfans-blue text-base flex items-center gap-4 p-2 -mb-0.5"
            aria-label="My Profile"
          >
            <Image
              src={profilePic}
              alt="Your profile picture"
              className="w-9 rounded-full"
            />
          </Link>
        </div>
      </IconContext.Provider>
    </nav>
  );
}
