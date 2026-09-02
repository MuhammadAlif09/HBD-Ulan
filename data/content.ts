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
// 19 alasan personal untuk Wulan (bisa disesuaikan kapan saja)
export const nineteenThings: readonly string[] = [
  "Senyum manismu yang selalu sukses bikin hari paling capek langsung kerasa adem dan tenang.",
  "Waktu kamu masak di dapur—walau cuma kalau lagi nggak males, tapi rasanya selalu juara!",
  "Mode ngambek gemasmu; yang padahal cuma butuh disenyumin bentar, kamu langsung luluh dan ketawa lagi.",
  "Gaya makeup 'clean girl' kamu yang selalu rapi, aesthetic, dan anggun banget dilihatnya.",
  "Reaksi heboh dan matamu yang berbinar-binar tiap kali liat kucing lucu di jalan.",
  "Kecintaanmu sama yang manis-manis, apalagi ekspresi bahagianya pas makan es krim favorit.",
  "Selera gayamu yang aesthetic dan keren—outfit kamu selalu matching dengan sentuhan Y2K yang manis.",
  "Tawa lepasmu yang nular ke semua orang, apalagi kalau ketawa sampai matanya ikut menyipit imut.",
  "Perhatian-perhatian kecilmu yang sering diam-diam bikin aku terharu dan merasa begitu disayang.",
  "Cara kamu cerita hal apa pun dengan ekspresi wajah yang hidup, seru, dan penuh semangat.",
  "Suara manjamu waktu lagi pengen ditemenin ngobrol atau pas lagi butuh senderan ternyaman.",
  "Kerja keras dan dedikasimu waktu ngerjain sesuatu—bangga banget pas kamu dapet Best Volunteer!",
  "Pipi imutmu waktu lagi kenyang makan atau pas lagi manyun cemberut lucu.",
  "Caramu selalu bisa mendengarkan dan mengerti aku, bikin aku merasa diterima apa adanya.",
  "Kebiasaan-kebiasaan random kamu yang selalu sukses bikin aku tersenyum sendiri tiap kali inget.",
  "Momen-momen sederhana berdua—dari jalan santai sampai cuma duduk bareng—yang selalu terasa istimewa.",
  "Hati kamu yang lembut, tulus, dan selalu peduli sama orang-orang di sekitarmu.",
  "Kesabaranmu buat tumbuh bareng aku, jadi tempat pulang paling damai dan nyaman di dunia.",
  "Fakta bahwa dari miliaran orang di bumi, takdir membawaku untuk menemukan dan mencintai kamu, Wulan.",
] as const;

export const thingsComplete = {
  title: "19 Alasan Lengkap Terbuka! 💖",
  message:
    "Dan 19 ini baru permulaan. Masih ada ribuan alasan lain yang bikin aku bersyukur punya kamu di hidupku. Terima kasih sudah lahir dan tumbuh jadi Wulan yang begitu istimewa.",
} as const;

// ───────────────────────────── TOMBOL RAHASIA ─────────────────────────────
export const secretButton = {
  label: "Tombol Permen Kiss 🍬", // EDIT: nama tombol sesuai inside joke
  reaction: "Cie nemu tombol rahasia! Satu permen kiss manis khusus buat Wulan tersayang 😽✨", // EDIT
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
  "bouquet-bloomed": { title: "Bloom", detail: "3 Bunga cerbera mekar sempurna." },
  "blew-the-candle": { title: "Blew The Candle", detail: "Make a wish." },
  "read-the-letter": { title: "Read The Letter", detail: "Sampai titik terakhir." },
  "opened-the-gift": { title: "Opened The Gift", detail: "Sampai jumpa di dunia nyata." },
  konami: { title: "Gamer Girl", detail: "Kode rahasia ketemu." },
};

// ───────────────────────────── KUE, BUKET, SURAT ─────────────────────────────
export const gift = {
  sectionTitle: "Momen Hadiah",
  cakeTitle: "Tiup lilinnya",
  cakeHint: "Klik lilin angka 19 — atau izinkan mikrofon dan tiup beneran.",
  cakeMicButton: "Coba tiup pakai mic",
  cakeMicDenied: "Mic-nya diblokir, ya. Klik lilinnya aja, sama-sama valid.",
  cakeWishText: "Make a wish... Semoga semua impianmu di umur 19 ini terkabul satu per satu.", // EDIT
  bouquetTitle: "3 Tangkai Bunga Cerbera",
  bouquetHint: "Tap buket untuk mekarkan bunganya",
  bouquetCard: "Untuk Wulan tercinta: Tiga cerbera ini melambangkan ketulusan, keceriaan, dan rasa sayangku yang mekar setiap hari untukmu.",
} as const;

