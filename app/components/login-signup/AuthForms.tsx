"use client";
import React, { useState } from "react";
import Link from "next/link";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [focus, setFocus] = useState<"email" | "password" | "">("");
  return (
    <form action="" className="flex flex-col">
      <p className="text-sm font-semibold">Log in</p>

      {/* Email */}
      <div className="relative mt-3 h-12 transition-all">
        <label
          htmlFor="email"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white  ${
            focus === "email"
              ? "text-sky-400 -top-2 text-xs ml-4"
              : loginData.email !== ""
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
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          onFocus={() => setFocus("email")}
          onBlur={() => setFocus("")}
        />
      </div>

      {/* Password */}
      <div className="relative mt-3 h-12 transition-all">
        <label
          htmlFor="password"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white  ${
            focus === "password"
              ? "text-sky-400 -top-2 text-xs ml-4"
              : loginData.password !== ""
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
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          onFocus={() => setFocus("password")}
          onBlur={() => setFocus("")}
        />
      </div>

      <button
        className={`py-2.5 mt-8 rounded-full uppercase text-white text-sm font-semibold ${
          loginData.email === "" || loginData.password === ""
            ? "bg-gray-300"
            : "bg-onlyfans-light-blue hover:opacity-80 transition-all duration-150"
        } `}
        disabled={
          loginData.email === "" || loginData.password === "" ? true : false
        }
      >
        <Link href={"/"}>Log In</Link>
      </button>
    </form>
  );
};

export const SignupForm = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [focus, setFocus] = useState<
    "name" | "email" | "password" | "confirmPass" | ""
  >("");

  return (
    <form action="" className="flex flex-col">
      <p className="text-sm font-semibold">Create your account</p>

      {/* Name */}
      <div className="relative mt-3 h-12 transition-all">
        <label
          htmlFor="name"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white  ${
            focus === "name"
              ? "text-sky-400 -top-2 text-xs ml-4"
              : signupData.email !== ""
              ? "text-gray-400 -top-2 text-xs ml-4"
              : "text-gray-400 top-1/4 text-base ml-4"
          } cursor-text select-none`}
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="border h-12 px-3 rounded-md text-onlyfans-black bg-white border-gray-300 w-full focus:outline-none outline-none focus:border-sky-400 transition-all duration-75"
          value={signupData.name}
          onChange={(e) =>
            setSignupData({ ...signupData, name: e.target.value })
          }
          onFocus={() => setFocus("name")}
          onBlur={() => setFocus("")}
        />
      </div>

      {/* Email */}
      <div className="relative mt-3 h-12 transition-all">
        <label
          htmlFor="email"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white  ${
            focus === "email"
              ? "text-sky-400 -top-2 text-xs ml-4"
              : signupData.email !== ""
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
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
          onFocus={() => setFocus("email")}
          onBlur={() => setFocus("")}
        />
      </div>

      {/* Password */}
      <div className="relative mt-3 h-12 transition-all">
        <label
          htmlFor="password"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white  ${
            focus === "password"
              ? "text-sky-400 -top-2 text-xs ml-4"
              : signupData.password !== ""
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
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
          onFocus={() => setFocus("password")}
          onBlur={() => setFocus("")}
        />
      </div>

      {/* Confirm Password */}
      <div className="relative mt-3 h-12 transition-all">
        <label
          htmlFor="confirmPass"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white  ${
            focus === "confirmPass"
              ? "text-sky-400 -top-2 text-xs ml-4"
              : signupData.password !== ""
              ? "text-gray-400 -top-2 text-xs ml-4"
              : "text-gray-400 top-1/4 text-base ml-4"
          } cursor-text select-none`}
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          className="border h-12 px-3 rounded-md text-onlyfans-black bg-white border-gray-300 w-full focus:outline-none outline-none focus:border-sky-400 transition-all duration-75"
          value={signupData.confirmPass}
          onChange={(e) =>
            setSignupData({ ...signupData, confirmPass: e.target.value })
          }
          onFocus={() => setFocus("confirmPass")}
          onBlur={() => setFocus("")}
        />
      </div>

      <button
        className={`py-2.5 mt-8 rounded-full uppercase text-white text-sm font-semibold ${
          signupData.email === "" || signupData.password === ""
            ? "bg-gray-300"
            : "bg-onlyfans-light-blue hover:opacity-80 transition-all duration-150"
        } `}
        disabled={
          signupData.email === "" || signupData.password === "" ? true : false
        }
      >
        <Link href={"/"}>Sign Up</Link>
      </button>
    </form>
  );
};
