import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

/**
 * RootLayout defines the primary navigation tree for Expo Router.
 * Configures the light status bar icons and matches background color with the header theme.
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#4a154b" },
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}

