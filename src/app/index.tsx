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
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/styles";

// 1. Menerapkan Type & Interface khusus entitas Alarm
export type AlarmLabel =
  | "Work"
  | "Late Start"
  | "Appointment"
  | "Shopping"
  | "Bangun Pagi";

export interface AlarmItem {
  readonly id: string;
  time: string;
  period: "AM" | "PM";
  label: AlarmLabel;
  schedule: string;
  isActive: boolean;
}

// 2. Menerapkan Array of Objects awal untuk Alarm
const INITIAL_ALARMS: AlarmItem[] = [
  {
    id: "1",
    time: "6:30",
    period: "AM",
    label: "Work",
    schedule: "Weekdays",
    isActive: true,
  },
  {
    id: "2",
    time: "9:00",
    period: "AM",
    label: "Late Start",
    schedule: "Weekdays",
    isActive: true,
  },
  {
    id: "3",
    time: "2:45",
    period: "PM",
    label: "Appointment",
    schedule: "Tomorrow",
    isActive: false,
  },
  {
    id: "4",
    time: "4:00",
    period: "PM",
    label: "Shopping",
    schedule: "Saturdays",
    isActive: false,
  },
];

export default function AlarmScreen() {
  const [alarms, setAlarms] = useState<AlarmItem[]>(INITIAL_ALARMS);

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

  const addAlarm = () => {
    const newAlarm: AlarmItem = {
      id: String(Date.now()),
      time: "7:00",
      period: "AM",
      label: "Bangun Pagi",
      schedule: "Daily",
      isActive: true,
    };
    setAlarms((prev) => [newAlarm, ...prev]);
  };

  const activeAlarmCount = alarms.filter((item) => item.isActive).length;

  // 3. Menerapkan Custom Function untuk render item FlatList
  const renderAlarmCard = (item: AlarmItem) => (
    <Pressable
      key={item.id}
      onPress={() => toggleAlarm(item.id)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: item.isActive }}
      accessibilityLabel={`Alarm ${item.time} ${item.period}, ${item.label}`}
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
        accessibilityLabel={`Toggle alarm ${item.time} ${item.period}`}
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
          <Text style={styles.periodText}>{item.period}</Text>
          <Ionicons
            name="musical-notes"
            size={16}
            color="#a0aec0"
            style={styles.soundIcon}
          />
        </View>

        <Text style={styles.scheduleText}>{item.schedule}</Text>
      </View>

      {/* Tombol Hapus */}
      <Pressable
        onPress={() => deleteAlarm(item.id)}
        style={styles.deleteButton}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Hapus alarm ${item.time} ${item.period}`}
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
          onPress={addAlarm}
          style={styles.fabButton}
          accessibilityRole="button"
          accessibilityLabel="Add new alarm"
        >
          <Ionicons name="add" size={32} color="#ffffff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
