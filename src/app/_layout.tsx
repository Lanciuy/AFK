// Konfigurasi navigasi utama Expo Router dan pembungkus tema global

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

// Komponen paling atas yang menyuplai state tema (Light/Dark) ke seluruh layar
export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}

// Pengaturan daftar rute halaman dalam tumpukan navigasi (Stack)
function RootStack() {
  const { theme } = useTheme();

  return (
    <>
      {/* Ikon status bar disetel terang karena latar header selalu berwarna gelap */}
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
          animation: "slide_from_right",
        }}
      >
        {/* Rute layar utama daftar alarm */}
        <Stack.Screen
          name="index"
          options={{
            title: "Alarm",
            headerShown: false,
          }}
        />

        {/* Rute layar detail status alarm dan simulasi dering */}
        <Stack.Screen
          name="alarm-detail"
          options={{
            title: "Detail & Status Alarm",
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
