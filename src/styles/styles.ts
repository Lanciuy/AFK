import { StyleSheet } from "react-native";

/**
 * External stylesheet untuk seluruh aplikasi Alarm.
 *
 * WHY:
 * Memusatkan seluruh visual tokens, layout, typography, dan responsive rules
 * agar UI konsisten di seluruh platform (Android, iOS, dan Web).
 */
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerNavButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerSubRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  clockBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0, 0, 0, 0.22)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  clockText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    fontVariant: ["tabular-nums"],
  },
  activeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  activeBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  listContent: {
    paddingBottom: 100, // Clearance untuk FAB
  },
  alarmCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  checkButton: {
    paddingRight: 10,
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
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  timeText: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  soundIcon: {
    marginLeft: 4,
  },
  scheduleText: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  snoozeSummary: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: "500",
  },
  cardActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 6,
  },
  actionIconButton: {
    padding: 6,
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  fabButton: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#e53e3e",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#e53e3e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
  },
  modalScrollView: {
    maxHeight: "90%",
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  formInput: {
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  timeInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    flex: 1,
    textAlign: "center",
    marginBottom: 14,
    fontWeight: "700",
    fontSize: 20,
  },
  timeSeparator: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 8,
    marginBottom: 14,
  },
  scheduleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  scheduleOption: {
    alignSelf: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  scheduleOptionText: {
    fontSize: 13,
    fontWeight: "600",
  },
  ringtoneSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 14,
  },
  ringtoneValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  ringtoneModalContent: {
    borderRadius: 20,
    padding: 20,
  },
  ringtoneOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  ringtoneOptionText: {
    fontSize: 15,
  },
  ringtoneOptionTextSelected: {
    fontWeight: "700",
  },
  snoozeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  snoozeInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  snoozeInput: {
    width: 80,
    marginBottom: 14,
    textAlign: "center",
    fontWeight: "600",
  },
  snoozeUnit: {
    fontSize: 13,
    marginLeft: 8,
    marginBottom: 14,
  },
  formError: {
    color: "#ef4444",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
    fontWeight: "600",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 10,
  },
  modalButton: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cancelButton: {},
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#10b981",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});
