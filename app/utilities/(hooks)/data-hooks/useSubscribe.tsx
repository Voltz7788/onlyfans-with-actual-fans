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

  const handleSubscription = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("currentUsername", currentUsername);
    formData.append("subscribeeUsername", params.userSlug);

    try {
      const res = await fetch("/api/subscribe", {
        method: "post",
        body: formData,
      });

      if (res.ok) {
        setSubscribed(true);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }

    router.refresh();
  };

  return { subscribed, loading, handleSubscription };
}
