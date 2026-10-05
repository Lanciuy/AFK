import { StyleSheet } from "react-native";

/**
 * Stylesheet for The Clock alarm application matching the reference layout.
 * Designed with a clean purple theme, tab navigation, spacious alarm cards,
 * and a floating action button (FAB).
 */
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4a154b", // Deep plum/purple header background from mockup
  },
  headerContainer: {
    backgroundColor: "#4a154b",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerIconButton: {
    padding: 4,
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tabItemActive: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  tabLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 4,
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#ffffff",
    fontWeight: "700",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  listContent: {
    paddingBottom: 100, // Space for the floating action button
  },
  alarmCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  checkButton: {
    paddingRight: 12,
  },
  alarmDetails: {
    flex: 1,
    justifyContent: "center",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  labelText: {
    fontSize: 12,
    color: "#718096",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  timeText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a202c",
    letterSpacing: -0.5,
  },
  periodText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#718096",
  },
  soundIcon: {
    marginLeft: 4,
  },
  scheduleText: {
    fontSize: 12,
    color: "#a0aec0",
    marginTop: 2,
    fontWeight: "500",
  },
  moreButton: {
    padding: 8,
    marginLeft: 4,
  },
  fabButton: {
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e53e3e", // Coral-red FAB button from reference mockup
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#e53e3e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
});

export default function StylesRoute() {
  return null;
}
