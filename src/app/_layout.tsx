import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

/**
 * RootLayout defines the primary navigation tree for Expo Router.
 * Configures the light status bar icons and matches background color with the header theme.
 */
export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}

function RootStack() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style="light" />
      {/* [PENILAIAN - POIN 3 (10%)]: Menerapkan _layout dan <Stack.Screen> */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="navigation-demo" />
      </Stack>
    </>
  );
}
