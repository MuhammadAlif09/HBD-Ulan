---
name: cake-letter-ending
description: Pakai skill ini saat membangun kue ulang tahun virtual, buket bunga virtual, tiup lilin, surat cinta interaktif, ending section, atau easter egg penutup.
---

# Cake, Bouquet, Letter & Ending

## Gaya Visual Kedua Objek Ini (Kue & Buket)
Ambil dari referensi "Tentang Wulan" di AGENTS.md. Rangkuman implementasi:
- **Style ilustrasi: flat/kawaii SVG**, bukan usaha bikin realistis — lebih gampang dieksekusi rapi
  dan lebih cocok sama vibe imut/menggemaskan-nya dia dibanding CSS 3D yang berusaha fotorealistik
- **Palet**: pastel Y2K — baby pink, lilac/lavender, butter yellow, mint, aksen holographic/shimmer
  (gradient + highlight tipis, bukan norak/heavy)
- **Motif berulang**: telinga/siluet kucing kecil, bintang & kilau ala Y2K, elemen es krim/dessert
  (drip icing, scoop, sprinkles), pita/bow — sebar motif ini di kue MAUPUN buket biar dua-duanya
  kerasa satu set, bukan dua elemen lepas
- Tetap jaga biar "rapi", bukan ramai — sesuai selera makeup dia yang clean girl, bukan alay

## Virtual Birthday Cake
- Ilustrasi kue kawaii (SVG/flat), bukan CSS 3D fotorealistik
- Topping terinspirasi es krim: swirl soft-serve di atas, efek drip icing meleleh di sisi kue, warna
  scoop pastel (strawberry pink/vanilla cream/mint), sprinkle kecil dalam warna Y2K
- Cat-ear cake topper kecil atau siluet kucing mini di atas kue (nod ke suka kucingnya)
- Lilin bentuk bintang/hati dengan tekstur berkilau (shimmer), bukan lilin polos
- Aksen pita/bow kecil di dasar kue biar nyambung visual sama buket bunga
- Klik lilin → api padam + efek asap (smoke) + confetti (pakai warna palet di atas: baby pink,
  lilac, butter yellow, silver holographic — bukan warna confetti default random)
- Opsional: tiup beneran pakai microphone (`getUserMedia` + `AnalyserNode` untuk deteksi volume
  suara tiupan)
- **WAJIB ada fallback tombol klik biasa** kalau permission mic ditolak atau gagal diakses — browser
  in-app WhatsApp/Instagram sering block akses microphone, jadi jangan bikin fitur ini jadi
  satu-satunya cara lanjut

## Virtual Flower Bouquet (Buket Bunga)
- Ilustrasi buket bunga kawaii (SVG/flat), dibungkus kertas ala Y2K (glossy cellophane look) dan
  diikat pita/bow — palet sama kayak kue (pastel + aksen holographic tipis)
- Isi buket: campuran bunga pastel (mawar soft pink, baby's breath/gypsophila, tangkai lavender) plus
  1-2 aksen whimsical (daisy kecil atau bunga kering) — jangan realistis penuh, tetap gaya flat/kawaii
- Aksen kecil kucing di pita (charm kucing mini) sebagai detail personal, opsional tapi disarankan
- **Interaksi**: klik/tap buket → kertas pembungkus "terkupas" (animasi peel/unfold pakai GSAP) → pita
  terurai → bunga-bunga "mekar" satu per satu dengan stagger animation (scale + rotate ringan per
  bunga, jangan muncul bareng semua)
- Setelah semua bunga mekar → muncul kartu kecil terselip di buket berisi pesan singkat (placeholder,
  ditandai `EDIT: pesan kartu buket`)
- **Penempatan di alur**: taruh berdampingan dengan momen kue (sebelum atau sesudah tiup lilin, sama-
  sama bagian dari "momen hadiah") — bukan section terpisah jauh, biar dua-duanya kerasa satu momen
  pemberian hadiah

## Interactive Letter
- Amplop muncul setelah lilin padam
- Klik amplop → surat terbuka dengan animasi kertas (unfold/slide)
- Teks surat pakai efek typewriter (ketik satu-satu), BUKAN muncul langsung full text
- Isi surat = placeholder panjang, ditandai `EDIT: isi surat`

## Ending Section
- Pesan penutup hangat (placeholder, ditandai `EDIT:`)
- Foto-foto (dari ketiga folder gallery) berputar pelan di background
- Musik fade out perlahan, bukan berhenti mendadak
- Tombol "Buka Hadiah" muncul paling akhir → klik baru muncul pesan penutup final (placeholder,
  bisa diarahkan ke hadiah fisik)

## Easter Egg (opsional, kerjakan kalau milestone lain sudah selesai & masih ada waktu)
- Constellation kecil membentuk simbol hati di ending
- Hidden konami-code (↑↑↓↓←→←→BA) → muncul pesan lucu placeholder
- "Memory Box" — diklik, keluar item-item kecil (tiket, screenshot chat, note) satu per satu dengan
  animasi
