"use client";
import { FormEvent, useState } from "react";
import {
  isNameInvalid,
  isPasswordSignupValid,
} from "@/app/utilities/form-utilities/formRegexChecker";
import {
  labelStylingChecker,
  inputStyleChecker,
} from "@/app/utilities/form-utilities/formConditionalStyling";

export function EditProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [updatedData, setUpdatedData] = useState({
    username: "",
    name: "",
    bio: "",
    location: "",
  });

  const [focused, setFocused] = useState({
    username: false,
    name: false,
    bio: false,
    location: false,
  });

  const [invalidData, setInvalidData] = useState({
    username: false,
    name: false,
    bio: false,
    location: false,
  });

  const updateUserInfo = async (e: FormEvent) => {};

  return (
    <form onSubmit={updateUserInfo}>
      {/* Username */}
      <div className="h-16 mt-4 px-4">
        <div className="relative h-12 transition-all">
          <label
            htmlFor="username"
            className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
              {
                focused: focused.username,
                invalid: invalidData.username,
                value: updatedData.username,
              }
            )} cursor-text select-none`}
          >
            Username
          </label>

          <input
            type="text"
            name="username"
            id="username"
            aria-label="username"
            required
            aria-required="true"
            autoComplete="username"
            className={`border h-12 pl-3 pr-12 focus:pr-3 rounded-md bg-white w-full focus:outline-none outline-none transition-colors duration-75 ${inputStyleChecker(
              {
                focused: focused.username,
                invalid: invalidData.username,
                value: updatedData.username,
              }
            )}`}
            value={updatedData.username}
            onChange={(e) => {
              setUpdatedData({
                ...updatedData,
                username: e.target.value,
              });
              setInvalidData({
                ...invalidData,
                username: isNameInvalid(e.target.value),
              });
            }}
            onFocus={() => setFocused({ ...focused, username: true })}
            onBlur={() => setFocused({ ...focused, username: false })}
          />
        </div>
      </div>

      {/* Name */}
      <div className="h-16 mt-4 px-4">
        <div className="relative h-12 transition-all">
          <label
            htmlFor="name"
            className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
              {
                focused: focused.name,
                invalid: invalidData.name,
                value: updatedData.name,
              }
            )} cursor-text select-none`}
          >
            Display Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            aria-label="name"
            required
            aria-required="true"
            autoComplete="name"
            className={`border h-12 pl-3 pr-12 focus:pr-3 rounded-md bg-white w-full focus:outline-none outline-none transition-colors duration-75 ${inputStyleChecker(
              {
                focused: focused.name,
                invalid: invalidData.name,
                value: updatedData.name,
              }
            )}`}
            value={updatedData.name}
            onChange={(e) => {
              setUpdatedData({ ...updatedData, name: e.target.value });
              setInvalidData({
                ...invalidData,
                name: isNameInvalid(e.target.value),
              });
            }}
            onFocus={() => setFocused({ ...focused, name: true })}
            onBlur={() => setFocused({ ...focused, name: false })}
          />
        </div>
      </div>

      {/* Bio */}
      <div className="h-16 mt-4 px-4">
        <div className="relative h-12 transition-all">
          <label
            htmlFor="bio"
            className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
              {
                focused: focused.bio,
                invalid: invalidData.bio,
                value: updatedData.bio,
              }
            )} cursor-text select-none`}
          >
            Bio
          </label>
          <input
            type="text"
            name="bio"
            id="bio"
            aria-label="bio"
            autoComplete="bio"
            className={`border h-12 pl-3 pr-12 focus:pr-3 rounded-md bg-white w-full focus:outline-none outline-none transition-colors duration-75 ${inputStyleChecker(
              {
                focused: focused.bio,
                invalid: invalidData.bio,
                value: updatedData.bio,
              }
            )}`}
            value={updatedData.bio}
            onChange={(e) => {
              setUpdatedData({ ...updatedData, bio: e.target.value });
              setInvalidData({
                ...invalidData,
                bio: isNameInvalid(e.target.value),
              });
            }}
            onFocus={() => setFocused({ ...focused, bio: true })}
            onBlur={() => setFocused({ ...focused, bio: false })}
          />
        </div>
      </div>

      {/* Location */}
      <div className="h-16 mt-4 px-4 bor\der-b">
        <div className="relative h-12 transition-all">
          <label
            htmlFor="location"
            className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
              {
                focused: focused.location,
                invalid: invalidData.location,
                value: updatedData.location,
              }
            )} cursor-text select-none`}
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            aria-label="location"
            autoComplete="location"
            className={`border h-12 pl-3 pr-12 focus:pr-3 rounded-md bg-white w-full focus:outline-none outline-none transition-colors duration-75 ${inputStyleChecker(
              {
                focused: focused.location,
                invalid: invalidData.location,
                value: updatedData.location,
              }
            )}`}
            value={updatedData.location}
            onChange={(e) => {
              setUpdatedData({ ...updatedData, location: e.target.value });
              setInvalidData({
                ...invalidData,
                location: isNameInvalid(e.target.value),
              });
            }}
            onFocus={() => setFocused({ ...focused, location: true })}
            onBlur={() => setFocused({ ...focused, location: false })}
          />
        </div>
      </div>
    </form>
  );
}

