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
    <nav className="flex items-center gap-4 w-full px-6 py-4 border-b font-medium">
      <button onClick={() => router.back()}>
        <IoArrowBack className="text-2xl" />
      </button>

      <h1 className="text-lg uppercase">{pageTitle}</h1>
    </nav>
  );
}
