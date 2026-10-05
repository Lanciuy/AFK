import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

/**
 * RootLayout defines the primary navigation tree for Expo Router.
 * Configures the light status bar icons to contrast with the dark plum header.
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
      />
    </>
  );
}
