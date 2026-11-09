/**
 * @file src/components/ThemeToggle.tsx
 * Komponen tombol alih tema (Dark Mode / Light Mode).
 * Didesain responsif, modern, dan memberikan umpan balik visual instan.
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.toggleTrack,
          borderColor: isDarkMode
            ? "rgba(255, 255, 255, 0.25)"
            : "rgba(255, 255, 255, 0.3)",
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      accessibilityRole="switch"
      accessibilityState={{ checked: isDarkMode }}
      accessibilityLabel={
        isDarkMode ? "Alihkan ke Light Mode" : "Alihkan ke Dark Mode"
      }
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
    >
      <View
        style={[
          styles.indicator,
          {
            backgroundColor: theme.toggleIndicator,
          },
        ]}
      >
        <Ionicons
          name={isDarkMode ? "moon" : "sunny"}
          size={14}
          color={isDarkMode ? "#0f172a" : "#78350f"}
        />
      </View>

      <Text style={styles.label}>
        {isDarkMode ? "Dark" : "Light"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  indicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  label: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
    paddingRight: 4,
  },
});
