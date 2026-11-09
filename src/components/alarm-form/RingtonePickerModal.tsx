// Modal pemilihan nada dering alarm dengan fitur pratinjau suara

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { RINGTONES } from "@/data/alarmData";
import { formStyles } from "@/styles/formStyles";

interface RingtonePickerModalProps {
  visible: boolean;
  selectedRingtone: string;
  previewingRingtone: string | null;
  onSelectRingtone: (name: string) => void;
  onPreviewRingtone: (name: string) => void;
  onClose: () => void;
}

export default function RingtonePickerModal({
  visible,
  selectedRingtone,
  previewingRingtone,
  onSelectRingtone,
  onPreviewRingtone,
  onClose,
}: RingtonePickerModalProps) {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={formStyles.modalOverlay}>
        <View
          style={[
            formStyles.ringtoneModalContent,
            { backgroundColor: theme.surface, maxHeight: "80%" },
          ]}
        >
          {/* Header modal pilihan nada dering */}
          <View style={formStyles.ringtoneModalHeader}>
            <Text
              style={[
                formStyles.modalTitle,
                { color: theme.text, marginBottom: 0 },
              ]}
            >
              Pilih Ringtone
            </Text>
            <Pressable
              onPress={onClose}
              style={{ padding: 4 }}
              accessibilityRole="button"
              accessibilityLabel="Tutup Pilihan Ringtone"
            >
              <Ionicons name="close" size={22} color={theme.mutedText} />
            </Pressable>
          </View>

          {/* Daftar pilihan nada dering beserta tombol dengar pratinjau */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {RINGTONES.map((option) => {
              const isSelected = selectedRingtone === option;
              const isPlayingThis = previewingRingtone === option;
              return (
                <View
                  key={option}
                  style={[
                    formStyles.ringtoneOption,
                    {
                      borderBottomColor: theme.border,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  {/* Area ketuk untuk memilih nada dering */}
                  <Pressable
                    onPress={() => onSelectRingtone(option)}
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
                        formStyles.ringtoneOptionText,
                        isSelected && formStyles.ringtoneOptionTextSelected,
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

                  {/* Tombol pratinjau audio dan penanda nada dering terpilih */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => onPreviewRingtone(option)}
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
  );
}

