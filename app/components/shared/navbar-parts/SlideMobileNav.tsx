import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggle, setToFalse, setToTrue } from "@/app/redux/slideNavbarSlice";
import { MdClose } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import Link from "next/link";

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
  const isOpen = useSelector((state: RootState) => state.slideNavbar.isOpen);
  const [screenWidth, setScreenWidth] = useState(0);
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
        className={`fixed h-screen w-60 bg-white top-0 right-0 z-10 transition-transform duration-200 ${
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

        <div>
          <Link href={"/profile"}></Link>
          <Link href={"/collections"}></Link>
          <Link href={"/settings"}></Link>
        </div>
      </div>
    </div>
  );
}
