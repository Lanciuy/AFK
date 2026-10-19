import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

export default function NavigationDemoScreen() {
  const { theme, isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: 24,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", gap: 16 }}>
        <Ionicons
          name="navigate-circle-outline"
          size={56}
          color={theme.text}
        />
        <Text
          style={{
            color: theme.text,
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Demo Expo Router
        </Text>
        <Text
          style={{
            color: theme.secondaryText,
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          Halaman ini dibuka dengan router.push(). Coba tombol di bawah
          untuk melihat fungsi navigasi lainnya.
        </Text>

        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          style={{
            alignItems: "center",
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 14,
          }}
        >
          <Text style={{ color: theme.text, fontWeight: "700" }}>
            Kembali (router.back)
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/")}
          accessibilityRole="button"
          style={{
            alignItems: "center",
            borderColor: isDarkMode ? "#ffffff" : "#000000",
            borderRadius: 12,
            borderWidth: 1,
            padding: 14,
          }}
        >
          <Text style={{ color: theme.text, fontWeight: "700" }}>
            Ke Alarm (router.replace)
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
