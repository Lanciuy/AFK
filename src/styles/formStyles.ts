// Stylesheet untuk modal wizard formulir alarm dan pemilihan nada dering

import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    borderRadius: 22,
    padding: 20,
  },
  modalScrollView: {
    maxHeight: "92%",
    borderRadius: 22,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 14,
  },

  // Indikator Stepper
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  stepperStepWrapper: {
    alignItems: "center",
  },
  stepperNode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperNodeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  stepperLabel: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 4,
  },
  stepperConnector: {
    flex: 1,
    height: 2,
    marginBottom: 16,
    marginHorizontal: 6,
  },

  // Field input dasar
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

  // Tahap 1: Jam & Menit
  timeInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  timeInput: {
    width: 90,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 32,
    paddingVertical: 8,
  },
  timeSeparator: {
    fontSize: 32,
    fontWeight: "800",
    marginHorizontal: 12,
  },
  presetWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  presetChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  presetChipText: {
    fontSize: 12,
    fontWeight: "600",
  },

  // Tahap 2: Jadwal & Ringtone
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
  ringtoneSelectorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  ringtoneSelector: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  ringtoneValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  ringtoneAudioPreviewBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Tahap 3: Snooze & Summary
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
  summaryCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 8,
    marginTop: 10,
    marginBottom: 14,
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  summaryLabel: {
    fontSize: 12,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: "700",
  },

  // Aksi Tombol Wizard
  formError: {
    color: "#ef4444",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
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

  // Modal Ringtone
  ringtoneModalContent: {
    borderRadius: 20,
    padding: 20,
  },
  ringtoneModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
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
});

