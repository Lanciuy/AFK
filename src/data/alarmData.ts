/**
 * @file src/data/alarmData.ts
 * Inisialisasi data awal dan opsi alarm.
 */

import type { AlarmItem, ScheduleOption } from "@/types/alarm";

// Inisialisasi array of objects untuk data awal alarm
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

/**
 * Daftar nada dering pilihan untuk alarm.
 * Menyediakan variasi nada klasik, elektronik, melodi tenang, dan suara alam.
 */
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

export const SCHEDULE_OPTIONS: readonly ScheduleOption[] = [
  "Weekdays",
  "Daily",
  "Saturdays",
  "Tomorrow",
];
