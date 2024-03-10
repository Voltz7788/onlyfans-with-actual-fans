"use client";
import { PulseLoader } from "react-spinners";

type SubscribeButtonProps = {
  loading: boolean;
  subscribed: boolean;
  handleSubscription: (action: "unsubscribe" | "subscribe") => void;
};

export default function SubscribeButton({
  loading,
  subscribed,
  handleSubscription,
}: SubscribeButtonProps) {
  return (
    <button
      onClick={() =>
        handleSubscription(subscribed ? "unsubscribe" : "subscribe")
      }
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
          <PulseLoader color={subscribed ? "#0091ea" : "#ffffff"} size={7} />
        </div>
      ) : (
        <div className="flex justify-between items-center">
          {subscribed ? <p>Subscribed</p> : <p>Subscribe</p>}
          <p>For free</p>
        </div>
      )}
    </button>
  );
}
