// Komponen form Tahap 3: Konfigurasi tunda (snooze) dan kartu ringkasan alarm

import React from "react";
import { Platform, Switch, Text, TextInput, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { formStyles } from "@/styles/formStyles";

interface StepSnoozeAndSummaryProps {
  snoozeEnabled: boolean;
  snoozeInterval: string;
  snoozeTimes: string;
  hour: string;
  minute: string;
  alarmName: string;
  schedule: string;
  ringtone: string;
  setSnoozeEnabled: (val: boolean) => void;
  setSnoozeInterval: (val: string) => void;
  setSnoozeTimes: (val: string) => void;
}

export default function StepSnoozeAndSummary({
  snoozeEnabled,
  snoozeInterval,
  snoozeTimes,
  hour,
  minute,
  alarmName,
  schedule,
  ringtone,
  setSnoozeEnabled,
  setSnoozeInterval,
  setSnoozeTimes,
}: StepSnoozeAndSummaryProps) {
  const { theme, isDarkMode } = useTheme();

  // Gaya dinamis kolom input angka sesuai tema aktif
  const inputThemeStyle = {
    backgroundColor: theme.inputBackground,
    borderColor: theme.border,
    color: theme.text,
  };

  // Warna indikator switch snooze saat aktif maupun nonaktif
  const snoozeThumbColor = snoozeEnabled
    ? theme.primary
    : isDarkMode
      ? "#64748b"
      : "#f1f5f9";

  // Properti tambahan switch khusus untuk kompatibilitas platform web
  const webSwitchProps =
    Platform.OS === "web" ? { activeThumbColor: snoozeThumbColor } : {};

  return (
    <View>
      {/* Sakelar aktif/nonaktif fitur snooze */}
      <View style={formStyles.snoozeHeader}>
        <View>
          <Text
            style={[
              formStyles.formLabel,
              { color: theme.text, marginBottom: 0 },
            ]}
          >
            Aktifkan Snooze (Tunda)
          </Text>
          <Text style={{ fontSize: 11, color: theme.mutedText }}>
            Izinkan alarm berbunyi ulang jika belum dimatikan
          </Text>
        </View>
        <Switch
          value={snoozeEnabled}
          onValueChange={setSnoozeEnabled}
          trackColor={{
            false: isDarkMode ? "#334155" : "#cbd5e1",
            true: isDarkMode ? "#7f1d1d" : "#fecaca",
          }}
          thumbColor={snoozeThumbColor}
          {...webSwitchProps}
          accessibilityLabel="Snooze"
        />
      </View>

      {/* Pengaturan jeda menit dan batas pengulangan snooze */}
      {snoozeEnabled ? (
        <View style={{ marginTop: 12 }}>
          <Text style={[formStyles.formLabel, { color: theme.secondaryText }]}>
            Interval Tunda (Menit)
          </Text>
          <View style={formStyles.snoozeInputRow}>
            <TextInput
              value={snoozeInterval}
              onChangeText={setSnoozeInterval}
              style={[
                formStyles.formInput,
                formStyles.snoozeInput,
                inputThemeStyle,
              ]}
              keyboardType="number-pad"
              maxLength={2}
              accessibilityLabel="Snooze Interval"
            />
            <Text
              style={[formStyles.snoozeUnit, { color: theme.mutedText }]}
            >
              menit sekali
            </Text>
          </View>

          <Text style={[formStyles.formLabel, { color: theme.secondaryText }]}>
            Maksimal Pengulangan (Kali)
          </Text>
          <View style={formStyles.snoozeInputRow}>
            <TextInput
              value={snoozeTimes}
              onChangeText={setSnoozeTimes}
              style={[
                formStyles.formInput,
                formStyles.snoozeInput,
                inputThemeStyle,
              ]}
              keyboardType="number-pad"
              maxLength={2}
              accessibilityLabel="Snooze Times"
            />
            <Text
              style={[formStyles.snoozeUnit, { color: theme.mutedText }]}
            >
              kali pengulangan
            </Text>
          </View>
        </View>
      ) : null}

      {/* Kartu ringkasan seluruh konfigurasi alarm sebelum disimpan */}
      <View
        style={[
          formStyles.summaryCard,
          {
            backgroundColor: theme.inputBackground,
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={[formStyles.summaryTitle, { color: theme.primary }]}>
          Ringkasan Alarm
        </Text>
        <View style={formStyles.summaryRow}>
          <Text
            style={[formStyles.summaryLabel, { color: theme.secondaryText }]}
          >
            Waktu &amp; Label:
          </Text>
          <Text style={[formStyles.summaryValue, { color: theme.text }]}>
            {hour.padStart(2, "0")}:{minute.padStart(2, "0")} • {alarmName}
          </Text>
        </View>
        <View style={formStyles.summaryRow}>
          <Text
            style={[formStyles.summaryLabel, { color: theme.secondaryText }]}
          >
            Jadwal:
          </Text>
          <Text style={[formStyles.summaryValue, { color: theme.text }]}>
            {schedule}
          </Text>
        </View>
        <View style={formStyles.summaryRow}>
          <Text
            style={[formStyles.summaryLabel, { color: theme.secondaryText }]}
          >
            Nada Dering:
          </Text>
          <Text style={[formStyles.summaryValue, { color: theme.text }]}>
            {ringtone}
          </Text>
        </View>
        <View style={formStyles.summaryRow}>
          <Text
            style={[formStyles.summaryLabel, { color: theme.secondaryText }]}
          >
            Snooze:
          </Text>
          <Text style={[formStyles.summaryValue, { color: theme.text }]}>
            {snoozeEnabled
              ? `${snoozeInterval}m × ${snoozeTimes} kali`
              : "Tidak aktif"}
          </Text>
        </View>
      </View>
    </View>
  );
}

