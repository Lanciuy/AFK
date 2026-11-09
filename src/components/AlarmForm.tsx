/**
 * @file src/components/AlarmForm.tsx
 * Modal form input dan edit alarm dengan dukungan tema adaptif.
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
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
}: AlarmFormProps) {
  const { theme, isDarkMode } = useTheme();

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

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
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
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {isEditing ? "Edit Alarm" : "Tambah Alarm"}
            </Text>

            <Text style={[styles.formLabel, { color: theme.secondaryText }]}>
              Nama Alarm
            </Text>
            <TextInput
              value={alarmName}
              onChangeText={setAlarmName}
              placeholder="Nama alarm"
              placeholderTextColor={theme.subtleText}
              style={[styles.formInput, inputThemeStyle]}
              maxLength={50}
              accessibilityLabel="Nama Alarm"
            />

            <Text style={[styles.formLabel, { color: theme.secondaryText }]}>
              Waktu (24 jam)
            </Text>
            <View style={styles.timeInputRow}>
              <TextInput
                value={hour}
                onChangeText={setHour}
                placeholder="07"
                placeholderTextColor={theme.subtleText}
                style={[styles.formInput, styles.timeInput, inputThemeStyle]}
                keyboardType="number-pad"
                maxLength={2}
                selectTextOnFocus
                accessibilityLabel="Jam"
              />

              <Text style={[styles.timeSeparator, { color: theme.secondaryText }]}>
                :
              </Text>

              <TextInput
                value={minute}
                onChangeText={setMinute}
                placeholder="00"
                placeholderTextColor={theme.subtleText}
                style={[styles.formInput, styles.timeInput, inputThemeStyle]}
                keyboardType="number-pad"
                maxLength={2}
                selectTextOnFocus
                accessibilityLabel="Menit"
              />
            </View>

            <Text style={[styles.formLabel, { color: theme.secondaryText }]}>
              Jadwal
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

            <Text style={[styles.formLabel, { color: theme.secondaryText }]}>
              Ringtone
            </Text>
            <Pressable
              onPress={onRingtoneModalOpen}
              style={[
                styles.ringtoneSelector,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Ringtone ${ringtone}`}
            >
              <Text style={[styles.ringtoneValue, { color: theme.text }]}>
                {ringtone}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={theme.mutedText}
              />
            </Pressable>

            <View style={styles.snoozeHeader}>
              <Text style={[styles.formLabel, { color: theme.secondaryText, marginBottom: 0 }]}>
                Snooze
              </Text>
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
                <Text style={[styles.formLabel, { color: theme.secondaryText }]}>
                  Snooze Interval
                </Text>
                <View style={styles.snoozeInputRow}>
                  <TextInput
                    value={snoozeInterval}
                    onChangeText={setSnoozeInterval}
                    style={[styles.formInput, styles.snoozeInput, inputThemeStyle]}
                    keyboardType="number-pad"
                    maxLength={3}
                    accessibilityLabel="Snooze Interval"
                  />
                  <Text style={[styles.snoozeUnit, { color: theme.mutedText }]}>
                    menit
                  </Text>
                </View>

                <Text style={[styles.formLabel, { color: theme.secondaryText }]}>
                  Snooze Times
                </Text>
                <View style={styles.snoozeInputRow}>
                  <TextInput
                    value={snoozeTimes}
                    onChangeText={setSnoozeTimes}
                    style={[styles.formInput, styles.snoozeInput, inputThemeStyle]}
                    keyboardType="number-pad"
                    maxLength={3}
                    accessibilityLabel="Snooze Times"
                  />
                  <Text style={[styles.snoozeUnit, { color: theme.mutedText }]}>
                    kali
                  </Text>
                </View>
              </View>
            ) : null}

            {formError ? (
              <Text style={styles.formError}>{formError}</Text>
            ) : null}

            <View style={styles.modalActions}>
              <Pressable
                onPress={onClose}
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

              <Pressable
                onPress={onSave}
                style={[styles.modalButton, styles.saveButton]}
                accessibilityRole="button"
              >
                <Text style={styles.saveButtonText}>Simpan</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal pilihan nada dering */}
      <Modal
        visible={ringtoneModalVisible}
        transparent
        animationType="fade"
        onRequestClose={onRingtoneModalClose}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.ringtoneModalContent,
              { backgroundColor: theme.surface },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Pilih Ringtone
            </Text>

            {RINGTONES.map((option) => {
              const isSelected = ringtone === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => {
                    setRingtone(option);
                    onRingtoneModalClose();
                  }}
                  style={[
                    styles.ringtoneOption,
                    { borderBottomColor: theme.border },
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                >
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

                  {isSelected ? (
                    <Ionicons name="checkmark" size={20} color={theme.primary} />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
}
