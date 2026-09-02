---
name: scroll-cinematics
description: Pakai skill ini saat membangun scroll-triggered reveal, transisi antar section, perubahan background berdasarkan progress scroll, atau teks narasi kecil yang muncul saat scroll — inti dari feel "film pendek" di website ini.
---

# Scroll Cinematics

## Model Interaksi
Sebagian besar konten reveal otomatis saat discroll (bukan klik-untuk-pindah). Klik hanya dipakai
untuk momen ritual (lihat AGENTS.md bagian "Arahan Inti").

## Setup
- Lenis untuk smooth-scroll dasar di seluruh halaman
- GSAP ScrollTrigger untuk reveal per-elemen (fade in, slide in, scale in — pilih sesuai konten,
  jangan semua elemen pakai animasi yang sama persis)

## Transisi Antar Section
- Background berubah pelan mengikuti scroll progress: nuansa terang di awal → makin hangat di
  tengah → lebih gelap dengan efek cahaya lilin pas masuk section surat/cake
- Bukan cuma opacity fade — kombinasikan dengan sedikit zoom/pergeseran posisi (GSAP timeline) biar
  kerasa seperti pindah "scene", bukan pindah "div"

## Narrative Text
- Kalimat pendek (1-2 baris) muncul fade-in di antara section-section besar
- Taruh di komponen reusable (misal satu fungsi `showNarrativeLine(text)`), biar gampang ganti isi
  teksnya belakangan tanpa ubah struktur animasi
- Semua teks narasi ditandai `<!-- EDIT: narasi -->` karena ini placeholder yang perlu diisi manual

## Ambient Sound
- Suara kecil per section (angin di hero, shutter kamera di gallery, amplop dibuka di letter, api
  lilin di cake) — load lazy pakai Howler, volume rendah (~0.15-0.2), JANGAN overlap/bentrok dengan
  music player utama (turunkan volume music player sedikit saat ambient sound sedang main)

## Reduced Motion
- Cek `prefers-reduced-motion` di awal load
- Kalau true: matikan parallax/zoom berat, sisakan fade sederhana saja, tetap tampilkan semua konten
