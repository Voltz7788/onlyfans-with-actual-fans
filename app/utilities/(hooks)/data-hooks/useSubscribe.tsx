import { useState } from "react";
import { useRouter } from "next/navigation";

export function useSubscribe(
  currentUsername: string,
  subscribeeUsername: string,
  isSubscribedDB: boolean
) {
  const [subscribed, setSubscribed] = useState(isSubscribedDB);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscription = async (action: "subscribe" | "unsubscribe") => {
    setLoading(true);
    const formData = new FormData();
    formData.append("currentUsername", currentUsername);
    formData.append("subscribeeUsername", subscribeeUsername);

    try {
      const res = await fetch(`/api/subscriptions/${action}`, {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        setLoading(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { subscribed, loading, handleSubscription };
}

export function useProfileSubscribe(
  currentUsername: string,
  subscribeeUsername: string,
  isSubscribedDB: boolean
) {
  const [subscribed, setSubscribed] = useState(isSubscribedDB);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscription = async (action: "subscribe" | "unsubscribe") => {
    setLoading(true);
    const formData = new FormData();
    formData.append("currentUsername", currentUsername);
    formData.append("subscribeeUsername", subscribeeUsername);

    try {
      const res = await fetch(`/api/subscriptions/${action}`, {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        const data: { sub: boolean } = await res.json();
        setSubscribed(data.sub);
        setLoading(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { subscribed, loading, handleSubscription };
}
