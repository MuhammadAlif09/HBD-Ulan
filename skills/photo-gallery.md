---
name: photo-gallery
description: Pakai skill ini saat membangun section galeri foto — tab kategori, styling polaroid, perilaku swipe/zoom, dan loading gambar.
---

# Photo Gallery

## Struktur
3 tab kategori, masing-masing baca dari folder asset-nya sendiri:
- Little Wulan → `assets/photos/little-wulan/`
- The Queen → `assets/photos/the-queen/`
- Us → `assets/photos/us/`

## Library
Swiper.js untuk carousel per tab.

## Gaya Visual — Polaroid
- Foto sedikit miring, rotasi random ringan antara -2deg sampai 2deg per foto (bukan seragam, biar
  kerasa natural)
- Border putih tebal + shadow lembut
- Caption tanggal di bawah foto (placeholder, ditandai `EDIT:`)

## Perilaku
- Mobile: swipe antar foto + pinch-to-zoom aktif
- Desktop: hover = sedikit naik + glow lembut, caption muncul
- Semua gambar lazy load (`loading="lazy"`), pakai Intersection Observer kalau mau transisi masuk
  yang lebih halus daripada default browser

## Catatan
Jumlah & nama file foto belum fix (user akan input sendiri) — jangan hardcode jumlah foto, baca
folder secara dinamis kalau memungkinkan, atau sediakan array konfigurasi di JS yang gampang
ditambah/dikurangi manual.
