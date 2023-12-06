"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import {
  isNameInvalid,
  isEmailInvalid,
  isPasswordLoginValid,
  isPasswordSignupValid,
} from "@/app/utilities/form-utilities/formRegexChecker";
import {
  inputStyleChecker,
  labelStylingChecker,
  showWarningChecker,
} from "@/app/utilities/form-utilities/formConditionalStyling";
import {
  isLoginSubmittable,
  isSignupSubmittable,
} from "@/app/utilities/form-utilities/formSubmitChecker";
import { IoWarningOutline } from "react-icons/io5";

export const LoginForm = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [focused, setFocused] = useState({
    email: false,
    password: false,
  });

  const [invalidData, setInvalidData] = useState({
    email: false,
    password: false,
  });

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      });

      if (!response?.ok) throw new Error(response?.error!);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={loginUser} className="flex flex-col">
      <p className="text-sm font-medium text-onlyfans-black">Log in</p>

      {/* Email */}
      <div className="relative mt-3 h-12 transition-all">
        <label
          htmlFor="email"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
            {
              focused: focused.email,
              invalid: invalidData.email,
              value: loginData.email,
            }
          )} cursor-text select-none`}
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className={`border h-12 px-3 rounded-md bg-white w-full focus:outline-none outline-none transition-all duration-75 ${inputStyleChecker(
            {
              focused: focused.email,
              invalid: invalidData.email,
              value: loginData.email,
            }
          )}`}
          onChange={(e) => {
            setLoginData({ ...loginData, email: e.target.value });
            setInvalidData({
              ...invalidData,
              email: isEmailInvalid(e.target.value),
            });
          }}
          onFocus={() => setFocused({ ...focused, email: true })}
          onBlur={() => setFocused({ ...focused, email: false })}
        />
        <IoWarningOutline
          className={`absolute top-1/4 right-4 text-2xl text-red-400 ${
            showWarningChecker({
              focused: focused.email,
              invalid: invalidData.email,
            })
              ? "block"
              : "hidden"
          }`}
        />
      </div>

      {/* Password */}
      <div className="relative mt-3 h-12 transition-all">
        <label
          htmlFor="password"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
            {
              focused: focused.password,
              invalid: invalidData.password,
              value: loginData.password,
            }
          )} cursor-text select-none`}
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className={`border h-12 px-3 rounded-md bg-white w-full focus:outline-none outline-none transition-all duration-75 ${inputStyleChecker(
            {
              focused: focused.password,
              invalid: invalidData.password,
              value: loginData.password,
            }
          )}`}
          value={loginData.password}
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.target.value });
            setInvalidData({
              ...invalidData,
              password: isPasswordLoginValid(e.target.value),
            });
          }}
          onFocus={() => setFocused({ ...focused, password: true })}
          onBlur={() => setFocused({ ...focused, password: false })}
        />
        <IoWarningOutline
          className={`absolute top-1/4 right-4 text-2xl text-red-400 ${
            showWarningChecker({
              focused: focused.password,
              invalid: invalidData.password,
            })
              ? "block"
              : "hidden"
          }`}
        />
      </div>

      <button
        className={`py-2.5 mt-8 rounded-full uppercase text-white text-center text-sm font-semibold ${
          isLoginSubmittable(loginData, invalidData)
            ? "bg-gray-300 pointer-events-none select-none"
            : "bg-onlyfans-light-blue hover:opacity-80 transition-all duration-150"
        } `}
      >
        Log In
      </button>
    </form>
  );
};

