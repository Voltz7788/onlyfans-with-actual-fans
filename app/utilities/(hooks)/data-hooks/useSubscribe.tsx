import { useState } from "react";
import { useParams } from "next/navigation";

export default function useSubscribe(currentUsername: string) {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams<{ userSlug: string }>();

  const handleSubscribe = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("currentUsername", currentUsername);
    formData.append("subscribeeUsername", params.userSlug);

    try {
      const res = await fetch("/subscribe", {
        body: formData,
      });

      if (res.ok) {
        setSubscribed(true);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { subscribed, loading, handleSubscribe };
}
