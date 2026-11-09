// Komponen kartu cuaca dan kutipan motivasi pagi dari External API

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { homeStyles } from "@/styles/homeStyles";
import type { MorningBriefing } from "@/types/alarm";

interface MorningBriefingCardProps {
  briefing: MorningBriefing | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export default function MorningBriefingCard({
  briefing,
  isLoading,
  onRefresh,
}: MorningBriefingCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        homeStyles.briefingCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
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
            Prakiraan Cuaca &amp; Motivasi Pagi
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
          accessibilityLabel="Muat ulang data cuaca dan kutipan"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : (
            <Ionicons name="refresh" size={14} color={theme.secondaryText} />
          )}
        </Pressable>
      </View>

      {/* Isi data suhu, kondisi angin, lokasi, dan kutipan motivasi */}
      {briefing ? (
        <>
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

          {/* Kotak kutipan motivasi harian */}
          <View
            style={[
              homeStyles.briefingQuoteBox,
              {
                backgroundColor: theme.inputBackground,
                borderLeftColor: theme.primary,
              },
            ]}
          >
            <Text
              style={[homeStyles.briefingQuoteText, { color: theme.text }]}
            >
              &ldquo;{briefing.quote}&rdquo;
            </Text>
            <Text
              style={[
                homeStyles.briefingQuoteAuthor,
                { color: theme.primary },
              ]}
            >
              — {briefing.quoteAuthor}
            </Text>
          </View>
        </>
      ) : (
        <ActivityIndicator size="small" color={theme.primary} />
      )}
    </View>
  );
}
