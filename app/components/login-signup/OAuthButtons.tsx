"use client";
import React from "react";
import { GithubLogo, GoogleIcon, TwitterIcon } from "../shared/IconComponents";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function OAuthButtons() {
  const handleGoogleSignin = () => {
    signIn("google");
  };

  return (
    <div className="mb-10 flex flex-col">
      <Link
        href={"/"}
        className="relative py-2.5 mt-8 rounded-full bg-[#1DA1F2] uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <TwitterIcon className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        Sign in with Twitter
      </Link>

      <button
        onClick={handleGoogleSignin}
        className="relative py-2.5 mt-4 rounded-full bg-[#274a83] uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <GoogleIcon className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        Sign in with Google
      </button>

      <Link
        href={"/"}
        className="relative py-2.5 mt-4 rounded-full bg-onlyfans-black uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <GithubLogo className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        Sign in with Github
      </Link>
    </div>
  );
}
