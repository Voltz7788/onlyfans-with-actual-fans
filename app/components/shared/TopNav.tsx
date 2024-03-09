"use client";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import useSolidHeader from "@/app/utilities/(hooks)/ui-hooks/useSolidHeader";
import { CustomUser } from "@/@types/types";

type TopNavProps = {
  pageTitle: string;
  user?: CustomUser;
};

export default function TopNav({ pageTitle, user }: TopNavProps) {
  const router = useRouter();

  const { solidHeader } = useSolidHeader();

  return (
    <nav
      className={`w-full left-0 xl:flex sticky z-10 top-0 transition-colors duration-100 ${
        pageTitle === "Profile" && !solidHeader
          ? "bg-transparent"
          : "bg-white border-b"
      }`}
    >
      <div
        className={`flex items-center gap-4 h-16 px-6 py-4 font-medium ${
          pageTitle === "Profile" ? "bg-transparent" : "bg-white"
        }`}
      >
        {pageTitle.toLowerCase() === "home" ? (
          <></>
        ) : (
          <button
            onClick={() => router.back()}
            aria-label="Go to previous page"
          >
            <IoArrowBack
              className={`text-2xl ${
                pageTitle === "Profile" && !solidHeader
                  ? "text-white"
                  : "text-onlyfans-black"
              }`}
            />
          </button>
        )}
        <h1
          className={`text-lg ${
            pageTitle === "Profile" && !solidHeader
              ? "text-white capitalize"
              : ""
          }`}
        >
          {pageTitle === "Profile" ? user?.name : pageTitle}
        </h1>
      </div>
    </nav>
  );
}
