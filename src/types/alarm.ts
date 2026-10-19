/**
 * @file src/types/alarm.ts
 * Definisi type dan interface object untuk modul alarm.
 */

// Deklarasi type
export type AlarmLabel = string;
export type ScheduleOption =
  | "Weekdays"
  | "Saturday"
  | "Daily"
  | "Tomorrow"
  | string;

// Interface object alarm
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
