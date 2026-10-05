import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "@/styles/styles";
import { RINGTONES } from "@/data/alarmData";

const SCHEDULE_OPTIONS = [
  "Daily",
  "Weekdays",
  "Saturdays",
  "Tomorrow",
];

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
            contentContainerStyle={styles.modalContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.modalTitle}>
              {isEditing ? "Edit Alarm" : "Tambah Alarm"}
            </Text>

            <Text style={styles.formLabel}>Nama Alarm</Text>

            <TextInput
              value={alarmName}
              onChangeText={setAlarmName}
              placeholder="Nama alarm"
              placeholderTextColor="#a0aec0"
              style={styles.formInput}
              maxLength={50}
              accessibilityLabel="Nama Alarm"
            />

            <Text style={styles.formLabel}>Waktu (24 jam)</Text>

            <View style={styles.timeInputRow}>
              <TextInput
                value={hour}
                onChangeText={setHour}
                placeholder="07"
                placeholderTextColor="#a0aec0"
                style={[styles.formInput, styles.timeInput]}
                keyboardType="number-pad"
                maxLength={2}
                selectTextOnFocus
                accessibilityLabel="Jam"
              />

              <Text style={styles.timeSeparator}>:</Text>

              <TextInput
                value={minute}
                onChangeText={setMinute}
                placeholder="00"
                placeholderTextColor="#a0aec0"
                style={[styles.formInput, styles.timeInput]}
                keyboardType="number-pad"
                maxLength={2}
                selectTextOnFocus
                accessibilityLabel="Menit"
              />
            </View>

            <Text style={styles.formLabel}>Jadwal</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {SCHEDULE_OPTIONS.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setSchedule(option)}
                  style={[
                    styles.scheduleOption,
                    schedule !== option && {
                      backgroundColor: "#f7f8fa",
                      borderColor: "#e2e8f0",
                    },
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{
                    checked: schedule === option,
                  }}
                >
                  <Text
                    style={[
                      styles.scheduleOptionText,
                      schedule !== option && { color: "#718096" },
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.formLabel}>Ringtone</Text>

            <Pressable
              onPress={onRingtoneModalOpen}
              style={styles.ringtoneSelector}
              accessibilityRole="button"
              accessibilityLabel={`Ringtone ${ringtone}`}
            >
              <Text style={styles.ringtoneValue}>{ringtone}</Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#718096"
              />
            </Pressable>

            <View style={styles.snoozeHeader}>
              <Text style={styles.formLabel}>Snooze</Text>

              <Switch
                value={snoozeEnabled}
                onValueChange={setSnoozeEnabled}
                trackColor={{
                  false: "#cbd5e1",
                  true: "#feb2b2",
                }}
                thumbColor={snoozeEnabled ? "#e53e3e" : "#f7fafc"}
                accessibilityLabel="Snooze"
              />
            </View>

            {snoozeEnabled ? (
              <>
                <Text style={styles.formLabel}>Snooze Interval</Text>

                <View style={styles.snoozeInputRow}>
                  <TextInput
                    value={snoozeInterval}
                    onChangeText={setSnoozeInterval}
                    style={[styles.formInput, styles.snoozeInput]}
                    keyboardType="number-pad"
                    maxLength={3}
                    accessibilityLabel="Snooze Interval"
                  />

                  <Text style={styles.snoozeUnit}>menit</Text>
                </View>

                <Text style={styles.formLabel}>Snooze Times</Text>

                <View style={styles.snoozeInputRow}>
                  <TextInput
                    value={snoozeTimes}
                    onChangeText={setSnoozeTimes}
                    style={[styles.formInput, styles.snoozeInput]}
                    keyboardType="number-pad"
                    maxLength={3}
                    accessibilityLabel="Snooze Times"
                  />

                  <Text style={styles.snoozeUnit}>kali</Text>
                </View>
              </>
            ) : null}

            {formError ? (
              <Text style={styles.formError}>{formError}</Text>
            ) : null}

            <View style={styles.modalActions}>
              <Pressable
                onPress={onClose}
                style={[styles.modalButton, styles.cancelButton]}
                accessibilityRole="button"
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
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

      <Modal
        visible={ringtoneModalVisible}
        transparent
        animationType="fade"
        onRequestClose={onRingtoneModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.ringtoneModalContent}>
            <Text style={styles.modalTitle}>Ringtone</Text>

            {RINGTONES.map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  setRingtone(option);
                  onRingtoneModalClose();
                }}
                style={styles.ringtoneOption}
                accessibilityRole="radio"
                accessibilityState={{
                  checked: ringtone === option,
                }}
              >
                <Text
                  style={[
                    styles.ringtoneOptionText,
                    ringtone === option &&
                      styles.ringtoneOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>

                {ringtone === option ? (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color="#e53e3e"
                  />
                ) : null}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}