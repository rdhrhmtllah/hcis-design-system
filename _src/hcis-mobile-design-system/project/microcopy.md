# Teks dan microcopy

Semua teks di bawah diambil dari halaman Cuti Saya. Pakai pola yang sama untuk halaman baru supaya nada suara aplikasi tetap satu.

## Nada suara
- **Bahasa Indonesia santai-sopan, orang kedua "kamu".** Bukan "Anda", bukan "Bapak/Ibu". Contoh: "Atasan langsung kamu sudah menerima pengajuan ini."
- **Kalimat pendek, kata kerja di depan.** Tombol dan judul aksi berupa kata kerja: "Ajukan lagi", "Ingatkan atasan", "Unduh", "Coba lagi".
- **Hangat tanpa berlebihan.** Satu tanda seru hanya di keberhasilan besar ("Pengajuan terkirim!"). Tanpa emoji, tanpa "Oops", tanpa "Maaf, terjadi kesalahan".
- **Jujur tentang akibat.** Katakan apa yang terjadi, apa yang aman, dan apa yang bisa dilakukan, dalam urutan itu.

## Pola galat: apa terjadi, apa aman, apa selanjutnya
Judul menyebut masalahnya (2 sampai 3 kata). Keterangan satu sampai dua kalimat: yang terjadi, lalu bahwa data aman, lalu langkahnya. Tombol utama = langkah pemulihan terdekat.
| Kasus | Judul | Keterangan | Aksi |
|---|---|---|---|
| Jaringan putus | Koneksi terputus | Pengajuanmu belum terkirim, tapi semua isian masih tersimpan. Periksa sinyal atau Wi-Fi, lalu coba lagi. | Coba lagi / Kembali ke form |
| Server sibuk | Sistem sedang sibuk | Server HCIS sedang padat, jadi pengajuanmu belum terkirim. Isianmu aman, coba lagi sebentar lagi. | Coba lagi / Kembali ke form |
| Tanggal bentrok | Tanggal bentrok | Di tanggal itu kamu sudah punya pengajuan cuti lain. Ubah tanggalnya supaya tidak tumpang tindih. | Ubah tanggal / Lihat pengajuan itu |
| Saldo kurang | Saldo tidak mencukupi | Saldo cutimu berubah sejak form ini dibuka, jadi pengajuan belum bisa diproses. | Ubah tanggal / Ajukan sebagai tanpa gaji |
Nada: jaringan dan server memakai warna oranye (`ev-wait-*`, bisa dipulihkan sendiri), tanggal dan saldo memakai mawar (`ev-no-*`, perlu mengubah isian). Kode galat teknis (mis. "ERR-503 · 04.15") boleh tampil kecil di bawah keterangan, 12px `ev-ink-3`, hanya untuk dibaca ke dukungan.

## Toast
Judul 2 sampai 5 kata, subjudul satu kalimat bila perlu. Tanpa titik di judul.
| Jenis | Judul | Subjudul |
|---|---|---|
| Sukses | Data diperbarui | Terakhir 10.42 |
| Sukses | Pengingat terkirim | Atasan menerima notifikasi untuk CT-26-001. |
| Sukses | Bukti tersimpan | CT-26-001.pdf ada di unduhanmu. |
| Sukses | Tersambung kembali | Data diperbarui 10.42 |
| Peringatan | Sudah diingatkan tadi | Pengingat berikutnya bisa dikirim 1 jam setelah yang terakhir. |
| Galat | Gagal memperbarui data | Periksa sinyal atau Wi-Fi, lalu tarik lagi. (jaringan) / Server HCIS sedang padat. (server) |
| Galat | Koneksi terputus | Periksa sinyal atau Wi-Fi, lalu coba lagi. |
| Galat | Sistem sedang sibuk | Server HCIS sedang padat. Coba lagi sebentar lagi. |
Toast galat memiliki aksi "Coba lagi" dan bertahan 6,5 detik; toast dengan aksi lain 5,2 detik; toast tanpa aksi 3,2 detik (nilai di halaman). Waktu memakai format 24 jam dengan titik ("10.42").

