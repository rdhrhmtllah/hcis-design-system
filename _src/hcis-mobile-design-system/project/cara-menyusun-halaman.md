# Cara menyusun halaman baru

Panduan untuk agent (dan manusia) yang merancang halaman HCIS Mobile yang belum punya template. Tujuannya: hasilnya sebagus Cuti Saya walau jenis halamannya berbeda. Urutan kerja wajib: **brief, resep, persetujuan, bangun, periksa.** Jangan membangun sebelum resep disetujui.

## 1. Brief halaman (isi dulu, jangan melompat)
Tulis jawaban singkat untuk tujuh hal. Jawaban yang tidak diketahui ditanyakan ke pemilik produk, bukan ditebak.
1. **Tujuan:** satu kalimat, kata kerja di depan ("Melihat catatan presensi dan mengajukan koreksi").
2. **Pengguna dan peran:** karyawan (personal), atasan (tim), atau keduanya. Peran menentukan data dan aksi.
3. **Data utama:** apa yang dibaca pengguna, dari yang terpenting. Tulis jenisnya: satu angka, beberapa angka, daftar, tabel, kalender, alur, dokumen.
4. **Aksi utama:** satu saja. Aksi lain adalah sekunder atau berada di baris.
5. **Keadaan:** memuat, kosong, galat, sedikit data, banyak data (100+), luring.
6. **Perangkat:** mobile saja, atau tablet dan desktop juga.
7. **Hubungan:** dari mana pengguna datang dan ke mana ia pergi (menu, notifikasi, pintasan).

## 2. Anatomi halaman: empat zona
Setiap halaman terdiri dari empat zona dalam urutan tetap dari atas ke bawah. Zona boleh dilewati, urutan tidak boleh dibalik.
| Zona | Isi | Aturan |
|---|---|---|
| **Kepala** | [PageHeader](components/PageHeader): kembali (halaman dalam), judul, keterangan, pil emas konteks | Selalu ada. Satu pil emas, bukan dua. |
| **Ringkasan** | Jawaban atas "bagaimana keadaanku?" dalam satu pandang | Maksimal satu kartu besar atau satu baris 2 sampai 4 [StatTile](components/StatTile). Tidak boleh berisi tombol aksi. |
| **Isi** | Daftar, tabel, kalender, formulir, detail dalam kartu | Satu jenis isi utama per halaman; sisanya pendukung. |
| **Aksi** | [ActionBar](components/ActionBar) menempel dasar, atau satu tombol di baris | Satu aksi utama. Aksi berbahaya di kiri dan kontur. |
Halaman beranda modul menambah zona **Pintasan** antara Ringkasan dan Isi.

## 3. Jenis data menjadi komponen
Pilih komponen dari jenis datanya, bukan dari selera. Bila dua baris cocok, pilih yang lebih sederhana.
| Data | Mobile | Tablet dan desktop *(usulan)* |
|---|---|---|
| Satu angka penting dengan konteks | [BalanceCard](components/BalanceCard) | BalanceCard di kolom kiri |
| 2 sampai 4 angka sejajar | baris [StatTile](components/StatTile) | [StatCard](components/StatCard) berjajar |
| Tren 12 periode | [MonthChart](components/MonthChart) | MonthChart lebih lebar |
| Daftar pendek (sampai sekitar 7), tiap item punya status | [RequestCard](components/RequestCard) atau [HistoryRow](components/HistoryRow) | sama, dua kolom |
| Daftar panjang dengan satu aksi per baris | baris berbentuk [JobRow](components/JobRow) | [DataTable](components/DataTable) |
| Tabel banyak kolom | kartu per baris; tampilkan 3 kolom terpenting, sisanya di detail | DataTable dengan kolom penuh |
| Pilih satu dari 3 sampai 8 | [SelectionControls](components/SelectionControls) atau [Sheet](components/Sheet) | [Select](components/Select) |
| Pilih rentang tanggal | [DateRangePicker](components/DateRangePicker) | sama, berdampingan dengan ringkasan |
| Alur atau tahapan | [ApprovalStepper](components/ApprovalStepper); ringkas: [ApprovalPath](components/ApprovalPath) | sama |
| Pasangan label-nilai | [InfoList](components/InfoList) | dua kolom |
| Kabar penting yang harus dibaca | [Banner](components/Banner) di atas Isi | sama |
| Pesan terkait satu isian | [InlineMessage](components/InlineMessage) | sama |
| Konfirmasi tindakan berbahaya | [ConfirmSheet](components/ConfirmSheet) | [Dialog](components/Dialog) |
| Pilihan banyak saringan | [FilterChip](components/FilterChip) membungkus | sama |
| Dua atau tiga tampilan yang setara | [Tabs](components/Tabs) | sama |

Bila tidak ada baris yang cocok, **jangan menciptakan komponen**. Gabungkan komponen yang ada, atau catat sebagai usulan komponen baru dan minta keputusan.

