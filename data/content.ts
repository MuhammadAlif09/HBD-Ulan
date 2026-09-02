/**
 * data/content.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * SATU tempat untuk SEMUA konten personal & placeholder.
 * Cari `EDIT:` untuk menemukan semua yang perlu diisi manual.
 * Komponen tidak boleh hardcode konten — selalu import dari sini.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ───────────────────────────── IDENTITAS ─────────────────────────────
export const person = {
  name: "Wulan", // EDIT: nama panggilan
  age: 19, // EDIT: umur yang dirayakan
  birthdayISO: "2026-08-20", // EDIT: tanggal ulang tahun (YYYY-MM-DD)
  senderName: "Aku", // EDIT: nama kamu (pengirim) — dipakai di tanda tangan surat
} as const;

// ───────────────────────────── UNLOCK ─────────────────────────────
export const unlock = {
  // EDIT: password unlock — huruf kecil/besar tidak dibedakan, spasi diabaikan
  password: "20082007",
  hint: "Petunjuk: tanggal lahirmu, 8 angka tanpa spasi", // EDIT: hint password
  title: "Sebuah film pendek, khusus untukmu.",
  subtitle: "Masukkan kata kunci untuk memulai",
} as const;

// ───────────────────────────── HERO ─────────────────────────────
export const hero = {
  eyebrow: "20 Agustus 2026", // EDIT: tanggal tampil di hero
  title: "Selamat Ulang Tahun,",
  highlight: "Wulan", // EDIT: nama di judul hero
  subtitle:
    "Sembilan belas tahun kamu ada di dunia — dan aku beruntung banget bisa ada di beberapa babaknya.", // EDIT: subjudul hero
  scrollCue: "Scroll pelan-pelan, ya",
} as const;

// ───────────────────────────── MOOD ─────────────────────────────
export type MoodId = "dreamy" | "sunset" | "midnight" | "candy";
export interface Mood {
  id: MoodId;
  label: string;
  emojiFree: string; // label pendek pengganti emoji (aksesibilitas)
  description: string;
}
export const moods: readonly Mood[] = [
  { id: "dreamy", label: "Dreamy", emojiFree: "awan", description: "Lavender & cream, tenang" },
  { id: "sunset", label: "Sunset", emojiFree: "senja", description: "Peach & pink hangat" },
  { id: "candy", label: "Candy", emojiFree: "permen", description: "Pink & mint, ceria" },
  { id: "midnight", label: "Midnight", emojiFree: "malam", description: "Gelap lembut, lilin" },
] as const;

// ───────────────────────────── MUSIK ─────────────────────────────
export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string; // WAJIB .mp3 — lihat skills/deployment-assets.md
  cover?: string; // opsional: path cover art di /assets/covers/
  accent: string; // warna aksen visualizer (CSS color)
}
export const tracks: readonly Track[] = [
  { id: "ilysb", title: "ILYSB", artist: "LANY", src: "/assets/audio/ilysb.mp3", accent: "var(--color-pink)" }, // EDIT: default track
  { id: "thick-and-thin", title: "Thick and Thin", artist: "LANY", src: "/assets/audio/thick-and-thin.mp3", accent: "var(--color-lavender)" },
  { id: "if-this-is-the-last-time", title: "If This Is the Last Time", artist: "LANY", src: "/assets/audio/if-this-is-the-last-time.mp3", accent: "var(--color-butter)" },
  { id: "malibu-nights", title: "Malibu Nights", artist: "LANY", src: "/assets/audio/malibu-nights.mp3", accent: "var(--color-mint)" },
  { id: "super-far", title: "Super Far", artist: "LANY", src: "/assets/audio/super-far.mp3", accent: "var(--color-pink)" },
  { id: "xxl", title: "XXL", artist: "LANY", src: "/assets/audio/xxl.mp3", accent: "var(--color-lavender)" },
] as const;

export const voiceNote = {
  src: "/assets/audio/voice-note.mp3", // EDIT: file voice note (.mp3)
  label: "Ada pesan suara buat kamu",
  duration: "0:42", // EDIT: durasi tampil (hanya label)
} as const;

// Ambient sound per section — file opsional; kalau tidak ada, engine akan skip diam-diam.
export const ambient = {
  hero: "/assets/audio/ambient/wind.mp3", // EDIT: opsional
  gallery: "/assets/audio/ambient/shutter.mp3", // EDIT: opsional
  letter: "/assets/audio/ambient/envelope.mp3", // EDIT: opsional
  cake: "/assets/audio/ambient/candle.mp3", // EDIT: opsional
} as const;

// ───────────────────────────── NARASI (scroll cinematics) ─────────────────────────────
// Kalimat pendek 1-2 baris yang muncul di antara section besar.
export const narrative = {
  beforeTimeline: "Semua cerita punya awal. Ini awal kita.", // EDIT: narasi
  beforeGallery: "Beberapa momen terlalu bagus untuk cuma disimpan di galeri HP.", // EDIT: narasi
  beforeThings: "Sembilan belas alasan. Sebenarnya lebih, tapi kita mulai dari sini.", // EDIT: narasi
  beforeGift: "Sekarang, bagian yang paling aku tunggu.", // EDIT: narasi
  beforeLetter: "Ada yang mau aku bilang, pelan-pelan.", // EDIT: narasi
  beforeEnding: "Terima kasih sudah sampai sejauh ini.", // EDIT: narasi
} as const;

// ───────────────────────────── TIMELINE ─────────────────────────────
export interface TimelineItem {
  id: string;
  date: string; // teks bebas, contoh "Maret 2024"
  location: string;
  title: string;
  description: string;
  photo?: string; // opsional path foto kecil
}
export const relationshipStartISO = "2024-08-20T19:30:00+07:00"; // EDIT: tanggal jadian (buat time counter)

export const timeline: readonly TimelineItem[] = [
  {
    id: "first-glance",
    date: "EDIT: tanggal",
    location: "EDIT: gedung kampus",
    title: "Pertama kali papasan",
    description: "EDIT: ceritain momen pertama kali papasan di gedung kampus.",
  },
  {
    id: "first-dm",
    date: "EDIT: tanggal",
    location: "Instagram",
    title: "DM pertama",
    description: "EDIT: siapa yang DM duluan, isi DM-nya apa.",
  },
  {
    id: "first-hand",
    date: "EDIT: tanggal",
    location: "EDIT: lokasi",
    title: "Pegangan tangan pertama",
    description: "EDIT: ceritain momen pegangan tangan pertama.",
  },
  {
    id: "official",
    date: "EDIT: tanggal",
    location: "EDIT: lokasi",
    title: "Resmi jadian",
    description: "EDIT: momen resmi jadian.",
  },
  {
    id: "best-volunteer",
    date: "EDIT: tanggal",
    location: "EDIT: lokasi",
    title: "Best Volunteer",
    description: "EDIT: momen dia dapat Best Volunteer — betapa bangganya kamu.",
  },
  // Slot tambahan (hapus/isi sesuai kebutuhan)
  { id: "extra-1", date: "EDIT: tanggal", location: "EDIT: lokasi", title: "EDIT: judul momen", description: "EDIT: deskripsi." },
  { id: "extra-2", date: "EDIT: tanggal", location: "EDIT: lokasi", title: "EDIT: judul momen", description: "EDIT: deskripsi." },
  { id: "extra-3", date: "EDIT: tanggal", location: "EDIT: lokasi", title: "EDIT: judul momen", description: "EDIT: deskripsi." },
] as const;

// Floating quotes — muncul random, maksimal 1 per section
export const floatingQuotes: readonly string[] = [
  "EDIT: quote pendek 1",
  "EDIT: quote pendek 2",
  "EDIT: quote pendek 3",
  "EDIT: quote pendek 4",
  "EDIT: quote pendek 5",
] as const;

// ───────────────────────────── GALLERY ─────────────────────────────
export type GalleryTabId = "little-wulan" | "the-queen" | "us";
export interface Photo {
  src: string;
  caption: string; // EDIT: tanggal/caption
  alt: string;
}
export interface GalleryTab {
  id: GalleryTabId;
  label: string;
  folder: string;
  photos: readonly Photo[];
}
// EDIT: tambah/kurangi foto di sini. Taruh file di public/assets/photos/<folder>/
export const gallery: readonly GalleryTab[] = [
  {
    id: "little-wulan",
    label: "Little Wulan",
    folder: "/assets/photos/little-wulan",
    photos: [
      { src: "/assets/photos/little-wulan/01.jpg", caption: "EDIT: tanggal", alt: "Wulan kecil" },
      { src: "/assets/photos/little-wulan/02.jpg", caption: "EDIT: tanggal", alt: "Wulan kecil" },
      { src: "/assets/photos/little-wulan/03.jpg", caption: "EDIT: tanggal", alt: "Wulan kecil" },
    ],
  },
  {
    id: "the-queen",
    label: "The Queen",
    folder: "/assets/photos/the-queen",
    photos: [
      { src: "/assets/photos/the-queen/01.jpg", caption: "EDIT: tanggal", alt: "Wulan" },
      { src: "/assets/photos/the-queen/02.jpg", caption: "EDIT: tanggal", alt: "Wulan" },
      { src: "/assets/photos/the-queen/03.jpg", caption: "EDIT: tanggal", alt: "Wulan" },
    ],
  },
  {
    id: "us",
    label: "Us",
    folder: "/assets/photos/us",
    photos: [
      { src: "/assets/photos/us/01.jpg", caption: "EDIT: tanggal", alt: "Kita berdua" },
      { src: "/assets/photos/us/02.jpg", caption: "EDIT: tanggal", alt: "Kita berdua" },
      { src: "/assets/photos/us/03.jpg", caption: "EDIT: tanggal", alt: "Kita berdua" },
    ],
  },
] as const;

// ───────────────────────────── 19 THINGS ─────────────────────────────
// EDIT: isi 19 alasan personal. Sengaja dikosongkan (bukan kalimat generik).
export const nineteenThings: readonly string[] = Array.from({ length: 19 }, (_, i) => `EDIT: alasan #${i + 1}`);

export const thingsComplete = {
  title: "Kamu buka semuanya.",
  message: "EDIT: pesan spesial setelah 19 kartu dibuka semua.",
} as const;

// ───────────────────────────── TOMBOL RAHASIA ─────────────────────────────
export const secretButton = {
  label: "Tombol Permen Kiss", // EDIT: nama tombol sesuai inside joke
  reaction: "EDIT: teks reaksi lucu yang muncul", // EDIT
  stickers: ["kiss", "cat", "star", "icecream"] as const, // urutan stiker yang muncul
} as const;

// ───────────────────────────── ACHIEVEMENTS ─────────────────────────────
export type AchievementId =
  | "unlocked"
  | "first-song-change"
  | "voice-note"
  | "gallery-explorer"
  | "read-every-card"
  | "secret-found"
  | "bouquet-bloomed"
  | "blew-the-candle"
  | "read-the-letter"
  | "opened-the-gift"
  | "konami";
export const achievements: Record<AchievementId, { title: string; detail: string }> = {
  unlocked: { title: "Film Dimulai", detail: "Kamu masuk. Selamat datang." },
  "first-song-change": { title: "DJ Malam Ini", detail: "Ganti lagu pertama." },
  "voice-note": { title: "Dengerin Aku", detail: "Voice note diputar." },
  "gallery-explorer": { title: "Penjelajah Kenangan", detail: "Lihat semua tab galeri." },
  "read-every-card": { title: "Read Every Card", detail: "19/19 kartu dibuka." },
  "secret-found": { title: "Inside Joke Detected", detail: "Kamu nemu tombolnya." },
  "bouquet-bloomed": { title: "Bloom", detail: "Buketnya mekar semua." },
  "blew-the-candle": { title: "Blew The Candle", detail: "Make a wish." },
  "read-the-letter": { title: "Read The Letter", detail: "Sampai titik terakhir." },
  "opened-the-gift": { title: "Opened The Gift", detail: "Sampai jumpa di dunia nyata." },
  konami: { title: "Gamer Girl", detail: "Kode rahasia ketemu." },
};

// ───────────────────────────── KUE, BUKET, SURAT ─────────────────────────────
export const gift = {
  sectionTitle: "Momen Hadiah",
  cakeTitle: "Tiup lilinnya",
  cakeHint: "Klik lilin — atau izinkan mikrofon dan tiup beneran.",
  cakeMicButton: "Coba tiup pakai mic",
  cakeMicDenied: "Mic-nya diblokir, ya. Klik lilinnya aja, sama-sama valid.",
  cakeWishText: "Make a wish. Aku juga bikin satu — tentang kamu.", // EDIT
  bouquetTitle: "Buat kamu",
  bouquetHint: "Tap buketnya",
  bouquetCard: "EDIT: pesan kartu buket (1-2 kalimat pendek).",
} as const;

export const letter = {
  envelopeLabel: "Buka suratnya",
  greeting: "Untuk Wulan,", // EDIT
  // EDIT: isi surat — pisahkan paragraf dengan baris kosong
  body: `EDIT: isi surat, paragraf pertama.

EDIT: paragraf kedua.

EDIT: paragraf ketiga — bagian paling jujur.

EDIT: paragraf penutup.`,
  signoff: "Selamat ulang tahun ke-19.", // EDIT
} as const;

// ───────────────────────────── ENDING ─────────────────────────────
export const ending = {
  title: "Terima kasih sudah jadi kamu.",
  message: "EDIT: pesan penutup hangat, 2-3 kalimat.",
  giftButton: "Buka Hadiah",
  finalTitle: "Satu lagi.",
  finalMessage: "EDIT: pesan penutup final — bisa arahkan ke hadiah fisik ('cek laci meja kamu', dsb).",
  konamiMessage: "EDIT: pesan lucu kalau konami code ketemu.",
} as const;

// Memory box items (easter egg)
export interface MemoryItem {
  id: string;
  kind: "ticket" | "chat" | "note" | "photo";
  title: string;
  detail: string;
}
export const memoryBox: readonly MemoryItem[] = [
  { id: "m1", kind: "ticket", title: "EDIT: tiket", detail: "EDIT: tiket nonton/kereta/apa pun." },
  { id: "m2", kind: "chat", title: "EDIT: screenshot chat", detail: "EDIT: kutipan chat lucu." },
  { id: "m3", kind: "note", title: "EDIT: note kecil", detail: "EDIT: isi note." },
  { id: "m4", kind: "photo", title: "EDIT: foto", detail: "EDIT: keterangan foto." },
] as const;
