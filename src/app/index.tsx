/**
 * @file src/app/index.tsx
 *
 * WHY:
 * Provides a clean, highly readable single-screen Alarm interface.
 * Implements core educational patterns clearly: typed entities, initial array data,
 * dedicated render functions, external/inline style combinations, and FlatList virtualization.
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/styles";

// 1. Menerapkan Type & Interface khusus entitas Alarm
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

// 2. Menerapkan Array of Objects awal untuk Alarm
const INITIAL_ALARMS: AlarmItem[] = [
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

const RINGTONES = [
  "Default",
  "Alarm Classic",
  "Digital",
  "Morning",
  "Gentle",
  "Beep",
];

export default function AlarmScreen() {
  const [alarms, setAlarms] = useState<AlarmItem[]>(INITIAL_ALARMS);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRingtoneModalVisible, setIsRingtoneModalVisible] = useState(false);
  const [alarmName, setAlarmName] = useState("Alarm Baru");
  const [hour, setHour] = useState("07");
  const [minute, setMinute] = useState("00");
  const [ringtone, setRingtone] = useState("Default");
  const [snoozeEnabled, setSnoozeEnabled] = useState(false);
  const [snoozeInterval, setSnoozeInterval] = useState("5");
  const [snoozeTimes, setSnoozeTimes] = useState("3");
  const [formError, setFormError] = useState("");

  const resetForm = () => {
    setAlarmName("Alarm Baru");
    setHour("07");
    setMinute("00");
    setRingtone("Default");
    setSnoozeEnabled(false);
    setSnoozeInterval("5");
    setSnoozeTimes("3");
    setFormError("");
  };

  const toggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      ),
    );
  };

  const deleteAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((item) => item.id !== id));
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalVisible(true);
  };

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

    if (
      snoozeEnabled &&
      (!/^\d+$/.test(snoozeInterval) || parsedSnoozeInterval < 1)
    ) {
      setFormError("Snooze Interval harus berupa angka minimal 1.");
      return;
    }

    if (
      snoozeEnabled &&
      (!/^\d+$/.test(snoozeTimes) || parsedSnoozeTimes < 1)
    ) {
      setFormError("Snooze Times harus berupa angka minimal 1.");
      return;
    }

    let id = Date.now();
    while (alarms.some((item) => item.id === String(id))) {
      id += 1;
    }

    const newAlarm: AlarmItem = {
      id: String(id),
      time: `${String(parsedHour).padStart(2, "0")}:${String(parsedMinute).padStart(2, "0")}`,
      label: trimmedName,
      schedule: "Daily",
      ringtone,
      snoozeEnabled,
      snoozeInterval: snoozeEnabled ? parsedSnoozeInterval : 5,
      snoozeTimes: snoozeEnabled ? parsedSnoozeTimes : 3,
      isActive: true,
    };
    setAlarms((prev) => [newAlarm, ...prev]);
    resetForm();
    setIsAddModalVisible(false);
  };

  const activeAlarmCount = alarms.filter((item) => item.isActive).length;

  // 3. Menerapkan Custom Function untuk render item FlatList
  const renderAlarmCard = (item: AlarmItem) => (
    <Pressable
      key={item.id}
      onPress={() => toggleAlarm(item.id)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: item.isActive }}
      accessibilityLabel={`Alarm ${item.time}, ${item.label}`}
      // Menerapkan penggabungan External Style dan Inline Style
      style={[
        styles.alarmCard,
        {
          marginBottom: 12,
          borderColor: item.isActive ? "#e53e3e" : "#f1f5f9",
          opacity: item.isActive ? 1 : 0.65,
        },
      ]}
    >
      {/* Checkbox Status */}
      <Pressable
        onPress={() => toggleAlarm(item.id)}
        style={styles.checkButton}
        hitSlop={8}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.isActive }}
        accessibilityLabel={`Toggle alarm ${item.time}`}
      >
        <Ionicons
          name={item.isActive ? "checkbox" : "square-outline"}
          size={24}
          color={item.isActive ? "#e53e3e" : "#cbd5e1"}
        />
      </Pressable>

      {/* Info Detail */}
      <View style={styles.alarmDetails}>
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>{item.label}</Text>
        </View>

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{item.time}</Text>
          <Ionicons
            name="musical-notes"
            size={16}
            color="#a0aec0"
            style={styles.soundIcon}
          />
        </View>

        <Text style={styles.scheduleText}>{item.schedule}</Text>
        {item.snoozeEnabled ? (
          <Text style={styles.snoozeSummary}>
            Snooze {item.snoozeInterval}m × {item.snoozeTimes}
          </Text>
        ) : null}
      </View>

      {/* Tombol Hapus */}
      <Pressable
        onPress={() => deleteAlarm(item.id)}
        style={styles.deleteButton}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Hapus alarm ${item.time}`}
      >
        <Ionicons name="trash-outline" size={20} color="#cbd5e1" />
      </Pressable>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Aplikasi */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerTitleGroup}>
            <Ionicons name="alarm" size={28} color="#ffffff" />
            <Text style={styles.headerTitle}>Alarm</Text>
          </View>

          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>{activeAlarmCount} Aktif</Text>
          </View>
        </View>
      </View>

      {/* Kontainer Daftar Kartu Alarm */}
      <View style={styles.contentContainer}>
        {/* 4. Menerapkan Loop dengan FlatList untuk Alarm */}
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderAlarmCard(item)}
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

        {/* FAB Tambah Alarm */}
        <Pressable
          onPress={openAddModal}
          style={styles.fabButton}
          accessibilityRole="button"
          accessibilityLabel="Add new alarm"
        >
          <Ionicons name="add" size={32} color="#ffffff" />
        </Pressable>
      </View>

      <Modal
        visible={isAddModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsAddModalVisible(false);
          setIsRingtoneModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <ScrollView
            style={styles.modalScrollView}
            contentContainerStyle={styles.modalContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.modalTitle}>Tambah Alarm</Text>

            <Text style={styles.formLabel}>Nama Alarm</Text>
            <TextInput
              value={alarmName}
              onChangeText={setAlarmName}
              placeholder="Nama alarm"
              placeholderTextColor="#a0aec0"
              style={styles.formInput}
              maxLength={50}
              accessibilityLabel="Nama Alarm"
            />

            <Text style={styles.formLabel}>Waktu (24 jam)</Text>
            <View style={styles.timeInputRow}>
              <TextInput
                value={hour}
                onChangeText={setHour}
                placeholder="07"
                placeholderTextColor="#a0aec0"
                style={[styles.formInput, styles.timeInput]}
                keyboardType="number-pad"
                maxLength={2}
                selectTextOnFocus
                accessibilityLabel="Jam"
              />
              <Text style={styles.timeSeparator}>:</Text>
              <TextInput
                value={minute}
                onChangeText={setMinute}
                placeholder="00"
                placeholderTextColor="#a0aec0"
                style={[styles.formInput, styles.timeInput]}
                keyboardType="number-pad"
                maxLength={2}
                selectTextOnFocus
                accessibilityLabel="Menit"
              />
            </View>

            <Text style={styles.formLabel}>Jadwal</Text>
            <View style={styles.scheduleOption}>
              <Text style={styles.scheduleOptionText}>Daily</Text>
            </View>

            <Text style={styles.formLabel}>Ringtone</Text>
            <Pressable
              onPress={() => setIsRingtoneModalVisible(true)}
              style={styles.ringtoneSelector}
              accessibilityRole="button"
              accessibilityLabel={`Ringtone ${ringtone}`}
            >
              <Text style={styles.ringtoneValue}>{ringtone}</Text>
              <Ionicons name="chevron-forward" size={18} color="#718096" />
            </Pressable>

            <View style={styles.snoozeHeader}>
              <Text style={styles.formLabel}>Snooze</Text>
              <Switch
                value={snoozeEnabled}
                onValueChange={setSnoozeEnabled}
                trackColor={{ false: "#cbd5e1", true: "#feb2b2" }}
                thumbColor={snoozeEnabled ? "#e53e3e" : "#f7fafc"}
                accessibilityLabel="Snooze"
              />
            </View>

            {snoozeEnabled ? (
              <>
                <Text style={styles.formLabel}>Snooze Interval</Text>
                <View style={styles.snoozeInputRow}>
                  <TextInput
                    value={snoozeInterval}
                    onChangeText={setSnoozeInterval}
                    style={[styles.formInput, styles.snoozeInput]}
                    keyboardType="number-pad"
                    maxLength={3}
                    accessibilityLabel="Snooze Interval"
                  />
                  <Text style={styles.snoozeUnit}>menit</Text>
                </View>

                <Text style={styles.formLabel}>Snooze Times</Text>
                <View style={styles.snoozeInputRow}>
                  <TextInput
                    value={snoozeTimes}
                    onChangeText={setSnoozeTimes}
                    style={[styles.formInput, styles.snoozeInput]}
                    keyboardType="number-pad"
                    maxLength={3}
                    accessibilityLabel="Snooze Times"
                  />
                  <Text style={styles.snoozeUnit}>kali</Text>
                </View>
              </>
            ) : null}

            {formError ? (
              <Text style={styles.formError}>{formError}</Text>
            ) : null}

            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setIsAddModalVisible(false)}
                style={[styles.modalButton, styles.cancelButton]}
                accessibilityRole="button"
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </Pressable>
              <Pressable
                onPress={saveAlarm}
                style={[styles.modalButton, styles.saveButton]}
                accessibilityRole="button"
              >
                <Text style={styles.saveButtonText}>Simpan</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        visible={isRingtoneModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsRingtoneModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.ringtoneModalContent}>
            <Text style={styles.modalTitle}>Ringtone</Text>
            {RINGTONES.map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  setRingtone(option);
                  setIsRingtoneModalVisible(false);
                }}
                style={styles.ringtoneOption}
                accessibilityRole="radio"
                accessibilityState={{ checked: ringtone === option }}
              >
                <Text
                  style={[
                    styles.ringtoneOptionText,
                    ringtone === option && styles.ringtoneOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {ringtone === option ? (
                  <Ionicons name="checkmark" size={20} color="#e53e3e" />
                ) : null}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
