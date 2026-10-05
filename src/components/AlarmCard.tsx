import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { AlarmItem } from "@/types/alarm";
import { styles } from "@/styles/styles";

interface AlarmCardProps {
  item: AlarmItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: AlarmItem) => void;
}

export default function AlarmCard({
  item,
  onToggle,
  onDelete,
  onEdit,
}: AlarmCardProps) {
  const pendingTap = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(
    () => () => {
      if (pendingTap.current !== null) {
        clearTimeout(pendingTap.current);
      }
    },
    [],
  );

  const handleCardPress = () => {
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

  return (
    <Pressable
      onPress={handleCardPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: item.isActive }}
      accessibilityLabel={`Alarm ${item.time}, ${item.label}`}
      style={[
        styles.alarmCard,
        {
          marginBottom: 12,
          borderColor: item.isActive ? "#e53e3e" : "#f1f5f9",
          opacity: item.isActive ? 1 : 0.65,
        },
      ]}
    >
      <Pressable
        onPress={() => onToggle(item.id)}
        style={styles.checkButton}
        hitSlop={8}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.isActive }}
        accessibilityLabel={`Toggle alarm ${item.time}`}
      >
        <Ionicons
          name={item.isActive ? "checkbox" : "square-outline"}
          size={24}
          color={item.isActive ? "#e53e3e" : "#cbd5e1"}
        />
      </Pressable>

      <View style={styles.alarmDetails}>
        <View style={styles.labelRow}>
          <Text selectable={false} style={styles.labelText}>
            {item.label}
          </Text>
        </View>

        <View style={styles.timeRow}>
          <Text selectable={false} style={styles.timeText}>
            {item.time}
          </Text>

          <Ionicons
            name="musical-notes"
            size={16}
            color="#a0aec0"
            style={styles.soundIcon}
          />
        </View>

        <Text selectable={false} style={styles.scheduleText}>
          {item.schedule}
        </Text>

        {item.snoozeEnabled ? (
          <Text selectable={false} style={styles.snoozeSummary}>
            Snooze {item.snoozeInterval}m × {item.snoozeTimes}
          </Text>
        ) : null}
      </View>

      <Pressable
        onPress={() => onDelete(item.id)}
        style={styles.deleteButton}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Hapus alarm ${item.time}`}
      >
        <Ionicons name="trash-outline" size={20} color="#cbd5e1" />
      </Pressable>
    </Pressable>
  );
}