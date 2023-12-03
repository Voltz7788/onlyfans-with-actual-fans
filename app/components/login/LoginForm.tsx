"use client";
import React, { useState } from "react";
import OAuthButtons from "./OAuthButtons";
import Link from "next/link";
import { PiFanFill } from "react-icons/pi";

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [focus, setFocus] = useState<"email" | "password" | "">();

  return (
    <div className="px-1 md:w-1/2 flex items-center md:-mt-10 justify-center lg:justify-start mx-auto md:mx-2 lg:mx-0 lg:pl-32 xl:pl-44">
      <div className="max-w-[280px] sm:max-w-[340px]">
        <HeaderText />
        <form action="" className="flex flex-col">
          <p className="text-sm font-semibold">Log in</p>
          <div className="relative mt-3 h-12 transition-all">
            <label
              htmlFor="email"
              className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white  ${
                focus === "email"
                  ? "text-sky-400 -top-2 text-xs ml-4"
                  : data.email !== ""
                  ? "text-gray-400 -top-2 text-xs ml-4"
                  : "text-gray-400 top-1/4 text-base ml-4"
              } cursor-text select-none`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="border h-12 px-3 rounded-md text-onlyfans-black bg-white border-gray-300 w-full focus:outline-none outline-none focus:border-sky-400 transition-all duration-75"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              onFocus={() => setFocus("email")}
              onBlur={() => setFocus("")}
            />
          </div>
          <div className="relative mt-3 h-12 transition-all">
            <label
              htmlFor="password"
              className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white  ${
                focus === "password"
                  ? "text-sky-400 -top-2 text-xs ml-4"
                  : data.password !== ""
                  ? "text-gray-400 -top-2 text-xs ml-4"
                  : "text-gray-400 top-1/4 text-base ml-4"
              } cursor-text select-none`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="border h-12 px-3 rounded-md text-onlyfans-black bg-white border-gray-300 w-full focus:outline-none outline-none focus:border-sky-400 transition-all duration-75"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              onFocus={() => setFocus("password")}
              onBlur={() => setFocus("")}
            />
          </div>

          <button
            className={`py-2.5 mt-8 rounded-full uppercase text-white text-sm font-semibold ${
              data.email === "" || data.password === ""
                ? "bg-gray-300"
                : "bg-onlyfans-light-blue hover:opacity-80 transition-all duration-150"
            } `}
            disabled={data.email === "" || data.password === "" ? true : false}
          >
            <Link href={"/"}>Log In</Link>
          </button>
        </form>

        <Link href={"/"}>
          <p className="text-onlyfans-light-blue text-sm text-center mt-8">
            Sign up for OnlyFans
          </p>
        </Link>
        <OAuthButtons />
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
          <h1 className="text-4xl font-medium text-onlyfans-blue">
            <span className="text-onlyfans-light-blue">Only</span>Fans
          </h1>
          <p className="text-xl text-onlyfans-light-gray">
            {" "}
            (but with actual fans)
          </p>
        </div>
      </div>
      <p className="flex justify-end text-onlyfans-black w-80 text-xl md:text-3xl mt-4">
        Sign up to support your favourite creators
      </p>
    </div>
  );
};
