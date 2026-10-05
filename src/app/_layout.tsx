import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

/**
 * RootLayout defines the primary navigation tree for Expo Router.
 * Configures the dark status bar and hides default stack navigation headers.
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#ffffff" },
        }}
      />
    </>
  );
}
