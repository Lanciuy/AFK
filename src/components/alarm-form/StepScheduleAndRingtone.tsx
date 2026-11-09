// Komponen form Tahap 2: Pengaturan jadwal pengulangan dan pemilihan nada dering

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { SCHEDULE_OPTIONS } from "@/data/alarmData";
import { formStyles } from "@/styles/formStyles";

interface StepScheduleAndRingtoneProps {
  schedule: string;
  ringtone: string;
  previewingRingtone: string | null;
  setSchedule: (val: string) => void;
  onOpenRingtoneModal: () => void;
  onPreviewRingtone: (name: string) => void;
}

export default function StepScheduleAndRingtone({
  schedule,
  ringtone,
  previewingRingtone,
  setSchedule,
  onOpenRingtoneModal,
  onPreviewRingtone,
}: StepScheduleAndRingtoneProps) {
  const { theme } = useTheme();

  return (
    <View>
      {/* Pilihan jadwal pengulangan hari alarm */}
      <Text style={[formStyles.formLabel, { color: theme.secondaryText }]}>
        Pilih Pengulangan Jadwal
      </Text>
      <View style={formStyles.scheduleContainer}>
        {SCHEDULE_OPTIONS.map((option) => {
          const isSelected = schedule === option;
          return (
            <Pressable
              key={option}
              onPress={() => setSchedule(option)}
              style={[
                formStyles.scheduleOption,
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
                  formStyles.scheduleOptionText,
                  {
                    color: isSelected ? theme.selectedText : theme.mutedText,
                  },
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Tombol pembuka modal daftar nada dering dan tombol tes dengar cepat */}
      <Text style={[formStyles.formLabel, { color: theme.secondaryText }]}>
        Pilih Nada Dering
      </Text>
      <View style={formStyles.ringtoneSelectorRow}>
        <Pressable
          onPress={onOpenRingtoneModal}
          style={[
            formStyles.ringtoneSelector,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Ringtone ${ringtone}`}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons
              name="musical-notes-outline"
              size={18}
              color={theme.primary}
            />
            <Text style={[formStyles.ringtoneValue, { color: theme.text }]}>
              {ringtone}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.mutedText}
          />
        </Pressable>

        {/* Tombol putar suara pratinjau nada dering yang sedang terpilih */}
        <Pressable
          onPress={() => onPreviewRingtone(ringtone)}
          style={[
            formStyles.ringtoneAudioPreviewBtn,
            {
              backgroundColor: theme.inputBackground,
              borderColor:
                previewingRingtone === ringtone
                  ? theme.primary
                  : theme.border,
            },
          ]}
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
  );
}
