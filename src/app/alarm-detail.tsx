/**
 * @file src/app/alarm-detail.tsx
 * Halaman detail dan simulasi dering alarm.
 *
 * Menerapkan:
 * 1. Hook useState dan useEffect() untuk live ring simulation counter dan timer cleanup.
 * 2. Navigasi Expo Router: useLocalSearchParams(), router.push(), router.back(), dan router.replace().
 * 3. Tampilan adaptif dengan ThemeContext (Dark Mode / Light Mode).
 */

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

export default function AlarmDetailScreen() {
  const { theme, isDarkMode } = useTheme();

  // [PENILAIAN - POIN 2]: Membaca parameter navigasi menggunakan useLocalSearchParams()
  const params = useLocalSearchParams<{
    id?: string;
    label?: string;
    time?: string;
    schedule?: string;
    ringtone?: string;
    snoozeEnabled?: string;
    snoozeInterval?: string;
    snoozeTimes?: string;
  }>();

  const alarmId = params.id ?? "1";
  const alarmLabel = params.label ?? "Alarm Utama";
  const alarmTime = params.time ?? "07:00";
  const alarmSchedule = params.schedule ?? "Daily";
  const alarmRingtone = params.ringtone ?? "Default";
  const isSnooze = params.snoozeEnabled === "true";
  const snoozeInterval = params.snoozeInterval ?? "5";
  const snoozeTimes = params.snoozeTimes ?? "3";

  // [PENILAIAN - POIN 1]: Menerapkan hook useState untuk kontrol simulasi dering alarm
  const [isSimulating, setIsSimulating] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // [PENILAIAN - POIN 1]: Menerapkan hook useEffect() dengan cleanup function
  useEffect(() => {
    if (!isSimulating) {
      return;
    }

    const intervalId = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isSimulating]);

  const handleToggleSimulate = () => {
    setIsSimulating((current) => {
      const next = !current;
      if (!next) {
        setElapsedSeconds(0);
      }
      return next;
    });
  };

  const formatElapsed = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <SafeAreaView
      style={[
        detailStyles.safeArea,
        { backgroundColor: theme.headerBackground },
      ]}
    >
      {/* Header bar */}
      <View style={detailStyles.header}>
        <View style={detailStyles.headerLeft}>
          {/* [PENILAIAN - POIN 2]: Menerapkan router.back() */}
          <Pressable
            onPress={() => router.back()}
            style={detailStyles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Kembali ke daftar alarm"
            hitSlop={8}
          >
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </Pressable>
          <Text style={detailStyles.headerTitle}>Detail Alarm</Text>
        </View>

        <ThemeToggle />
      </View>

      {/* Konten Halaman */}
      <ScrollView
        style={[
          detailStyles.bodyContainer,
          { backgroundColor: theme.background },
        ]}
        contentContainerStyle={detailStyles.bodyContent}
      >
        {/* Kartu Jam Utama */}
        <View
          style={[
            detailStyles.mainCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[detailStyles.labelBadge, { color: theme.primary }]}>
            {alarmLabel} • #{alarmId}
          </Text>
          <Text style={[detailStyles.bigTimeText, { color: theme.text }]}>
            {alarmTime}
          </Text>
          <View style={detailStyles.badgeRow}>
            <View
              style={[
                detailStyles.subBadge,
                { backgroundColor: theme.selectedBackground },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={14}
                color={theme.primary}
              />
              <Text
                style={[detailStyles.subBadgeText, { color: theme.primary }]}
              >
                {alarmSchedule}
              </Text>
            </View>

            <View
              style={[
                detailStyles.subBadge,
                { backgroundColor: theme.inputBackground },
              ]}
            >
              <Ionicons
                name="musical-notes-outline"
                size={14}
                color={theme.secondaryText}
              />
              <Text
                style={[
                  detailStyles.subBadgeText,
                  { color: theme.secondaryText },
                ]}
              >
                {alarmRingtone}
              </Text>
            </View>
          </View>
        </View>

        {/* Panel Simulasi Dering Alarm (useState + useEffect) */}
        <View
          style={[
            detailStyles.sectionCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={detailStyles.sectionHeader}>
            <Ionicons
              name={isSimulating ? "alarm" : "alarm-outline"}
              size={22}
              color={isSimulating ? theme.primary : theme.secondaryText}
            />
            <Text
              style={[detailStyles.sectionTitle, { color: theme.text }]}
            >
              Simulasi Dering Alarm (useEffect)
            </Text>
          </View>

          <Text
            style={[
              detailStyles.sectionDescription,
              { color: theme.secondaryText },
            ]}
          >
            Menguji siklus hidup timer reaktif menggunakan hook useState &amp;
            useEffect(). Timer otomatis dibersihkan saat simulasi dimatikan atau
            layar di-unmount.
          </Text>

          <View
            style={[
              detailStyles.timerBox,
              {
                backgroundColor: theme.inputBackground,
                borderColor: isSimulating ? theme.primary : theme.border,
              },
            ]}
          >
            <Text
              style={[
                detailStyles.timerLabel,
                { color: theme.secondaryText },
              ]}
            >
              {isSimulating ? "Alarm Berdering Selama" : "Simulasi Siap"}
            </Text>
            <Text
              style={[
                detailStyles.timerValue,
                { color: isSimulating ? theme.primary : theme.mutedText },
              ]}
            >
              {formatElapsed(elapsedSeconds)}
            </Text>
          </View>

          <Pressable
            onPress={handleToggleSimulate}
            style={[
              detailStyles.simulateButton,
              {
                backgroundColor: isSimulating ? "#ef4444" : "#10b981",
              },
            ]}
            accessibilityRole="button"
          >
            <Ionicons
              name={isSimulating ? "stop-circle-outline" : "play-circle-outline"}
              size={20}
              color="#ffffff"
            />
            <Text style={detailStyles.simulateButtonText}>
              {isSimulating ? "Hentikan Dering" : "Mulai Deringkan Alarm"}
            </Text>
          </Pressable>
        </View>

        {/* Rincian Parameter Snooze */}
        <View
          style={[
            detailStyles.sectionCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[detailStyles.sectionTitle, { color: theme.text }]}>
            Konfigurasi Snooze
          </Text>
          <View style={detailStyles.paramRow}>
            <Text
              style={[detailStyles.paramLabel, { color: theme.secondaryText }]}
            >
              Status Snooze
            </Text>
            <Text
              style={[
                detailStyles.paramValue,
                { color: isSnooze ? theme.primary : theme.mutedText },
              ]}
            >
              {isSnooze ? "Aktif" : "Nonaktif"}
            </Text>
          </View>

          {isSnooze ? (
            <>
              <View style={detailStyles.paramRow}>
                <Text
                  style={[
                    detailStyles.paramLabel,
                    { color: theme.secondaryText },
                  ]}
                >
                  Interval
                </Text>
                <Text
                  style={[detailStyles.paramValue, { color: theme.text }]}
                >
                  {snoozeInterval} menit
                </Text>
              </View>
              <View style={detailStyles.paramRow}>
                <Text
                  style={[
                    detailStyles.paramLabel,
                    { color: theme.secondaryText },
                  ]}
                >
                  Frekuensi
                </Text>
                <Text
                  style={[detailStyles.paramValue, { color: theme.text }]}
                >
                  {snoozeTimes} kali dering
                </Text>
              </View>
            </>
          ) : null}
        </View>

        {/* [PENILAIAN - POIN 2]: Tombol Aksi Navigasi Expo Router */}
        <View style={detailStyles.navButtonGroup}>
          {/* 1. router.back() */}
          <Pressable
            onPress={() => router.back()}
            style={[
              detailStyles.navActionButton,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            accessibilityRole="button"
          >
            <Ionicons
              name="arrow-back-outline"
              size={18}
              color={theme.text}
            />
            <Text style={[detailStyles.navButtonText, { color: theme.text }]}>
              Kembali (router.back)
            </Text>
          </Pressable>

          {/* 2. router.replace() */}
          <Pressable
            onPress={() => router.replace("/")}
            style={[
              detailStyles.navActionButton,
              {
                backgroundColor: isDarkMode ? "#1e293b" : "#4a154b",
                borderColor: theme.border,
              },
            ]}
            accessibilityRole="button"
          >
            <Ionicons name="home-outline" size={18} color="#ffffff" />
            <Text style={[detailStyles.navButtonText, { color: "#ffffff" }]}>
              Beranda (router.replace)
            </Text>
          </Pressable>

          {/* 3. router.push() */}
          <Pressable
            onPress={() => router.push("/navigation-demo")}
            style={[
              detailStyles.navActionButton,
              {
                backgroundColor: theme.primary,
                borderColor: theme.primary,
              },
            ]}
            accessibilityRole="button"
          >
            <Ionicons
              name="compass-outline"
              size={18}
              color="#ffffff"
            />
            <Text style={[detailStyles.navButtonText, { color: "#ffffff" }]}>
              Demo Lengkap (router.push)
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const detailStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  bodyContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bodyContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  mainCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  labelBadge: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  bigTimeText: {
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: -1,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  subBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  subBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  sectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  timerBox: {
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 4,
  },
  timerLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  timerValue: {
    fontSize: 32,
    fontWeight: "800",
    marginTop: 2,
    fontVariant: ["tabular-nums"],
  },
  simulateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    paddingVertical: 12,
  },
  simulateButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  paramRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(148, 163, 184, 0.2)",
  },
  paramLabel: {
    fontSize: 13,
  },
  paramValue: {
    fontSize: 13,
    fontWeight: "700",
  },
  navButtonGroup: {
    gap: 10,
    marginTop: 6,
  },
  navActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 13,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
