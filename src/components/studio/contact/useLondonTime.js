import { useEffect, useState } from "react";

// The studio's local time ("16:42"), refreshed every 30 seconds. Empty until
// the page is running in the browser, so prerendered HTML never shows a stale
// build-time clock.
export function useLondonTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/London",
        })
      );
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return time;
}
