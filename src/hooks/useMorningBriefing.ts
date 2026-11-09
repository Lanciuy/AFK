// Hook untuk memuat dan mengelola data cuaca dan kutipan dari External API

import { useEffect, useState } from "react";
import { fetchExternalMorningBriefingAsync } from "@/services/briefingService";
import type { MorningBriefing } from "@/types/alarm";

export function useMorningBriefing() {
  const [briefing, setBriefing] = useState<MorningBriefing | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Muat ulang data saat tombol refresh ditekan
  const refreshBriefing = () => {
    setIsLoading(true);

    fetchExternalMorningBriefingAsync()
      .then((data) => {
        setBriefing(data);
      })
      .catch((error: Error) => {
        console.warn("Gagal memuat ulang briefing:", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Pemuatan data pertama kali saat layar dipasang
  useEffect(() => {
    let isMounted = true;

    fetchExternalMorningBriefingAsync()
      .then((data) => {
        if (isMounted) {
          setBriefing(data);
        }
      })
      .catch((error: Error) => {
        console.warn("Gagal memuat briefing awal:", error.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { briefing, isLoading, refreshBriefing };
}

