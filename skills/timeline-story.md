---
name: timeline-story
description: Pakai skill ini saat membangun timeline "our story", penghitung waktu hubungan realtime, atau floating quotes yang muncul saat scroll.
---

# Timeline & Story

## Timeline "Our Story"
- Layout vertikal, tiap titik reveal pakai ScrollTrigger saat masuk viewport
- Tiap titik berisi: tanggal, lokasi, judul momen, deskripsi singkat, foto kecil (opsional)
- Slot placeholder wajib (isi manual nanti, tandai `EDIT:`):
  1. Pertama kali papasan di gedung kampus
  2. DM Instagram pertama
  3. Momen pegangan tangan pertama
  4. Resmi jadian
  5. Momen dapat Best Volunteer
  - Sediakan 2-3 slot kosong tambahan untuk momen lain yang mau ditambah manual

## Time Counter (Realtime)
- Format: "Kita udah kenal selama X hari Y jam Z menit"
- Hitung dari satu tanggal acuan (placeholder jelas, ditandai `EDIT: tanggal jadian`)
- Update tiap detik/menit pakai `setInterval`, jangan reload halaman

## Floating Quotes
- Array kalimat pendek (placeholder, ditandai `EDIT:`), muncul random pas scroll melewati section
  tertentu
- Frekuensi dibatasi — maksimal 1 quote per section, jangan spam biar tetap terasa spesial tiap
  muncul
