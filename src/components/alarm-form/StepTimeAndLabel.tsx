// Komponen form Tahap 1: Pengaturan jam, menit, preset waktu, dan label alarm

import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { QUICK_TIME_PRESETS } from "@/data/alarmData";
import { formStyles } from "@/styles/formStyles";

interface StepTimeAndLabelProps {
  hour: string;
  minute: string;
  alarmName: string;
  setHour: (val: string) => void;
  setMinute: (val: string) => void;
  setAlarmName: (val: string) => void;
}

export default function StepTimeAndLabel({
  hour,
  minute,
  alarmName,
  setHour,
  setMinute,
  setAlarmName,
}: StepTimeAndLabelProps) {
  const { theme } = useTheme();

  // Gaya warna kotak input menyesuaikan tema aktif
  const inputThemeStyle = {
    backgroundColor: theme.inputBackground,
    borderColor: theme.border,
    color: theme.text,
  };

  return (
    <View>
      {/* Input angka jam dan menit dalam format 24 jam */}
      <Text
        style={[
          formStyles.formLabel,
          { color: theme.secondaryText, textAlign: "center" },
        ]}
      >
        Atur Waktu Alarm (Format 24 Jam)
      </Text>

      <View style={formStyles.timeInputRow}>
        <TextInput
          value={hour}
          onChangeText={setHour}
          placeholder="07"
          placeholderTextColor={theme.subtleText}
          style={[formStyles.formInput, formStyles.timeInput, inputThemeStyle]}
          keyboardType="number-pad"
          maxLength={2}
          selectTextOnFocus
          accessibilityLabel="Jam"
        />

        <Text style={[formStyles.timeSeparator, { color: theme.secondaryText }]}>
          :
        </Text>

        <TextInput
          value={minute}
          onChangeText={setMinute}
          placeholder="00"
          placeholderTextColor={theme.subtleText}
          style={[formStyles.formInput, formStyles.timeInput, inputThemeStyle]}
          keyboardType="number-pad"
          maxLength={2}
          selectTextOnFocus
          accessibilityLabel="Menit"
        />
      </View>

      {/* Deretan tombol pintas untuk mengisi jam dan menit secara cepat */}
      <Text
        style={[formStyles.formLabel, { color: theme.mutedText, fontSize: 12 }]}
      >
        Pilihan Waktu Cepat:
      </Text>
      <View style={formStyles.presetWrapper}>
        {QUICK_TIME_PRESETS.map((preset) => (
          <Pressable
            key={preset.label}
            onPress={() => {
              setHour(preset.h);
              setMinute(preset.m);
            }}
            style={[
              formStyles.presetChip,
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
                formStyles.presetChipText,
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

      {/* Input nama atau keterangan alarm */}
      <Text style={[formStyles.formLabel, { color: theme.secondaryText }]}>
        Nama / Label Alarm
      </Text>
      <TextInput
        value={alarmName}
        onChangeText={setAlarmName}
        placeholder="Misal: Bangun Pagi / Kuliah"
        placeholderTextColor={theme.subtleText}
        style={[formStyles.formInput, inputThemeStyle]}
        maxLength={50}
        accessibilityLabel="Nama Alarm"
      />
    </View>
  );
}