## 4. Ritme dan hierarki
- **Satu fokus.** Mata harus tahu ke mana dulu: kepala, lalu ringkasan, lalu isi. Hanya satu elemen yang berwarna ungu penuh atau emas per layar (kepala, tombol utama).
- **Kartu, bukan kotak berlapis.** Kartu putih `ev-r-2xl` dengan `ev-sh-card` di atas latar `ev-bg`. Jangan menaruh kartu di dalam kartu; di dalam kartu gunakan garis tipis atau jarak.
- **Jarak dari token.** Samping kartu `ev-sp-14`; antar kartu `ev-sp-12`; antar baris daftar `ev-sp-8` sampai `ev-sp-10`; dalam kartu `ev-sp-14` sampai `ev-sp-16`. Jangan memakai angka lain.
- **Hierarki teks.** Judul kartu 15/700, isi 13 sampai 14, keterangan 12/500 `ev-ink-2`. Angka penting memakai Bricolage. Tidak ada teks di bawah 12px.
- **Warna berarti sesuatu.** Hijau selesai, oranye menunggu, mawar ditolak atau bahaya, biru informasi, ungu struktur, emas penanda merek dan konteks. Jangan memakai warna hanya untuk menghias.
- **Kepadatan.** Mobile 3 sampai 5 kartu per layar gulir; lebih dari itu pecah menjadi halaman atau tab.

## 5. Kasus khusus
| Kasus | Cara |
|---|---|
| Banyak data (100+) | Saringan di atas, kelompokkan (per bulan, per minggu), muat bertahap (20 per batch), jangan satu daftar tanpa kepala. |
| Sedikit data (0 sampai 2) | Tampilkan apa adanya; jangan memperbesar kartu. Kosong memakai [EmptyState](components/EmptyState) dengan teks dari [Teks dan microcopy](microcopy). |
| Data campur peran (personal dan tim) | Pisahkan dengan [Tabs](components/Tabs) di bawah kepala; jangan mencampur dalam satu daftar. |
| Halaman hanya baca (agregat) | Tanpa ActionBar; tanpa formulir; semua ketukan menuju halaman fitur. |
| Formulir panjang | Pecah menjadi langkah (lihat template Formulir bertahap); satu topik per kartu bernomor. |
| Aksi hanya untuk sebagian baris | Aksi muncul di baris yang memenuhi syarat (tombol ghost di baris), bukan di bilah dasar. |
| Dua aksi sama penting | Salah satunya bukan utama. Putuskan; bila tetap dua, buat dua langkah. |
| Waktu nyata atau proses lama | Pakai pola [ActivityPanel](components/ActivityPanel) (proses berjalan) dan toast untuk hasilnya; jangan memblokir layar kecuali pengiriman. |

## 6. Hal yang dilarang
Tidak ada garis aksen di tepi kartu, tidak ada kaca buram baru, tidak ada gradien baru (hanya yang sudah terdaftar), tidak ada lingkaran selain chip, titik, penanda halaman, dan nomor langkah, tidak ada warna hex mentah di luar SVG ilustrasi (matahari, kilau, ilustrasi kosong; di sana warna boleh mentah, tetapi tetap harus dari palet ungu, emas, dan status yang ada), tidak ada ikon di luar [Icon](components/Icon), tidak ada teks hiasan ("Selamat datang di dunia baru"), tidak ada bayangan hitam pekat, tidak ada radius di luar token, tidak ada animasi yang tidak tercantum di [Gerak](motion).

## 7. Resep halaman (keluaran sebelum membangun)
Agent menulis resep dalam bentuk tabel dan menunggu persetujuan:
| Zona | Komponen | Data | Keadaan khusus |
|---|---|---|---|
| Kepala | PageHeader | judul, pil konteks | – |
| Ringkasan | StatTile x3 | hadir, terlambat, perlu koreksi | memuat: Skeleton |
| Isi | FilterChip + daftar baris | catatan harian | kosong, galat |
| Aksi | tombol ghost di baris | ajukan koreksi | nonaktif bila lewat batas |
Resep juga mencantumkan satu baris gerak: urutan masuk zona (kepala, ringkasan, isi, bilah aksi) dan resep yang dipakai dari [Gerak](motion).
Resep disertai satu kalimat alasan untuk setiap pilihan komponen yang tidak ada di tabel bagian 3.

## 8. Pemeriksaan sebelum selesai
1. **Tiga lebar:** screenshot di 390, 768, 1280; tidak ada teks terpotong atau tumpang tindih; susunan sesuai [Layout dan responsif](layout).
2. **Token:** tidak ada hex mentah, tidak ada radius, jarak, atau bayangan di luar token.
3. **State:** setiap daftar punya memuat, kosong, dan galat ([Matriks state](states)).
4. **Teks:** semua kalimat mengikuti [Teks dan microcopy](microcopy); tanggal dan angka dalam format baku.
5. **Aksesibilitas:** area ketuk 44px, kontras, urutan fokus, label ([Aksesibilitas](accessibility)).
6. **Satu tombol utama** dan satu fokus visual.
7. **Daftar larangan** (bagian 6) tidak dilanggar.
8. **Gerak:** urutan masuk kepala, ringkasan, isi, bilah aksi; arah mengikuti sumbernya; hanya resep dari [Gerak](motion), atau brief gerak bila ada animasi baru.
Laporkan hasil pemeriksaan dalam satu tabel lulus atau gagal; jangan menyatakan selesai bila ada yang gagal.

## 9. Menambah template baru
Halaman yang sudah disetujui dan berbeda jenis dari template yang ada menjadi template baru: tambahkan bagiannya ke [Template halaman](templates) (zona, komponen, jarak) dan satu halaman contoh di folder komponen sebagai acuan visual. Dengan begitu sistem tumbuh dari halaman nyata, bukan dari tebakan.
