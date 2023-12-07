import React from "react";
import { auth } from "@/app/utilities/getServerSessionHelper";
import Image from "next/image";
import { CustomSession } from "@/@types/types";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { PiShare } from "react-icons/pi";

export default async function ProfileHeader() {
  const session: CustomSession = await auth();
  return (
    <section>
      <div className="bg-sky-100 h-44 -mt-16 z-10">
        <div className="w-full h-full bg-gradient-to-b from-gray-500 to-transparent"></div>
      </div>
      <div className="flex px-6">
        <div className="">
          <Image
            src={session?.user?.image as string}
            alt="Profile picture"
            width={110}
            height={110}
            unoptimized
            className="rounded-full border-2 border-white -mt-14"
          />
          <p className="mt-3 font-medium text-lg">{session?.user?.name}</p>
          <p className="text-sm text-onlyfans-light-gray">
            @{session?.username}
          </p>
        </div>
        <div className="flex gap-3 ml-auto mt-5">
          <Link
            href={"/"}
            className="flex items-center gap-2 px-6 h-12 border rounded-full uppercase text-sm
             text-onlyfans-light-blue font-medium hover:text-onlyfans-blue hover:bg-sky-50
              hover:border-onlyfans-blue transition-colors duration-75"
          >
            <IoSettingsOutline className="text-xl" />
            <p>Edit Profile</p>
          </Link>
          <button
            className="flex justify-center items-center gap-2 w-12 h-12 border rounded-full uppercase text-sm
             text-onlyfans-light-blue font-medium hover:text-onlyfans-blue hover:bg-sky-50
              hover:border-onlyfans-blue transition-colors duration-75"
          >
            <PiShare className="text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
