"use client";
import React, { useState } from "react";
import { FanIcon } from "./IconComponents";

export default function SpinningFanIcon() {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      onClick={() => setClicked(!clicked)}
      className="focus:outline-none outline-none"
      tabIndex={-1}
    >
      <FanIcon
        className={`${
          clicked ? "run" : "pause"
        } animate-spin w-full cursor-pointer -z-10`}
      />
    </button>
  );
}
