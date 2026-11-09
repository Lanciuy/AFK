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

    if (!trimmedName || !/\p{L}/u.test(trimmedName)) {
      throw new Error("Nama alarm harus diisi dan mengandung minimal satu huruf.");
    }
    if (!/^\d+$/.test(payload.hour ?? "") || h < 0 || h > 23) {
      throw new Error("Jam harus berupa angka antara 00 dan 23.");
    }
    if (!/^\d+$/.test(payload.minute ?? "") || m < 0 || m > 59) {
      throw new Error("Menit harus berupa angka antara 00 dan 59.");
    }
  }

  if (step === 2) {
    if (!payload.schedule) {
      throw new Error("Pilih jadwal alarm terlebih dahulu.");
    }
    if (!payload.ringtone) {
      throw new Error("Pilih nada dering alarm.");
    }
  }

  if (step === 3 && payload.snoozeEnabled) {
    const interval = Number(payload.snoozeInterval);
    const times = Number(payload.snoozeTimes);

    if (!/^\d+$/.test(payload.snoozeInterval ?? "") || interval < 1 || interval > 60) {
      throw new Error("Interval snooze harus antara 1-60 menit.");
    }
    if (!/^\d+$/.test(payload.snoozeTimes ?? "") || times < 1 || times > 10) {
      throw new Error("Frekuensi snooze harus antara 1-10 kali.");
    }
  }

  return true;
}

// Validasi lengkap seluruh tahap dan konstruksi objek AlarmItem baru atau edit
export async function validateAndBuildAlarmAsync(
  payload: AlarmFormPayload,
  existingAlarms: AlarmItem[],
  editingAlarm: AlarmItem | null
): Promise<AlarmItem> {
  await validateStepInputAsync(1, payload);
  await validateStepInputAsync(2, payload);
  await validateStepInputAsync(3, payload);

  const formattedTime = `${String(Number(payload.hour)).padStart(2, "0")}:${String(
    Number(payload.minute)
  ).padStart(2, "0")}`;

  let uniqueId = Date.now();
  while (existingAlarms.some((item) => item.id === String(uniqueId))) {
    uniqueId += 1;
  }

  return {
    id: editingAlarm?.id ?? String(uniqueId),
    time: formattedTime,
    label: payload.alarmName.trim(),
    schedule: payload.schedule,
    ringtone: payload.ringtone,
    snoozeEnabled: payload.snoozeEnabled,
    snoozeInterval: payload.snoozeEnabled ? Number(payload.snoozeInterval) : 5,
    snoozeTimes: payload.snoozeEnabled ? Number(payload.snoozeTimes) : 3,
    isActive: editingAlarm?.isActive ?? true,
  };
}
