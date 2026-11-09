// Hook manajemen daftar alarm, state form input, dan aksi CRUD alarm

import { router } from "expo-router";
import { useState } from "react";
import { INITIAL_ALARMS } from "@/data/alarmData";
import { validateAndBuildAlarmAsync } from "@/services/alarmValidationService";
import type { AlarmItem } from "@/types/alarm";

export function useAlarmManager() {
  // State daftar seluruh alarm dan item yang sedang diedit
  const [alarms, setAlarms] = useState<AlarmItem[]>(INITIAL_ALARMS);
  const [editingAlarm, setEditingAlarm] = useState<AlarmItem | null>(null);

  // State visibilitas modal form utama dan modal pemilihan ringtone
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRingtoneModalVisible, setIsRingtoneModalVisible] = useState(false);

  // State field input pada form pengaturan alarm
  const [alarmName, setAlarmName] = useState("Bangun Pagi");
  const [hour, setHour] = useState("06");
  const [minute, setMinute] = useState("30");
  const [schedule, setSchedule] = useState("Daily");
  const [ringtone, setRingtone] = useState("Default");
  const [snoozeEnabled, setSnoozeEnabled] = useState(false);
  const [snoozeInterval, setSnoozeInterval] = useState("5");
  const [snoozeTimes, setSnoozeTimes] = useState("3");
  const [formError, setFormError] = useState("");

  // Kembalikan seluruh input form ke nilai awal default
  const resetForm = () => {
    setAlarmName("Bangun Pagi");
    setHour("06");
    setMinute("30");
    setSchedule("Daily");
    setRingtone("Default");
    setSnoozeEnabled(false);
    setSnoozeInterval("5");
    setSnoozeTimes("3");
    setFormError("");
  };

  // Ubah status aktif/nonaktif alarm berdasarkan ID
  const toggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  // Hapus satu item alarm dari daftar berdasarkan ID
  const deleteAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((item) => item.id !== id));
  };

  // Buka modal form kosong untuk menambah alarm baru
  const openAddModal = () => {
    resetForm();
    setEditingAlarm(null);
    setIsAddModalVisible(true);
  };

  // Isi form dengan data alarm yang dipilih lalu buka modal dalam mode edit
  const openEditModal = (item: AlarmItem) => {
    const [h = "07", m = "00"] = item.time.split(":");
    setEditingAlarm(item);
    setAlarmName(item.label);
    setHour(h);
    setMinute(m);
    setSchedule(item.schedule);
    setRingtone(item.ringtone);
    setSnoozeEnabled(item.snoozeEnabled);
    setSnoozeInterval(String(item.snoozeInterval));
    setSnoozeTimes(String(item.snoozeTimes));
    setFormError("");
    setIsAddModalVisible(true);
  };

  // Tutup seluruh modal form dan bersihkan state edit
  const closeAlarmModal = () => {
    setIsAddModalVisible(false);
    setIsRingtoneModalVisible(false);
    setEditingAlarm(null);
    resetForm();
  };

  // Navigasi ke halaman detail status alarm dengan mengirim parameter item
  const handleInspectAlarm = (item: AlarmItem) => {
    router.push({
      pathname: "/alarm-detail",
      params: {
        id: item.id,
        label: item.label,
        time: item.time,
        schedule: item.schedule,
        ringtone: item.ringtone,
        snoozeEnabled: String(item.snoozeEnabled),
        snoozeInterval: String(item.snoozeInterval),
        snoozeTimes: String(item.snoozeTimes),
      },
    });
  };

  // Validasi input secara asinkron, simpan ke daftar alarm, lalu arahkan ke layar status
  const saveAlarm = () => {
    setFormError("");

    const payload = {
      alarmName,
      hour,
      minute,
      schedule,
      ringtone,
      snoozeEnabled,
      snoozeInterval,
      snoozeTimes,
    };

    validateAndBuildAlarmAsync(payload, alarms, editingAlarm)
      .then((savedAlarm: AlarmItem) => {
        if (editingAlarm) {
          setAlarms((prev) =>
            prev.map((item) =>
              item.id === editingAlarm.id ? savedAlarm : item
            )
          );
        } else {
          setAlarms((prev) => [savedAlarm, ...prev]);
        }

        closeAlarmModal();
        handleInspectAlarm(savedAlarm);
      })
      .catch((error: Error) => {
        setFormError(error.message);
      });
  };

  // Hitung jumlah alarm yang sedang dalam posisi aktif
  const activeAlarmCount = alarms.filter((item) => item.isActive).length;

  return {
    alarms,
    editingAlarm,
    activeAlarmCount,
    isAddModalVisible,
    isRingtoneModalVisible,
    setIsRingtoneModalVisible,
    formState: {
      alarmName,
      hour,
      minute,
      schedule,
      ringtone,
      snoozeEnabled,
      snoozeInterval,
      snoozeTimes,
      formError,
    },
    formSetters: {
      setAlarmName,
      setHour,
      setMinute,
      setSchedule,
      setRingtone,
      setSnoozeEnabled,
      setSnoozeInterval,
      setSnoozeTimes,
      setFormError,
    },
    actions: {
      toggleAlarm,
      deleteAlarm,
      openAddModal,
      openEditModal,
      closeAlarmModal,
      handleInspectAlarm,
      saveAlarm,
    },
  };
}

