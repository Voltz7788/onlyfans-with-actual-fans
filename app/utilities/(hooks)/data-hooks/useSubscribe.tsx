import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function useSubscribe(
  currentUsername: string,
  isSubscribedDB: boolean
) {
  const [subscribed, setSubscribed] = useState(isSubscribedDB);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams<{ userSlug: string }>();

  const handleSubscription = async (action: "subscribe" | "unsubscribe") => {
    setLoading(true);
    const formData = new FormData();
    formData.append("currentUsername", currentUsername);
    formData.append("subscribeeUsername", params.userSlug);

    try {
      const res = await fetch(`/api/subscriptions/${action}`, {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        const data: { sub: boolean } = await res.json();
        setSubscribed(data.sub);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }

    router.refresh();
  };

  return { subscribed, loading, handleSubscription };
}
