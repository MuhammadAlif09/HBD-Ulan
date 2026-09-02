# AGENTS.md — Website Ulang Tahun Wulan

File ini dibaca duluan oleh agent apa pun yang kerja di workspace ini (Antigravity, atau tool lain
yang baca AGENTS.md). Isinya konteks & aturan standing yang berlaku ke SELURUH proyek, jangan
diulang-ulang tiap kasih prompt baru.

## Ringkasan Proyek
Website ulang tahun interaktif untuk Wulan (ulang tahun ke-19). Target rilis: 20 Agustus 2026.
Ini BUKAN landing page biasa — target pengalamannya adalah cinematic interactive short film
(±8-12 menit kalau dijalani penuh), dibangun bertahap, dan di-deploy lewat GitHub → Google AI Studio
(clone repo dari AI Studio app, publish dari sana).

## Tentang Wulan (referensi karakter — dipakai semua skill buat konsistensi)
Skill file mana pun yang nyentuh ornamen visual, warna, copy/tone, atau pilihan dekorasi WAJIB balik
ke referensi ini biar seluruh situs kerasa personal & konsisten, bukan generik.
- Manis, lucu, imut, menggemaskan, cantik
- Suka masak (kalau nggak males & ada bahan)
- Gampang ngambek, tapi disenyumin bentar biasanya udah baikan lagi — kecuali ngambeknya emang serius
  karena sesuatu yang bikin dia marah beneran
- Suka skincare & makeup — gaya makeup-nya rapi/"clean girl", bukan alay/heavy/norak
- Suka kucing
- Suka aku (yang bikin website ini)
- Suka yang manis-manis, terutama es krim
- Suka estetika Y2K
- (Masih ada lagi ciri-ciri lain yang belum kecatet — kalau ada info baru, tambahin di sini biar
  semua skill ke-update juga)

**Implikasi ke desain:** motif dekoratif situs sebaiknya ambil dari kombinasi ini — aksen kucing
(telinga kucing, jejak kaki, siluet), estetika Y2K yang rapi & glossy (bintang, kilau/shimmer,
holographic accent, pita) bukan norak, warna & bentuk terinspirasi es krim/dessert (pastel, drip
icing, scoop), dan overall tone "clean girly" — glossy & rapi kayak makeup favoritnya, bukan
ramai/berantakan. Detail lengkap ornamen ada di skill file masing-masing bagian.

## Arahan Inti (berlaku ke semua bagian, wajib dipegang)
Bangun pengalaman yang terasa seperti film pendek interaktif, bukan kumpulan section yang cuma
discroll lewat. Setiap transisi punya tujuan, setiap animasi mendukung cerita, ritme dibuat perlahan
supaya emosi terus naik sampai puncaknya di adegan tiup lilin + baca surat, lalu ditutup dengan
ending yang hangat.

**Model interaksi (default):** konten reveal otomatis saat discroll — timeline, narasi kecil,
gallery masuk viewport, kartu "19 things" jadi aktif. **Klik hanya dipakai untuk momen ritual** yang
butuh niat aktif dari user: unlock password, ganti lagu, tiup lilin, buka amplop surat, tombol
rahasia inside-joke, buka "gift" di ending.

## Tech Stack (advanced — keputusan owner, menggantikan versi vanilla)
- **Next.js 16 (App Router)** dengan `output: "export"` → hasil build tetap static site, bisa
  di-deploy ke mana pun (GitHub → Google AI Studio / Vercel / hosting statis apa pun)
- **TypeScript strict** — semua komponen, hooks, store, dan data config bertipe
- **Tailwind CSS v4** — design token didefinisikan di `app/globals.css` lewat `@theme` + CSS variables
  (`:root` & `[data-theme="dark"]`), bukan hardcode hex
- **GSAP + ScrollTrigger** — animasi & scroll-triggered reveal (dibungkus hooks `useGsap`, `useReveal`)
- **Lenis** — smooth scroll (provider `SmoothScroll`)
- **Howler.js** — music player, ambient sound, voice note (di-wrap `lib/audio/engine.ts`)
- **Swiper** (React) — gallery gesture-friendly di HP
- **canvas-confetti** — dipakai secukupnya, jangan spam/numpuk (helper `lib/confetti.ts`)
- **Zustand** — global state: theme, audio, unlock, progress kartu, achievements
- Mobile-first, fully responsive, respect `prefers-reduced-motion`

