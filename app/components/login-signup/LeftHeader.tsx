import React from "react";
import { FanIcon } from "../shared/IconComponents";
import { PiFanFill } from "react-icons/pi";
import SpinningFanIcon from "../shared/SpinningFanIcon";

export default function LeftHeader() {
  return (
    <div className="hidden md:block relative bg-onlyfans-light-blue w-1/2">
      <div className="ml-auto md:mx-auto xl:mr-44 w-80 pt-20 gap-2">
        <div className="flex">
          <PiFanFill className="text-5xl text-white" />
          <div className="">
            <h1 className="text-4xl font-semibold text-white">
              <span className="text-gray-200">Only</span>Fans
            </h1>
            <p className="text-xl text-white"> (but with actual fans)</p>
          </div>
        </div>
        <p className="flex justify-end text-white w-80 text-3xl mt-4">
          Sign up to support your favourite creators
        </p>
      </div>

      <SpinningFanIcon />
    </div>
  );
}
