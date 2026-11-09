/**
 * @file src/types/alarm.ts
 * Definisi tipe data dan antarmuka (interface) untuk modul Alarm dan External API.
 *
 * WHY:
 * Memastikan type safety end-to-end, pemetaan objek hasil parsing dari API eksternal,
 * serta payload form alarm bertahap (wizard).
 */

export type AlarmLabel = string;

export type ScheduleOption =
  | "Weekdays"
  | "Saturday"
  | "Saturdays"
  | "Daily"
  | "Tomorrow"
  | string;

/**
 * Interface objek alarm utama yang disimpan dalam state aplikasi.
 */
export interface AlarmItem {
  readonly id: string;
  time: string;
  label: AlarmLabel;
  schedule: ScheduleOption;
  ringtone: string;
  snoozeEnabled: boolean;
  snoozeInterval: number;
  snoozeTimes: number;
  isActive: boolean;
}

/**
 * Interface payload data saat memvalidasi input pembuatan/pengeditan alarm.
 */
export interface AlarmFormPayload {
  alarmName: string;
  hour: string;
  minute: string;
  schedule: string;
  ringtone: string;
  snoozeEnabled: boolean;
  snoozeInterval: string;
  snoozeTimes: string;
}

/**
 * Interface struktur data mentah dari Open-Meteo Public Weather API.
 */
export interface ExternalWeatherApiResponse {
  latitude: number;
  longitude: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
}

/**
 * Interface struktur data mentah dari DummyJSON Quotes Public API.
 */
export interface ExternalQuoteApiResponse {
  id: number;
  quote: string;
  author: string;
}

/**
 * [PENILAIAN - POIN 1]: Interface untuk objek hasil pemetaan data External API.
 * Menggabungkan informasi cuaca pagi dan kutipan motivasi ke dalam satu entitas model.
 */
export interface MorningBriefing {
  readonly temperature: number;
  readonly windSpeed: number;
  readonly weatherLabel: string;
  readonly quote: string;
  readonly quoteAuthor: string;
  readonly locationName: string;
  readonly lastUpdated: string;
}
