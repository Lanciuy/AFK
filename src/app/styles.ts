import { StyleSheet } from "react-native";

/**
 * External stylesheet for the alarm application.
 *
 * WHY:
 * Exported as `styles` for use across application components.
 * Includes a default null component export so that Expo Router treats the
 * route gracefully if accessed in file-based navigation routing.
 */
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  alarmCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  timeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
  },
  periodText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555555",
    marginLeft: 4,
  },
  labelText: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
});

export default function StylesRoute() {
  return null;
}
