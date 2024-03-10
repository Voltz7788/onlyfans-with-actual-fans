"use client";
import GrayBar from "../shared/aesthetic/GrayBar";
import SubscribeButton from "../subscriptions-page/SubscribeButton";
import { useParams } from "next/navigation";
import { useProfileSubscribe } from "@/app/utilities/(hooks)/data-hooks/useSubscribe";

export default function ProfileSubscribe({
  currentUsername,
  isSubscribedDB,
}: {
  isSubscribedDB: boolean;
  currentUsername: string;
}) {
  const params = useParams<{ userSlug: string }>();
  const { loading, subscribed, handleSubscription } = useProfileSubscribe(
    currentUsername,
    params.userSlug,
    isSubscribedDB
  );
  return (
    <section className="">
      <div className="p-3">
        <p className="uppercase font-semibold text-gray-400">Subscription</p>
        <SubscribeButton
          loading={loading}
          subscribed={subscribed}
          handleSubscription={handleSubscription}
        />
      </div>
      <GrayBar />
    </section>
  );
}
