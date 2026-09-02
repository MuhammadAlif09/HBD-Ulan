---
name: design-system
description: Pakai skill ini saat mengatur atau menyentuh palet warna, tipografi, dark/light mode toggle, atau CSS variable/design token global di website ulang tahun ini.
---

# Design System

## Palet Warna
- Light mode: Soft Pastel Pink, Soft Lavender, Warm Cream sebagai base
- Dark mode: background gelap lembut (bukan hitam pekat) dengan aksen pink/lavender soft yang sama
- Definisikan semua warna sebagai CSS variable di `:root` dan `[data-theme="dark"]`, jangan hardcode
  hex di banyak tempat

## Tipografi
- Judul: Dancing Script atau Playfair Display (pilih salah satu, konsisten di semua section)
- Body: Poppins
- Load lewat Google Fonts, kasih `font-display: swap` biar gak nge-block render

## Dark/Light Mode
- Toggle disimpan di CSS variable + atribut `data-theme` di `<html>`
- Karena ini proyek yang di-deploy sungguhan (bukan artifact preview), **`localStorage` aman dipakai**
  untuk menyimpan preferensi dark/light user antar kunjungan — beda dari batasan artifact sandbox.
- Transisi antar mode pakai `transition` CSS 0.3–0.4s di warna background/text, jangan instan/kedip

## Motif Dekoratif Personal
Referensi lengkap ada di bagian "Tentang Wulan" di AGENTS.md — dipakai bukan cuma di kue/buket, tapi
sebar tipis-tipis ke elemen dekoratif lain di seluruh situs (icon, divider, hover state, dsb) biar
konsisten:
- Aksen kucing (telinga/siluet/jejak kaki) sesekali, jangan berlebihan
- Y2K rapi: bintang kecil, kilau/shimmer halus, aksen holographic tipis — bukan norak/heavy
- Nuansa es krim/dessert di elemen manis (pastel, bentuk scoop/drip) khususnya di sekitar section kue
- Tombol/elemen interaktif: finish glossy (kayak lip-gloss), bukan matte flat — konsisten sama selera
  makeup-nya yang clean & rapi

## Nuansa Keseluruhan
Cozy, warm, dreamy, sedikit cinematic. Prioritaskan kerasa "dibuat dengan cinta" daripada efek yang
menumpuk — kalau ragu antara nambah dekorasi atau tidak, pilih tidak.
