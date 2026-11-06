# Layout dan responsif

Satu sumber desain untuk tiga ukuran layar. Halaman referensi (Cuti Saya) hanya ada di mobile, jadi **semua aturan tablet dan desktop di halaman ini adalah usulan**. Tinjau dulu sebelum jadi standar.

## Prinsip

1. **Mobile dulu.** Gaya dasar adalah mobile; tablet dan desktop menambah lapisan di atasnya.
2. **Komponen sama, susunan berbeda.** Warna, bentuk, huruf, dan bahasa tidak berubah antar ukuran. Yang berubah hanya susunan dan cara berinteraksi.
3. **Satu komponen, satu perilaku per ukuran.** Tim tidak boleh membuat versi sendiri untuk desktop; pakai varian yang tercatat di README komponen (bagian "Responsif").
4. **Input mengikuti perangkat, bukan lebar.** Gesture geser hanya untuk layar sentuh. Di desktop semua aksi harus bisa lewat klik dan papan ketik.

## Tiga ukuran

| Ukuran | Lebar | Kolom | Margin | Celah |
|---|---|---|---|---|
| Mobile | sampai 599px | 4 | 16px (`ev-sp-16`) | 12px (`ev-sp-12`) |
| Tablet | 600 sampai 1023px | 8 | 24px (`ev-sp-24`) | 16px (`ev-sp-16`) |
| Desktop | 1024px ke atas | 12 | 32px | 24px (`ev-sp-24`) |

Isi berhenti melebar di `ev-w-content` (1120px). Di layar lebih lebar, isi berada di tengah dan sisanya jadi margin. Formulir tidak melebihi `ev-w-form` (560px).

Margin desktop memakai `ev-sp-32` (usulan, token baru).

## Cara komponen berubah

| Pola | Mobile | Tablet | Desktop |
|---|---|---|---|
| Navigasi utama | BottomNav melayang, tombol Menu di tengah | SideNav rel 72px (ikon dan label pendek) | SideNav sidebar 248px |
| Modul lain | MenuOverlay penuh layar, geser untuk pindah modul | Popover dari rel | Popover dari sidebar |
| Sheet (pilih tanggal, alasan) | Sheet naik dari bawah, tutup dengan geser | Dialog di tengah, lebar `ev-w-dialog-m` | Dialog di tengah |
| Halaman Detail | Layar penuh bertumpuk | Panel samping `ev-w-panel` di sebelah daftar | Tampilan terbagi: daftar kiri, detail kanan |
| Daftar pengajuan | Kartu satu kolom, geser untuk aksi | Kartu dua kolom, tombol aksi tampak | DataTable dengan kolom dan urutan |
| Ringkasan saldo | BalanceCard penuh lebar | Dua kartu per baris | StatCard berjajar |
| Toast | Di atas BottomNav, tengah | Pojok kanan bawah | Pojok kanan bawah |
| Formulir | Satu kolom, penuh lebar | Satu kolom, `ev-w-form` | Dua kolom bila bidang berpasangan |

## Aksi yang disembunyikan di gesture

Di mobile, "Ingatkan" dan "Batalkan" ada di balik geser kartu. Di tablet dan desktop **aksi itu wajib tampak sebagai tombol** (atau menu "Aksi" pada baris tabel). Jangan menyembunyikan aksi di balik gesture yang tidak ada di mouse.

## Hover, fokus, ditekan

- **Hover** (hanya pada perangkat yang mendukung `@media (hover:hover)`): permukaan naik satu tingkat, misalnya dari `ev-white` ke `ev-purple-50`. Jangan mengubah ukuran.
- **Fokus papan ketik**: lihat halaman Aksesibilitas.
- **Ditekan**: tombol 3D turun, sama di semua ukuran.

## Z-index

Pakai token `ev-z-*`. Urutannya: header menempel, navigasi, popover, sheet dan dialog, detail, toast, petunjuk gesture. Jangan menulis angka z-index sendiri.

## Yang belum diputuskan

- Apakah tablet memakai rel atau langsung sidebar.
- Lebar dan perilaku panel Detail pada tablet potret.
- Mode gelap tidak termasuk dalam sistem ini.
