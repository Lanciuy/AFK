# Design Direction — Alarm & Morning Briefing

> Panduan arah visual, identitas, dan sistem desain untuk aplikasi Alarm & Morning Briefing.
> Dibuat untuk menjadi sumber acuan estetika, konsistensi ritme, dan filter antislop.

---

## 1. Identitas & Karakter Produk

- **Nama Produk**: Alarm & Morning Companion
- **Tujuan Utama**: Aplikasi utilitas mobile yang andal, menenangkan, dan memberikan konteks kesiapan hari (jam real-time, cuaca, dan kutipan motivasi) dengan interaksi bertahap yang presisi.
- **Karakter Visual**: *Calm, Focused, Purposeful, Reliable*. Menghindari ornamen berlebihan (*glow* di mana-mana, gradien ungu-biru generik) dan mengutamakan keterbacaan serta kejelasan status.

---

## 2. Palet Warna & Visual Tokens

### A. Light Mode
- **Header Canvas**: `#4a154b` (Deep Plum — memberi karakter unik dan kehangatan pagi/malam).
- **Background Utama**: `#f7f8fa` (Off-white yang nyaman di mata, tidak menyilaukan).
- **Surface / Card**: `#ffffff` (Elevasi halus dengan border tipis `#e2e8f0`).
- **Aksen Utama (Primary)**: `#e53e3e` (Coral Red — memberi kejelasan visual untuk jam, alarm aktif, dan tombol aksi utama).
- **Sukses & Konfirmasi**: `#10b981` (Emerald Green).
- **Teks**:
  - Utama: `#1a202c` (Kontras 11.5:1 terhadap surface).
  - Sekunder: `#4a5568` (Kontras 6.8:1).
  - Lembut/Muted: `#718096`.

### B. Dark Mode
- **Header Canvas**: `#0f172a` (Deep Slate).
- **Background Utama**: `#0f172a`.
- **Surface / Card**: `#1e293b` (Dark Slate dengan border `#334155`).
- **Aksen Utama (Primary)**: `#ef4444` (Vibrant Coral Red).
- **Sukses & Konfirmasi**: `#10b981`.
- **Teks**:
  - Utama: `#f8fafc` (Kontras 13.8:1 terhadap surface).
  - Sekunder: `#cbd5e1` (Kontras 8.2:1).
  - Muted: `#94a3b8`.

---

## 3. Tipografi & Skala Teks

- **Family**: Native Platform Sans-Serif (`System` di iOS, `Roboto` di Android) untuk performa instan dan rendering tajam.
- **Waktu & Jam**: Menggunakan font weight tebal (`800`) dan tabular numerals (`fontVariant: ["tabular-nums"]`) agar angka detik dan menit tidak bergoyang saat berganti.
- **Label & Status**: Teks uppercase dengan letter-spacing proporsional (`0.5px`) pada ukuran font kecil (`11px - 13px`) untuk mempertegas hierarki tanpa membebani pembacaan.

---

## 4. Layout, Spacing & Interaksi

- **Prinsip Alur Bertahap (Step-by-Step)**:
  - Konfigurasi alarm dibagi dalam 3 langkah logis: (1) Waktu & Label → (2) Jadwal & Nada Dering → (3) Snooze & Ringkasan Konfirmasi.
  - Setiap tahap memiliki indikator progres visual (Stepper) dan validasi asinkron yang terkonfirmasi.
- **Sentuhan & Aksesibilitas**:
  - Minimum area sentuh (*tap target*) $\ge 44 \times 44$ pt.
  - Setiap elemen interaktif memiliki feedback saat ditekan (`pressed` state / opacity 0.8).
  - Tidak ada tombol atau link mati tanpa aksi fungsional.

---

## 5. Dials

- **ENERGY**: `2` (Seimbang, bersih, memiliki karakter tegas tanpa efek visual neon/mesh berlebihan).
- **RHYTHM**: `2` (Struktur komponen bervariasi mengikuti fungsi data: Card Alarm, Banner Status, dan Stepper Wizard).
- **MOTION**: `1` (Transisi layar halus bawaan platform `slide_from_right`, tanpa animasi floating/bounce template yang mengalihkan perhatian).

