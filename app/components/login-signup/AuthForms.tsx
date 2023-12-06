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
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

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

  const [passVisible, setPassVisible] = useState(false);

  const [errors, setErrors] = useState({
    email: [""],
    password: [""],
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
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
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
        {/* Server side error feedback */}
        {errors.email.map((error, index) => (
          <p key={index} className={`pl-4 text-red-400 text-xs mt-0.5`}>
            {error}
          </p>
        ))}
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
            Password
          </label>
          <input
            type={passVisible ? "text" : "password"}
            name="password"
            id="password"
            required
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
        {/* Server side error feedback */}
        {errors.password.map((error, index) => (
          <p key={index} className={`pl-4 text-red-400 text-xs mt-0.5`}>
            {error}
          </p>
        ))}
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
      </div>

      <button
        className={`py-2.5 mt-4 rounded-full uppercase text-white text-center text-sm font-semibold ${
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

  const [passVisible, setPassVisible] = useState(false);

  const [errors, setErrors] = useState({
    name: [""],
    email: [""],
    password: [""],
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
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            aria-label="name"
            required
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

        {/* Server side error feedback */}
        {errors.name.map((error, index) => (
          <p key={index} className={`pl-4 text-red-400 text-xs mt-0.5`}>
            {error}
          </p>
        ))}

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
            Email
          </label>
          <input
            type="email"
            name="email"
            aria-label="email"
            id="email"
            required
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

        {/* Server side error feedback */}
        {errors.email.map((error, index) => (
          <p key={index} className={`pl-4 text-red-400 text-xs mt-0.5`}>
            {error}
          </p>
        ))}

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
            Password
          </label>
          <input
            type={passVisible ? "text" : "password"}
            name="password"
            aria-label="password"
            id="password"
            required
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
        {/* Server side error feedback */}
        {errors.password.map((error, index) => (
          <p key={index} className={`pl-4 text-red-400 text-xs mt-0.5`}>
            {error}
          </p>
        ))}
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
      </div>

      <button
        type="submit"
        className={`py-2.5 mt-4 rounded-full uppercase text-white text-center text-sm font-semibold ${
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
