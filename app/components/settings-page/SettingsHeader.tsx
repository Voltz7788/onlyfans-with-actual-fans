import React from "react";
import { auth } from "@/app/utilities/getServerSessionHelper";
import Image from "next/image";
import { CustomSession } from "@/@types/types";
import defaultAvatar from "../../../public/defaultAvatar.png";
import { MdOutlineCameraAlt } from "react-icons/md";
import { MdClose } from "react-icons/md";

export default async function SettingsHeader() {
  const session: CustomSession = await auth();
  return (
    <section className="mt-16">
      <div className="bg-sky-100 h-44 -mt-16 z-10">
        <div className="w-full h-full bg-gradient-to-b from-gray-500 to-transparent"></div>
      </div>
      <div className="flex px-6 pb-6">
        <div className="relative -mt-14 rounded-full">
          <Image
            src={session?.user?.image || defaultAvatar}
            alt="Profile picture"
            width={100}
            height={100}
            unoptimized
            className="rounded-full border-2 border-white bg-white"
          />
          <div className="absolute z-50 bg-black w-[98%] h-[98%] top-[0.8px] left-[0.8px] rounded-full opacity-20"></div>
          <div className="flex justify-center items-center gap-3 absolute z-50  w-[98%] h-[98%] top-[0.8px] left-[0.8px] rounded-full">
            <button className="z-50 text-white text-2xl opacity-80 hover:bg-white/20 hover:text-white hover:opacity-100 rounded-full p-1 transition-all duration-75">
              <MdOutlineCameraAlt />
            </button>
            <button className="z-50 text-white text-2xl opacity-80 hover:bg-white/20 hover:text-white hover:opacity-100 rounded-full p-1 transition-all duration-75">
              <MdClose />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
