// Hook untuk memuat dan mengelola data cuaca pagi beserta state pesan error UI dari External API

import { useCallback, useEffect, useState } from "react";
import { fetchExternalMorningBriefingAsync } from "@/services/briefingService";
import type { MorningBriefing } from "@/types/alarm";

export function useMorningBriefing() {
  const [briefing, setBriefing] = useState<MorningBriefing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Mengambil data cuaca asinkron dan memperbarui state setelah respons diterima
  const loadWeather = useCallback(() => {
    fetchExternalMorningBriefingAsync()
      .then((data) => {
        setBriefing(data);
        setErrorMessage(null);
      })
      .catch((error: Error) => {
        setErrorMessage(
          error.message || "Gagal memuat data prakiraan cuaca dari server."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Muat ulang data cuaca secara manual saat tombol refresh ditekan
  const refreshBriefing = useCallback(() => {
    setIsLoading(true);
    setErrorMessage(null);
    loadWeather();
  }, [loadWeather]);

  // Pemuatan data cuaca pertama kali saat layar dipasang
  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  return { briefing, isLoading, errorMessage, refreshBriefing };
}
