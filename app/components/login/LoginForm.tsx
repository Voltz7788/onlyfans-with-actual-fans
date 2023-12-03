"use client";
import React, { useState } from "react";
import OAuthButtons from "./OAuthButtons";
import Link from "next/link";

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [focus, setFocus] = useState<"email" | "password" | "">();

  return (
    <div className="w-1/2 h-full flex items-center pl-44">
      <div className="max-w-[340px]">
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
