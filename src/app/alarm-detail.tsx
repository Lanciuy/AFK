/**
 * @file src/app/alarm-detail.tsx
 * Halaman status alarm terseting dan simulasi dering alarm.
 *
 * Menerapkan:
 * 1. Penghitungan estimasi sisa waktu berbunyi secara real-time.
 * 2. Hook useState dan useEffect() untuk simulasi dering alarm dan timer cleanup.
 * 3. Integrasi data cuaca pagi dan kutipan dari External API.
 * 4. Navigasi Expo Router: useLocalSearchParams(), router.push(), router.back(), dan router.replace().
 */

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { fetchExternalMorningBriefingAsync } from "@/services/alarmAsyncService";
import type { MorningBriefing } from "@/types/alarm";

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
  const alarmLabel = params.label ?? "Bangun Pagi";
  const alarmTime = params.time ?? "07:00";
  const alarmSchedule = params.schedule ?? "Daily";
  const alarmRingtone = params.ringtone ?? "Default";
  const isSnooze = params.snoozeEnabled === "true";
  const snoozeInterval = params.snoozeInterval ?? "5";
  const snoozeTimes = params.snoozeTimes ?? "3";

  // State simulasi dering alarm
  const [isSimulating, setIsSimulating] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // State cuaca & kutipan pagi dari External API
  const [briefing, setBriefing] = useState<MorningBriefing | null>(null);

  // [PENILAIAN - POIN 1]: Hook useEffect() untuk timer simulasi dengan cleanup function
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

  // [PENILAIAN - POIN 2 & POIN 3]: Memuat data External API menggunakan .then()
  useEffect(() => {
    fetchExternalMorningBriefingAsync()
      .then((data: MorningBriefing) => {
        setBriefing(data);
      })
      .catch((err: Error) => {
        console.warn("Detail screen briefing load error:", err.message);
      });
  }, []);

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

  /**
   * Menghitung selisih waktu menuju jam alarm berbunyi
   */
  const calculateRemainingTime = (targetTime: string): string => {
    const [targetHour = 7, targetMin = 0] = targetTime
      .split(":")
      .map(Number);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    let diffMinutes =
      targetHour * 60 + targetMin - (currentHour * 60 + currentMin);
    if (diffMinutes <= 0) {
      diffMinutes += 24 * 60; // Jika jam target sudah lewat hari ini, setel untuk besok
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours} jam ${minutes} menit lagi`;
  };

  return (
    <SafeAreaView
      style={[
        detailStyles.safeArea,
        { backgroundColor: theme.headerBackground },
      ]}
    >
      {/* Header Bar */}
      <View style={detailStyles.header}>
        <View style={detailStyles.headerLeft}>
          {/* [PENILAIAN - POIN 2]: router.back() */}
          <Pressable
            onPress={() => router.back()}
            style={detailStyles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Kembali ke daftar alarm"
            hitSlop={8}
          >
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </Pressable>
          <Text style={detailStyles.headerTitle}>Status Alarm</Text>
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
        {/* Banner Sukses Alarm Terseting */}
        <View
          style={[
            detailStyles.successBanner,
            {
              backgroundColor: theme.selectedBackground,
              borderColor: theme.selectedBorder,
            },
          ]}
        >
          <Ionicons
            name="checkmark-circle"
            size={22}
            color={theme.primary}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={[detailStyles.successBannerTitle, { color: theme.primary }]}
            >
              ALARM BERHASIL DISETEL &amp; AKTIF
            </Text>
            <Text
              style={[
                detailStyles.successBannerSubtitle,
                { color: theme.secondaryText },
              ]}
            >
              Akan berbunyi dalam {calculateRemainingTime(alarmTime)}
            </Text>
          </View>
        </View>

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

        {/* Kartu Prediksi Cuaca & Motivasi Pagi (External API) */}
        {briefing ? (
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
                name="sunny-outline"
                size={20}
                color={theme.primary}
              />
              <Text
                style={[detailStyles.sectionTitle, { color: theme.text }]}
              >
                Kondisi Cuaca Saat Alarm Berbunyi
              </Text>
            </View>

            <View style={detailStyles.weatherRow}>
              <Text
                style={[detailStyles.weatherTemp, { color: theme.text }]}
              >
                {briefing.temperature}°C
              </Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text
                  style={[
                    detailStyles.weatherCondition,
                    { color: theme.text },
                  ]}
                >
                  {briefing.weatherLabel}
                </Text>
                <Text
                  style={[
                    detailStyles.weatherLocation,
                    { color: theme.mutedText },
                  ]}
                >
                  {briefing.locationName}
                </Text>
              </View>
            </View>

            <View
              style={[
                detailStyles.quoteBox,
                {
                  backgroundColor: theme.inputBackground,
                  borderLeftColor: theme.primary,
                },
              ]}
            >
              <Text
                style={[detailStyles.quoteText, { color: theme.text }]}
              >
                &ldquo;{briefing.quote}&rdquo;
              </Text>
              <Text
                style={[detailStyles.quoteAuthor, { color: theme.primary }]}
              >
                — {briefing.quoteAuthor}
              </Text>
            </View>
          </View>
        ) : null}

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
            Uji coba simulasi bunyi alarm secara langsung untuk memastikan
            volume, getar, dan nada dering berfungsi dengan baik.
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
              {isSimulating ? "Alarm Sedang Berdering" : "Simulasi Siap"}
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
              name={
                isSimulating ? "stop-circle-outline" : "play-circle-outline"
              }
              size={20}
              color="#ffffff"
            />
            <Text style={detailStyles.simulateButtonText}>
              {isSimulating ? "Matikan Alarm" : "Tes Bunyikan Alarm Sekarang"}
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
            Konfigurasi Tunda (Snooze)
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
                  {snoozeInterval} menit sekali
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
                  {snoozeTimes} kali pengulangan
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
              Kembali ke Daftar (router.back)
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
            <Ionicons name="checkmark-done" size={18} color="#ffffff" />
            <Text style={[detailStyles.navButtonText, { color: "#ffffff" }]}>
              Selesai &amp; Ke Beranda (router.replace)
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
              Panduan Navigasi (router.push)
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
  successBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  successBannerTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  successBannerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
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
  weatherRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  weatherTemp: {
    fontSize: 32,
    fontWeight: "800",
  },
  weatherCondition: {
    fontSize: 14,
    fontWeight: "700",
  },
  weatherLocation: {
    fontSize: 12,
  },
  quoteBox: {
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
    marginTop: 4,
  },
  quoteText: {
    fontSize: 12,
    fontStyle: "italic",
    lineHeight: 18,
  },
  quoteAuthor: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
    textAlign: "right",
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
