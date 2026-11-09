// Komponen kartu item alarm dengan aksi toggle, edit, hapus, dan buka detail

import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { homeStyles } from "@/styles/homeStyles";
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

  // Referensi timer untuk membedakan ketukan tunggal (toggle) dan ganda (edit)
  const pendingTap = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActionTriggered = useRef(false);

  // Bersihkan timer ketukan yang tertunda saat komponen dilepas (unmount)
  useEffect(() => {
    return () => {
      if (pendingTap.current !== null) {
        clearTimeout(pendingTap.current);
      }
    };
  }, []);

  // 1x ketuk kartu untuk toggle on/off, 2x ketuk cepat untuk membuka modal edit
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

  // Ubah status aktif alarm lewat ikon checkbox tanpa memicu event kartu
  const handleTogglePress = () => {
    isActionTriggered.current = true;
    if (pendingTap.current !== null) {
      clearTimeout(pendingTap.current);
      pendingTap.current = null;
    }
    onToggle(item.id);
  };

  // Hapus item alarm saat tombol tempat sampah ditekan
  const handleDeletePress = () => {
    isActionTriggered.current = true;
    if (pendingTap.current !== null) {
      clearTimeout(pendingTap.current);
      pendingTap.current = null;
    }
    onDelete(item.id);
  };

  // Buka halaman detail status alarm saat tombol panah kanan ditekan
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
        homeStyles.alarmCard,
        {
          backgroundColor: theme.card,
          borderColor: item.isActive ? theme.primary : theme.border,
          opacity: item.isActive ? 1 : 0.65,
        },
      ]}
    >
      {/* Tombol checkbox di sisi kiri kartu */}
      <Pressable
        onPress={handleTogglePress}
        style={homeStyles.checkButton}
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

      {/* Informasi utama alarm: label, jam, jadwal, nada dering, dan snooze */}
      <View style={homeStyles.alarmDetails}>
        <View style={homeStyles.labelRow}>
          <Text
            selectable={false}
            style={[homeStyles.labelText, { color: theme.mutedText }]}
          >
            {item.label}
          </Text>
        </View>

        <View style={homeStyles.timeRow}>
          <Text
            selectable={false}
            style={[homeStyles.timeText, { color: theme.text }]}
          >
            {item.time}
          </Text>

          <Ionicons
            name="musical-notes"
            size={16}
            color={theme.subtleText}
            style={homeStyles.soundIcon}
          />
        </View>

        <Text
          selectable={false}
          style={[homeStyles.scheduleText, { color: theme.secondaryText }]}
        >
          {item.schedule} • {item.ringtone}
        </Text>

        {item.snoozeEnabled ? (
          <Text
            selectable={false}
            style={[homeStyles.snoozeSummary, { color: theme.mutedText }]}
          >
            Snooze {item.snoozeInterval}m × {item.snoozeTimes}
          </Text>
        ) : null}
      </View>

      {/* Tombol aksi cepat di sisi kanan: buka detail & hapus */}
      <View style={homeStyles.cardActionsRow}>
        {onInspect ? (
          <Pressable
            onPress={handleInspectPress}
            style={homeStyles.actionIconButton}
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
          style={homeStyles.actionIconButton}
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
