import React, { useState } from "react";
import { StaticImageData } from "next/image";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@/app/redux/slideNavbarSlice";

type SlideNavProps = {
  profilePic: string | StaticImageData;
};

export default function SlideMobileNav({ profilePic }: SlideNavProps) {
  const isOpen = useSelector((state: RootState) => state.slideNavbar.isOpen);
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(true);

  const handleClick = () => {
    dispatch(toggle());
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`w-screen h-screen fixed bg-black z-10 transition-all ${
          isOpen ? "opacity-20" : "opacity-0 pointer-events-none"
        }
       `}
      ></div>
      <div
        className={`fixed h-screen w-60 bg-red-500 top-0 right-0 z-10 transition-transform duration-200 ${
          isOpen ? "" : "translate-x-96"
        }`}
      >
        SlideMobileNav
      </div>
    </div>
  );
}
