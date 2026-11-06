# Pola visual

Pola ini diambil langsung dari halaman Cuti Saya. Komponen baru (termasuk tablet dan desktop) **harus memakai pola ini**; jangan merancang bentuk sendiri.

## Bentuk
- **Ubin ikon adalah persegi bersudut `ev-r-md`**, bukan lingkaran. Ukuran 30, 38, 40, atau 42px. Ubin menu dan beranda punya **tepi bawah 3px** satu tingkat lebih gelap dari warna ubinnya (efek tebal). Ubin di dalam daftar memakai garis 1px selaras warnanya.
- **Kartu putih** `ev-r-2xl` dengan `ev-sh-card`; baris di dalamnya `ev-r-xl` dengan `ev-sh-row`; kolom isian dan kartu pilihan `ev-r-lg`.
- **Lingkaran penuh hanya untuk** chip dan pil ringkasan, titik status, dan penunjuk halaman. Tombol ikon bukan lingkaran.
- **Lencana angka dan penanda terpilih** berbentuk persegi kecil `ev-r-md`.

## Kepala halaman
Gradasi `ev-purple-900` ke `ev-purple-700` (180 derajat), sudut bawah 26px, dua cincin tipis (garis putih 8%) di kanan atas dan satu kilau emas empat sudut. Tombol kembali: area ketuk 44px, ubin 34px `ev-r-md` kaca (putih 16%, garis putih 22%). Judul Bricolage 22/700 putih, keterangan 12/500 `ev-purple-150`. Aksi di kanan: kapsul emas `ev-gold` dengan teks `ev-gold-ink` 12/600.

## Kartu bernomor
Kartu `ev-r-2xl`, padding 14px. Kepala: lencana nomor 24px `ev-r-md` `ev-purple-600` teks putih 12/600, judul 15/700.

## Kolom isian
Tinggi bebas, padding 10x12, `ev-r-lg`, garis 1,5px `ev-purple-150`, latar `ev-field-bg`, teks 14/500. Zona unggah: garis putus-putus 2px `ev-dash`, tinggi 60px, label `ev-purple-800` 14/700. Lampiran terpasang: `ev-ok-bg` dengan garis `ev-ok-edge`.

## Kartu pilihan
`ev-r-lg`, garis 2px: `ev-purple-150` bila tidak dipilih, `ev-purple-600` dan latar `ev-purple-50` bila dipilih, dengan lencana centang 20px di pojok kanan atas.

## Kalender
Hari terpilih: lingkaran `ev-purple-600` angka putih 800. Rentang: pita `ev-purple-200` (setengah pita di ujung). Hari ini: cincin 1,5px `ev-purple-400`. Hari lewat dan akhir pekan: `ev-ink-3`. Hari libur: titik `ev-no-ink` di bawah angka.

## Segmen dan chip
Segmen: wadah `ev-purple-100` `ev-r-2xl` tinggi 46px padding 3px, penanda geser `ev-purple-600` `ev-r-xl`, label 14/700. Chip filter pada latar ungu tua: kaca putih 12%, aktif `ev-gold`. Pada latar terang: putih bergaris `ev-purple-150`, aktif `ev-purple-600`.

## Baris notifikasi dan daftar
Baris putih `ev-r-xl` `ev-sh-row` tinggi 72px; ubin 40px `ev-r-md` tinted dengan garis 1px; judul 14/700 (belum dibaca) atau 14/600, keterangan 12/500 dengan waktu 700 `ev-purple-accent`. Belum dibaca: garis ungu 3px di kiri dan titik `ev-purple-600`. Judul kelompok: 12/600 huruf kapital `ev-purple-accent`.

## Kartu lipat
Kartu `ev-r-2xl`, kepala 72px dengan ubin 42px `ev-r-lg`, judul 15/700, kapsul emas `ev-r-md` di kanan, panah 20px berputar. Isi dengan butir persegi 7px `ev-purple-400` dan kotak `ev-tint` bergaris `ev-purple-100`.

## Skala huruf yang dipakai halaman
11, 12, 13, 14, 15, 16, 18, 22, 26, 32, 56. Tambahan 13 (isi kecil, label segmen) dan 15 (judul kartu) sudah ada di token tipografi sebagai `body-sm` dan `title-s`.
