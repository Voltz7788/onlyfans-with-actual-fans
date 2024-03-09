import { useState, useEffect } from "react";

export default function useSolidHeader() {
  const [solidHeader, setSolidHeader] = useState(false);
  useEffect(() => {
    const listenScrollEvent = (e: Event) => {
      if (window.scrollY > 75) {
        setSolidHeader(true);
      } else {
        setSolidHeader(false);
      }
    };

    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  return { solidHeader };
}
