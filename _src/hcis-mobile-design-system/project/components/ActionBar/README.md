Bilah aksi yang menempel di dasar layar detail, formulir, dan hasil. Satu komponen dengan tiga isi yang ada di halaman referensi, supaya letak dan bentuk tombol tidak berpindah-pindah antar layar.

**Wadah:** menempel ke dasar (`position:absolute; bottom:0` di dalam kerangka), isian `ev-white`, sudut atas `ev-r-2xl`, bayangan ke atas `0 -14px 30px -12px rgba(45,23,120,.3)` (variasi lebih ringan dari `ev-sh-sheet`; bila ingin satu token, pakai `ev-sh-sheet`), padding 12 / 16 / 18, jarak antar tombol `ev-sp-10`. Konten halaman di atasnya diberi ruang bawah sebesar tinggi bilah agar tidak tertutup.

**Isi 1: Detail.** [Sekunder berbahaya] "Batalkan" (lebar mengikuti isi, 54px, `ev-r-xl`, isian putih, garis 1.5px `ev-no-edge`, teks `ev-no-ink` 15/700) di kiri + [Utama] satu tombol `flex:1` 54px. Tombol utama berubah menurut keadaan: "Ingatkan atasan" (`ev-purple-600`, `ev-sh-btn`), "Sudah diingatkan" (`ev-ok-bg` teks `ev-ok-ink`, tanpa bayangan, tidak bisa diketuk). "Batalkan" hanya muncul bila pengajuan masih bisa dibatalkan.

**Isi 2: Formulir bertahap.** Baris ringkasan di atas tombol (kiri: teks ringkas seperti "12–13 Nov · 2 hari kerja", kanan: chip 28px `ev-r-lg`, 12/600, misalnya saldo setelah dipotong) lalu tombol penuh lebar 54px, label 16/700 + panah 20px: "Pilih tanggal cuti", "Lanjut", "Kirim pengajuan". Nonaktif (`aria-disabled`): isian `ev-purple-150`, teks `ev-ink-3`, tanpa bayangan, ketuk memunculkan [InlineMessage](../InlineMessage) alasan, bukan diam.

**Isi 3: Hasil.** [Ghost] "Ajukan lagi" (14/700, `ev-purple-50`, garis 1.5px `ev-purple-150`, teks `ev-purple-800`) di kiri + [Utama] "Lihat pengajuan saya" (16/700). Tidak ada sudut atas berbayang bila bilah berada di dalam kartu.

**Aturan:** maksimal satu tombol utama; aksi berbahaya selalu di kiri dan kontur; label kata kerja; tinggi tombol 54 (semua isi). Dua tombol sama berat tidak diperbolehkan.

**State:** normal, ditekan (tombol turun 2px, tepi bawah menipis), nonaktif, memuat (label menjadi "Mengirim…", ikon panah diganti titik berjalan), selesai (hanya isi 1).

**Aksesibilitas:** `role="toolbar"` tidak perlu; cukup `button`. Fokus ke tombol utama saat layar hasil muncul. Area ketuk 54px sudah di atas 44px.

**Responsif:** mobile menempel dasar layar. Tablet: tetap menempel dasar, lebar isi dibatasi `ev-w-form` dan diratakan tengah. Desktop: bilah tidak menempel; pindah ke ujung kanan panel formulir sebagai baris tombol rata kanan (batal / sekunder di kiri tombol utama), tanpa bayangan. *(usulan)*

**Yang disediakan konsumen:** label tombol, keadaan, handler, teks ringkasan dan chip (isi 2).
