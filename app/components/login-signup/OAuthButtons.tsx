"use client";
import React from "react";
import { GithubLogo, GoogleIcon, TwitterIcon } from "../shared/IconComponents";
import { signIn } from "next-auth/react";

type OAuthTypes = "twitter" | "google" | "github";

export default function OAuthButtons() {
  const handleSignin = async (provider: OAuthTypes) => {
    try {
      const response = await signIn(provider, {
        redirect: false,
        callbackUrl: "/",
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-10 flex flex-col">
      <button
        onClick={() => handleSignin("twitter")}
        className="relative py-2.5 mt-8 rounded-full bg-[#1DA1F2] uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <TwitterIcon className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        Sign in with Twitter
      </button>

      <button
        onClick={() => handleSignin("google")}
        className="relative py-2.5 mt-4 rounded-full bg-[#274a83] uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <GoogleIcon className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        Sign in with Google
      </button>

      <button
        onClick={() => handleSignin("github")}
        className="relative py-2.5 mt-4 rounded-full bg-onlyfans-black uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <GithubLogo className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        Sign in with Github
      </button>
    </div>
  );
}