export function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [updatedData, setUpdatedData] = useState({
    password: "",
    confirmPass: "",
  });

  const [focused, setFocused] = useState({
    password: false,
    confirmPass: false,
  });

  const [invalidData, setInvalidData] = useState({
    password: false,
    confirmPass: false,
  });

  const [passVisible, setPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);

  const updatePassword = async (e: FormEvent) => {};

  return (
    <form onSubmit={updatePassword}>
      {/* Password */}
      <div className="h-16 mt-4 px-4">
        <div className="relative h-12 transition-all">
          <label
            htmlFor="password"
            className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
              {
                focused: focused.password,
                invalid: invalidData.password,
                value: updatedData.password,
              }
            )} cursor-text select-none`}
          >
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            aria-label="password"
            required
            aria-required="true"
            autoComplete="password"
            className={`border h-12 pl-3 pr-12 focus:pr-3 rounded-md bg-white w-full focus:outline-none outline-none transition-colors duration-75 ${inputStyleChecker(
              {
                focused: focused.password,
                invalid: invalidData.password,
                value: updatedData.password,
              }
            )}`}
            value={updatedData.password}
            onChange={(e) => {
              setUpdatedData({ ...updatedData, password: e.target.value });
              setInvalidData({
                ...invalidData,
                password: isPasswordSignupValid(e.target.value),
              });
            }}
            onFocus={() => setFocused({ ...focused, password: true })}
            onBlur={() => setFocused({ ...focused, password: false })}
          />
        </div>
      </div>

      {/* ConfirmPass */}
      <div className="h-16 mt-4 px-4">
        <div className="relative h-12 transition-all">
          <label
            htmlFor="confirmPass"
            className={`absolute text-center transition-all duration-75 w-fit px-0.5 bg-white ml-4 ${labelStylingChecker(
              {
                focused: focused.confirmPass,
                invalid: invalidData.confirmPass,
                value: updatedData.confirmPass,
              }
            )} cursor-text select-none`}
          >
            Confirm Password
          </label>
          <input
            type="text"
            name="confirmPass"
            id="confirmPass"
            aria-label="confirmPass"
            required
            aria-required="true"
            autoComplete="confirmPass"
            className={`border h-12 pl-3 pr-12 focus:pr-3 rounded-md bg-white w-full focus:outline-none outline-none transition-colors duration-75 ${inputStyleChecker(
              {
                focused: focused.confirmPass,
                invalid: invalidData.confirmPass,
                value: updatedData.confirmPass,
              }
            )}`}
            value={updatedData.confirmPass}
            onChange={(e) => {
              setUpdatedData({ ...updatedData, confirmPass: e.target.value });
              setInvalidData({
                ...invalidData,
                confirmPass: isPasswordSignupValid(e.target.value),
              });
            }}
            onFocus={() => setFocused({ ...focused, confirmPass: true })}
            onBlur={() => setFocused({ ...focused, confirmPass: false })}
          />
        </div>
      </div>
    </form>
  );
}
