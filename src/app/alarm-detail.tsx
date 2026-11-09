// Halaman status alarm terseting dan simulasi dering alarm

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggle from "@/components/ThemeToggle";
import MathChallengeBox from "@/components/MathChallengeBox";
import { useTheme } from "@/context/ThemeContext";
import { useAlarmSimulation } from "@/hooks/useAlarmSimulation";
import { useMorningBriefing } from "@/hooks/useMorningBriefing";
import { detailStyles } from "@/styles/detailStyles";
import { calculateRemainingTime, formatElapsedMMSS } from "@/utils/timeUtils";

export default function AlarmDetailScreen() {
  const { theme } = useTheme();

  // Membaca parameter navigasi dari router
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

  // Hook simulasi dering alarm, tantangan matematika, dan data cuaca
  const {
    isSimulating,
    elapsedSeconds,
    mathQuestion,
    userAnswer,
    challengeError,
    startSimulation,
    refreshMathQuestion,
    handleAnswerChange,
    submitChallengeAndStop,
  } = useAlarmSimulation(alarmRingtone);
  const { briefing, errorMessage, refreshBriefing } = useMorningBriefing();

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

      <ScrollView
        style={[
          detailStyles.bodyContainer,
          { backgroundColor: theme.background },
        ]}
        contentContainerStyle={detailStyles.bodyContent}
      >
        {/* Banner konfirmasi alarm aktif */}
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

        {/* Kartu jam dan rincian jadwal */}
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

        {/* Kondisi cuaca saat alarm berbunyi beserta pesan error UI jika API gagal */}
        <View
          style={[
            detailStyles.sectionCard,
            {
              backgroundColor: theme.card,
              borderColor: errorMessage
                ? "rgba(239, 68, 68, 0.45)"
                : theme.border,
            },
          ]}
        >
          <View
            style={[
              detailStyles.sectionHeader,
              { justifyContent: "space-between" },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="sunny-outline" size={20} color={theme.primary} />
              <Text style={[detailStyles.sectionTitle, { color: theme.text }]}>
                Kondisi Cuaca Saat Alarm Berbunyi
              </Text>
            </View>

            <Pressable
              onPress={refreshBriefing}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Muat ulang cuaca"
            >
              <Ionicons name="refresh" size={16} color={theme.secondaryText} />
            </Pressable>
          </View>

          {errorMessage ? (
            <View
              style={[
                detailStyles.weatherErrorBox,
                {
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  borderColor: "rgba(239, 68, 68, 0.35)",
                },
              ]}
            >
              <Ionicons name="cloud-offline-outline" size={18} color="#ef4444" />
              <Text
                style={[detailStyles.weatherErrorText, { color: "#ef4444" }]}
              >
                {errorMessage}
              </Text>
            </View>
          ) : briefing ? (
            <View style={detailStyles.weatherRow}>
              <Text style={[detailStyles.weatherTemp, { color: theme.text }]}>
                {briefing.temperature}°C
              </Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text
                  style={[detailStyles.weatherCondition, { color: theme.text }]}
                >
                  {briefing.weatherLabel} • Angin {briefing.windSpeed} km/j
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
          ) : null}
        </View>

        {/* Panel simulasi uji bunyi dering alarm */}
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
              Simulasi Dering Alarm
            </Text>
          </View>

          <Text
            style={[
              detailStyles.sectionDescription,
              { color: theme.secondaryText },
            ]}
          >
            Uji coba bunyi alarm secara langsung untuk memastikan volume dan nada
            dering berfungsi dengan baik.
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
              {formatElapsedMMSS(elapsedSeconds)}
            </Text>
          </View>

          {/* Menampilkan tantangan matematika saat berdering, atau tombol mulai simulasi */}
          {isSimulating ? (
            <MathChallengeBox
              question={mathQuestion}
              userAnswer={userAnswer}
              errorMessage={challengeError}
              onChangeAnswer={handleAnswerChange}
              onRefreshQuestion={refreshMathQuestion}
              onSubmitChallenge={submitChallengeAndStop}
            />
          ) : (
            <Pressable
              onPress={startSimulation}
              style={[
                detailStyles.simulateButton,
                {
                  backgroundColor: "#10b981",
                },
              ]}
              accessibilityRole="button"
            >
              <Ionicons name="play-circle-outline" size={20} color="#ffffff" />
              <Text style={detailStyles.simulateButtonText}>
                Tes Bunyikan Alarm Sekarang
              </Text>
            </Pressable>
          )}
        </View>

        {/* Konfigurasi tunda (snooze) */}
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

        {/* Tombol navigasi Expo Router */}
        <View style={detailStyles.navButtonGroup}>
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
              Kembali ke Daftar
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/")}
            style={[
              detailStyles.navActionButton,
              {
                backgroundColor: theme.primary,
                borderColor: theme.primary,
              },
            ]}
            accessibilityRole="button"
          >
            <Ionicons name="checkmark-done" size={18} color="#ffffff" />
            <Text style={[detailStyles.navButtonText, { color: "#ffffff" }]}>
              Selesai &amp; Ke Beranda
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
