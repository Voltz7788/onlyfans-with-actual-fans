import Image from "next/image";
import { CustomSession, CustomUser } from "@/@types/types";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { PiShare } from "react-icons/pi";
import GrayBar from "../shared/aesthetic/GrayBar";
import defaultAvatar from "../../../public/defaultAvatar.png";
import { auth } from "@/app/utilities/getServerSessionHelper";

export default async function ProfileHeader({ user }: { user: CustomUser }) {
  const session: CustomSession = await auth();

  return (
    <section>
      <div className="bg-sky-100 h-44 -mt-16 z-10">
        <div className="w-full h-full bg-gradient-to-b from-gray-500 to-transparent"></div>
      </div>
      <div className="flex px-6 pb-10 border-b">
        <div>
          <div className="relative w-fit">
            <Image
              src={user?.image || defaultAvatar}
              alt="Profile picture"
              width={100}
              height={100}
              unoptimized
              className="rounded-full border-2 border-white -mt-14 bg-white"
            />
            <div className="absolute bottom-1.5 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <p className="mt-3 font-medium text-lg">{user?.name}</p>
          <p className="text-sm text-onlyfans-light-gray">@{user?.username}</p>
        </div>
        <div className="flex items-start gap-3 ml-auto mt-5">
          {user.email === session?.user?.email ? (
            <Link
              href={"/settings"}
              className="flex items-center gap-2 p-3.5 xs:px-3 sm:px-4 xs:py-3.5 border rounded-full uppercase text-sm
             text-onlyfans-light-blue font-medium hover:text-onlyfans-blue hover:bg-sky-50
              hover:border-onlyfans-blue transition-colors duration-75"
            >
              <IoSettingsOutline className="text-xl" />
              <p className="hidden xs:block">Edit Profile</p>
            </Link>
          ) : (
            <></>
          )}
          <button
            className="flex justify-center items-center gap-2 p-3.5 border rounded-full uppercase text-sm
             text-onlyfans-light-blue font-medium hover:text-onlyfans-blue hover:bg-sky-50
              hover:border-onlyfans-blue transition-colors duration-75"
          >
            <PiShare className="text-xl scale-125" />
          </button>
        </div>
      </div>
      <GrayBar />
    </section>
  );
}
