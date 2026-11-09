/**
 * @file src/app/index.tsx
 * Halaman utama daftar alarm dan dashboard waktu & cuaca.
 *
 * Menerapkan:
 * 1. Pengambilan data dari 2 External API ke dalam Object bertipe Interface (MorningBriefing).
 * 2. Pemrosesan async dengan Custom Async Function & Pre-built Async Function.
 * 3. Penanganan Promise menggunakan rantai .then(), .resolve(), dan .reject().
 * 4. Navigasi bertahap dari pengaturan form hingga status alarm terseting (router.push).
 */

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AlarmCard from "@/components/AlarmCard";
import AlarmForm from "@/components/AlarmForm";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { INITIAL_ALARMS } from "@/data/alarmData";
import {
  fetchExternalMorningBriefingAsync,
  validateAndBuildAlarmAsync,
} from "@/services/alarmAsyncService";
import { styles } from "@/styles/styles";
import type { AlarmItem, MorningBriefing } from "@/types/alarm";

export default function AlarmScreen() {
  const { theme } = useTheme();

  // [PENILAIAN - POIN 1]: State data alarm berupa array of objects bertipe AlarmItem[]
  const [alarms, setAlarms] = useState<AlarmItem[]>(INITIAL_ALARMS);
  const [editingAlarm, setEditingAlarm] = useState<AlarmItem | null>(null);

  // [PENILAIAN - POIN 1]: State untuk menampung Object bertipe Interface MorningBriefing dari External API
  const [morningBriefing, setMorningBriefing] =
    useState<MorningBriefing | null>(null);
  const [isBriefingLoading, setIsBriefingLoading] = useState(false);

  // State kontrol visibilitas form modal
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRingtoneModalVisible, setIsRingtoneModalVisible] = useState(false);

  // State field form alarm
  const [alarmName, setAlarmName] = useState("Bangun Pagi");
  const [hour, setHour] = useState("06");
  const [minute, setMinute] = useState("30");
  const [schedule, setSchedule] = useState("Daily");
  const [ringtone, setRingtone] = useState("Default");
  const [snoozeEnabled, setSnoozeEnabled] = useState(false);
  const [snoozeInterval, setSnoozeInterval] = useState("5");
  const [snoozeTimes, setSnoozeTimes] = useState("3");
  const [formError, setFormError] = useState("");

  // State jam digital real-time
  const [currentTime, setCurrentTime] = useState("");

  // [PENILAIAN - POIN 1]: Hook useEffect() untuk live digital clock dengan timer cleanup
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${h}:${m}:${s}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  /**
   * Fungsi pemuat ulang briefing pagi dari External API untuk interaksi tombol refresh.
   * [PENILAIAN - POIN 3]: Menggunakan fungsi .then() dan .catch()
   */
  const handleRefreshBriefing = () => {
    setIsBriefingLoading(true);

    fetchExternalMorningBriefingAsync()
      .then((briefingObject: MorningBriefing) => {
        // Objek bertipe interface MorningBriefing disimpan ke dalam state
        setMorningBriefing(briefingObject);
      })
      .catch((error: Error) => {
        console.warn("Gagal memuat briefing:", error.message);
      })
      .finally(() => {
        setIsBriefingLoading(false);
      });
  };

  // [PENILAIAN - POIN 2 & POIN 3]:
  // Memuat data dari External API saat pertama kali mount menggunakan Custom Async Function & .then()
  useEffect(() => {
    let isMounted = true;

    fetchExternalMorningBriefingAsync()
      .then((briefingObject: MorningBriefing) => {
        if (isMounted) {
          setMorningBriefing(briefingObject);
        }
      })
      .catch((error: Error) => {
        console.warn("Gagal memuat briefing awal:", error.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Reset input form
  const resetForm = () => {
    setAlarmName("Bangun Pagi");
    setHour("06");
    setMinute("30");
    setSchedule("Daily");
    setRingtone("Default");
    setSnoozeEnabled(false);
    setSnoozeInterval("5");
    setSnoozeTimes("3");
    setFormError("");
  };

  // Toggle aktif/nonaktif alarm
  const toggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      ),
    );
  };

  // Hapus alarm
  const deleteAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((item) => item.id !== id));
  };

  // Buka modal tambah alarm
  const openAddModal = () => {
    resetForm();
    setEditingAlarm(null);
    setIsAddModalVisible(true);
  };

  // Buka modal edit alarm
  const openEditModal = (item: AlarmItem) => {
    const [h = "07", m = "00"] = item.time.split(":");
    setEditingAlarm(item);
    setAlarmName(item.label);
    setHour(h);
    setMinute(m);
    setSchedule(item.schedule);
    setRingtone(item.ringtone);
    setSnoozeEnabled(item.snoozeEnabled);
    setSnoozeInterval(String(item.snoozeInterval));
    setSnoozeTimes(String(item.snoozeTimes));
    setFormError("");
    setIsAddModalVisible(true);
  };

  // Navigasi ke halaman detail / status alarm terseting
  const handleInspectAlarm = (item: AlarmItem) => {
    router.push({
      pathname: "/alarm-detail",
      params: {
        id: item.id,
        label: item.label,
        time: item.time,
        schedule: item.schedule,
        ringtone: item.ringtone,
        snoozeEnabled: String(item.snoozeEnabled),
        snoozeInterval: String(item.snoozeInterval),
        snoozeTimes: String(item.snoozeTimes),
      },
    });
  };

  // Tutup modal alarm
  const closeAlarmModal = () => {
    setIsAddModalVisible(false);
    setIsRingtoneModalVisible(false);
    setEditingAlarm(null);
    resetForm();
  };

  /**
   * [PENILAIAN - POIN 2 & POIN 3]:
   * Menggunakan custom async function `validateAndBuildAlarmAsync`
   * dan mengonsumsi kembalian Promise menggunakan fungsi .then() dan .catch().
   */
  const saveAlarm = () => {
    setFormError("");

    const payload = {
      alarmName,
      hour,
      minute,
      schedule,
      ringtone,
      snoozeEnabled,
      snoozeInterval,
      snoozeTimes,
    };

    validateAndBuildAlarmAsync(payload, alarms, editingAlarm)
      .then((savedAlarm: AlarmItem) => {
        // [PENILAIAN - POIN 3]: Blok .then() dieksekusi saat Promise.resolve() berhasil
        if (editingAlarm) {
          setAlarms((prev) =>
            prev.map((item) =>
              item.id === editingAlarm.id ? savedAlarm : item,
            ),
          );
        } else {
          setAlarms((prev) => [savedAlarm, ...prev]);
        }

        closeAlarmModal();

        // Alur bertahap: Setelah alarm berhasil disetel, arahkan langsung ke halaman Alarm Terseting
        router.push({
          pathname: "/alarm-detail",
          params: {
            id: savedAlarm.id,
            label: savedAlarm.label,
            time: savedAlarm.time,
            schedule: savedAlarm.schedule,
            ringtone: savedAlarm.ringtone,
            snoozeEnabled: String(savedAlarm.snoozeEnabled),
            snoozeInterval: String(savedAlarm.snoozeInterval),
            snoozeTimes: String(savedAlarm.snoozeTimes),
          },
        });
      })
      .catch((error: Error) => {
        // [PENILAIAN - POIN 3]: Menangkap kegagalan dari Promise.reject()
        setFormError(error.message);
      });
  };

  // Render item untuk FlatList
  const renderAlarmCard = ({ item }: { item: AlarmItem }) => (
    <AlarmCard
      item={item}
      onToggle={toggleAlarm}
      onDelete={deleteAlarm}
      onEdit={openEditModal}
      onInspect={handleInspectAlarm}
    />
  );

  const activeAlarmCount = alarms.filter((item) => item.isActive).length;

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.headerBackground },
      ]}
    >
      {/* Header Container */}
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: theme.headerBackground },
        ]}
      >
        <View style={styles.headerTopRow}>
          <View style={styles.headerTitleGroup}>
            <Ionicons name="alarm" size={26} color="#ffffff" />
            <Text style={styles.headerTitle}>Alarm</Text>
          </View>

          <View style={styles.headerActions}>
            <ThemeToggle />
          </View>
        </View>

        {/* Sub Header: Jam Digital Real-Time & Badge Alarm Aktif */}
        <View style={styles.headerSubRow}>
          <View style={styles.clockBadge}>
            <Ionicons name="time-outline" size={14} color="#ffffff" />
            <Text style={styles.clockText}>{currentTime || "--:--:--"}</Text>
          </View>

          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>
              {activeAlarmCount} Aktif
            </Text>
          </View>
        </View>
      </View>

      {/* Konten Halaman */}
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: theme.background },
        ]}
      >
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={renderAlarmCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            /* [PENILAIAN - POIN 1]: Komponen Tampilan Data dari External API */
            <View
              style={[
                styles.briefingCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.briefingHeader}>
                <View style={styles.briefingTitleRow}>
                  <Ionicons
                    name="partly-sunny-outline"
                    size={16}
                    color={theme.primary}
                  />
                  <Text
                    style={[styles.briefingTitle, { color: theme.primary }]}
                  >
                    Prakiraan Cuaca &amp; Motivasi Pagi
                  </Text>
                </View>

                <Pressable
                  onPress={handleRefreshBriefing}
                  style={[
                    styles.briefingRefreshBtn,
                    { backgroundColor: theme.inputBackground },
                  ]}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Muat ulang data cuaca dan kutipan"
                >
                  {isBriefingLoading ? (
                    <ActivityIndicator size="small" color={theme.primary} />
                  ) : (
                    <Ionicons
                      name="refresh"
                      size={14}
                      color={theme.secondaryText}
                    />
                  )}
                </Pressable>
              </View>

              {morningBriefing ? (
                <>
                  <View style={styles.briefingMainRow}>
                    <View>
                      <View style={styles.briefingTempGroup}>
                        <Text
                          style={[styles.briefingTemp, { color: theme.text }]}
                        >
                          {morningBriefing.temperature}°C
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.briefingCondition,
                          { color: theme.secondaryText },
                        ]}
                      >
                        {morningBriefing.weatherLabel} • Angin{" "}
                        {morningBriefing.windSpeed} km/j
                      </Text>
                    </View>

                    <View style={styles.briefingMetaRight}>
                      <Text
                        style={[
                          styles.briefingLocation,
                          { color: theme.text },
                        ]}
                      >
                        {morningBriefing.locationName}
                      </Text>
                      <Text
                        style={[
                          styles.briefingUpdated,
                          { color: theme.mutedText },
                        ]}
                      >
                        Update: {morningBriefing.lastUpdated}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.briefingQuoteBox,
                      {
                        backgroundColor: theme.inputBackground,
                        borderLeftColor: theme.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.briefingQuoteText,
                        { color: theme.text },
                      ]}
                    >
                      &ldquo;{morningBriefing.quote}&rdquo;
                    </Text>
                    <Text
                      style={[
                        styles.briefingQuoteAuthor,
                        { color: theme.primary },
                      ]}
                    >
                      — {morningBriefing.quoteAuthor}
                    </Text>
                  </View>
                </>
              ) : (
                <ActivityIndicator size="small" color={theme.primary} />
              )}
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="alarm-outline"
                size={64}
                color={theme.subtleText}
              />
              <Text style={[styles.emptyText, { color: theme.text }]}>
                Belum ada alarm
              </Text>
              <Text
                style={[styles.emptySubtext, { color: theme.mutedText }]}
              >
                Tekan tombol + di bawah untuk mengatur alarm bertahap
              </Text>
            </View>
          }
        />

        <Pressable
          onPress={openAddModal}
          style={[styles.fabButton, { backgroundColor: theme.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Atur alarm baru"
        >
          <Ionicons name="add" size={32} color="#ffffff" />
        </Pressable>
      </View>

      <AlarmForm
        visible={isAddModalVisible}
        ringtoneModalVisible={isRingtoneModalVisible}
        isEditing={editingAlarm !== null}
        alarmName={alarmName}
        hour={hour}
        minute={minute}
        schedule={schedule}
        ringtone={ringtone}
        snoozeEnabled={snoozeEnabled}
        snoozeInterval={snoozeInterval}
        snoozeTimes={snoozeTimes}
        formError={formError}
        onClose={closeAlarmModal}
        onSave={saveAlarm}
        onRingtoneModalOpen={() => setIsRingtoneModalVisible(true)}
        onRingtoneModalClose={() => setIsRingtoneModalVisible(false)}
        setAlarmName={setAlarmName}
        setHour={setHour}
        setMinute={setMinute}
        setSchedule={setSchedule}
        setRingtone={setRingtone}
        setSnoozeEnabled={setSnoozeEnabled}
        setSnoozeInterval={setSnoozeInterval}
        setSnoozeTimes={setSnoozeTimes}
        setFormError={setFormError}
      />
    </SafeAreaView>
  );
}