## Struktur Folder

app/                 layout.tsx, page.tsx, globals.css
components/
  layout/            SmoothScroll, ThemeToggle, AchievementToaster, Preloader/Unlock
  sections/          Hero, Timeline, Gallery, NineteenThings, GiftMoment (Cake+Bouquet), Letter, Ending
  audio/             MusicPlayer, VoiceNote, MoodSelector
  cinematics/        NarrativeLine, SceneBackground, FloatingQuote
  illustrations/     Cake.tsx, Bouquet.tsx (SVG kawaii sebagai komponen React)
hooks/               useGsap, useReveal, useReducedMotion, useTimeCounter, useKonami
lib/                 store.ts (zustand), audio/engine.ts, confetti.ts, cn.ts
data/                content.ts — SEMUA placeholder (teks, tanggal, lagu, foto, 19 things) di satu tempat
public/assets/photos/little-wulan/
public/assets/photos/the-queen/
public/assets/photos/us/
public/assets/audio/ (file .mp3 hasil convert dari FLAC — lihat skills/deployment-assets.md)
skills/              file instruksi teknis modular, lihat tabel di bawah

Ini proyek multi-file, BUKAN satu file raksasa — lebih gampang di-review lewat Git dan di-maintain.
Semua asset publik dirujuk dari `/assets/...` (folder `public/` di Next.js).

## Skills yang Tersedia
Baca folder `skills/` — tiap file adalah instruksi teknis untuk satu bagian spesifik. Pakai skill
yang relevan secara otomatis sesuai task yang lagi dikerjakan, jangan tunggu diminta detail manual.

| Skill file | Dipakai untuk |
|---|---|
| skills/design-system.md | palet warna, font, dark/light mode, CSS variables |
| skills/scroll-cinematics.md | GSAP+ScrollTrigger+Lenis, transisi antar section, narasi scroll |
| skills/music-player.md | Howler.js music player, 6 lagu, voice note |
| skills/photo-gallery.md | Swiper.js gallery 3 tab, gaya polaroid |
| skills/timeline-story.md | timeline "our story", time counter, floating quotes |
| skills/interactive-cards.md | 19 things flip cards, tombol rahasia/inside-joke |
| skills/cake-letter-ending.md | kue ulang tahun, buket bunga, tiup lilin, surat interaktif, ending + easter egg |
| skills/deployment-assets.md | struktur asset, konversi audio, catatan deploy |

## Milestone Build Order
Full fitur tetap jadi target akhir, tapi kerjain berurutan biar tiap bagian bisa dites sebelum
lanjut — bukan generate 25 fitur sekaligus tanpa struktur.

1. Fondasi — design token, struktur folder, dark/light toggle
2. Unlock screen, hero, music player, voice note, mood selector
3. Scroll cinematics (transisi, narasi) + timeline + gallery
4. 19 things cards + secret button + achievement toast kecil
5. Virtual cake + virtual buket bunga + interactive letter + ending + easter egg
6. Polish & deploy check (performa HP, reduced motion, keyboard focus, test asli sebelum publish)

## Aturan Umum
- Semua placeholder (teks, tanggal, password, nama file foto/lagu) dikumpulkan di `data/content.ts`
  dan ditandai jelas pakai komentar `// EDIT: ...` biar gampang dicari & diganti manual nanti.
  Komponen JANGAN hardcode konten personal — selalu import dari `data/content.ts`.
- Jangan generate kode terpotong atau disingkat — proyek ini dikerjakan di agentic IDE tanpa batas
  output, jadi tulis lengkap.
- Confetti/animasi dipakai terorkestrasi, bukan ditumpuk semua sekaligus di satu momen.
- File audio yang dipakai di web WAJIB .mp3, bukan .flac (lihat skills/deployment-assets.md).
