/**
 * @file src/app/index.tsx
 * Halaman utama daftar alarm.
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AlarmCard from "@/components/AlarmCard";
import AlarmForm from "@/components/AlarmForm";
import { INITIAL_ALARMS } from "@/data/alarmData";
import { styles } from "@/styles/styles";
import type { AlarmItem } from "@/types/alarm";

export default function AlarmScreen() {
  // [PENILAIAN - POIN 1 (10%)]: Menerapkan hook useState untuk manajemen state alarm & form
  // State data berupa array of objects bertipe AlarmItem[]
  const [alarms, setAlarms] = useState<AlarmItem[]>(INITIAL_ALARMS);
  const [editingAlarm, setEditingAlarm] = useState<AlarmItem | null>(null);

  // State untuk kontrol visibilitas form modal
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRingtoneModalVisible, setIsRingtoneModalVisible] = useState(false);

  // State field form alarm
  const [alarmName, setAlarmName] = useState("Alarm Baru");
  const [hour, setHour] = useState("07");
  const [minute, setMinute] = useState("00");
  const [schedule, setSchedule] = useState("Daily");
  const [ringtone, setRingtone] = useState("Default");
  const [snoozeEnabled, setSnoozeEnabled] = useState(false);
  const [snoozeInterval, setSnoozeInterval] = useState("5");
  const [snoozeTimes, setSnoozeTimes] = useState("3");
  const [formError, setFormError] = useState("");

  // Custom function untuk reset input form
  const resetForm = () => {
    setAlarmName("Alarm Baru");
    setHour("07");
    setMinute("00");
    setSchedule("Daily");
    setRingtone("Default");
    setSnoozeEnabled(false);
    setSnoozeInterval("5");
    setSnoozeTimes("3");
    setFormError("");
  };

  // Custom function untuk toggle aktif/nonaktif alarm
  const toggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      ),
    );
  };

  // Custom function untuk menghapus alarm dari array of objects
  const deleteAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((item) => item.id !== id));
  };

  // Custom function untuk membuka modal tambah alarm
  const openAddModal = () => {
    resetForm();
    setEditingAlarm(null);
    setIsAddModalVisible(true);
  };

  // Custom function untuk membuka modal edit alarm
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

  // Custom function untuk menutup modal alarm
  const closeAlarmModal = () => {
    setIsAddModalVisible(false);
    setIsRingtoneModalVisible(false);
    setEditingAlarm(null);
    resetForm();
  };

  // Custom function untuk validasi dan menyimpan alarm
  const saveAlarm = () => {
    const trimmedName = alarmName.trim();
    const parsedHour = Number(hour);
    const parsedMinute = Number(minute);
    const parsedSnoozeInterval = Number(snoozeInterval);
    const parsedSnoozeTimes = Number(snoozeTimes);

    if (!trimmedName) {
      setFormError("Nama alarm tidak boleh kosong.");
      return;
    }

    if (!/\p{L}/u.test(trimmedName)) {
      setFormError("Nama alarm harus mengandung minimal satu huruf.");
      return;
    }

    if (!/^\d+$/.test(hour) || parsedHour < 0 || parsedHour > 23) {
      setFormError("Jam harus berupa angka antara 00 dan 23.");
      return;
    }

    if (!/^\d+$/.test(minute) || parsedMinute < 0 || parsedMinute > 59) {
      setFormError("Menit harus berupa angka antara 00 dan 59.");
      return;
    }

    if (snoozeEnabled) {
      if (!/^\d+$/.test(snoozeInterval) || parsedSnoozeInterval < 1) {
        setFormError("Snooze Interval harus berupa angka minimal 1.");
        return;
      }
      if (!/^\d+$/.test(snoozeTimes) || parsedSnoozeTimes < 1) {
        setFormError("Snooze Times harus berupa angka minimal 1.");
        return;
      }
    }

    const updatedFields = {
      time: `${String(parsedHour).padStart(2, "0")}:${String(parsedMinute).padStart(2, "0")}`,
      label: trimmedName,
      schedule,
      ringtone,
      snoozeEnabled,
      snoozeInterval: snoozeEnabled ? parsedSnoozeInterval : 5,
      snoozeTimes: snoozeEnabled ? parsedSnoozeTimes : 3,
    };

    if (editingAlarm) {
      setAlarms((prev) =>
        prev.map((item) =>
          item.id === editingAlarm.id ? { ...item, ...updatedFields } : item,
        ),
      );
    } else {
      let uniqueId = Date.now();
      // Loop while untuk memastikan id unik
      while (alarms.some((item) => item.id === String(uniqueId))) {
        uniqueId += 1;
      }

      const newAlarm: AlarmItem = {
        id: String(uniqueId),
        ...updatedFields,
        isActive: true,
      };

      setAlarms((prev) => [newAlarm, ...prev]);
    }

    closeAlarmModal();
  };

  // Custom function render item untuk FlatList
  const renderAlarmCard = ({ item }: { item: AlarmItem }) => (
    <AlarmCard
      item={item}
      onToggle={toggleAlarm}
      onDelete={deleteAlarm}
      onEdit={openEditModal}
    />
  );

  const activeAlarmCount = alarms.filter((item) => item.isActive).length;

  return (
    // External style dari styles.safeArea
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          {/* Header title dengan inline style */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="alarm" size={28} color="#ffffff" />
            <Text style={styles.headerTitle}>Alarm</Text>
          </View>

          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>
              {activeAlarmCount} Aktif
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Loop daftar alarm dengan FlatList */}
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={renderAlarmCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="alarm-outline" size={64} color="#cbd5e1" />
              <Text style={styles.emptyText}>Belum ada alarm</Text>
              <Text style={styles.emptySubtext}>
                Tekan tombol + di bawah untuk membuat alarm baru
              </Text>
            </View>
          }
        />

        <Pressable
          onPress={openAddModal}
          style={styles.fabButton}
          accessibilityRole="button"
          accessibilityLabel="Tambah alarm baru"
        >
          <Ionicons name="add" size={32} color="#ffffff" />
        </Pressable>
      </View>

      <AlarmForm
        visible={isAddModalVisible}
        ringtoneModalVisible={isRingtoneModalVisible}
        isEditing={editingAlarm !== null}
        alarmName={alarmName}
        hour={hour}
        minute={minute}
        schedule={schedule}
        ringtone={ringtone}
        snoozeEnabled={snoozeEnabled}
        snoozeInterval={snoozeInterval}
        snoozeTimes={snoozeTimes}
        formError={formError}
        onClose={closeAlarmModal}
        onSave={saveAlarm}
        onRingtoneModalOpen={() => setIsRingtoneModalVisible(true)}
        onRingtoneModalClose={() => setIsRingtoneModalVisible(false)}
        setAlarmName={setAlarmName}
        setHour={setHour}
        setMinute={setMinute}
        setSchedule={setSchedule}
        setRingtone={setRingtone}
        setSnoozeEnabled={setSnoozeEnabled}
        setSnoozeInterval={setSnoozeInterval}
        setSnoozeTimes={setSnoozeTimes}
      />
    </SafeAreaView>
  );
}