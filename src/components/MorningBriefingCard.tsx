// Komponen kartu prakiraan cuaca pagi beserta penanganan pesan error di layar

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { homeStyles } from "@/styles/homeStyles";
import type { MorningBriefing } from "@/types/alarm";

interface MorningBriefingCardProps {
  briefing: MorningBriefing | null;
  isLoading: boolean;
  errorMessage: string | null;
  onRefresh: () => void;
}

export default function MorningBriefingCard({
  briefing,
  isLoading,
  errorMessage,
  onRefresh,
}: MorningBriefingCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        homeStyles.briefingCard,
        {
          backgroundColor: theme.card,
          borderColor: errorMessage ? "rgba(239, 68, 68, 0.45)" : theme.border,
        },
      ]}
    >
      {/* Header kartu cuaca beserta tombol muat ulang manual */}
      <View style={homeStyles.briefingHeader}>
        <View style={homeStyles.briefingTitleRow}>
          <Ionicons
            name="partly-sunny-outline"
            size={16}
            color={theme.primary}
          />
          <Text style={[homeStyles.briefingTitle, { color: theme.primary }]}>
            Prakiraan Cuaca Pagi
          </Text>
        </View>

        <Pressable
          onPress={onRefresh}
          style={[
            homeStyles.briefingRefreshBtn,
            { backgroundColor: theme.inputBackground },
          ]}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Muat ulang data cuaca"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : (
            <Ionicons name="refresh" size={14} color={theme.secondaryText} />
          )}
        </Pressable>
      </View>

      {/* Pesan error di dalam aplikasi apabila API cuaca gagal dimuat */}
      {errorMessage ? (
        <View
          style={[
            homeStyles.briefingErrorBox,
            {
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              borderColor: "rgba(239, 68, 68, 0.35)",
            },
          ]}
        >
          <Ionicons name="cloud-offline-outline" size={18} color="#ef4444" />
          <Text style={[homeStyles.briefingErrorText, { color: "#ef4444" }]}>
            {errorMessage}
          </Text>
        </View>
      ) : briefing ? (
        <View style={homeStyles.briefingMainRow}>
          <View>
            <View style={homeStyles.briefingTempGroup}>
              <Text style={[homeStyles.briefingTemp, { color: theme.text }]}>
                {briefing.temperature}°C
              </Text>
            </View>
            <Text
              style={[
                homeStyles.briefingCondition,
                { color: theme.secondaryText },
              ]}
            >
              {briefing.weatherLabel} • Angin {briefing.windSpeed} km/j
            </Text>
          </View>

          <View style={homeStyles.briefingMetaRight}>
            <Text
              style={[homeStyles.briefingLocation, { color: theme.text }]}
            >
              {briefing.locationName}
            </Text>
            <Text
              style={[
                homeStyles.briefingUpdated,
                { color: theme.mutedText },
              ]}
            >
              Update: {briefing.lastUpdated}
            </Text>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="small" color={theme.primary} />
      )}
    </View>
  );
}
