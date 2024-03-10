"use client";
import { useState } from "react";
import GrayBar from "../shared/aesthetic/GrayBar";

export default function ProfileSubscribe() {
  const [subscribed, setSubscribed] = useState(true);
  return (
    <section className="">
      <div className="p-3">
        <p className="uppercase font-semibold text-gray-400">Subscription</p>
        <button
          onClick={() => setSubscribed(!subscribed)}
          className={`flex justify-between items-center px-6 uppercase font-semibold 
          w-full h-12 rounded-full mt-3 mb-2 text-sm transition-colors duration-250 
           focus:outline-1 ${
             subscribed
               ? "text-onlyfans-light-blue border hover:border-onlyfans-blue hover:text-onlyfans-blue hover:bg-sky-50"
               : "text-white bg-onlyfans-light-blue hover:bg-onlyfans-blue focus:bg-onlyfans-blue"
           }`}
        >
          {subscribed ? <p>Subscribed</p> : <p>Subscribe</p>}
          <p>For free</p>
        </button>
      </div>
      <GrayBar />
    </section>
  );
}
