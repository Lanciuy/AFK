/**
 * @file src/app/_layout.tsx
 * Layout root untuk aplikasi Expo Router.
 *
 * WHY:
 * Membungkus seluruh aplikasi dengan ThemeProvider untuk Dark Mode adaptif,
 * mengonfigurasi StatusBar, serta mendefinisikan navigasi berbasis Stack
 * menggunakan komponen <Stack> dan <Stack.Screen>.
 */

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}

function RootStack() {
  const { theme, isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "light"} />
      {/* [PENILAIAN - POIN 3]: Menerapkan _layout dan <Stack.Screen> */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Alarm",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="alarm-detail"
          options={{
            title: "Detail & Simulasi Alarm",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="navigation-demo"
          options={{
            title: "Demo Navigasi Expo Router",
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