export const letter = {
  envelopeLabel: "Buka suratnya",
  greeting: "Untuk Wulan tersayang,", // EDIT
  // EDIT: isi surat — pisahkan paragraf dengan baris kosong
  body: `Selamat ulang tahun yang ke-19, Wulan.

Nggak terasa waktu berjalan cepat banget, dan hari ini kamu resmi menginjak usia 19 tahun. Dari sekian banyak babak yang sudah kamu lalui, aku selalu bersyukur semesta mempertemukan kita dan memberiku kesempatan untuk menemani langkahmu.

Terima kasih sudah selalu jadi perempuan yang luar biasa—yang tawanya selalu menenangkan, yang keberadaannya selalu membawa kehangatan, dan yang kesabarannya selalu jadi rumah paling nyaman buat aku pulang.

Di umur yang baru ini, aku berdoa semoga kamu selalu dikelilingi kebahagiaan, dijauhkan dari hal-hal yang bikin sedih, dan setiap impian serta harapan yang kamu simpan dalam hati perlahan terwujud. Jangan pernah ragu untuk melangkah, karena apa pun yang terjadi nanti, aku akan selalu ada di sini, bangga dan mendukungmu sepenuh hati.`,
  signoff: "Dengan segenap rasa sayang, selalu untukmu.", // EDIT
} as const;

// ───────────────────────────── ENDING ─────────────────────────────
export const ending = {
  title: "Terima kasih sudah jadi kamu.",
  message: "Sembilan belas tahun perjalananmu, dan aku berharap bisa terus menemani di tahun-tahun berikutnya. Kamu adalah hadiah terindah di hidupku.",
  giftButton: "Buka Kotak Hadiah",
  finalTitle: "Kado Spesial Buat Wulan 🎁",
  finalMessage: "Voucher kencan spesial ulang tahun ke-19 ini resmi aktif! Cek juga kado fisik yang udah kusiapkan spesial buat kamu yaa!",
  konamiMessage: "Wah kamu nemu easter egg tersembunyi! Kamu dapet gelar Gamer Girl paling imut sedunia 🎮💖",
} as const;

// Memory box items (easter egg)
export interface MemoryItem {
  id: string;
  kind: "ticket" | "chat" | "note" | "photo";
  title: string;
  date?: string;
  detail: string;
  badge?: string;
}
export const memoryBox: readonly MemoryItem[] = [
  {
    id: "m1",
    kind: "ticket",
    title: "Tiket Nonton & Jalan Berdua",
    date: "Awal Cerita",
    badge: "Cinema Date",
    detail: "Tiket bioskop pertama yang masih kusimpan rapi di dompet. Masih ingat betul betapa deg-degannya duduk di samping kamu seharian.",
  },
  {
    id: "m2",
    kind: "chat",
    title: "DM Pertama di Instagram",
    date: "Momen Awal",
    badge: "First DM",
    detail: "'Halo Wulan...' Percakapan singkat yang awalnya malu-malu dan kaku, tapi siapa sangka sekarang jadi obrolan yang nggak pernah ada habisnya tiap hari.",
  },
  {
    id: "m3",
    kind: "chat",
    title: "Chat Ngambek Minta Es Krim",
    date: "Suatu Sore",
    badge: "Ice Cream Time",
    detail: "'Pokoknya harus es krim sekarang juga, gamau tau! :p' Screenshot obrolan gemas kamu yang selalu bikin aku senyum-senyum sendiri tiap kali dibaca ulang.",
  },
  {
    id: "m4",
    kind: "note",
    title: "Sticky Note Semangat",
    date: "Catatan Kecil",
    badge: "Sweet Note",
    detail: "Kertas note kecil tulisan tangan: 'Semangat yaa hari ini! Jangan lupa makan & minum air yang cukup ❤️' yang selalu jadi booster energiku.",
  },
  {
    id: "m5",
    kind: "photo",
    title: "Foto Candid Pas Ketawa Lepas",
    date: "Kenangan Manis",
    badge: "Precious Smile",
    detail: "Momen saat kamu ketawa lepas tanpa sadar kamera pas kita lagi jajan. Matamu yang menyipit imut dan senyum tulus itu jadi foto favoritku sepanjang masa.",
  },
  {
    id: "m6",
    kind: "ticket",
    title: "Momen Terbaik: Best Volunteer Kamu",
    date: "Hari Bangga",
    badge: "Proud of You",
    detail: "Waktu namamu dipanggil maju ke depan dan dapet penghargaan Best Volunteer. Rasa bangga dan kagumku ke kamu bener-bener meluap hari itu.",
  },
] as const;
