// Komponen tantangan hitung matematika sebelum dering alarm dapat dimatikan

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { detailStyles } from "@/styles/detailStyles";
import { MathQuestion } from "@/utils/mathChallengeUtils";

interface MathChallengeBoxProps {
  question: MathQuestion;
  userAnswer: string;
  errorMessage: string | null;
  onChangeAnswer: (text: string) => void;
  onRefreshQuestion: () => void;
  onSubmitChallenge: () => void;
}

export default function MathChallengeBox({
  question,
  userAnswer,
  errorMessage,
  onChangeAnswer,
  onRefreshQuestion,
  onSubmitChallenge,
}: MathChallengeBoxProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        detailStyles.challengeContainer,
        {
          backgroundColor: theme.selectedBackground,
          borderColor: theme.selectedBorder,
        },
      ]}
    >
      {/* Header kartu tantangan dan tombol ganti soal */}
      <View style={detailStyles.challengeHeaderRow}>
        <View style={detailStyles.challengeTitleRow}>
          <Ionicons name="calculator-outline" size={18} color={theme.primary} />
          <Text style={[detailStyles.challengeTitle, { color: theme.primary }]}>
            Tantangan Matikan Alarm
          </Text>
        </View>

        <Pressable
          onPress={onRefreshQuestion}
          style={[
            detailStyles.challengeRefreshBtn,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Ganti soal matematika"
        >
          <Ionicons name="refresh" size={13} color={theme.secondaryText} />
          <Text
            style={[
              detailStyles.challengeRefreshText,
              { color: theme.secondaryText },
            ]}
          >
            Soal Lain
          </Text>
        </Pressable>
      </View>

      {/* Instruksi singkat tantangan bangun pagi */}
      <Text
        style={[
          detailStyles.challengeSubtitle,
          { color: theme.secondaryText },
        ]}
      >
        Selesaikan hitungan berikut dengan benar untuk menghentikan suara alarm:
      </Text>

      {/* Kotak tampilan soal matematika */}
      <View
        style={[
          detailStyles.challengeEquationBox,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[detailStyles.challengeEquationText, { color: theme.text }]}
        >
          {question.questionText} = ?
        </Text>
      </View>

      {/* Kolom input jawaban angka dari pengguna */}
      <TextInput
        value={userAnswer}
        onChangeText={onChangeAnswer}
        placeholder="Ketik hasil hitungan..."
        placeholderTextColor={theme.mutedText}
        keyboardType="number-pad"
        returnKeyType="done"
        onSubmitEditing={onSubmitChallenge}
        style={[
          detailStyles.challengeInput,
          {
            backgroundColor: theme.card,
            borderColor: errorMessage ? "#ef4444" : theme.border,
            color: theme.text,
          },
        ]}
        accessibilityLabel="Jawaban tantangan matematika"
      />

      {/* Pesan peringatan jika jawaban pengguna salah */}
      {errorMessage ? (
        <View
          style={[
            detailStyles.challengeErrorBox,
            {
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              borderColor: "rgba(239, 68, 68, 0.35)",
            },
          ]}
        >
          <Ionicons name="alert-circle" size={16} color="#ef4444" />
          <Text style={[detailStyles.challengeErrorText, { color: "#ef4444" }]}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {/* Tombol verifikasi jawaban sekaligus mematikan dering alarm */}
      <Pressable
        onPress={onSubmitChallenge}
        style={[
          detailStyles.simulateButton,
          { backgroundColor: "#ef4444", marginTop: 2 },
        ]}
        accessibilityRole="button"
      >
        <Ionicons name="checkmark-done-circle-outline" size={20} color="#ffffff" />
        <Text style={detailStyles.simulateButtonText}>
          Verifikasi Jawaban &amp; Matikan Alarm
        </Text>
      </Pressable>
    </View>
  );
}

