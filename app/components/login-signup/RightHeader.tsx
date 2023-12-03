import React, { ReactNode } from "react";
import OAuthButtons from "./OAuthButtons";
import Link from "next/link";
import { LoginForm, SignupForm } from "./AuthForms";
import { PiFanFill } from "react-icons/pi";

export default function RightHeader({ children }: { children: ReactNode }) {
  return (
    <div className="w-full border md:w-1/2 sm:flex items-center  md:-mt-10 justify-center lg:justify-start md:px-2 lg:mx-0 lg:pl-32 xl:pl-44">
      <div className="max-w-[340px] w-full mx-auto md:mx-0 px-4 md:px-0">
        {children}
      </div>
    </div>
  );
}

const HeaderText = () => {
  return (
    <div className="md:hidden pt-16 pb-10 gap-2">
      <div className="flex">
        <PiFanFill className="text-5xl text-onlyfans-blue" />
        <div className="">
          <h1 className="text-4xl font-semibold text-onlyfans-blue">
            <span className="text-onlyfans-light-blue">Only</span>Fans
          </h1>
          <p className="text-xl text-onlyfans-light-gray">
            {" "}
            (but with actual fans)
          </p>
        </div>
      </div>
      <p className="flex justify-end text-onlyfans-black md:w-80 text-xl md:text-3xl mt-4">
        Sign up to support your favourite creators
      </p>
    </div>
  );
};

const SignupLink = () => {
  return (
    <Link href={"/signup"}>
      <p className="text-onlyfans-light-blue text-sm text-center mt-8">
        Sign up for OnlyFans
      </p>
    </Link>
  );
};

const LoginLink = () => {
  return (
    <Link href={"/login"}>
      <p className="text-onlyfans-black text-sm text-center mt-8">
        Already have an account?{" "}
        <span className="text-onlyfans-light-blue">Log in</span>
      </p>
    </Link>
  );
};

const SignupDisclaimer = () => {
  return (
    <p className="text-center text-xs text-onlyfans-light-gray mt-3">
      By signing up you agree to our{" "}
      <Link
        href={
          "https://www.youtube.com/watch?v=Tt7bzxurJ1I&ab_channel=WalfArchives"
        }
        target="_blank"
        className="text-sky-400"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href={
          "https://www.youtube.com/watch?v=CoZFa7uQHbk&ab_channel=NorthernHurricane7"
        }
        target="_blank"
        className="text-sky-400"
      >
        Privacy Policy
      </Link>
      , and confirm that you are at least 18 years old.
    </p>
  );
};

RightHeader.HeaderText = HeaderText;
RightHeader.SignupForm = SignupForm;
RightHeader.LoginForm = LoginForm;
RightHeader.SignupLink = SignupLink;
RightHeader.LoginLink = LoginLink;
RightHeader.OAuthButtons = OAuthButtons;
RightHeader.SignupDisclaimer = SignupDisclaimer;
