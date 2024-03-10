"use client";
import { CustomSession } from "@/@types/types";
import Image from "next/image";
import defaultAvatar from "../../../public/defaultAvatar.png";
import SubscribeButton from "./SubscribeButton";
import type { User } from "@prisma/client";
import { useSubscribe } from "@/app/utilities/(hooks)/data-hooks/useSubscribe";

export default function SubscriptionPanel({
  sub,
  session,
}: {
  sub: User;
  session: CustomSession;
}) {
  const { loading, subscribed, handleSubscription } = useSubscribe(
    session?.user?.username!,
    sub.username!,
    true
  );
  return (
    <section className="rounded-md bg-off-white border">
      <div className="bg-sky-100 h-20 z-10 rounded-md">
        <div className="w-full h-full bg-gradient-to-b from-gray-500 to-transparent rounded-md"></div>
      </div>
      <div>
        <div className="px-4">
          <div className="flex items-end gap-2 relative w-fit -mt-9">
            <Image
              src={sub.image || defaultAvatar}
              alt="Profile picture"
              width={90}
              height={90}
              unoptimized
              className="rounded-full border-2 border-white bg-white"
            />
            <div>
              <p className="mt-3 font-medium text-lg">{sub.name}</p>
              <p className="text-sm text-onlyfans-light-gray">
                @{sub.username}
              </p>
              <p>{sub.id.substring(sub.id.length - 3)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-2">
        <SubscribeButton
          loading={loading}
          subscribed={subscribed}
          handleSubscription={handleSubscription}
        />
      </div>
    </section>
  );
}
