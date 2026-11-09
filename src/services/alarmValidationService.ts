// Layanan validasi input form dan pembuatan objek alarm

import type { AlarmFormPayload, AlarmItem } from "@/types/alarm";

// Validasi kelayakan input berdasarkan tahap form wizard
export async function validateStepInputAsync(
  step: number,
  payload: Partial<AlarmFormPayload>
): Promise<boolean> {
  if (step === 1) {
    const trimmedName = (payload.alarmName ?? "").trim();
    const h = Number(payload.hour);
    const m = Number(payload.minute);

    if (!trimmedName) {
      return Promise.reject(new Error("Nama alarm tidak boleh kosong."));
    }

    if (!/\p{L}/u.test(trimmedName)) {
      return Promise.reject(
        new Error("Nama alarm harus mengandung minimal satu huruf.")
      );
    }

    if (!/^\d+$/.test(payload.hour ?? "") || h < 0 || h > 23) {
      return Promise.reject(
        new Error("Jam harus berupa angka antara 00 dan 23.")
      );
    }

    if (!/^\d+$/.test(payload.minute ?? "") || m < 0 || m > 59) {
      return Promise.reject(
        new Error("Menit harus berupa angka antara 00 dan 59.")
      );
    }

    return Promise.resolve(true);
  }

  if (step === 2) {
    if (!payload.schedule) {
      return Promise.reject(new Error("Pilih jadwal alarm terlebih dahulu."));
    }
    if (!payload.ringtone) {
      return Promise.reject(new Error("Pilih nada dering alarm."));
    }
    return Promise.resolve(true);
  }

  if (step === 3) {
    if (payload.snoozeEnabled) {
      const interval = Number(payload.snoozeInterval);
      const times = Number(payload.snoozeTimes);

      if (!/^\d+$/.test(payload.snoozeInterval ?? "") || interval < 1) {
        return Promise.reject(
          new Error("Interval snooze minimal harus 1 menit.")
        );
      }
      if (!/^\d+$/.test(payload.snoozeTimes ?? "") || times < 1) {
        return Promise.reject(
          new Error("Frekuensi snooze minimal harus 1 kali.")
        );
      }
    }
    return Promise.resolve(true);
  }

  return Promise.resolve(true);
}

// Validasi lengkap dan konstruksi objek AlarmItem baru atau edit
export async function validateAndBuildAlarmAsync(
  payload: AlarmFormPayload,
  existingAlarms: AlarmItem[],
  editingAlarm: AlarmItem | null
): Promise<AlarmItem> {
  const trimmedName = payload.alarmName.trim();
  const parsedHour = Number(payload.hour);
  const parsedMinute = Number(payload.minute);
  const parsedSnoozeInterval = Number(payload.snoozeInterval);
  const parsedSnoozeTimes = Number(payload.snoozeTimes);

  if (!trimmedName || !/\p{L}/u.test(trimmedName)) {
    return Promise.reject(
      new Error("Nama alarm wajib diisi dan memiliki teks yang valid.")
    );
  }

  if (!/^\d+$/.test(payload.hour) || parsedHour < 0 || parsedHour > 23) {
    return Promise.reject(new Error("Format jam salah (harus 00-23)."));
  }

  if (!/^\d+$/.test(payload.minute) || parsedMinute < 0 || parsedMinute > 59) {
    return Promise.reject(new Error("Format menit salah (harus 00-59)."));
  }

  if (payload.snoozeEnabled) {
    if (
      !/^\d+$/.test(payload.snoozeInterval) ||
      parsedSnoozeInterval < 1 ||
      parsedSnoozeInterval > 60
    ) {
      return Promise.reject(
        new Error("Snooze interval harus antara 1-60 menit.")
      );
    }
    if (
      !/^\d+$/.test(payload.snoozeTimes) ||
      parsedSnoozeTimes < 1 ||
      parsedSnoozeTimes > 10
    ) {
      return Promise.reject(new Error("Snooze times harus antara 1-10 kali."));
    }
  }

  const formattedTime = `${String(parsedHour).padStart(2, "0")}:${String(
    parsedMinute
  ).padStart(2, "0")}`;

  if (editingAlarm) {
    const updatedItem: AlarmItem = {
      ...editingAlarm,
      time: formattedTime,
      label: trimmedName,
      schedule: payload.schedule,
      ringtone: payload.ringtone,
      snoozeEnabled: payload.snoozeEnabled,
      snoozeInterval: payload.snoozeEnabled ? parsedSnoozeInterval : 5,
      snoozeTimes: payload.snoozeEnabled ? parsedSnoozeTimes : 3,
    };
    return Promise.resolve(updatedItem);
  }

  let uniqueId = Date.now();
  while (existingAlarms.some((item) => item.id === String(uniqueId))) {
    uniqueId += 1;
  }

  const newAlarm: AlarmItem = {
    id: String(uniqueId),
    time: formattedTime,
    label: trimmedName,
    schedule: payload.schedule,
    ringtone: payload.ringtone,
    snoozeEnabled: payload.snoozeEnabled,
    snoozeInterval: payload.snoozeEnabled ? parsedSnoozeInterval : 5,
    snoozeTimes: payload.snoozeEnabled ? parsedSnoozeTimes : 3,
    isActive: true,
  };

  return Promise.resolve(newAlarm);
}

