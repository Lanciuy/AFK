/**
 * @file src/components/AlarmCard.tsx
 * Komponen kartu alarm dengan interaksi toggle, edit, dan delete.
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { AlarmItem } from "@/types/alarm";
import { styles } from "@/styles/styles";
import type { AlarmItem } from "@/types/alarm";

interface AlarmCardProps {
  item: AlarmItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: AlarmItem) => void;
}

// Custom function komponen untuk merender item kartu alarm
export default function AlarmCard({
  item,
  onToggle,
  onDelete,
  onEdit,
}: AlarmCardProps) {
  const { theme } = useTheme();
  const pendingTap = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const pendingTap = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActionTriggered = useRef(false);
  useEffect(() => {
    return () => {
      if (pendingTap.current !== null) {
        clearTimeout(pendingTap.current);
      }
    };
  }, []);

  // 1x ketuk untuk toggle on/off, 2x ketuk cepat untuk edit
  const handleCardPress = () => {
    if (isActionTriggered.current) {
      isActionTriggered.current = false;
      return;
    }

    if (pendingTap.current !== null) {
      clearTimeout(pendingTap.current);
      pendingTap.current = null;
      onEdit(item);
      return;
    }

    pendingTap.current = setTimeout(() => {
      pendingTap.current = null;
      onToggle(item.id);
    }, 300);
  };

  // Handler tombol checkbox dengan pencegahan bubbling ke kartu
  const handleTogglePress = () => {
    isActionTriggered.current = true;
    if (pendingTap.current !== null) {
      clearTimeout(pendingTap.current);
      pendingTap.current = null;
    }
    onToggle(item.id);
  };

  // Handler tombol hapus dengan pencegahan bubbling ke kartu
  const handleDeletePress = () => {
    isActionTriggered.current = true;
    if (pendingTap.current !== null) {
      clearTimeout(pendingTap.current);
      pendingTap.current = null;
    }
    onDelete(item.id);
  };

  return (
    <Pressable
      onPress={handleCardPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: item.isActive }}
      accessibilityLabel={`Alarm ${item.time}, ${item.label}`}
      // Gabungan external style dan dynamic inline style
      style={[
        styles.alarmCard,
        {
          marginBottom: 12,
          backgroundColor: theme.card,
          borderColor: item.isActive
            ? "#e53e3e"
            : theme.border,
          opacity: item.isActive ? 1 : 0.65,
        },
      ]}
    >
      {/* Checkbox toggle status alarm */}
      <Pressable
        onPress={handleTogglePress}
        style={styles.checkButton}
        hitSlop={8}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.isActive }}
        accessibilityLabel={`Aktifkan atau nonaktifkan alarm ${item.time}`}
      >
        <Ionicons
          name={item.isActive ? "checkbox" : "square-outline"}
          size={24}
          color={
            item.isActive
              ? "#e53e3e"
              : theme.subtleText
          }
        />
      </Pressable>

      {/* Detail data alarm */}
      <View style={styles.alarmDetails}>
        <View style={styles.labelRow}>
          <Text
            selectable={false}
            style={[
              styles.labelText,
              { color: theme.mutedText },
            ]}
          >
            {item.label}
          </Text>
        </View>

        <View style={styles.timeRow}>
          <Text
            selectable={false}
            style={[
              styles.timeText,
              { color: theme.text },
            ]}
          >
            {item.time}
          </Text>

          <Ionicons
            name="musical-notes"
            size={16}
            color={theme.subtleText}
            style={styles.soundIcon}
          />
        </View>

        <Text
          selectable={false}
          style={[
            styles.scheduleText,
            { color: theme.text },
          ]}
        >
          {item.schedule}
        </Text>

        {item.snoozeEnabled ? (
          <Text
            selectable={false}
            style={[
              styles.snoozeSummary,
              { color: theme.mutedText },
            ]}
          >
            Snooze {item.snoozeInterval}m × {item.snoozeTimes}
          </Text>
        ) : null}
      </View>

      {/* Tombol hapus alarm */}
      <Pressable
        onPress={handleDeletePress}
        style={styles.deleteButton}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Hapus alarm ${item.time}`}
      >
        <Ionicons
          name="trash-outline"
          size={20}
          color={theme.subtleText}
        />
      </Pressable>
    </Pressable>
  );
}