import type { AlarmItem } from "../types/alarm";

export const INITIAL_ALARMS: AlarmItem[] = [
  {
    id: "1",
    time: "06:30",
    label: "Work",
    schedule: "Weekdays",
    ringtone: "Default",
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
    ringtone: "Default",
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
    ringtone: "Default",
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

export const RINGTONES = [
  "Default",
  "Alarm Classic",
  "Digital",
  "Morning",
  "Gentle",
  "Beep",
];