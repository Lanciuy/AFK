/**
 * @file src/components/AlarmForm.tsx
 * Modal form input dan edit alarm dengan alur bertahap (Wizard 3 Tahap)
 * yang rapi, proper, dan adaptif terhadap tema (Light/Dark).
 *
 * Menerapkan:
 * 1. Wizard 3 tahap: (1) Waktu & Label -> (2) Jadwal & Nada -> (3) Snooze & Konfirmasi.
 * 2. Pemanggilan fungsi validasi async bertahap menggunakan rantai .then() dan .catch().
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { RINGTONES, SCHEDULE_OPTIONS } from "@/data/alarmData";
import { validateStepInputAsync } from "@/services/alarmAsyncService";
import {
  previewAlarmSoundAsync,
  stopAlarmSoundAsync,
} from "@/services/soundService";
import { styles } from "@/styles/styles";

interface AlarmFormProps {
  visible: boolean;
  ringtoneModalVisible: boolean;
  isEditing: boolean;

  alarmName: string;
  hour: string;
  minute: string;
  schedule: string;
  ringtone: string;
  snoozeEnabled: boolean;
  snoozeInterval: string;
  snoozeTimes: string;
  formError: string;

  onClose: () => void;
  onSave: () => void;
  onRingtoneModalOpen: () => void;
  onRingtoneModalClose: () => void;

  setAlarmName: (value: string) => void;
  setHour: (value: string) => void;
  setMinute: (value: string) => void;
  setSchedule: (value: string) => void;
  setRingtone: (value: string) => void;
  setSnoozeEnabled: (value: boolean) => void;
  setSnoozeInterval: (value: string) => void;
  setSnoozeTimes: (value: string) => void;
  setFormError: (value: string) => void;
}

const QUICK_PRESETS = [
  { label: "05:00 Subuh", h: "05", m: "00" },
  { label: "06:00 Pagi", h: "06", m: "00" },
  { label: "07:00 Masuk", h: "07", m: "00" },
  { label: "12:30 Siang", h: "12", m: "30" },
  { label: "21:30 Malam", h: "21", m: "30" },
];

export default function AlarmForm({
  visible,
  ringtoneModalVisible,
  isEditing,
  alarmName,
  hour,
  minute,
  schedule,
  ringtone,
  snoozeEnabled,
  snoozeInterval,
  snoozeTimes,
  formError,
  onClose,
  onSave,
  onRingtoneModalOpen,
  onRingtoneModalClose,
  setAlarmName,
  setHour,
  setMinute,
  setSchedule,
  setRingtone,
  setSnoozeEnabled,
  setSnoozeInterval,
  setSnoozeTimes,
  setFormError,
}: AlarmFormProps) {
  const { theme, isDarkMode } = useTheme();

  // State untuk mengontrol tahap aktif wizard (Tahap 1, 2, atau 3)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // State untuk mencatat nada dering yang sedang diputar pratinjaunya
  const [previewingRingtone, setPreviewingRingtone] = useState<string | null>(
    null
  );

  const inputThemeStyle = {
    backgroundColor: theme.inputBackground,
    borderColor: theme.border,
    color: theme.text,
  };

  const snoozeThumbColor = snoozeEnabled
    ? theme.primary
    : isDarkMode
      ? "#64748b"
      : "#f1f5f9";

  const webSwitchProps =
    Platform.OS === "web"
      ? { activeThumbColor: snoozeThumbColor }
      : {};

  // Memutar pratinjau ringtone native selama 3 detik
  const handlePreviewRingtone = (optionName: string) => {
    setPreviewingRingtone(optionName);
    previewAlarmSoundAsync(optionName, 3000)
      .then(() => {
        setTimeout(() => {
          setPreviewingRingtone((curr) => (curr === optionName ? null : curr));
        }, 3000);
      })
      .catch((err: Error) => {
        console.warn("Gagal memutar pratinjau ringtone:", err.message);
        setPreviewingRingtone(null);
      });
  };

  // Memilih nada dering sekaligus memutar konfirmasi nada singkat
  const handleSelectRingtone = (optionName: string) => {
    setRingtone(optionName);
    previewAlarmSoundAsync(optionName, 2000).catch((err: Error) => {
      console.warn("Pratinjau ringtone error:", err.message);
    });
    setPreviewingRingtone(null);
    onRingtoneModalClose();
  };

  // Menutup modal ringtone dan menghentikan audio pratinjau
  const handleCloseRingtoneModal = () => {
    stopAlarmSoundAsync().catch((err: Error) => {
      console.warn("Gagal menghentikan audio saat modal ditutup:", err.message);
    });
    setPreviewingRingtone(null);
    onRingtoneModalClose();
  };

  // Reset step dan matikan audio ketika form ditutup
  const handleModalClose = () => {
    stopAlarmSoundAsync().catch((err: Error) => {
      console.warn("Gagal menghentikan audio saat form ditutup:", err.message);
    });
    setPreviewingRingtone(null);
    setCurrentStep(1);
    setFormError("");
    onClose();
  };

  // [PENILAIAN - POIN 3]: Menggunakan fungsi async kustom dengan .then() dan .catch()
  const handleNextStep = () => {
    setFormError("");

    validateStepInputAsync(currentStep, {
      alarmName,
      hour,
      minute,
      schedule,
      ringtone,
      snoozeEnabled,
      snoozeInterval,
      snoozeTimes,
    })
      .then(() => {
        // Berhasil validasi tahap berjalan, melangkah ke tahap selanjutnya
        setCurrentStep((prev) => Math.min(prev + 1, 3));
      })
      .catch((error: Error) => {
        // Menangkap reject() dari validasi async dan menampilkan error
        setFormError(error.message);
      });
  };

  const handlePrevStep = () => {
    setFormError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <ScrollView
            style={styles.modalScrollView}
            contentContainerStyle={[
              styles.modalContent,
              { backgroundColor: theme.surface },
            ]}
            keyboardShouldPersistTaps="handled"
          >
            {/* Judul Modal */}
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {isEditing ? "Edit Alarm" : "Pengaturan Alarm Baru"}
            </Text>

            {/* Stepper Indikator 3 Tahap */}
            <View style={styles.stepperContainer}>
              {/* Node 1 */}
              <View style={styles.stepperStepWrapper}>
                <View
                  style={[
                    styles.stepperNode,
                    {
                      borderColor:
                        currentStep >= 1 ? theme.primary : theme.border,
                      backgroundColor:
                        currentStep === 1
                          ? theme.primary
                          : currentStep > 1
                            ? theme.selectedBackground
                            : theme.inputBackground,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.stepperNodeText,
                      {
                        color:
                          currentStep === 1
                            ? "#ffffff"
                            : currentStep > 1
                              ? theme.primary
                              : theme.mutedText,
                      },
                    ]}
                  >
                    {currentStep > 1 ? "✓" : "1"}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepperLabel,
                    {
                      color:
                        currentStep === 1 ? theme.primary : theme.mutedText,
                    },
                  ]}
                >
                  Waktu
                </Text>
              </View>

              <View
                style={[
                  styles.stepperConnector,
                  {
                    backgroundColor:
                      currentStep >= 2 ? theme.primary : theme.border,
                  },
                ]}
              />

              {/* Node 2 */}
              <View style={styles.stepperStepWrapper}>
                <View
                  style={[
                    styles.stepperNode,
                    {
                      borderColor:
                        currentStep >= 2 ? theme.primary : theme.border,
                      backgroundColor:
                        currentStep === 2
                          ? theme.primary
                          : currentStep > 2
                            ? theme.selectedBackground
                            : theme.inputBackground,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.stepperNodeText,
                      {
                        color:
                          currentStep === 2
                            ? "#ffffff"
                            : currentStep > 2
                              ? theme.primary
                              : theme.mutedText,
                      },
                    ]}
                  >
                    {currentStep > 2 ? "✓" : "2"}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepperLabel,
                    {
                      color:
                        currentStep === 2 ? theme.primary : theme.mutedText,
                    },
                  ]}
                >
                  Jadwal
                </Text>
              </View>

              <View
                style={[
                  styles.stepperConnector,
                  {
                    backgroundColor:
                      currentStep >= 3 ? theme.primary : theme.border,
                  },
                ]}
              />

              {/* Node 3 */}
              <View style={styles.stepperStepWrapper}>
                <View
                  style={[
                    styles.stepperNode,
                    {
                      borderColor:
                        currentStep >= 3 ? theme.primary : theme.border,
                      backgroundColor:
                        currentStep === 3
                          ? theme.primary
                          : theme.inputBackground,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.stepperNodeText,
                      {
                        color:
                          currentStep === 3 ? "#ffffff" : theme.mutedText,
                      },
                    ]}
                  >
                    3
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepperLabel,
                    {
                      color:
                        currentStep === 3 ? theme.primary : theme.mutedText,
                    },
                  ]}
                >
                  Snooze
                </Text>
              </View>
            </View>

            {/* ================= TAHAP 1: WAKTU & NAMA ================= */}
            {currentStep === 1 ? (
              <View>
                <Text
                  style={[
                    styles.formLabel,
                    { color: theme.secondaryText, textAlign: "center" },
                  ]}
                >
                  Atur Waktu Alarm (Format 24 Jam)
                </Text>

                <View style={styles.timeInputRow}>
                  <TextInput
                    value={hour}
                    onChangeText={setHour}
                    placeholder="07"
                    placeholderTextColor={theme.subtleText}
                    style={[
                      styles.formInput,
                      styles.timeInput,
                      inputThemeStyle,
                    ]}
                    keyboardType="number-pad"
                    maxLength={2}
                    selectTextOnFocus
                    accessibilityLabel="Jam"
                  />

                  <Text
                    style={[
                      styles.timeSeparator,
                      { color: theme.secondaryText },
                    ]}
                  >
                    :
                  </Text>

                  <TextInput
                    value={minute}
                    onChangeText={setMinute}
                    placeholder="00"
                    placeholderTextColor={theme.subtleText}
                    style={[
                      styles.formInput,
                      styles.timeInput,
                      inputThemeStyle,
                    ]}
                    keyboardType="number-pad"
                    maxLength={2}
                    selectTextOnFocus
                    accessibilityLabel="Menit"
                  />
                </View>

                {/* Preset Cepat */}
                <Text
                  style={[
                    styles.formLabel,
                    { color: theme.mutedText, fontSize: 12 },
                  ]}
                >
                  Pilihan Waktu Cepat:
                </Text>
                <View style={styles.presetWrapper}>
                  {QUICK_PRESETS.map((preset) => (
                    <Pressable
                      key={preset.label}
                      onPress={() => {
                        setHour(preset.h);
                        setMinute(preset.m);
                      }}
                      style={[
                        styles.presetChip,
                        {
                          backgroundColor:
                            hour === preset.h && minute === preset.m
                              ? theme.selectedBackground
                              : theme.inputBackground,
                          borderColor:
                            hour === preset.h && minute === preset.m
                              ? theme.selectedBorder
                              : theme.border,
                        },
                      ]}
                      accessibilityRole="button"
                    >
                      <Text
                        style={[
                          styles.presetChipText,
                          {
                            color:
                              hour === preset.h && minute === preset.m
                                ? theme.selectedText
                                : theme.secondaryText,
                          },
                        ]}
                      >
                        {preset.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text
                  style={[styles.formLabel, { color: theme.secondaryText }]}
                >
                  Nama / Label Alarm
                </Text>
                <TextInput
                  value={alarmName}
                  onChangeText={setAlarmName}
                  placeholder="Misal: Bangun Pagi / Kuliah"
                  placeholderTextColor={theme.subtleText}
                  style={[styles.formInput, inputThemeStyle]}
                  maxLength={50}
                  accessibilityLabel="Nama Alarm"
                />
              </View>
            ) : null}

            {/* ================= TAHAP 2: JADWAL & RINGTO NE ================= */}
            {currentStep === 2 ? (
              <View>
                <Text
                  style={[styles.formLabel, { color: theme.secondaryText }]}
                >
                  Pilih Pengulangan Jadwal
                </Text>
                <View style={styles.scheduleContainer}>
                  {SCHEDULE_OPTIONS.map((option) => {
                    const isSelected = schedule === option;
                    return (
                      <Pressable
                        key={option}
                        onPress={() => setSchedule(option)}
                        style={[
                          styles.scheduleOption,
                          {
                            backgroundColor: isSelected
                              ? theme.selectedBackground
                              : theme.inputBackground,
                            borderColor: isSelected
                              ? theme.selectedBorder
                              : theme.border,
                          },
                        ]}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: isSelected }}
                      >
                        <Text
                          style={[
                            styles.scheduleOptionText,
                            {
                              color: isSelected
                                ? theme.selectedText
                                : theme.mutedText,
                            },
                          ]}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <Text
                  style={[styles.formLabel, { color: theme.secondaryText }]}
                >
                  Pilih Nada Dering
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Pressable
                    onPress={onRingtoneModalOpen}
                    style={[
                      styles.ringtoneSelector,
                      {
                        flex: 1,
                        backgroundColor: theme.inputBackground,
                        borderColor: theme.border,
                      },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Ringtone ${ringtone}`}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Ionicons
                        name="musical-notes-outline"
                        size={18}
                        color={theme.primary}
                      />
                      <Text
                        style={[styles.ringtoneValue, { color: theme.text }]}
                      >
                        {ringtone}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={theme.mutedText}
                    />
                  </Pressable>

                  <Pressable
                    onPress={() => handlePreviewRingtone(ringtone)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      backgroundColor: theme.inputBackground,
                      borderWidth: 1,
                      borderColor:
                        previewingRingtone === ringtone
                          ? theme.primary
                          : theme.border,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Dengarkan Nada Dering Terpilih"
                  >
                    <Ionicons
                      name={
                        previewingRingtone === ringtone
                          ? "volume-high"
                          : "volume-medium-outline"
                      }
                      size={22}
                      color={
                        previewingRingtone === ringtone
                          ? theme.primary
                          : theme.secondaryText
                      }
                    />
                  </Pressable>
                </View>
              </View>
            ) : null}

            {/* ================= TAHAP 3: SNOOZE & RINGKASAN ================= */}
            {currentStep === 3 ? (
              <View>
                <View style={styles.snoozeHeader}>
                  <View>
                    <Text
                      style={[
                        styles.formLabel,
                        { color: theme.text, marginBottom: 0 },
                      ]}
                    >
                      Aktifkan Snooze (Tunda)
                    </Text>
                    <Text
                      style={{ fontSize: 11, color: theme.mutedText }}
                    >
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

                {snoozeEnabled ? (
                  <View style={{ marginTop: 12 }}>
                    <Text
                      style={[
                        styles.formLabel,
                        { color: theme.secondaryText },
                      ]}
                    >
                      Interval Tunda (Menit)
                    </Text>
                    <View style={styles.snoozeInputRow}>
                      <TextInput
                        value={snoozeInterval}
                        onChangeText={setSnoozeInterval}
                        style={[
                          styles.formInput,
                          styles.snoozeInput,
                          inputThemeStyle,
                        ]}
                        keyboardType="number-pad"
                        maxLength={2}
                        accessibilityLabel="Snooze Interval"
                      />
                      <Text
                        style={[
                          styles.snoozeUnit,
                          { color: theme.mutedText },
                        ]}
                      >
                        menit sekali
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.formLabel,
                        { color: theme.secondaryText },
                      ]}
                    >
                      Maksimal Pengulangan (Kali)
                    </Text>
                    <View style={styles.snoozeInputRow}>
                      <TextInput
                        value={snoozeTimes}
                        onChangeText={setSnoozeTimes}
                        style={[
                          styles.formInput,
                          styles.snoozeInput,
                          inputThemeStyle,
                        ]}
                        keyboardType="number-pad"
                        maxLength={2}
                        accessibilityLabel="Snooze Times"
                      />
                      <Text
                        style={[
                          styles.snoozeUnit,
                          { color: theme.mutedText },
                        ]}
                      >
                        kali pengulangan
                      </Text>
                    </View>
                  </View>
                ) : null}

                {/* Kartu Ringkasan Alarm Sebelum Disetel */}
                <View
                  style={[
                    styles.summaryCard,
                    {
                      backgroundColor: theme.inputBackground,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[styles.summaryTitle, { color: theme.primary }]}
                  >
                    Ringkasan Alarm
                  </Text>
                  <View style={styles.summaryRow}>
                    <Text
                      style={[
                        styles.summaryLabel,
                        { color: theme.secondaryText },
                      ]}
                    >
                      Waktu &amp; Label:
                    </Text>
                    <Text
                      style={[styles.summaryValue, { color: theme.text }]}
                    >
                      {hour.padStart(2, "0")}:{minute.padStart(2, "0")} •{" "}
                      {alarmName}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text
                      style={[
                        styles.summaryLabel,
                        { color: theme.secondaryText },
                      ]}
                    >
                      Jadwal:
                    </Text>
                    <Text
                      style={[styles.summaryValue, { color: theme.text }]}
                    >
                      {schedule}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text
                      style={[
                        styles.summaryLabel,
                        { color: theme.secondaryText },
                      ]}
                    >
                      Nada Dering:
                    </Text>
                    <Text
                      style={[styles.summaryValue, { color: theme.text }]}
                    >
                      {ringtone}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text
                      style={[
                        styles.summaryLabel,
                        { color: theme.secondaryText },
                      ]}
                    >
                      Snooze:
                    </Text>
                    <Text
                      style={[styles.summaryValue, { color: theme.text }]}
                    >
                      {snoozeEnabled
                        ? `${snoozeInterval}m × ${snoozeTimes} kali`
                        : "Tidak aktif"}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}

            {/* Tampilan Pesan Validasi Error */}
            {formError ? (
              <Text style={styles.formError}>{formError}</Text>
            ) : null}

            {/* Aksi Navigasi Antar-Tahap Wizard */}
            <View style={styles.modalActions}>
              {currentStep > 1 ? (
                <Pressable
                  onPress={handlePrevStep}
                  style={[
                    styles.modalButton,
                    styles.cancelButton,
                    { backgroundColor: theme.cancelBackground },
                  ]}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.cancelButtonText,
                      { color: theme.cancelText },
                    ]}
                  >
                    Sebelumnya
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={handleModalClose}
                  style={[
                    styles.modalButton,
                    styles.cancelButton,
                    { backgroundColor: theme.cancelBackground },
                  ]}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.cancelButtonText,
                      { color: theme.cancelText },
                    ]}
                  >
                    Batal
                  </Text>
                </Pressable>
              )}

              {currentStep < 3 ? (
                <Pressable
                  onPress={handleNextStep}
                  style={[
                    styles.modalButton,
                    { backgroundColor: theme.primary },
                  ]}
                  accessibilityRole="button"
                >
                  <Text style={[styles.saveButtonText, { color: "#ffffff" }]}>
                    Lanjut
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={onSave}
                  style={[styles.modalButton, styles.saveButton]}
                  accessibilityRole="button"
                >
                  <Text style={styles.saveButtonText}>
                    {isEditing ? "Perbarui Alarm" : "Setel Alarm"}
                  </Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal Pilihan Nada Dering */}
      <Modal
        visible={ringtoneModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseRingtoneModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.ringtoneModalContent,
              { backgroundColor: theme.surface, maxHeight: "80%" },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text style={[styles.modalTitle, { color: theme.text, marginBottom: 0 }]}>
                Pilih Ringtone
              </Text>
              <Pressable
                onPress={handleCloseRingtoneModal}
                style={{ padding: 4 }}
                accessibilityRole="button"
                accessibilityLabel="Tutup Pilihan Ringtone"
              >
                <Ionicons name="close" size={22} color={theme.mutedText} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {RINGTONES.map((option) => {
                const isSelected = ringtone === option;
                const isPlayingThis = previewingRingtone === option;
                return (
                  <View
                    key={option}
                    style={[
                      styles.ringtoneOption,
                      {
                        borderBottomColor: theme.border,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    <Pressable
                      onPress={() => handleSelectRingtone(option)}
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        paddingVertical: 4,
                      }}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: isSelected }}
                    >
                      <Ionicons
                        name="musical-note-outline"
                        size={16}
                        color={isSelected ? theme.primary : theme.mutedText}
                      />
                      <Text
                        style={[
                          styles.ringtoneOptionText,
                          isSelected && styles.ringtoneOptionTextSelected,
                          {
                            color: isSelected
                              ? theme.selectedText
                              : theme.secondaryText,
                          },
                        ]}
                      >
                        {option}
                      </Text>
                    </Pressable>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {/* Tombol Pratinjau Suara Ringtone */}
                      <Pressable
                        onPress={() => handlePreviewRingtone(option)}
                        style={{
                          padding: 6,
                          borderRadius: 8,
                          backgroundColor: isPlayingThis
                            ? theme.selectedBackground
                            : "transparent",
                        }}
                        accessibilityRole="button"
                        accessibilityLabel={`Dengarkan pratinjau ${option}`}
                      >
                        <Ionicons
                          name={
                            isPlayingThis
                              ? "volume-high"
                              : "volume-medium-outline"
                          }
                          size={20}
                          color={isPlayingThis ? theme.primary : theme.mutedText}
                        />
                      </Pressable>

                      {isSelected ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={22}
                          color={theme.primary}
                        />
                      ) : null}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
