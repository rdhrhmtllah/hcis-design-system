Pakai sistem ini untuk halaman karyawan HCIS Mobile milik Evo Group. Halaman acuannya adalah Cuti Saya: semua token dan komponen di sini diambil dari halaman itu.

## Prinsip isi (suara dan bahasa)

- Tulis dalam Bahasa Indonesia, memanggil pembaca dengan **kamu**, nada ramah dan singkat. Contoh nyata: "Pilih tanggal dan keperluanmu", "Keputusan paling lambat 2 hari kerja sejak diajukan", "Kamu mengirim pengajuan".
- Judul dan tombol berupa kata kerja atau frasa pendek: "Ajukan cuti", "Ingatkan atasan", "Batalkan", "Urungkan", "Coba lagi".
- Status memakai kata yang dipahami karyawan, bukan istilah proses: **Menunggu**, **Di HR**, **Disetujui**, **Ditolak**, **Dibatalkan**. Jangan memakai "Diproses".
- Pesan galat menyebut apa yang terjadi lalu apa yang bisa dilakukan: "Koneksi terputus. Periksa sinyal atau Wi-Fi, lalu coba lagi."
- Huruf kapital hanya di awal kalimat dan nama diri. Satu pengecualian: label kelompok memakai huruf besar (`label`), misalnya "OKTOBER 2026".
- Tanpa emoji. Penanda dan ikon memakai ikon garis.

## Warna

- Ungu adalah struktur: header dan hero memakai `ev-purple-900` sampai `ev-purple-700`, tombol utama memakai `ev-purple-600`, teks dan ikon ungu memakai `ev-purple-800`.
- **Emas (`ev-gold`) adalah warna merek Evo.** Pakai sebagai isian kecil yang menarik mata: ikon tombol, pill di atas header, titik aktif, kilau. Taruh teks gelap `ev-gold-ink` di atasnya. Jangan pernah memakai emas sebagai warna teks di atas putih.
- Teks utama `ev-ink` di atas `ev-white` atau `ev-bg`. Teks sekunder `ev-ink-2`. Jangan memakai `ev-ink-3` untuk teks yang perlu dibaca.
- Status selalu satu keluarga utuh: isian (`-bg`), tinta (`-ink`), titik (`-dot`). Sukses = hijau, menunggu = oranye, ditolak = mawar, dibatalkan = abu. Setiap status harus membawa kata atau ikon, bukan warna saja. Oranye menunggu sengaja berbeda dari emas merek agar status tidak tertukar dengan identitas.
- Kontras: teks minimal 4,5:1. Dua pasangan yang belum memenuhi sudah ditandai di catatan tokennya (`ev-no-dot` dengan teks putih, `ev-ink-3`).

## Tipografi

- Dua keluarga: **Bricolage Grotesque** (`display`) untuk judul halaman, angka besar, judul bagian, dan tanggal; **Inter** (`body`) untuk semua yang lain. Jangan memakai Bricolage untuk teks isi kecil.
- Hierarki memakai bobot yang berbeda, bukan satu bobot tebal: angka besar 800, judul 700, nama dan nilai 600, isi dan keterangan 500.
- Angka rata (tabular) di seluruh antarmuka supaya saldo, tanggal, dan kode sejajar.
- Pakai gaya `display-xl`, `display-l`, `title-l`, `title-m`, `heading-s`, `body`, `body-strong`, `caption`, `chip`, `label`. Jangan membuat ukuran baru.
- Kedua font dimuat dari Google Fonts. Kalau aplikasi berjalan di jaringan yang memblokirnya, pasang berkas font dari server sendiri.

## Bentuk, jarak, dan bayangan

- Sudut besar dan ramah: kartu `ev-r-2xl`, tombol dan field `ev-r-lg` sampai `ev-r-xl`, chip dan pill `ev-r-full` atau `ev-r-md`, sheet `ev-r-3xl`. Pilih dari skala, jangan menulis radius sendiri.
- Margin tepi layar `ev-sp-14`, celah antar kartu `ev-sp-10`, celah dalam kartu `ev-sp-12`. Pilih jarak dari skala `ev-sp-*`.
- Bayangan lembut berwarna ungu (`ev-sh-card`, `ev-sh-row`, `ev-sh-pop`, `ev-sh-sheet`). Tombol utama memakai `ev-sh-btn`: tepi bawah tebal yang memberi kesan ditekan.
- Area ketuk minimal 44px. Elemen yang tampilannya lebih kecil (misalnya chip 28px) memperluas area ketuknya tanpa mengubah tampilan.

## Ikon

- Ikon garis: tebal garis 2,2 sampai 2,6, ujung dan sambungan membulat, ukuran 18 sampai 26px, warna mengikuti teks di sekitarnya.
- Ikon dibuat sendiri dari bentuk dasar (kalender, jam, lonceng, dokumen, topi wisuda). Jangan memakai emoji atau ikon berisi.
- Lambang rumah Evo dipakai pada tombol Menu. Gambar ulang yang sekarang adalah versi sederhana; ganti dengan berkas SVG resmi dari tim brand begitu tersedia.

## Gerak dan gesture

Aturannya ada di bagian Motion dan Gesture. Motion berisi katalog resep animasi dari Cuti Saya, aturan arah, urutan masuk layar, dan brief gerak untuk animasi baru. Ringkasnya: pakai resep yang terdaftar, atau empat kurva dan tujuh durasi yang sudah ada, hormati pengaturan "kurangi gerakan", dan jangan menjadikan gesture satu-satunya jalan: setiap aksi harus punya tombol yang terlihat.

## Pola visual
Bentuk komponen diturunkan dari halaman Cuti Saya, bukan dirancang ulang: ubin ikon persegi `ev-r-md` bertepi 3D, kepala gradien ungu berhias cincin dan kilau emas, kartu `ev-r-2xl`. Daftar lengkapnya ada di halaman **Pola visual**. Komponen baru harus memakai pola ini.

## Responsif
Satu sistem untuk mobile, tablet, dan desktop. Mobile adalah acuan; tablet dan desktop adalah usulan. Aturan lengkap ada di halaman **Layout dan responsif**, aturan akses di **Aksesibilitas**. Setiap komponen punya bagian "Responsif" yang menyatakan perubahannya per ukuran.

## Cara memakai komponen

Setiap komponen di folder `components/` punya panduan dan preview dengan semua state-nya. Bangun halaman baru dari komponen itu dan token di atas, lalu ikuti matriks state di panduan masing-masing: komponen baru belum selesai kalau belum punya keadaan normal, ditekan, nonaktif, memuat, kosong, dan galat yang relevan.

## Fondasi
Untuk halaman yang belum punya template, ikuti **Cara menyusun halaman baru** (brief, resep, persetujuan, bangun, periksa). Sebelum membangun halaman, baca empat panduan ini: **Pustaka ikon** (komponen `Icon`: 49 ikon bernama dengan ukuran dan tebal garis), **Teks dan microcopy** (nada suara, pola galat, toast, format tanggal), **Template halaman** (susunan enam jenis halaman) dan **Matriks state** (keadaan yang wajib per komponen). Dengan keempatnya, pilihan ikon, kata, susunan, dan keadaan tidak perlu ditebak.

