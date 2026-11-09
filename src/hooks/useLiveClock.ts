// Hook untuk jam digital real-time dengan pembaruan per detik

import { useEffect, useState } from "react";
import { formatTimeHMS } from "@/utils/timeUtils";

export function useLiveClock() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(formatTimeHMS(new Date()));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return currentTime;
}

