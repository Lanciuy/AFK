// Layanan integrasi External API prakiraan cuaca pagi

import type {
  ExternalWeatherApiResponse,
  MorningBriefing,
} from "@/types/alarm";
import { mapWeatherCodeToLabel } from "@/utils/timeUtils";

// Mengambil data cuaca terkini dari Open-Meteo API dan melempar error ke UI jika gagal
export async function fetchExternalMorningBriefingAsync(): Promise<MorningBriefing> {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456&current_weather=true"
    );

    if (!res.ok) {
      throw new Error(
        `Server cuaca merespons dengan kode status ${res.status}.`
      );
    }

    const weatherData = (await res.json()) as ExternalWeatherApiResponse;

    return {
      temperature: Math.round(weatherData.current_weather.temperature),
      windSpeed: weatherData.current_weather.windspeed,
      weatherLabel: mapWeatherCodeToLabel(
        weatherData.current_weather.weathercode
      ),
      locationName: "Jakarta, Indonesia",
      lastUpdated: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  } catch (error) {
    const message =
      error instanceof Error && error.message && !error.message.includes("fetch")
        ? error.message
        : "Gagal memuat prakiraan cuaca. Periksa koneksi internet Anda lalu tekan tombol muat ulang.";
    throw new Error(message);
  }
}
