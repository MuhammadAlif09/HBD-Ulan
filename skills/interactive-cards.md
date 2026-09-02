---
name: interactive-cards
description: Pakai skill ini saat membangun "19 Things I Love About You" flip cards, tombol rahasia/inside-joke, atau achievement toast kecil.
---

# Interactive Cards

## 19 Things I Love About You
- 19 kartu dengan efek flip 3D (CSS `transform` + GSAP untuk easing), tiap kartu tap/klik untuk
  dibuka satu-satu
- Isi tiap kartu = 1 alasan personal (placeholder, ditandai `EDIT:` — jangan diisi kalimat generic
  seperti "kamu cantik", biarkan kosong jelas untuk diisi manual)
- Progress indicator kecil: "X/19 dibuka"
- Setelah SEMUA kartu dibuka → trigger pesan spesial + confetti lembut, HANYA sekali (jangan
  berulang tiap kartu terakhir dibuka lagi kalau di-refresh dalam sesi yang sama)

## Tombol Rahasia / Inside Joke
- Nama tombol placeholder (misal "Tombol Permen Kiss"), ditandai `EDIT:` untuk diganti sesuai inside
  joke yang sebenarnya
- Saat diklik: animasi stiker/efek lucu muncul + `navigator.vibrate(...)` kalau device mendukung
  (cek dulu `if ('vibrate' in navigator)` sebelum dipanggil)

## Achievement Toast
- Toast kecil non-blocking muncul di pojok layar tiap milestone tercapai (contoh: "Read Every
  Letter", "Blew The Candle")
- Auto-hilang setelah ~3 detik, tidak mengganggu scroll/flow utama
- Jangan pakai modal/popup yang butuh ditutup manual — ini elemen dekoratif kecil, bukan interupsi
