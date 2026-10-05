import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles"; // Menerapkan External Style

// 1. Menerapkan Type & Interface
export type AlarmLabel = "Kerja" | "Kuliah" | "Olahraga" | "Bangun Pagi";

export interface AlarmItem {
  readonly id: string;
  time: string;
  period: "AM" | "PM";
  label: AlarmLabel;
  isActive: boolean;
}

// 2. Menerapkan Array of Objects awal
const INITIAL_ALARMS: AlarmItem[] = [
  {
    id: "1",
    time: "05:00",
    period: "AM",
    label: "Bangun Pagi",
    isActive: true,
  },
  {
    id: "2",
    time: "07:30",
    period: "AM",
    label: "Kuliah",
    isActive: true,
  },
  {
    id: "3",
    time: "09:00",
    period: "PM",
    label: "Olahraga",
    isActive: false,
  },
];

/**
 * Index screen rendering alarm management list.
 * Integrates SafeAreaView to prevent notch/island clipping across iOS and Android edge-to-edge.
 */
export default function Index() {
  const [alarms, setAlarms] = useState<AlarmItem[]>(INITIAL_ALARMS);

  /**
   * Toggles alarm active state by matching immutable ID.
   * Produces a new state array reference to satisfy pure component re-renders.
   */
  const toggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  // 3. Menerapkan Custom Function untuk render item FlatList
  const renderAlarm = (item: AlarmItem) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => toggleAlarm(item.id)}
        accessibilityRole="switch"
        accessibilityState={{ checked: item.isActive }}
        accessibilityLabel={`Alarm ${item.time} ${item.period}, ${item.label}`}
        // Menerapkan penggabungan External Style dan Inline Style (margin & border color)
        style={[
          styles.alarmCard,
          {
            marginBottom: 12,
            borderColor: item.isActive ? "#4caf50" : "#e9ecef",
          },
        ]}
      >
        {/* Ikon Checkbox Dinamis berdasarkan status aktif */}
        <Ionicons
          name={item.isActive ? "checkmark-circle" : "ellipse-outline"}
          size={28}
          color={item.isActive ? "#4caf50" : "#aaaaaa"}
        />

        {/* Info Waktu dan Label */}
        <View style={styles.infoContainer}>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.periodText}>{item.period}</Text>
          </View>
          <Text style={styles.labelText}>{item.label}</Text>
        </View>

        {/* Menerapkan murni Inline Style untuk badge tombol status ON/OFF */}
        <View
          style={{
            backgroundColor: item.isActive ? "#e8f5e9" : "#f1f1f1",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: item.isActive ? "#2e7d32" : "#888888",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {item.isActive ? "ON" : "OFF"}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Daftar Alarm</Text>

        {/* 4. Menerapkan Loop dengan FlatList */}
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderAlarm(item)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
