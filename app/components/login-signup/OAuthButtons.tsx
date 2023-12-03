import React from "react";
import { GithubLogo, GoogleIcon, TwitterIcon } from "../shared/IconComponents";
import Link from "next/link";

export default function OAuthButtons() {
  return (
    <div className="mb-10 flex flex-col">
      <Link
        href={"/"}
        className="relative py-2.5 mt-8 rounded-full bg-[#1DA1F2] uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <TwitterIcon className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        Sign in with Twitter
      </Link>

      <Link
        href={"/"}
        className="relative py-2.5 mt-4 rounded-full bg-[#274a83] uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <GoogleIcon className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        Sign in with Google
      </Link>

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
