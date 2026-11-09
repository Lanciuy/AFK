// Layanan pemutaran audio alarm native berbasis modul expo-audio

import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from "expo-audio";
import { RINGTONE_AUDIO_MAP } from "@/data/alarmData";

// Instans player aktif dan timer pratinjau yang sedang berjalan
let activePlayer: AudioPlayer | null = null;
let previewTimeoutId: ReturnType<typeof setTimeout> | null = null;

// Menghentikan audio dan membersihkan alokasi memori player
export async function stopAlarmSoundAsync(): Promise<void> {
  if (previewTimeoutId !== null) {
    clearTimeout(previewTimeoutId);
    previewTimeoutId = null;
  }

  if (activePlayer) {
    try {
      activePlayer.pause();
      activePlayer.remove();
    } catch (error) {
      console.warn("Gagal membersihkan AudioPlayer:", error);
    } finally {
      activePlayer = null;
    }
  }
}

// Memutar nada dering alarm secara native berulang (loop)
export async function playAlarmSoundAsync(
  ringtoneName: string,
  loop = true
): Promise<void> {
  await stopAlarmSoundAsync();

  const audioUri =
    RINGTONE_AUDIO_MAP[ringtoneName] ??
    RINGTONE_AUDIO_MAP["Default"] ??
    "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

  try {
    // Memastikan audio tetap bersuara dalam silent mode
    await setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "duckOthers",
    });

    const player = createAudioPlayer({ uri: audioUri });
    player.volume = 1.0;
    player.loop = loop;

    activePlayer = player;
    player.play();
  } catch (error) {
    console.error(`Gagal memutar audio ringtone '${ringtoneName}':`, error);
  }
}

// Memutar pratinjau nada dering singkat lalu berhenti otomatis
export async function previewAlarmSoundAsync(
  ringtoneName: string,
  durationMs = 2000
): Promise<void> {
  await stopAlarmSoundAsync();
  await playAlarmSoundAsync(ringtoneName, false);

  previewTimeoutId = setTimeout(() => {
    stopAlarmSoundAsync().catch((err) => {
      console.warn("Gagal menghentikan pratinjau audio:", err);
    });
  }, durationMs);
}

// Cek status apakah pemutar audio sedang aktif berbunyi
export function isAlarmPlaying(): boolean {
  return activePlayer !== null && activePlayer.playing;
}
