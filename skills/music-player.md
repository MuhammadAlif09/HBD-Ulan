---
name: music-player
description: Pakai skill ini saat membangun atau mengedit audio player — ganti lagu, kontrol play/pause, progress bar, visualizer, dan pemutaran voice note.
---

# Music Player

## Engine
Howler.js untuk semua pemutaran audio (music player utama, ambient sound, voice note).

## Daftar Lagu (default: ILYSB)
1. ILYSB — `assets/audio/ilysb.mp3` (default)
2. Thick and Thin — `assets/audio/thick-and-thin.mp3`
3. If This Is the Last Time — `assets/audio/if-this-is-the-last-time.mp3`
4. Malibu Nights — `assets/audio/malibu-nights.mp3`
5. Super Far — `assets/audio/super-far.mp3`
6. XXL — `assets/audio/xxl.mp3`

## PENTING — Format File
Source lagu asli ada dalam format `.flac` (lossless, ukuran besar, ~20-40MB per file). **JANGAN load
`.flac` langsung di web.** Convert ke `.mp3` (192-256kbps) dulu sebelum dipakai — hasilnya jauh lebih
kecil dan tetap terdengar bagus, jadi loading di HP/data seluler nggak berat. Lihat
`skills/deployment-assets.md` untuk detail konversi.

## Perilaku Player
- Auto-loop per track
- Volume default 0.45
- Ganti track = fade out track lama → fade in track baru (jangan cut mendadak)
- UI: cover art (placeholder), judul + artist, tombol play/pause, progress bar, volume control,
  visualizer bar sederhana (boleh pakai Web Audio API `AnalyserNode` kalau mau responsif ke audio
  asli, atau animasi CSS looping kalau mau lebih ringan)
- Pemilihan track lewat chip/dropdown horizontal, bukan dropdown native browser biar konsisten sama
  desain

## Voice Note
- Tombol terpisah dari music player utama, play `assets/audio/voice-note.mp3`
- Saat voice note main, turunkan volume music player otomatis (jangan pause total, cukup duck volume)
