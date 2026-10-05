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
  soundIcon: {
    marginLeft: 4,
  },
  scheduleText: {
    fontSize: 12,
    color: "#a0aec0",
    marginTop: 2,
    fontWeight: "500",
  },
  snoozeSummary: {
    fontSize: 11,
    color: "#718096",
    marginTop: 3,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 22,
  },
  modalScrollView: {
    maxHeight: "90%",
    borderRadius: 20,
  },
  modalTitle: {
    color: "#1a202c",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  formLabel: {
    color: "#4a5568",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: "#f7f8fa",
    borderColor: "#e2e8f0",
    borderRadius: 10,
    borderWidth: 1,
    color: "#1a202c",
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 16,
  },
  timeInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    flex: 1,
    textAlign: "center",
    marginBottom: 16,
  },
  timeSeparator: {
    color: "#4a5568",
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 8,
    marginBottom: 16,
  },
  scheduleOption: {
    alignSelf: "flex-start",
    backgroundColor: "#fff5f5",
    borderColor: "#e53e3e",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: 8,
  },
  scheduleOptionText: {
    color: "#e53e3e",
    fontSize: 14,
    fontWeight: "600",
  },
  ringtoneSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f7f8fa",
    borderColor: "#e2e8f0",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 13,
    marginBottom: 16,
  },
  ringtoneValue: {
    color: "#1a202c",
    fontSize: 14,
    fontWeight: "500",
  },
  ringtoneModalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 22,
  },
  ringtoneOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomColor: "#edf2f7",
    borderBottomWidth: 1,
  },
  ringtoneOptionText: {
    color: "#4a5568",
    fontSize: 15,
  },
  ringtoneOptionTextSelected: {
    color: "#e53e3e",
    fontWeight: "600",
  },
  snoozeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  snoozeInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  snoozeInput: {
    width: 84,
    marginBottom: 16,
    textAlign: "center",
  },
  snoozeUnit: {
    color: "#718096",
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 16,
  },
  formError: {
    color: "#c53030",
    fontSize: 13,
    marginTop: 8,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  modalButton: {
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 11,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#edf2f7",
  },
  cancelButtonText: {
    color: "#4a5568",
    fontSize: 14,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#e53e3e",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
