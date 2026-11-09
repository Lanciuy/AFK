// Halaman utama daftar alarm, jam digital real-time, dan informasi cuaca pagi

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AlarmCard from "@/components/AlarmCard";
import AlarmForm from "@/components/AlarmForm";
import MorningBriefingCard from "@/components/MorningBriefingCard";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useAlarmManager } from "@/hooks/useAlarmManager";
import { useLiveClock } from "@/hooks/useLiveClock";
import { useMorningBriefing } from "@/hooks/useMorningBriefing";
import { homeStyles } from "@/styles/homeStyles";
import type { AlarmItem } from "@/types/alarm";

export default function AlarmScreen() {
  const { theme } = useTheme();

  // Inisialisasi hook jam digital, cuaca pagi API, dan manajemen data alarm
  const currentTime = useLiveClock();
  const { briefing, isLoading, refreshBriefing } = useMorningBriefing();
  const {
    alarms,
    editingAlarm,
    activeAlarmCount,
    isAddModalVisible,
    isRingtoneModalVisible,
    setIsRingtoneModalVisible,
    formState,
    formSetters,
    actions,
  } = useAlarmManager();

  // Render komponen kartu untuk setiap item alarm di dalam FlatList
  const renderAlarmCard = ({ item }: { item: AlarmItem }) => (
    <AlarmCard
      item={item}
      onToggle={actions.toggleAlarm}
      onDelete={actions.deleteAlarm}
      onEdit={actions.openEditModal}
      onInspect={actions.handleInspectAlarm}
    />
  );

  return (
    <SafeAreaView
      style={[
        homeStyles.safeArea,
        { backgroundColor: theme.headerBackground },
      ]}
    >
      {/* Bagian header: Judul aplikasi, tombol tema, jam live, dan jumlah alarm aktif */}
      <View
        style={[
          homeStyles.headerContainer,
          { backgroundColor: theme.headerBackground },
        ]}
      >
        <View style={homeStyles.headerTopRow}>
          <View style={homeStyles.headerTitleGroup}>
            <Ionicons name="alarm" size={26} color="#ffffff" />
            <Text style={homeStyles.headerTitle}>Alarm</Text>
          </View>

          <View style={homeStyles.headerActions}>
            <ThemeToggle />
          </View>
        </View>

        <View style={homeStyles.headerSubRow}>
          <View style={homeStyles.clockBadge}>
            <Ionicons name="time-outline" size={14} color="#ffffff" />
            <Text style={homeStyles.clockText}>{currentTime || "--:--:--"}</Text>
          </View>

          <View style={homeStyles.activeBadge}>
            <Text style={homeStyles.activeBadgeText}>
              {activeAlarmCount} Aktif
            </Text>
          </View>
        </View>
      </View>

      {/* Bagian utama: Kartu cuaca pagi, daftar alarm, dan tombol tambah (+) */}
      <View
        style={[
          homeStyles.contentContainer,
          { backgroundColor: theme.background },
        ]}
      >
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={renderAlarmCard}
          contentContainerStyle={homeStyles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <MorningBriefingCard
              briefing={briefing}
              isLoading={isLoading}
              onRefresh={refreshBriefing}
            />
          }
          ListEmptyComponent={
            <View style={homeStyles.emptyContainer}>
              <Ionicons
                name="alarm-outline"
                size={64}
                color={theme.subtleText}
              />
              <Text style={[homeStyles.emptyText, { color: theme.text }]}>
                Belum ada alarm
              </Text>
              <Text
                style={[homeStyles.emptySubtext, { color: theme.mutedText }]}
              >
                Tekan tombol + di bawah untuk mengatur alarm bertahap
              </Text>
            </View>
          }
        />

        {/* Tombol mengambang (FAB) untuk membuka modal tambah alarm baru */}
        <Pressable
          onPress={actions.openAddModal}
          style={[homeStyles.fabButton, { backgroundColor: theme.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Atur alarm baru"
        >
          <Ionicons name="add" size={32} color="#ffffff" />
        </Pressable>
      </View>

      {/* Modal wizard 3 tahap untuk tambah atau edit alarm */}
      <AlarmForm
        visible={isAddModalVisible}
        ringtoneModalVisible={isRingtoneModalVisible}
        isEditing={editingAlarm !== null}
        alarmName={formState.alarmName}
        hour={formState.hour}
        minute={formState.minute}
        schedule={formState.schedule}
        ringtone={formState.ringtone}
        snoozeEnabled={formState.snoozeEnabled}
        snoozeInterval={formState.snoozeInterval}
        snoozeTimes={formState.snoozeTimes}
        formError={formState.formError}
        onClose={actions.closeAlarmModal}
        onSave={actions.saveAlarm}
        onRingtoneModalOpen={() => setIsRingtoneModalVisible(true)}
        onRingtoneModalClose={() => setIsRingtoneModalVisible(false)}
        setAlarmName={formSetters.setAlarmName}
        setHour={formSetters.setHour}
        setMinute={formSetters.setMinute}
        setSchedule={formSetters.setSchedule}
        setRingtone={formSetters.setRingtone}
        setSnoozeEnabled={formSetters.setSnoozeEnabled}
        setSnoozeInterval={formSetters.setSnoozeInterval}
        setSnoozeTimes={formSetters.setSnoozeTimes}
        setFormError={formSetters.setFormError}
      />
    </SafeAreaView>
  );
}
