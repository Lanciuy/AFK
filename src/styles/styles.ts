import { StyleSheet } from "react-native";

/**
 * External stylesheet for the Alarm application.
 *
 * WHY:
 * Centralizes layout rules, typography, and visual tokens for the Alarm feature.
 * Removes non-alarm navigation tab styling and introduces structured styling
 * for alarm status badges and empty states.
 * Includes a null default export to ensure Expo Router file-based routing
 * treats this helper gracefully without runtime route errors.
 */
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4a154b", // Deep plum/purple background for header
  },
  headerContainer: {
    backgroundColor: "#4a154b",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  activeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeBadgeText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
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
    paddingBottom: 100, // Bottom clearance for Floating Action Button
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
  deleteButton: {
    padding: 8,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#718096",
    fontWeight: "600",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#a0aec0",
    marginTop: 4,
  },
  fabButton: {
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e53e3e", // Coral-red FAB button
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#e53e3e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
});
