import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { RootState } from "@/app/libs/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggle, setToFalse } from "@/app/libs/redux/slideNavbarSlice";
import { MdClose } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { BsBookmarkStar } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { PulseLoader } from "react-spinners";

type SlideNavProps = {
  profilePic: string | StaticImageData;
  name: string | null;
  username: string | null;
};

export default function SlideMobileNav({
  profilePic,
  name,
  username,
}: SlideNavProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const isOpen = useSelector((state: RootState) => state.slideNavbar.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.removeEventListener("resize", handleResize);

    if (screenWidth > 640) {
      dispatch(setToFalse());
    }

    window.addEventListener("resize", handleResize);
  });

  const handleClick = () => {
    dispatch(toggle());
  };

  const handleClose = () => {
    dispatch(setToFalse());
  };

  const handleSignOut = () => {
    setIsSigningOut(true);
    signOut();
  };

  return (
    <div>
      {/* Background Overlay */}
      <div
        onClick={handleClick}
        className={`w-screen h-screen fixed bg-black z-10 transition-all  ${
          isOpen ? "opacity-20" : "opacity-0 pointer-events-none"
        }
       `}
      ></div>

      {/* Navigation */}
      <div
        className={`fixed h-screen w-64 bg-white top-0 right-0 z-10 transition-transform duration-200 ${
          isOpen ? "" : "translate-x-96"
        }`}
      >
        <button onClick={handleClick}>
          <MdClose className="absolute right-4 top-3.5 text-2xl text-gray-500" />
        </button>

        <div className="px-5 pb-5 border-b">
          <Image
            src={profilePic}
            width={48}
            height={48}
            unoptimized
            alt="Profile picture"
            className="rounded-full"
          />
          <p className="mt-2.5">{name}</p>
          <p className="text-onlyfans-light-gray text-sm">{`@${username}`}</p>
          <div className="flex gap-1 items-center text-sm mt-3 ">
            <p>
              <span className="font-medium">0</span> Fans
            </p>
            <LuDot />
            <p>
              <span className="font-medium">0</span> Following
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-sm p-5 border-b">
          <Link
            href={"/profile"}
            onClick={handleClose}
            className="flex items-center gap-2 font-medium"
          >
            <CgProfile className="text-xl" />
            <p>My profile</p>
          </Link>
          <Link
            href={"/collections"}
            onClick={handleClose}
            className="flex items-center gap-2 font-medium"
          >
            <BsBookmarkStar className="text-xl" />
            <p>Collections</p>
          </Link>
          <Link
            href={"/settings"}
            onClick={handleClose}
            className="flex items-center gap-2 font-medium"
          >
            <IoSettingsOutline className="text-xl" />
            <p>Settings</p>
          </Link>
        </div>
        <div className="px-3 py-5">
          <button
            onClick={handleSignOut}
            className={`flex items-center max-w-[140px] gap-2 text-white font-semibold w-full text-sm px-3 rounded-full h-8 transition-colors duration-100 ${
              isSigningOut
                ? "bg-onlyfans-blue"
                : "bg-onlyfans-light-blue hover:bg-onlyfans-blue"
            }`}
          >
            <TbLogout2 className="text-lg" />
            {isSigningOut ? <p>Loading</p> : <p>Sign Out</p>}

            <PulseLoader
              color="#ffffff"
              size={3}
              loading={isSigningOut}
              className="ml-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
