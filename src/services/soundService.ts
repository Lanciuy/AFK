/**
 * @file src/services/soundService.ts
 * Layanan pemutaran audio alarm native berbasis modul expo-audio.
 *
 * Menerapkan arsitektur Clean Code & Mobile-First:
 * 1. Menggunakan driver native AudioPlayer dari expo-audio tanpa ketergantungan API Web browser (zero AudioContext/web oscillator).
 * 2. Mengatur konfigurasi audio global perangkat menggunakan setAudioModeAsync agar suara alarm tetap berbunyi kencang dalam mode hening (Silent Mode).
 * 3. Mengelola siklus hidup pemutar audio (singleton instance lifecycle) untuk mencegah kebocoran memori (memory leak) dan konflik pemutaran simultan.
 */

import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from "expo-audio";
import { RINGTONE_AUDIO_MAP } from "@/data/alarmData";

/**
 * Referensi instans AudioPlayer yang sedang aktif memutar suara dering atau pratinjau.
 */
let activePlayer: AudioPlayer | null = null;

/**
 * ID timeout untuk menghentikan pratinjau audio secara otomatis.
 */
let previewTimeoutId: ReturnType<typeof setTimeout> | null = null;

/**
 * Menghentikan dan membersihkan instans AudioPlayer yang sedang berjalan.
 * Memastikan alokasi memori internal native audio dibebaskan.
 */
export async function stopAlarmSoundAsync(): Promise<void> {
  // Bersihkan timer pratinjau yang masih terjadwal
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

/**
 * Memutar nada dering alarm secara native melalui expo-audio.
 *
 * @param ringtoneName Nama ringtone yang dipilih (misal: "Morning Chime", "Default")
 * @param loop Menentukan apakah audio berulang secara terus-menerus hingga dihentikan (default: true untuk alarm)
 */
export async function playAlarmSoundAsync(
  ringtoneName: string,
  loop = true
): Promise<void> {
  // Hentikan suara yang sedang aktif terlebih dahulu
  await stopAlarmSoundAsync();

  // Resolusi URL audio MP3 resmi dari kamus data
  const audioUri =
    RINGTONE_AUDIO_MAP[ringtoneName] ??
    RINGTONE_AUDIO_MAP["Default"] ??
    "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

  try {
    // Konfigurasi mode audio native untuk mengizinkan pemutaran dalam mode senyap
    await setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "duckOthers",
    });

    // Inisialisasi AudioPlayer native expo-audio
    const player = createAudioPlayer({ uri: audioUri });
    player.volume = 1.0;
    player.loop = loop;

    activePlayer = player;
    player.play();
  } catch (error) {
    console.error(`Gagal memutar audio ringtone '${ringtoneName}':`, error);
  }
}

/**
 * Memutar pratinjau nada dering alarm singkat (snippet) selama durasi tertentu,
 * kemudian secara otomatis menghentikannya. Digunakan saat memilih nada dering di formulir.
 *
 * @param ringtoneName Nama nada dering yang ingin didengarkan
 * @param durationMs Durasi pratinjau dalam milidetik (default: 2000 ms)
 */
export async function previewAlarmSoundAsync(
  ringtoneName: string,
  durationMs = 2000
): Promise<void> {
  // Hentikan pemutaran sebelumnya
  await stopAlarmSoundAsync();

  // Putar nada dering tanpa mode loop
  await playAlarmSoundAsync(ringtoneName, false);

  // Jadwalkan penghentian otomatis setelah durasi pratinjau selesai
  previewTimeoutId = setTimeout(() => {
    stopAlarmSoundAsync().catch((err) => {
      console.warn("Gagal menghentikan pratinjau audio:", err);
    });
  }, durationMs);
}

/**
 * Mengecek apakah ada pemutar audio alarm yang sedang berjalan saat ini.
 */
export function isAlarmPlaying(): boolean {
  return activePlayer !== null && activePlayer.playing;
}

