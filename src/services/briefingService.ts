// Layanan integrasi External API cuaca dan kutipan pagi

import type {
  ExternalQuoteApiResponse,
  ExternalWeatherApiResponse,
  MorningBriefing,
} from "@/types/alarm";
import { mapWeatherCodeToLabel } from "@/utils/timeUtils";

// Mengambil data cuaca Open-Meteo dan kutipan DummyJSON secara konkuren
export async function fetchExternalMorningBriefingAsync(): Promise<MorningBriefing> {
  try {
    const weatherPromise = fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456&current_weather=true"
    ).then((res) => {
      if (!res.ok) {
        return Promise.reject(new Error(`HTTP error weather: ${res.status}`));
      }
      return res.json() as Promise<ExternalWeatherApiResponse>;
    });

    const quotePromise = fetch("https://dummyjson.com/quotes/random").then(
      (res) => {
        if (!res.ok) {
          return Promise.reject(new Error(`HTTP error quote: ${res.status}`));
        }
        return res.json() as Promise<ExternalQuoteApiResponse>;
      }
    );

    const [weatherData, quoteData] = await Promise.all([
      weatherPromise,
      quotePromise,
    ]);

    const briefingResult: MorningBriefing = {
      temperature: Math.round(weatherData.current_weather.temperature),
      windSpeed: weatherData.current_weather.windspeed,
      weatherLabel: mapWeatherCodeToLabel(
        weatherData.current_weather.weathercode
      ),
      quote: quoteData.quote,
      quoteAuthor: quoteData.author,
      locationName: "Jakarta, Indonesia",
      lastUpdated: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    return Promise.resolve(briefingResult);
  } catch (error) {
    console.warn("Gagal memuat API cuaca & kutipan, menggunakan fallback:", error);
    const fallbackBriefing: MorningBriefing = {
      temperature: 28,
      windSpeed: 8.5,
      weatherLabel: "Cerah Pagi",
      quote: "Bangunlah dengan tekad kuat, tidurlah dengan kepuasan pencapaian.",
      quoteAuthor: "Motivasi Alarm",
      locationName: "Waktu Lokal",
      lastUpdated: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    return Promise.resolve(fallbackBriefing);
  }
}

