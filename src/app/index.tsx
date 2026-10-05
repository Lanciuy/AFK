import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles"; // Menerapkan External Style

// 1. Menerapkan Type & Interface
export type AlarmLabel = "Work" | "Late Start" | "Appointment" | "Shopping" | "Bangun Pagi";
export type TabName = "Alarms" | "Clock" | "Timer" | "Stopwatch";

export interface AlarmItem {
  readonly id: string;
  time: string;
  period: "AM" | "PM";
  label: AlarmLabel;
  emoji: string;
  schedule: string;
  isActive: boolean;
}

// 2. Menerapkan Array of Objects
const INITIAL_ALARMS: AlarmItem[] = [
  {
    id: "1",
    time: "6:30",
    period: "AM",
    label: "Work",
    emoji: "🏢",
    schedule: "Weekdays",
    isActive: true,
  },
  {
    id: "2",
    time: "9:00",
    period: "AM",
    label: "Late Start",
    emoji: "☕",
    schedule: "Weekdays",
    isActive: true,
  },
  {
    id: "3",
    time: "2:45",
    period: "PM",
    label: "Appointment",
    emoji: "👩‍💻",
    schedule: "Tomorrow",
    isActive: false,
  },
  {
    id: "4",
    time: "4:00",
    period: "PM",
    label: "Shopping",
    emoji: "🛒",
    schedule: "Saturdays",
    isActive: false,
  },
];

const TABS: { name: TabName; icon: keyof typeof Ionicons.glyphMap }[] = [
  { name: "Alarms", icon: "alarm-outline" },
  { name: "Clock", icon: "time-outline" },
  { name: "Timer", icon: "hourglass-outline" },
  { name: "Stopwatch", icon: "stopwatch-outline" },
];

/**
 * Main Clock and Alarm screen modeled after the reference mockup.
 * Presents a simplified, modern header, category tabs, clean alarm list cards,
 * and a floating action button (FAB).
 */
export default function Index() {
  const [alarms, setAlarms] = useState<AlarmItem[]>(INITIAL_ALARMS);
  const [activeTab, setActiveTab] = useState<TabName>("Alarms");

  /**
   * Toggles alarm active status and triggers pure state reconciliation.
   */
  const toggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  /**
   * Appends a new default alarm when pressing the FAB button.
   */
  const handleAddAlarm = () => {
    const newAlarm: AlarmItem = {
      id: String(Date.now()),
      time: "7:00",
      period: "AM",
      label: "Bangun Pagi",
      emoji: "⏰",
      schedule: "Daily",
      isActive: true,
    };
    setAlarms((prev) => [newAlarm, ...prev]);
  };

  // 3. Menerapkan Custom Function untuk render item FlatList
  const renderAlarm = (item: AlarmItem) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => toggleAlarm(item.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.isActive }}
        accessibilityLabel={`Alarm ${item.time} ${item.period}, ${item.label}`}
        // Menerapkan penggabungan External Style dan Inline Style (margin & border color)
        style={[
          styles.alarmCard,
          {
            marginBottom: 12,
            borderColor: item.isActive ? "#e53e3e" : "#f1f5f9",
            opacity: item.isActive ? 1 : 0.65,
          },
        ]}
      >
        {/* Tombol Checkbox */}
        <Pressable
          onPress={() => toggleAlarm(item.id)}
          style={styles.checkButton}
          hitSlop={8}
        >
          <Ionicons
            name={item.isActive ? "checkbox" : "square-outline"}
            size={24}
            color={item.isActive ? "#e53e3e" : "#cbd5e1"}
          />
        </Pressable>

        {/* Konten Detail Alarm */}
        <View style={styles.alarmDetails}>
          {/* Label dan Emoji */}
          <View style={styles.labelRow}>
            <Text style={{ marginRight: 6 }}>{item.emoji}</Text>
            <Text style={styles.labelText}>{item.label}</Text>
          </View>

          {/* Jam dan Periode AM/PM */}
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

          {/* Jadwal Hari */}
          <Text style={styles.scheduleText}>{item.schedule}</Text>
        </View>

        {/* Tombol Opsi Titik Tiga */}
        <Pressable style={styles.moreButton} hitSlop={8}>
          <Ionicons name="ellipsis-vertical" size={18} color="#a0aec0" />
        </Pressable>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Atas: The Clock + Action Icons */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <Pressable style={styles.headerIconButton} hitSlop={8}>
            <Ionicons name="menu-outline" size={24} color="#ffffff" />
          </Pressable>

          <Text style={styles.headerTitle}>The Clock</Text>

          <View style={styles.headerIcons}>
            <Pressable style={styles.headerIconButton} hitSlop={8}>
              <Ionicons name="moon-outline" size={20} color="#ffffff" />
            </Pressable>
            <Pressable style={styles.headerIconButton} hitSlop={8}>
              <Ionicons name="settings-outline" size={20} color="#ffffff" />
            </Pressable>
          </View>
        </View>

        {/* Baris Tab Navigasi Sederhana */}
        <View style={styles.tabsRow}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <Pressable
                key={tab.name}
                onPress={() => setActiveTab(tab.name)}
                style={[
                  styles.tabItem,
                  isActive && styles.tabItemActive,
                ]}
              >
                <Ionicons
                  name={tab.icon}
                  size={20}
                  color={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.65)"}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isActive && styles.tabLabelActive,
                  ]}
                >
                  {tab.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Kontainer Daftar Kartu Alarm */}
      <View style={styles.contentContainer}>
        {/* 4. Menerapkan Loop dengan FlatList */}
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderAlarm(item)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Floating Action Button (FAB) Tambah Alarm */}
        <Pressable
          onPress={handleAddAlarm}
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
