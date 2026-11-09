// Definisi tipe data dan antarmuka model alarm dan External API

export type AlarmLabel = string;

export type ScheduleOption =
  | "Weekdays"
  | "Saturday"
  | "Saturdays"
  | "Daily"
  | "Tomorrow"
  | string;

// Objek data alarm utama
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

// Payload input pembuatan dan pembaruan alarm
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

// Skema respons Open-Meteo Weather API
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

// Skema respons DummyJSON Quotes API
export interface ExternalQuoteApiResponse {
  id: number;
  quote: string;
  author: string;
}

// Model gabungan cuaca pagi dan kutipan motivasi
export interface MorningBriefing {
  readonly temperature: number;
  readonly windSpeed: number;
  readonly weatherLabel: string;
  readonly quote: string;
  readonly quoteAuthor: string;
  readonly locationName: string;
  readonly lastUpdated: string;
}
