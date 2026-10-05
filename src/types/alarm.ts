export type AlarmLabel = string;

export interface AlarmItem {
  readonly id: string;
  time: string;
  label: AlarmLabel;
  schedule: string;
  ringtone: string;
  snoozeEnabled: boolean;
  snoozeInterval: number;
  snoozeTimes: number;
  isActive: boolean;
}