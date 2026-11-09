// Data awal dan konstanta konfigurasi alarm

import type { AlarmItem, ScheduleOption } from "@/types/alarm";

// Daftar alarm bawaan saat aplikasi pertama kali dibuka
export const INITIAL_ALARMS: AlarmItem[] = [
  {
    id: "1",
    time: "06:30",
    label: "Work",
    schedule: "Weekdays",
    ringtone: "Morning Chime",
    snoozeEnabled: false,
    snoozeInterval: 5,
    snoozeTimes: 3,
    isActive: true,
  },
  {
    id: "2",
    time: "09:00",
    label: "Late Start",
    schedule: "Weekdays",
    ringtone: "Sunrise Glow",
    snoozeEnabled: false,
    snoozeInterval: 5,
    snoozeTimes: 3,
    isActive: true,
  },
  {
    id: "3",
    time: "14:45",
    label: "Appointment",
    schedule: "Tomorrow",
    ringtone: "Gentle Breeze",
    snoozeEnabled: false,
    snoozeInterval: 5,
    snoozeTimes: 3,
    isActive: false,
  },
  {
    id: "4",
    time: "16:00",
    label: "Shopping",
    schedule: "Saturdays",
    ringtone: "Default",
    snoozeEnabled: false,
    snoozeInterval: 5,
    snoozeTimes: 3,
    isActive: false,
  },
];

// Opsi jadwal pengulangan alarm
export const SCHEDULE_OPTIONS: readonly ScheduleOption[] = [
  "Weekdays",
  "Daily",
  "Saturdays",
  "Tomorrow",
];

// Pilihan preset waktu cepat pada form alarm
export const QUICK_TIME_PRESETS = [
  { label: "05:00 Subuh", h: "05", m: "00" },
  { label: "06:00 Pagi", h: "06", m: "00" },
  { label: "07:00 Masuk", h: "07", m: "00" },
  { label: "12:30 Siang", h: "12", m: "30" },
  { label: "21:30 Malam", h: "21", m: "30" },
] as const;

// Daftar nama nada dering alarm
export const RINGTONES: readonly string[] = [
  "Default",
  "Alarm Classic",
  "Digital Beep",
  "Morning Chime",
  "Gentle Breeze",
  "Radar Pulse",
  "Cosmic Bell",
  "Forest Birds",
  "Zen Garden",
  "Ocean Waves",
  "Upbeat Melody",
  "Sunrise Glow",
  "Echo Drop",
  "Neon Synth",
];

// Tautan file audio MP3 untuk masing-masing nada dering
export const RINGTONE_AUDIO_MAP: Record<string, string> = {
  "Default": "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
  "Alarm Classic": "https://assets.mixkit.co/active_storage/sfx/2871/2871-preview.mp3",
  "Digital Beep": "https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3",
  "Morning Chime": "https://assets.mixkit.co/active_storage/sfx/1003/1003-preview.mp3",
  "Gentle Breeze": "https://assets.mixkit.co/active_storage/sfx/1004/1004-preview.mp3",
  "Radar Pulse": "https://assets.mixkit.co/active_storage/sfx/998/998-preview.mp3",
  "Cosmic Bell": "https://assets.mixkit.co/active_storage/sfx/1006/1006-preview.mp3",
  "Forest Birds": "https://assets.mixkit.co/active_storage/sfx/2868/2868-preview.mp3",
  "Zen Garden": "https://assets.mixkit.co/active_storage/sfx/1002/1002-preview.mp3",
  "Ocean Waves": "https://assets.mixkit.co/active_storage/sfx/1001/1001-preview.mp3",
  "Upbeat Melody": "https://assets.mixkit.co/active_storage/sfx/997/997-preview.mp3",
  "Sunrise Glow": "https://assets.mixkit.co/active_storage/sfx/2873/2873-preview.mp3",
  "Echo Drop": "https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3",
  "Neon Synth": "https://assets.mixkit.co/active_storage/sfx/1000/1000-preview.mp3",
};
