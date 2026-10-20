import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { styles } from "@/styles/styles";

export default function ThemeToggle() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <Pressable
      onPress={() => setIsDarkMode((current) => !current)}
      style={styles.themeToggle}
      accessibilityRole="switch"
      accessibilityState={{ checked: isDarkMode }}
      accessibilityLabel={isDarkMode ? "Aktifkan Light Mode" : "Aktifkan Dark Mode"}
    >
      <Text style={styles.themeToggleText}>
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </Text>
      <View style={styles.themeToggleIndicator}>
        <Ionicons
          name={isDarkMode ? "moon" : "sunny"}
          size={18}
          color="#ffffff"
        />
      </View>
    </Pressable>
  );
}
