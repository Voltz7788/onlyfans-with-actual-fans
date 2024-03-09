import React from "react";
import GrayBar from "../shared/aesthetic/GrayBar";

export default function ProfileSubscribe() {
  return (
    <section className="">
      <div className="p-3">
        <p className="uppercase font-semibold text-onlyfans-black">
          Subscription
        </p>
        <button
          className="flex justify-between items-center px-6 uppercase text-white font-semibold 
          w-full h-12 rounded-full mt-3 mb-2 text-sm transition-colors duration-100 bg-onlyfans-light-blue 
          hover:bg-onlyfans-blue focus:bg-onlyfans-blue focus:outline-1"
        >
          <p>Subscribe</p>
          <p>For free</p>
        </button>
      </div>
      <GrayBar />
    </section>
  );
}
