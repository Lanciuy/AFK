// Indikator tahapan langkah wizard formulir alarm

import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { formStyles } from "@/styles/formStyles";

interface WizardStepperProps {
  currentStep: number;
}

export default function WizardStepper({ currentStep }: WizardStepperProps) {
  const { theme } = useTheme();

  return (
    <View style={formStyles.stepperContainer}>
      {/* Node 1: Waktu & Label */}
      <View style={formStyles.stepperStepWrapper}>
        <View
          style={[
            formStyles.stepperNode,
            {
              borderColor: currentStep >= 1 ? theme.primary : theme.border,
              backgroundColor:
                currentStep === 1
                  ? theme.primary
                  : currentStep > 1
                    ? theme.selectedBackground
                    : theme.inputBackground,
            },
          ]}
        >
          <Text
            style={[
              formStyles.stepperNodeText,
              {
                color:
                  currentStep === 1
                    ? "#ffffff"
                    : currentStep > 1
                      ? theme.primary
                      : theme.mutedText,
              },
            ]}
          >
            {currentStep > 1 ? "✓" : "1"}
          </Text>
        </View>
        <Text
          style={[
            formStyles.stepperLabel,
            {
              color: currentStep === 1 ? theme.primary : theme.mutedText,
            },
          ]}
        >
          Waktu
        </Text>
      </View>

      <View
        style={[
          formStyles.stepperConnector,
          {
            backgroundColor: currentStep >= 2 ? theme.primary : theme.border,
          },
        ]}
      />

      {/* Node 2: Jadwal & Nada Dering */}
      <View style={formStyles.stepperStepWrapper}>
        <View
          style={[
            formStyles.stepperNode,
            {
              borderColor: currentStep >= 2 ? theme.primary : theme.border,
              backgroundColor:
                currentStep === 2
                  ? theme.primary
                  : currentStep > 2
                    ? theme.selectedBackground
                    : theme.inputBackground,
            },
          ]}
        >
          <Text
            style={[
              formStyles.stepperNodeText,
              {
                color:
                  currentStep === 2
                    ? "#ffffff"
                    : currentStep > 2
                      ? theme.primary
                      : theme.mutedText,
              },
            ]}
          >
            {currentStep > 2 ? "✓" : "2"}
          </Text>
        </View>
        <Text
          style={[
            formStyles.stepperLabel,
            {
              color: currentStep === 2 ? theme.primary : theme.mutedText,
            },
          ]}
        >
          Jadwal
        </Text>
      </View>

      <View
        style={[
          formStyles.stepperConnector,
          {
            backgroundColor: currentStep >= 3 ? theme.primary : theme.border,
          },
        ]}
      />

      {/* Node 3: Snooze & Ringkasan */}
      <View style={formStyles.stepperStepWrapper}>
        <View
          style={[
            formStyles.stepperNode,
            {
              borderColor: currentStep >= 3 ? theme.primary : theme.border,
              backgroundColor:
                currentStep === 3 ? theme.primary : theme.inputBackground,
            },
          ]}
        >
          <Text
            style={[
              formStyles.stepperNodeText,
              {
                color: currentStep === 3 ? "#ffffff" : theme.mutedText,
              },
            ]}
          >
            3
          </Text>
        </View>
        <Text
          style={[
            formStyles.stepperLabel,
            {
              color: currentStep === 3 ? theme.primary : theme.mutedText,
            },
          ]}
        >
          Snooze
        </Text>
      </View>
    </View>
  );
}

