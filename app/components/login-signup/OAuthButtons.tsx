"use client";
import React, { useState } from "react";
import { GithubLogo, GoogleIcon, TwitterIcon } from "../shared/IconComponents";
import { signIn } from "next-auth/react";
import { PulseLoader } from "react-spinners";

type OAuthTypes = "twitter" | "google" | "github";
export default function OAuthButtons() {
  const [isLoading, setIsLoading] = useState({
    twitter: false,
    google: false,
    github: false,
  });

  const handleLoadingAnimation = (provider: OAuthTypes, animate: boolean) => {
    if (provider === "twitter") {
      setIsLoading({ twitter: animate, google: false, github: false });
    }

    if (provider === "google") {
      setIsLoading({ google: animate, twitter: false, github: false });
    }

    if (provider === "github") {
      setIsLoading({ github: animate, twitter: false, google: false });
    }
  };

  const handleSignin = async (provider: OAuthTypes) => {
    handleLoadingAnimation(provider, true);

    try {
      const response = await signIn(provider, {
        redirect: false,
        callbackUrl: "/",
      });

      console.log(response);
    } catch (err) {
      handleLoadingAnimation(provider, false);
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
        <div className="flex justify-center items-center gap-2">
          {isLoading.twitter ? <p>Loading</p> : <p>Sign in with Twitter</p>}
          <PulseLoader color="#ffffff" size={6} loading={isLoading.twitter} />
        </div>
      </button>

      <button
        onClick={() => handleSignin("google")}
        className="relative py-2.5 mt-4 rounded-full bg-[#274a83] uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <GoogleIcon className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        <div className="flex justify-center items-center gap-2">
          {isLoading.google ? <p>Loading</p> : <p>Sign in with Google</p>}
          <PulseLoader color="#ffffff" size={6} loading={isLoading.google} />
        </div>
      </button>

      <button
        onClick={() => handleSignin("github")}
        className="relative py-2.5 mt-4 rounded-full bg-onlyfans-black uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <GithubLogo className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        <div className="flex justify-center items-center gap-2">
          {isLoading.github ? <p>Loading</p> : <p>Sign in with Github</p>}
          <PulseLoader color="#ffffff" size={6} loading={isLoading.github} />
        </div>
      </button>
    </div>
  );
}
