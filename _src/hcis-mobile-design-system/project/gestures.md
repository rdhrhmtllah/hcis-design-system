# Gesture

Gesture adalah jalan pintas. Setiap aksi harus tetap punya tombol yang terlihat. Mesin gesture menyala lewat atribut `data-g` pada elemen.

## Aturan umum

- Sumbu dikunci setelah gerakan 6px: gerak mendatar dan menurun tidak bersaing.
- Getaran ringan 8 sampai 10 ms saat gesture berkomitmen.
- Gesture diabaikan di atas input dan area gulir mendatar.
- Gesture tutup tidak aktif saat form sedang memuat atau ada sheet terbuka.
- Jari melepas cepat (flick) juga berkomitmen, walau jaraknya belum penuh.

## Tabel

| Gesture | Di mana | Komit saat | Umpan balik |
| --- | --- | --- | --- |
| Geser bawah | halaman penuh | lebih dari 76px, atau flick (kecepatan > 0,6 dan jarak > 30px) | halaman mengecil hingga 3%, lalu animasi tutup normal |
| Tarik sheet | sheet bawah | lebih dari 110px, atau flick | sheet mengikuti jari |
| Geser bawah | menu | sama dengan halaman | sama dengan halaman |
| Geser atas | tombol Menu | lebih dari 48px, atau flick ke atas | tombol naik hingga 92px dan membesar, lalu menu terbuka |
| Geser kiri atau kanan | di dalam menu | lebih dari 60px, atau flick dan jarak > 28px | pindah modul ESS, TPM, LMS, DMS, VMS |
| Geser kanan | baris notifikasi | 80px atau lebih | tandai sudah dibaca |
| Geser kiri | baris notifikasi | 80px atau lebih | hapus, toast dengan Urungkan |
| Geser kiri | kartu pengajuan | lebih dari 60px | baki aksi Ingatkan dan Batalkan terbuka |
| Geser | kalender | lebih dari 50px | ganti bulan, hanya jika ada bulan tujuan |
| Geser | tab segmen | lebih dari 60px | ganti tab, hanya jika ada tab tujuan |
| Tarik untuk muat ulang | daftar | tarikan x 0,55, ambang 60px, maksimum 96px | indikator muncul, lalu skeleton |
| Geser | toast | lebih dari 70px ke samping atau 36px ke bawah | toast ikut bergeser lalu hilang |

## Petunjuk gerak (mograf tipis)

Gesture yang belum pernah dipakai diingatkan dengan gerak kecil: baris pengajuan mengintip (maksimal 3 kali), tombol Menu menampilkan panah (maksimal 3 kali), halaman penuh menampilkan panah turun (sekali), menu menampilkan panah samping (sekali). Petunjuk berhenti permanen begitu gesture-nya dipakai dan tidak pernah muncul bersamaan.

## Yang belum

Angka di atas diuji lewat emulasi, belum di perangkat sungguhan. Pindah modul dan ganti bulan baru punya jalur tombol lewat tab dan panah, belum untuk semuanya.
