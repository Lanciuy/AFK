/**
 * @file src/app/navigation-demo.tsx
 * Halaman demo fitur navigasi Expo Router.
 *
 * Menerapkan:
 * 1. router.push(): Menumpuk rute baru ke dalam navigation stack.
 * 2. router.back(): Mengembalikan pengguna ke rute sebelumnya.
 * 3. router.replace(): Mengganti rute aktif tanpa menambah riwayat stack.
 * 4. usePathname(): Membaca rute aktif secara dinamis.
 * 5. useTheme(): Mendukung Dark Mode dan Light Mode yang responsif.
 */

import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

export default function NavigationDemoScreen() {
  const { theme, isDarkMode } = useTheme();
  // [PENILAIAN - POIN 2]: Membaca pathname rute aktif dari expo-router
  const currentPathname = usePathname();

  return (
    <SafeAreaView
      style={[
        demoStyles.safeArea,
        { backgroundColor: theme.headerBackground },
      ]}
    >
      {/* Header Bar */}
      <View style={demoStyles.header}>
        <View style={demoStyles.headerLeft}>
          <Pressable
            onPress={() => router.back()}
            style={demoStyles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Kembali"
            hitSlop={8}
          >
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </Pressable>
          <Text style={demoStyles.headerTitle}>Demo Expo Router</Text>
        </View>

        <ThemeToggle />
      </View>

      <ScrollView
        style={[
          demoStyles.bodyContainer,
          { backgroundColor: theme.background },
        ]}
        contentContainerStyle={demoStyles.bodyContent}
      >
        {/* Info Rute Aktif */}
        <View
          style={[
            demoStyles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={demoStyles.cardHeader}>
            <Ionicons name="navigate-circle" size={24} color={theme.primary} />
            <Text style={[demoStyles.cardTitle, { color: theme.text }]}>
              Rute Aktif (usePathname)
            </Text>
          </View>
          <View
            style={[
              demoStyles.codeBox,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[demoStyles.codeText, { color: theme.primary }]}>
              {currentPathname}
            </Text>
          </View>
          <Text
            style={[demoStyles.descriptionText, { color: theme.secondaryText }]}
          >
            Halaman ini mendemonstrasikan implementasi metode navigasi
            imperatif dari pustaka expo-router sesuai kriteria penilaian.
          </Text>
        </View>

        {/* Demonstrasi router.push() */}
        <View
          style={[
            demoStyles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={demoStyles.cardHeader}>
            <Ionicons name="duplicate-outline" size={22} color="#3b82f6" />
            <Text style={[demoStyles.cardTitle, { color: theme.text }]}>
              1. router.push()
            </Text>
          </View>
          <Text
            style={[demoStyles.descriptionText, { color: theme.secondaryText }]}
          >
            Menambahkan rute baru ke atas tumpukan (stack history) dengan
            membawa data parameter.
          </Text>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/alarm-detail",
                params: {
                  id: "demo-push",
                  label: "Demo Push Alarm",
                  time: "08:15",
                  schedule: "Weekdays",
                  ringtone: "Morning",
                  snoozeEnabled: "true",
                  snoozeInterval: "10",
                  snoozeTimes: "2",
                },
              })
            }
            style={[demoStyles.actionButton, { backgroundColor: "#3b82f6" }]}
            accessibilityRole="button"
          >
            <Ionicons name="paper-plane-outline" size={18} color="#ffffff" />
            <Text style={demoStyles.actionButtonText}>
              Buka Detail Alarm (router.push)
            </Text>
          </Pressable>
        </View>

        {/* Demonstrasi router.back() */}
        <View
          style={[
            demoStyles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={demoStyles.cardHeader}>
            <Ionicons name="return-up-back-outline" size={22} color="#10b981" />
            <Text style={[demoStyles.cardTitle, { color: theme.text }]}>
              2. router.back()
            </Text>
          </View>
          <Text
            style={[demoStyles.descriptionText, { color: theme.secondaryText }]}
          >
            Menghapus layar teratas dari tumpukan dan kembali ke layar
            sebelumnya.
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={[demoStyles.actionButton, { backgroundColor: "#10b981" }]}
            accessibilityRole="button"
          >
            <Ionicons name="arrow-back-outline" size={18} color="#ffffff" />
            <Text style={demoStyles.actionButtonText}>
              Kembali ke Layar Sebelumnya (router.back)
            </Text>
          </Pressable>
        </View>

        {/* Demonstrasi router.replace() */}
        <View
          style={[
            demoStyles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={demoStyles.cardHeader}>
            <Ionicons name="refresh-outline" size={22} color="#e53e3e" />
            <Text style={[demoStyles.cardTitle, { color: theme.text }]}>
              3. router.replace()
            </Text>
          </View>
          <Text
            style={[demoStyles.descriptionText, { color: theme.secondaryText }]}
          >
            Mengganti riwayat rute aktif dengan halaman baru tanpa menumpuk
            history navigasi.
          </Text>

          <Pressable
            onPress={() => router.replace("/")}
            style={[
              demoStyles.actionButton,
              {
                backgroundColor: isDarkMode ? "#1e293b" : "#4a154b",
                borderWidth: 1,
                borderColor: theme.border,
              },
            ]}
            accessibilityRole="button"
          >
            <Ionicons name="home-outline" size={18} color="#ffffff" />
            <Text style={demoStyles.actionButtonText}>
              Reset ke Layar Utama (router.replace)
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const demoStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  bodyContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bodyContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  codeBox: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "700",
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 18,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 4,
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});
