// Utilitas pemformatan waktu dan konversi data cuaca

// Format tanggal ke string waktu jam:menit:detik (HH:MM:SS)
export function formatTimeHMS(date: Date): string {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// Format detik ke string durasi menit:detik (MM:SS)
export function formatElapsedMMSS(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Menghitung selisih waktu menuju jam alarm berbunyi berikutnya
export function calculateRemainingTime(targetTime: string): string {
  const [targetHour = 7, targetMin = 0] = targetTime.split(":").map(Number);
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();

  let diffMinutes = targetHour * 60 + targetMin - (currentHour * 60 + currentMin);
  if (diffMinutes <= 0) {
    diffMinutes += 24 * 60;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return `${hours} jam ${minutes} menit lagi`;
}

// Konversi kode cuaca WMO ke label Bahasa Indonesia
export function mapWeatherCodeToLabel(code: number): string {
  if (code === 0) return "Cerah";
  if (code >= 1 && code <= 3) return "Cerah Berawan";
  if (code >= 45 && code <= 48) return "Berkabut";
  if (code >= 51 && code <= 55) return "Gerimis Ringan";
  if (code >= 61 && code <= 65) return "Hujan";
  if (code >= 71 && code <= 77) return "Salju";
  if (code >= 80 && code <= 82) return "Hujan Lebat";
  if (code >= 95 && code <= 99) return "Badai Petir";
  return "Berawan";
}

