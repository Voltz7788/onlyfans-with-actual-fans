"use client";
import React, { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { tailChase } from "ldrs";
import type {} from "ldrs";

export const LoginForm = () => {
  const router = useRouter();

  tailChase.register("submit-loader");
  const [isLoading, setIsLoading] = useState(false);

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

  const [passVisible, setPassVisible] = useState(false);

  const searchParams = useSearchParams();

  const [serverErrors, setServerErrors] = useState({
    general: "",
    OAuth: searchParams.get("error"),
  });

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      });

      if (response?.status === 200) {
        router.push("/");
      }

      if (response?.error) {
        setServerErrors({ ...serverErrors, general: response.error });
      }
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={loginUser} className="flex flex-col">
      <p className="text-sm font-medium text-onlyfans-black">Log in</p>

      <p className="text-xs text-onlyfans-light-gray mt-3">
        <span className="text-red-400">*</span> Required information
      </p>

      {/* Email */}
      <div className="h-16 mt-4">
        <div className="relative h-12 transition-all">
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
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            aria-required="true"
            className={`border h-12 pl-3 pr-12 focus:pr-3 rounded-md bg-white w-full focus:outline-none outline-none transition-colors duration-75 ${inputStyleChecker(
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
              setServerErrors({ general: "", OAuth: "" });
            }}
            onFocus={() => setFocused({ ...focused, email: true })}
            onBlur={() => setFocused({ ...focused, email: false })}
          />
          <div className="absolute flex gap-2 top-1/4 right-4 text-2xl">
            <IoWarningOutline
              className={`text-red-400 ${
                showWarningChecker({
                  focused: focused.email,
                  invalid: invalidData.email,
                })
                  ? "block"
                  : "hidden"
              }`}
            />
          </div>
        </div>

        {/* Client side error feedback */}
        {loginData.email === "" && !focused.email && invalidData.email ? (
          <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
            Email is required.
          </p>
        ) : !focused.email && invalidData.email ? (
          <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
            Please enter a valid email.
          </p>
        ) : (
          <></>
        )}
      </div>

      {/* Password */}
      <div className="h-16 mt-3">
        <div className="relative h-12 transition-all">
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
            Password <span className="text-red-400">*</span>
          </label>
          <input
            type={passVisible ? "text" : "password"}
            name="password"
            id="password"
            required
            aria-required="true"
            className={`border h-12 pl-3 focus:pr-14 rounded-md bg-white w-full focus:outline-none outline-none transition-all duration-75 ${inputStyleChecker(
              {
                focused: focused.password,
                invalid: invalidData.password,
                value: loginData.password,
              }
            )} ${invalidData.password ? "pr-20" : "pr-14"}`}
            value={loginData.password}
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
              setInvalidData({
                ...invalidData,
                password: isPasswordLoginValid(e.target.value),
              });
              setServerErrors({ general: "", OAuth: "" });
            }}
            onFocus={() => setFocused({ ...focused, password: true })}
            onBlur={() => setFocused({ ...focused, password: false })}
          />
          <div className="absolute flex gap-2 top-1/4 right-4 text-2xl">
            <button
              type="button"
              className="text-onlyfans-light-gray text-3xl -mt-0.5 hover:text-onlyfans-light-blue transition-colors duration-75 rounded-full hover:bg-sky-50"
              onClick={(e) => setPassVisible(!passVisible)}
            >
              {passVisible ? (
                <AiOutlineEyeInvisible className="p-0.5" />
              ) : (
                <AiOutlineEye className="p-0.5" />
              )}
            </button>
            <IoWarningOutline
              className={`text-red-400  ${
                showWarningChecker({
                  focused: focused.password,
                  invalid: invalidData.password,
                })
                  ? "block"
                  : "hidden"
              }`}
            />
          </div>
        </div>

        {/* Client side error feedback */}
        {loginData.password === "" &&
        !focused.password &&
        invalidData.password ? (
          <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
            Password is required.
          </p>
        ) : (
          <></>
        )}

        {/* Server side error feedback */}
        <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
          {serverErrors.general}
        </p>
        <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
          {serverErrors.OAuth
            ? "This email is already associated with a user. Please login with the correct social account."
            : ""}
        </p>
      </div>

      <button
        className={`py-2.5 mt-6 flex justify-center items-center gap-3 rounded-full uppercase text-white text-center text-sm font-semibold transition-all duration-75 ${
          isLoginSubmittable(loginData, invalidData)
            ? "bg-gray-300 pointer-events-none select-none"
            : isLoading
            ? "bg-onlyfans-blue"
            : "bg-onlyfans-light-blue hover:opacity-80"
        } `}
      >
        <p>{isLoading ? "Loading" : "Log In"}</p>
        {/* @ts-ignore */}
        {isLoading && <submit-loader color="white" size="16"></submit-loader>}
      </button>
    </form>
  );
};

export const SignupForm = () => {
  const router = useRouter();

  tailChase.register("submit-loader");
  const [isLoading, setIsLoading] = useState(false);

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

  const [passVisible, setPassVisible] = useState(false);

  const searchParams = useSearchParams();

  const [serverErrors, setServerErrors] = useState({
    general: "",
    OAuth: searchParams.get("error"),
  });

  const signupUser = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/signup", signupData);

      if (response.status === 200) {
        const loginResponse = await signIn("credentials", {
          email: signupData.email,
          password: signupData.password,
          redirect: false,
        });

        if (loginResponse?.status === 200) {
          router.push("/");
        }
      }
    } catch (err: any) {
      setServerErrors({ ...serverErrors, general: err.response.statusText });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={signupUser} className="flex flex-col">
      <p className="text-sm font-medium text-onlyfans-black">
        Create your account
      </p>

      <p className="text-xs text-onlyfans-light-gray mt-3">
        <span className="text-red-400">*</span> Required information
      </p>

      {/* Name */}
      <div className="h-16 mt-4">
        <div className="relative h-12 transition-all">
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
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            aria-label="name"
            required
            aria-required="true"
            className={`border h-12 pl-3 pr-12 focus:pr-3 rounded-md bg-white w-full focus:outline-none outline-none transition-colors duration-75 ${inputStyleChecker(
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
              setServerErrors({ general: "", OAuth: "" });
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

        {/* Client side error feedback */}
        {signupData.name === "" && !focused.name && invalidData.name ? (
          <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
            Name is required.
          </p>
        ) : !focused.name && invalidData.name ? (
          <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
            Please only use alphabetical characters.
          </p>
        ) : (
          <></>
        )}
      </div>

      {/* Email */}
      <div className="h-16 mt-3">
        <div className="relative h-12 transition-all">
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
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            aria-label="email"
            id="email"
            required
            aria-required="true"
            className={`border h-12 pl-3 pr-12 focus:pr-3 rounded-md bg-white w-full focus:outline-none outline-none transition-colors duration-75 ${inputStyleChecker(
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
              setServerErrors({ general: "", OAuth: "" });
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

        {/* Client side error feedback */}
        {signupData.email === "" && !focused.email && invalidData.email ? (
          <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
            Email is required.
          </p>
        ) : !focused.email && invalidData.email ? (
          <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
            Please enter a valid email.
          </p>
        ) : (
          <></>
        )}
      </div>

      {/* Password */}
      <div className="h-16 mt-3">
        <div className="relative h-12 transition-all">
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
            Password <span className="text-red-400">*</span>
          </label>
          <input
            type={passVisible ? "text" : "password"}
            name="password"
            aria-label="password"
            id="password"
            required
            aria-required="true"
            className={`border h-12 pl-3 focus:pr-14 rounded-md bg-white w-full focus:outline-none outline-none transition-all duration-75 ${inputStyleChecker(
              {
                focused: focused.password,
                invalid: invalidData.password,
                value: signupData.password,
              }
            )} ${invalidData.password ? "pr-20" : "pr-14"}`}
            value={signupData.password}
            onChange={(e) => {
              setSignupData({ ...signupData, password: e.target.value });
              setInvalidData({
                ...invalidData,
                password: isPasswordSignupValid(e.target.value),
              });
              setServerErrors({ general: "", OAuth: "" });
            }}
            onFocus={() => setFocused({ ...focused, password: true })}
            onBlur={() => setFocused({ ...focused, password: false })}
          />
          <div className="absolute flex gap-2 top-1/4 right-4 text-2xl">
            <button
              type="button"
              className="text-onlyfans-light-gray text-3xl -mt-0.5 hover:text-onlyfans-light-blue transition-colors duration-75 rounded-full hover:bg-sky-50"
              onClick={(e) => setPassVisible(!passVisible)}
            >
              {passVisible ? (
                <AiOutlineEyeInvisible className="p-0.5" />
              ) : (
                <AiOutlineEye className="p-0.5" />
              )}
            </button>
            <IoWarningOutline
              className={`text-red-400  ${
                showWarningChecker({
                  focused: focused.password,
                  invalid: invalidData.password,
                })
                  ? "block"
                  : "hidden"
              }`}
            />
          </div>
        </div>

        {/* Client side error feedback */}
        {signupData.password === "" &&
        !focused.password &&
        invalidData.password ? (
          <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
            Password is required.
          </p>
        ) : signupData.password.length < 6 &&
          !focused.password &&
          invalidData.password ? (
          <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
            Password must be at least 6 characters.
          </p>
        ) : (
          <></>
        )}

        {/* Server side error feedback */}
        <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
          {serverErrors.general}
        </p>
        <p className={`pl-4 text-red-400 text-xs mt-0.5`}>
          {serverErrors.OAuth
            ? "This email is already associated with a user. Please login with the correct social account."
            : ""}
        </p>
      </div>

      <button
        className={`py-2.5 mt-6 flex justify-center items-center gap-3 rounded-full uppercase text-white text-center text-sm font-semibold transition-all duration-75 ${
          isSignupSubmittable(signupData, invalidData)
            ? "bg-gray-300 pointer-events-none select-none"
            : isLoading
            ? "bg-onlyfans-blue"
            : "bg-onlyfans-light-blue hover:opacity-80"
        } `}
      >
        <p>{isLoading ? "Loading" : "Sign Up"}</p>
        {/* @ts-ignore */}
        {isLoading && <submit-loader color="white" size="16"></submit-loader>}
      </button>
    </form>
  );
};