export const SignupForm = () => {
  const router = useRouter();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [invalidData, setInvalidData] = useState({
    name: false,
    email: false,
    password: false,
  });

  const signupUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", signupData);
      console.log(response.status, response.statusText);
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={signupUser} className="flex flex-col">
      <p className="text-sm font-medium text-onlyfans-black">
        Create your account
      </p>

      {/* Name */}
      <div className="relative mt-3 h-12 transition-all">
        <label
          htmlFor="name"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
            {
              focused: focused.name,
              invalid: invalidData.name,
              value: signupData.name,
            }
          )} cursor-text select-none`}
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          aria-label="name"
          required
          className={`border h-12 px-3 rounded-md bg-white w-full focus:outline-none outline-none transition-all duration-75 ${inputStyleChecker(
            {
              focused: focused.name,
              invalid: invalidData.name,
              value: signupData.name,
            }
          )}`}
          value={signupData.name}
          onChange={(e) => {
            setSignupData({ ...signupData, name: e.target.value });
            setInvalidData({
              ...invalidData,
              name: isNameInvalid(e.target.value),
            });
          }}
          onFocus={() => setFocused({ ...focused, name: true })}
          onBlur={() => setFocused({ ...focused, name: false })}
        />
        <IoWarningOutline
          className={`absolute top-1/4 right-4 text-2xl text-red-400 ${
            showWarningChecker({
              focused: focused.name,
              invalid: invalidData.name,
            })
              ? "block"
              : "hidden"
          }`}
        />
      </div>

      {/* Email */}
      <div className="relative mt-3 h-12 transition-all">
        <label
          htmlFor="email"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
            {
              focused: focused.email,
              invalid: invalidData.email,
              value: signupData.email,
            }
          )} cursor-text select-none`}
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          aria-label="email"
          id="email"
          required
          className={`border h-12 px-3 rounded-md bg-white w-full focus:outline-none outline-none transition-all duration-75 ${inputStyleChecker(
            {
              focused: focused.email,
              invalid: invalidData.email,
              value: signupData.email,
            }
          )}`}
          value={signupData.email}
          onChange={(e) => {
            setSignupData({ ...signupData, email: e.target.value });
            setInvalidData({
              ...invalidData,
              email: isEmailInvalid(e.target.value),
            });
          }}
          onFocus={() => setFocused({ ...focused, email: true })}
          onBlur={() => setFocused({ ...focused, email: false })}
        />
        <IoWarningOutline
          className={`absolute top-1/4 right-4 text-2xl text-red-400 ${
            showWarningChecker({
              focused: focused.email,
              invalid: invalidData.email,
            })
              ? "block"
              : "hidden"
          }`}
        />
      </div>

      {/* Password */}
      <div className="relative mt-3 h-12 transition-all border">
        <label
          htmlFor="password"
          className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
            {
              focused: focused.password,
              invalid: invalidData.password,
              value: signupData.password,
            }
          )} cursor-text select-none`}
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          aria-label="password"
          id="password"
          required
          className={`border h-12 px-3 rounded-md bg-white w-full focus:outline-none outline-none transition-all duration-75 ${inputStyleChecker(
            {
              focused: focused.password,
              invalid: invalidData.password,
              value: signupData.password,
            }
          )}`}
          value={signupData.password}
          onChange={(e) => {
            setSignupData({ ...signupData, password: e.target.value });
            setInvalidData({
              ...invalidData,
              password: isPasswordSignupValid(e.target.value),
            });
          }}
          onFocus={() => setFocused({ ...focused, password: true })}
          onBlur={() => setFocused({ ...focused, password: false })}
        />
        <IoWarningOutline
          className={`absolute top-1/4 right-4 text-2xl text-red-400 ${
            showWarningChecker({
              focused: focused.password,
              invalid: invalidData.password,
            })
              ? "block"
              : "hidden"
          }`}
        />
      </div>

      <button
        type="submit"
        className={`py-2.5 mt-8 rounded-full uppercase text-white text-center text-sm font-semibold ${
          isSignupSubmittable(signupData, invalidData)
            ? "bg-gray-300 pointer-events-none select-none"
            : "bg-onlyfans-light-blue hover:opacity-80 transition-all duration-150"
        } `}
      >
        Sign Up
      </button>
    </form>
  );
};
