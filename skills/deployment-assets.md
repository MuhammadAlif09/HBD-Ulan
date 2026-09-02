---
name: deployment-assets
description: Pakai skill ini saat menyiapkan folder asset, konversi/kompresi audio-gambar, atau saat membahas langkah deploy (GitHub → Google AI Studio).
---

# Deployment & Assets

## Struktur Asset

assets/photos/little-wulan/
assets/photos/the-queen/
assets/photos/us/
assets/audio/ (semua file .mp3, lihat aturan konversi di bawah)
assets/audio/voice-note.mp3


## Audio — Wajib Convert FLAC → MP3
Source lagu ada dalam `.flac` (lossless, besar). Sebelum commit ke repo:
1. Convert tiap file ke `.mp3` bitrate 192-256kbps (pakai FFmpeg, atau tool convert audio apa pun
   yang tersedia)
2. Simpan hasil convert di `assets/audio/` dengan nama file sesuai daftar di
   `skills/music-player.md`
3. File `.flac` asli TIDAK perlu ikut masuk repo — cukup simpan sebagai master file di tempat lain

Alasan: FLAC ~20-40MB/file, mp3 ~3-5MB/file. Untuk 6 lagu + voice note, selisihnya signifikan buat
kecepatan loading di data seluler.

## Foto
- Compress sebelum commit kalau ukuran file besar (format JPEG/WebP lebih ringan dibanding PNG untuk
  foto biasa)
- Jumlah foto per folder bebas, tidak perlu jumlah tetap (lihat `skills/photo-gallery.md`)

## Deploy Flow
1. Push project ke GitHub (repo bisa private)
2. Buka Google AI Studio app → clone/import dari repo GitHub tersebut
3. Publish langsung dari AI Studio

## Catatan Microphone
Fitur tiup lilin via microphone butuh HTTPS — deployment dari Google AI Studio sudah otomatis HTTPS,
jadi aman. Tetap sediakan fallback klik manual (lihat `skills/cake-letter-ending.md`) karena in-app
browser WhatsApp/Instagram kadang tetap block permission mic meskipun HTTPS.

## Sebelum Publish — Checklist
- [ ] Test di HP asli (bukan cuma resize browser desktop)
- [ ] Dark mode & light mode dua-duanya dicek
- [ ] Semua 6 lagu + voice note kebuka & bisa diputar
- [ ] Animasi tidak lag di HP mid-range
- [ ] `prefers-reduced-motion` dites (matikan animasi di setting HP, cek fallback-nya jalan)