## Keadaan memuat
Kata kerja berjalan dengan elipsis tunggal (…): "Mengirim pengajuan", "Memperbarui data…", "Mengirim pengingat…", "Menyiapkan bukti…", "Menghubungi atasan langsung…". Memuat daftar memakai [Skeleton](components/Skeleton), bukan teks.

## Keadaan kosong
Judul menyebut apa yang tidak ada; keterangan menyebut kapan akan muncul atau apa yang bisa dilakukan. Tombol hanya bila ada aksi yang masuk akal.
| Tempat | Judul | Keterangan |
|---|---|---|
| Ringkasan hero (pil) | Tidak ada pengajuan aktif | (tanpa keterangan; pil di hero) |
| Pengajuan aktif (daftar) | usulan: Belum ada pengajuan aktif | usulan: Pengajuan yang sedang diproses akan muncul di sini. |
| Riwayat (semua) | Belum ada riwayat | Pengajuan cuti yang sudah selesai diproses akan muncul di sini. |
| Riwayat (disaring) | Belum ada yang disetujui / ditolak / dibatalkan | Tidak ada pengajuan dengan status ini. Coba lihat semua riwayat. (tombol: lihat semua) |
| Aktivitas | Belum ada proses. | Unduhan dan export kamu akan muncul di sini. (satu paragraf) |

## Label tombol
Utama: "Kirim pengajuan", "Pilih tanggal cuti", "Lihat pengajuan saya", "Ingatkan atasan", "Mulai tur". Sekunder: "Ajukan lagi", "Tidak jadi", "Kembali ke form". Berbahaya: "Batalkan" (pemicu), "Ya, batalkan pengajuan" (konfirmasi). Aturan: konfirmasi mengulang kata kerja pemicu; penolakan memakai "Tidak jadi", bukan "Batal". Setelah aksi selesai, label berubah menyatakan hasil ("Sudah diingatkan", "Terunduh").

## Status dan istilah
Empat status resmi, selalu satu kata: **Menunggu**, **Diproses**, **Disetujui**, **Ditolak**, plus **Dibatalkan**. Saldo ditulis "Potong 2 hari" atau "Tidak potong saldo". Durasi "2 hari kerja", "1 hari", "4 jam". Peran persetujuan: Atasan, HR, Manajer. Istilah baku: cuti tahunan, cuti sakit, cuti khusus, cuti melahirkan, cuti tanpa gaji, ibadah haji, izin, lembur.

## Format
- **Tanggal:** "12–13 November" (rentang, tanpa tahun bila tahun berjalan), "4 Nov 2026, 09:12" (cap waktu), "Senin, 16 Nov" (hari kembali). Pemisah rentang adalah tanda pisah en (–), bukan tanda hubung.
- **Bulan singkat:** Jan, Feb, Mar, Apr, Mei, Jun, Jul, Agu, Sep, Okt, Nov, Des. Hari singkat di kalender: SEN, SEL, RAB, KAM, JUM, SAB, MIN.
- **Waktu relatif:** "2 jam lalu", "Kemarin", "2 hari lalu"; lebih dari seminggu pakai tanggal.
- **Angka:** pemisah ribuan titik, desimal koma, angka tabular. Kode: "CT-26-001" (jenis, dua digit tahun, nomor urut).
- **Ukuran berkas:** "124 KB", "PDF · 12 hlm · Okt 2026", "Video · 3 menit".

## Placeholder dan bantuan isian
Aturan berikut adalah usulan (halaman belum memuat semua kolom): placeholder berupa contoh, bukan perintah ("Contoh: acara keluarga"). Label tetap terlihat di atas kolom. Pesan galat isian satu kalimat, menyatakan perbaikan ("Pilih tanggal cuti", "Rentang hanya hari libur"), muncul di bawah kolom dengan [InlineMessage](components/InlineMessage). Isian wajib ditandai di label dengan kata "wajib" bila tidak jelas, bukan bintang merah.
