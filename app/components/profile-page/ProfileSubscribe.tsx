"use client";
import GrayBar from "../shared/aesthetic/GrayBar";
import { PulseLoader } from "react-spinners";
import useSubscribe from "@/app/utilities/(hooks)/data-hooks/useSubscribe";

export default function ProfileSubscribe({
  currentUsername,
}: {
  currentUsername: string;
}) {
  const { loading, subscribed, handleSubscribe } =
    useSubscribe(currentUsername);

  return (
    <section className="">
      <div className="p-3">
        <p className="uppercase font-semibold text-gray-400">Subscription</p>
        <button
          onClick={() => handleSubscribe()}
          disabled={loading ? true : false}
          className={`px-6 uppercase font-semibold 
          w-full h-12 rounded-full mt-3 mb-2 text-sm transition-colors duration-250 
           focus:outline-1 ${
             subscribed
               ? "text-onlyfans-light-blue border hover:border-onlyfans-blue hover:text-onlyfans-blue hover:bg-sky-50"
               : "text-white bg-onlyfans-light-blue hover:bg-onlyfans-blue focus:bg-onlyfans-blue"
           }`}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <PulseLoader
                color={subscribed ? "#0091ea" : "#ffffff"}
                size={7}
              />
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {subscribed ? <p>Subscribed</p> : <p>Subscribe</p>}
              <p>For free</p>
            </div>
          )}
        </button>
      </div>
      <GrayBar />
    </section>
  );
}
