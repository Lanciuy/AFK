// Kontainer modal form input dan edit alarm bertahap (Wizard 3 Langkah)

import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { validateStepInputAsync } from "@/services/alarmValidationService";
import {
  previewAlarmSoundAsync,
  stopAlarmSoundAsync,
} from "@/services/soundService";
import { formStyles } from "@/styles/formStyles";

import RingtonePickerModal from "./alarm-form/RingtonePickerModal";
import StepScheduleAndRingtone from "./alarm-form/StepScheduleAndRingtone";
import StepSnoozeAndSummary from "./alarm-form/StepSnoozeAndSummary";
import StepTimeAndLabel from "./alarm-form/StepTimeAndLabel";
import WizardStepper from "./alarm-form/WizardStepper";

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
  const { theme } = useTheme();

  // State tahap aktif (1-3) dan nama ringtone yang sedang diputar pratinjaunya
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [previewingRingtone, setPreviewingRingtone] = useState<string | null>(
    null
  );

  // Putar pratinjau suara nada dering selama 3 detik
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

  // Simpan pilihan nada dering dan putar nada konfirmasi selama 2 detik
  const handleSelectRingtone = (optionName: string) => {
    setRingtone(optionName);
    previewAlarmSoundAsync(optionName, 2000).catch((err: Error) => {
      console.warn("Pratinjau ringtone error:", err.message);
    });
    setPreviewingRingtone(null);
    onRingtoneModalClose();
  };

  // Tutup modal pemilihan nada dering dan hentikan audio pratinjau
  const handleCloseRingtoneModal = () => {
    stopAlarmSoundAsync().catch((err: Error) => {
      console.warn("Gagal menghentikan audio ringtone modal:", err.message);
    });
    setPreviewingRingtone(null);
    onRingtoneModalClose();
  };

  // Tutup form utama, hentikan suara, dan kembalikan stepper ke langkah pertama
  const handleModalClose = () => {
    stopAlarmSoundAsync().catch((err: Error) => {
      console.warn("Gagal menghentikan audio saat form ditutup:", err.message);
    });
    setPreviewingRingtone(null);
    setCurrentStep(1);
    setFormError("");
    onClose();
  };

  // Validasi input langkah aktif sebelum berpindah ke langkah berikutnya
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
        setCurrentStep((prev) => Math.min(prev + 1, 3));
      })
      .catch((error: Error) => {
        setFormError(error.message);
      });
  };

  // Kembali ke langkah sebelumnya dan bersihkan pesan error
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
        <View style={formStyles.modalOverlay}>
          <ScrollView
            style={formStyles.modalScrollView}
            contentContainerStyle={[
              formStyles.modalContent,
              { backgroundColor: theme.surface },
            ]}
            keyboardShouldPersistTaps="handled"
          >
            {/* Judul form dan indikator progres langkah 1-2-3 */}
            <Text style={[formStyles.modalTitle, { color: theme.text }]}>
              {isEditing ? "Edit Alarm" : "Pengaturan Alarm Baru"}
            </Text>

            <WizardStepper currentStep={currentStep} />

            {/* Langkah 1: Pengaturan jam, menit, preset waktu, dan nama alarm */}
            {currentStep === 1 && (
              <StepTimeAndLabel
                hour={hour}
                minute={minute}
                alarmName={alarmName}
                setHour={setHour}
                setMinute={setMinute}
                setAlarmName={setAlarmName}
              />
            )}

            {/* Langkah 2: Pilihan pengulangan jadwal dan nada dering */}
            {currentStep === 2 && (
              <StepScheduleAndRingtone
                schedule={schedule}
                ringtone={ringtone}
                previewingRingtone={previewingRingtone}
                setSchedule={setSchedule}
                onOpenRingtoneModal={onRingtoneModalOpen}
                onPreviewRingtone={handlePreviewRingtone}
              />
            )}

            {/* Langkah 3: Pengaturan snooze dan ringkasan konfigurasi */}
            {currentStep === 3 && (
              <StepSnoozeAndSummary
                snoozeEnabled={snoozeEnabled}
                snoozeInterval={snoozeInterval}
                snoozeTimes={snoozeTimes}
                hour={hour}
                minute={minute}
                alarmName={alarmName}
                schedule={schedule}
                ringtone={ringtone}
                setSnoozeEnabled={setSnoozeEnabled}
                setSnoozeInterval={setSnoozeInterval}
                setSnoozeTimes={setSnoozeTimes}
              />
            )}

            {/* Pesan peringatan jika input belum sesuai validasi */}
            {formError ? (
              <Text style={formStyles.formError}>{formError}</Text>
            ) : null}

            {/* Tombol navigasi antar-langkah (Batal / Sebelumnya / Lanjut / Simpan) */}
            <View style={formStyles.modalActions}>
              {currentStep > 1 ? (
                <Pressable
                  onPress={handlePrevStep}
                  style={[
                    formStyles.modalButton,
                    { backgroundColor: theme.cancelBackground },
                  ]}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      formStyles.cancelButtonText,
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
                    formStyles.modalButton,
                    { backgroundColor: theme.cancelBackground },
                  ]}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      formStyles.cancelButtonText,
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
                    formStyles.modalButton,
                    { backgroundColor: theme.primary },
                  ]}
                  accessibilityRole="button"
                >
                  <Text style={[formStyles.saveButtonText, { color: "#ffffff" }]}>
                    Lanjut
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={onSave}
                  style={[formStyles.modalButton, formStyles.saveButton]}
                  accessibilityRole="button"
                >
                  <Text style={formStyles.saveButtonText}>
                    {isEditing ? "Perbarui Alarm" : "Setel Alarm"}
                  </Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal daftar pilihan 14 nada dering dan tes suara */}
      <RingtonePickerModal
        visible={ringtoneModalVisible}
        selectedRingtone={ringtone}
        previewingRingtone={previewingRingtone}
        onSelectRingtone={handleSelectRingtone}
        onPreviewRingtone={handlePreviewRingtone}
        onClose={handleCloseRingtoneModal}
      />
    </>
  );
}
