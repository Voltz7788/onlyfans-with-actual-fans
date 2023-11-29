"use client";
import React from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

type TopNavProps = {
  pageTitle: string;
};

export default function TopNav({ pageTitle }: TopNavProps) {
  const router = useRouter();
  return (
    <nav className="fixed w-full left-0 xl:flex xl:justify-center">
      <div className="sm:ml-[70px] lg:ml-[300px] xl:m-0 flex xl:w-1/3 border-x items-center gap-4 h-16 px-6 py-4 border-b font-medium bg-white">
        {pageTitle === "home" ? (
          <></>
        ) : (
          <button
            onClick={() => router.back()}
            aria-label="Go to previous page"
          >
            <IoArrowBack className="text-2xl" />
          </button>
        )}
        <h1 className="text-lg uppercase">{pageTitle}</h1>
      </div>
    </nav>
  );
}
