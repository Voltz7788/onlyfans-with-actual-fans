"use client";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";

type TopNavProps = {
  pageTitle: string;
  session: Session;
};

export default function TopNav({ pageTitle, session }: TopNavProps) {
  const router = useRouter();
  return (
    <nav
      className={`w-full left-0 xl:flex sticky top-0 ${
        pageTitle === "Profile" ? "bg-transparent" : "bg-white border-b"
      }`}
    >
      <div
        className={`flex items-center gap-4 h-16 px-6 py-4 font-medium ${
          pageTitle === "Profile" ? "bg-transparent" : "bg-white"
        }`}
      >
        {pageTitle === "home" ? (
          <></>
        ) : (
          <button
            onClick={() => router.back()}
            aria-label="Go to previous page"
          >
            <IoArrowBack
              className={`text-2xl ${
                pageTitle === "Profile" ? "text-white" : ""
              }`}
            />
          </button>
        )}
        <h1
          className={`text-lg ${
            pageTitle === "Profile" ? "text-white" : "uppercase"
          }`}
        >
          {pageTitle === "Profile" ? session.user?.name : pageTitle}
        </h1>
      </div>
    </nav>
  );
}
