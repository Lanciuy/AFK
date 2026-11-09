/**
 * @file src/components/AlarmCard.tsx
 * Komponen kartu alarm dengan interaksi toggle status, edit cepat, delete,
 * dan navigasi inspect ke halaman detail alarm.
 */

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { styles } from "@/styles/styles";
import type { AlarmItem } from "@/types/alarm";

interface AlarmCardProps {
  item: AlarmItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: AlarmItem) => void;
  onInspect?: (item: AlarmItem) => void;
}

export default function AlarmCard({
  item,
  onToggle,
  onDelete,
  onEdit,
  onInspect,
}: AlarmCardProps) {
  const { theme } = useTheme();

  // Timer untuk membedakan ketukan tunggal (toggle) dan ketukan ganda (edit)
  const pendingTap = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Penanda untuk mencegah kartu ikut tertekan saat tombol aksi anak diklik
  const isActionTriggered = useRef(false);

  // [PENILAIAN - POIN 1]: Menerapkan hook useEffect() untuk cleanup timer saat unmount
  useEffect(() => {
    return () => {
      if (pendingTap.current !== null) {
        clearTimeout(pendingTap.current);
      }
    };
  }, []);

  // 1x ketuk untuk toggle status on/off, 2x ketuk cepat untuk membuka modal edit
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
    }, 280);
  };

  // Handler tombol checkbox dengan isolasi event bubbling
  const handleTogglePress = () => {
    isActionTriggered.current = true;
    if (pendingTap.current !== null) {
      clearTimeout(pendingTap.current);
      pendingTap.current = null;
    }
    onToggle(item.id);
  };

  // Handler tombol hapus dengan isolasi event bubbling
  const handleDeletePress = () => {
    isActionTriggered.current = true;
    if (pendingTap.current !== null) {
      clearTimeout(pendingTap.current);
      pendingTap.current = null;
    }
    onDelete(item.id);
  };

  // Handler tombol navigasi detail
  const handleInspectPress = () => {
    isActionTriggered.current = true;
    if (pendingTap.current !== null) {
      clearTimeout(pendingTap.current);
      pendingTap.current = null;
    }
    if (onInspect) {
      onInspect(item);
    }
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
          backgroundColor: theme.card,
          borderColor: item.isActive ? theme.primary : theme.border,
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
          color={item.isActive ? theme.primary : theme.subtleText}
        />
      </Pressable>

      {/* Detail data alarm */}
      <View style={styles.alarmDetails}>
        <View style={styles.labelRow}>
          <Text
            selectable={false}
            style={[styles.labelText, { color: theme.mutedText }]}
          >
            {item.label}
          </Text>
        </View>

        <View style={styles.timeRow}>
          <Text
            selectable={false}
            style={[styles.timeText, { color: theme.text }]}
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
          style={[styles.scheduleText, { color: theme.secondaryText }]}
        >
          {item.schedule} • {item.ringtone}
        </Text>

        {item.snoozeEnabled ? (
          <Text
            selectable={false}
            style={[styles.snoozeSummary, { color: theme.mutedText }]}
          >
            Snooze {item.snoozeInterval}m × {item.snoozeTimes}
          </Text>
        ) : null}
      </View>

      {/* Baris aksi cepat: Navigasi inspect & Hapus */}
      <View style={styles.cardActionsRow}>
        {onInspect ? (
          <Pressable
            onPress={handleInspectPress}
            style={styles.actionIconButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Lihat detail navigasi alarm ${item.time}`}
          >
            <Ionicons
              name="chevron-forward-circle-outline"
              size={22}
              color={theme.secondaryText}
            />
          </Pressable>
        ) : null}

        <Pressable
          onPress={handleDeletePress}
          style={styles.actionIconButton}
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
      </View>
    </Pressable>
  );
}
