# Evo HCIS Mobile — Design System

Design system untuk halaman karyawan **HCIS Mobile** milik **Evo Group**. Halaman acuannya adalah *Cuti Saya*: semua token dan komponen diambil dari halaman itu. Dokumentasi lengkap dengan pratinjau ada di `hcis-design-system/index.html`; nilai token mentah ada di `hcis-design-system/tokens.json` dan `hcis-design-system/assets/tokens.css`.

## Prinsip

### Suara dan bahasa
- Bahasa Indonesia, memanggil pembaca dengan **kamu**, nada ramah dan singkat.
- Judul dan tombol berupa kata kerja atau frasa pendek: "Ajukan cuti", "Batalkan", "Coba lagi".
- Status memakai kata yang dipahami karyawan: **Menunggu**, **Di HR**, **Disetujui**, **Ditolak**, **Dibatalkan**. Jangan memakai "Diproses".
- Pesan galat menyebut apa yang terjadi lalu apa yang bisa dilakukan.
- Huruf kapital hanya di awal kalimat dan nama diri. Pengecualian: gaya `label` (huruf besar untuk label kelompok).
- Tanpa emoji. Penanda memakai ikon garis.

### Warna
- **Ungu adalah struktur.** Header dan hero `ev-purple-900` sampai `ev-purple-700`, tombol utama `ev-purple-600`, teks dan ikon ungu `ev-purple-800`.
- **Emas (`ev-gold`) adalah warna merek Evo.** Hanya sebagai isian kecil (ikon tombol, pill, titik aktif, kilau) dengan teks `ev-gold-ink` di atasnya. Jangan pernah memakai emas sebagai warna teks di atas putih.
- Teks utama `ev-ink` di atas `ev-white` atau `ev-bg`; teks sekunder `ev-ink-2`. Jangan memakai `ev-ink-3` untuk teks yang perlu dibaca.
- Status selalu satu keluarga utuh (`-bg`, `-ink`, `-dot`) dan selalu membawa kata atau ikon, bukan warna saja. Sukses hijau, menunggu oranye, ditolak mawar, dibatalkan abu.
- Kontras teks minimal 4,5:1.

### Tipografi
- **Bricolage Grotesque** (`--font-display`) untuk judul halaman, angka besar, judul bagian, dan tanggal. **Inter** (`--font-body`) untuk semua yang lain.
- Hierarki memakai bobot: angka besar 800, judul 700, nama dan nilai 600, isi 500.
- Angka tabular di seluruh antarmuka. Jangan membuat ukuran baru di luar gaya yang terdaftar.

### Bentuk dan layout
- Kartu memakai `ev-r-2xl` dengan `ev-sh-card`. Ubin ikon berbentuk persegi membulat `ev-r-md`, bukan lingkaran.
- Area ketuk minimum `ev-touch` (44px).
- Breakpoint: mobile sampai 599px, tablet 600–1023px, desktop 1024px ke atas. Aturan tablet dan desktop masih berupa usulan.
- Logo Evo Group di atas ungu gelap selalu ditaruh di kartu putih.

### Aksesibilitas
- Cincin fokus 2px `ev-purple-600` dengan jarak 2px (putih di atas ungu gelap).
- Ikon yang bisa diketuk selalu punya teks atau `aria-label`.
- Hormati `prefers-reduced-motion`: gerak diganti perubahan langsung atau pudar singkat.

### Gerak
- Masuk dengan `ev-ease-enter`, keluar dengan `ev-ease-exit`, pantulan kecil dengan `ev-ease-spring`, perpindahan posisi dengan `ev-ease-standard`.
- Durasi dari `ev-t-fast` (0.2s) sampai `ev-t-page` (0.6s). Gerak menjelaskan perubahan state, bukan hiasan.

## Tipografi

| Gaya | Keluarga | Ukuran | Tinggi baris | Bobot | Pemakaian |
|---|---|---|---|---|---|
| `display-xl` | display | 56px | 0.95 | 800 | Angka saldo di kartu hero. Warna `ev-purple-800`. |
| `display-l` | display | 32px | 1.05 | 800 | Judul halaman di header ungu. Warna putih. |
| `title-l` | display | 22px | 1.15 | 700 | Judul sub-halaman dan angka statistik. |
| `title-m` | display | 18px | 1.2 | 700 | Judul bagian dan rentang tanggal di kartu. Warna `ev-ink`. |
| `heading-s` | body | 16px | 1.25 | 700 | Label tombol utama dan judul baris. |
| `body-sm` | body | 13px | 1.45 | 500 | Isi kecil: aturan dalam kartu lipat, label segmen (700), keterangan tambahan. |
| `title-s` | body | 15px | 1.3 | 700 | Judul kartu bernomor dan kartu lipat, label tombol sheet. |
| `body` | body | 14px | 1.45 | 500 | Deskripsi dan isi. Warna `ev-ink-2`. |
| `body-strong` | body | 14px | 1.3 | 600 | Nama dan nilai penting. Warna `ev-ink`. |
| `caption` | body | 12px | 1.35 | 500 | Keterangan waktu dan bantuan. |
| `chip` | body | 12px | 16px | 600 | Teks chip dan label kecil. |
| `label` | body | 11px | 14px | 600 | Judul kelompok huruf besar dan kode pengajuan. |

Tumpukan font: `--font-display: "Bricolage Grotesque", "Inter", system-ui, sans-serif`; `--font-body: "Inter", system-ui, -apple-system, sans-serif`.

## Token

> Satu tema terang. Emas adalah warna merek Evo (dari logo), ungu menjadi warna struktur, empat keluarga status (sukses, menunggu, ditolak, dibatalkan) masing-masing punya isian, tinta, dan titik. Nilai emas diperkirakan dari gambar logo, perlu dicek dengan kode merek resmi.

### Warna

| Token | Nilai | Pemakaian |
|---|---|---|
| `ev-purple-900` | `#2d1778` | Header, hero saldo, layar menu, dan latar gelap. Teks putih di atasnya 13,9:1. Emas (`ev-gold`) di atasnya 8,9:1. |
| `ev-purple-800` | `#3b22a0` | Judul angka besar, teks dan ikon ungu di atas putih atau `ev-purple-50`/`ev-purple-100`, tepi bawah tombol 3D. Di atas putih 10,9:1. |
| `ev-purple-700` | `#4b2db5` | Ujung gradasi header dan hero. Hanya sebagai latar, bukan teks. |
| `ev-purple-600` | `#5b3bd8` | Tombol utama, tahap selesai pada stepper, penanda aktif. Teks putih di atasnya 6,9:1. |
| `ev-purple-400` | `#8b6cf0` | Ujung terang gradasi tombol Menu dan garis dekoratif di atas latar ungu tua. |
| `ev-purple-300` | `#a78bfa` | Titik status "Di HR" pada latar ungu tua, kilau, dan aksen kecil. Di atas `ev-purple-900` 5,1:1. |
| `ev-purple-150` | `#d9d0f5` | Garis tepi kartu dan chip pada latar terang. |
| `ev-purple-100` | `#e4ddfb` | Isian chip "Di HR", ikon kotak, dan tombol sekunder. Teks `ev-purple-800` di atasnya 8,3:1. |
| `ev-purple-50` | `#f1eefc` | Isian lembut: baris stepper di kartu, garis pemisah, bantalan. Teks `ev-purple-800` di atasnya 9,6:1. |
| `ev-gold` | `#f7c948` | Warna merek Evo: isian tombol kecil, pill di atas header ungu, titik aktif, kilau. Hanya isian atau hiasan, tidak untuk teks di atas putih (kontras sekitar 1,6:1). Teks di atasnya memakai `ev-gold-ink`. |
| `ev-gold-edge` | `#d49a12` | Tepi 3D di bawah isian emas. Tanda hiasan, bukan penyampai makna (2,5:1 di atas putih). |
| `ev-gold-ink` | `#3a2a00` | Teks dan ikon di atas `ev-gold`. 8,9:1. |
| `ev-ink` | `#1a1535` | Teks utama di atas `ev-white` dan `ev-bg`. 17,5:1 dan 15,8:1. |
| `ev-ink-2` | `#5a5578` | Teks sekunder (keterangan, deskripsi) di atas `ev-white` (7,0:1), `ev-bg` (6,3:1), dan `ev-cx-bg` (5,9:1). |
| `ev-ink-3` | `#8a84a8` | Placeholder dan petunjuk yang tidak penting. TIDAK memenuhi kontras teks (3,5:1 di atas putih, 3,2:1 di atas `ev-bg`): pakai hanya untuk hiasan atau ganti dengan `ev-ink-2`. |
| `ev-bg` | `#f4f2fc` | Latar halaman. |
| `ev-white` | `#ffffff` | Kartu, sheet, dan teks di atas isian gelap. |
| `ev-ok-bg` | `#ddf5e4` | Isian chip Disetujui, ikon sukses, toast berhasil. |
| `ev-ok-ink` | `#14532d` | Teks dan ikon sukses di atas `ev-ok-bg`. 7,9:1. |
| `ev-ok-dot` | `#2e9e5b` | Titik dan garis penanda sukses. Selalu disertai kata atau ikon. 3,4:1 di atas putih. |
| `ev-wait-bg` | `#ffe9d6` | Isian chip Menunggu, banner offline, banner peringatan. |
| `ev-wait-ink` | `#7a3200` | Teks dan ikon menunggu di atas `ev-wait-bg`. 7,8:1. |
| `ev-wait-dot` | `#f57c2a` | Titik dan penanda tahap aktif. Selalu disertai kata. Putih di atasnya hanya 2,7:1: jangan taruh teks kecil putih di atasnya. |
| `ev-no-bg` | `#ffe0ea` | Isian chip Ditolak dan toast gagal. |
| `ev-no-ink` | `#9b1c48` | Teks Ditolak dan tombol Batalkan di atas `ev-white` dan `ev-no-bg`. 6,5:1 di atas `ev-no-bg`. |
| `ev-no-dot` | `#cd3e6a` | Titik penanda dan latar tombol geser Batalkan. Teks putih di atasnya 4,67:1 (lolos). |
| `ev-cx-bg` | `#eceaf3` | Isian chip Dibatalkan dan elemen yang dinonaktifkan. |
| `ev-cx-dot` | `#9a94b8` | Titik chip Dibatalkan. Hiasan; kata "Dibatalkan" membawa maknanya. |
| `ev-purple-200` | `#e8e2fc` | Pita rentang tanggal di kalender dan latar segmen terpilih yang lembut. Dipakai halaman Cuti Saya sebagai nilai langsung, sekarang jadi token. |
| `ev-purple-accent` | `#6d4ae0` | Teks kecil beraksen ungu: waktu notifikasi dan judul kelompok (huruf kapital). Di atas putih 5,7:1, aman untuk teks 12px tebal. |
| `ev-purple-edge` | `#c9bfef` | Garis tepi 1px pada kartu baris dan ubin ikon di atas latar ungu muda. |
| `ev-field-bg` | `#fbfaff` | Isian kolom teks dan zona unggah. Satu tingkat di atas putih supaya kolom terbaca sebagai area isian. |
| `ev-tint` | `#f7f5fe` | Kotak sisipan di dalam kartu putih, misalnya alur persetujuan. Dengan garis 1px `ev-purple-100`. |
| `ev-dash` | `#b7a7ee` | Garis putus-putus zona unggah. |
| `ev-ok-edge` | `#a9ddba` | Garis tepi 1px kartu dan ubin hijau (lampiran terpasang, status berhasil). |
| `ev-wait-edge` | `#f8cba6` | Garis tepi 1px ubin dan kartu oranye (menunggu). |
| `ev-no-edge` | `#f2b9cb` | Garis tepi 1px ubin dan kartu mawar (ditolak), dan garis tombol berbahaya. |
| `ev-info-bg` | `#d6e8ff` | Latar ubin dan kartu informasi netral (pelatihan, LMS). Dipakai halaman sebagai nilai langsung. |
| `ev-info-edge` | `#afcbf2` | Garis tepi 1px pasangan `ev-info-bg`. |
| `ev-info-ink` | `#1b4a96` | Ikon dan teks di atas `ev-info-bg`. Kontras 6,8:1. |
| `ev-purple-950` | `#241269` | Ujung gelap latar layar kirim (gradien radial 600, 800, 950). |
| `ev-purple-500` | `#6d4deb` | Awal gradien cakram sukses (500 ke 800). |
| `ev-no-deep` | `#8f1840` | Tepi bawah 4px tombol berbahaya 3D (padanan `ev-purple-800` pada tombol utama). |
| `ev-no-soft` | `#ff7a9e` | Awal gradien cakram ikon berbahaya (soft ke `ev-no-dot`). |
| `ev-no-ring` | `#ffc9d9` | Cincin denyut di belakang cakram ikon berbahaya. |
| `ev-track` | `#dcd5f3` | Jalur dan garis rangka kosong (skeleton, garis jalur). |
| `ev-path-orange` | `#ff9f55` | Penanda jalur persetujuan saat memuat (orb, cincin putus). |
| `ev-path-rose` | `#ff6b94` | Jalur persetujuan bentrok: isi dan denyut. |
| `ev-path-rose-soft` | `#ff8fae` | Jalur persetujuan saldo: cincin putus dan label. |

### Jarak

| Token | Nilai | Pemakaian |
|---|---|---|
| `ev-sp-2` | `2px` | Celah sangat rapat antara teks dan ikon kecil. |
| `ev-sp-4` | `4px` | Celah antara label dan ikon. |
| `ev-sp-6` | `6px` | Celah antar chip dan antar elemen kecil. |
| `ev-sp-8` | `8px` | Celah standar antar elemen dalam satu baris. |
| `ev-sp-10` | `10px` | Celah antar kartu dan padding tombol. |
| `ev-sp-12` | `12px` | Celah dalam kartu dan padding sheet. |
| `ev-sp-14` | `14px` | Margin tepi layar dan padding kartu. |
| `ev-sp-16` | `16px` | Padding bagian besar. |
| `ev-sp-20` | `20px` | Jarak antar bagian. |
| `ev-sp-24` | `24px` | Jarak besar antar blok. |
| `ev-sp-32` | `32px` | Margin halaman desktop dan jarak antar bagian besar. Usulan untuk desktop; belum dipakai di halaman referensi. |
| `ev-sp-48` | `48px` | Jarak antar bagian utama di layar lebar. Usulan; belum dipakai di halaman referensi. |

### Radius

| Token | Nilai | Pemakaian |
|---|---|---|
| `ev-r-hair` | `2px` | Garis tipis. |
| `ev-r-xs` | `4px` | Batang progres dan penanda kecil. |
| `ev-r-sm` | `8px` | Titik dan ikon kecil. |
| `ev-r-md` | `12px` | Chip, tombol kecil, ikon kotak. |
| `ev-r-lg` | `16px` | Tombol dan field. |
| `ev-r-xl` | `20px` | Kartu isi dan tombol besar. |
| `ev-r-2xl` | `24px` | Kartu besar dan empty state. |
| `ev-r-3xl` | `28px` | Sheet dan hero. |
| `ev-r-full` | `999px` | Pill dan bulatan penuh. |

### Bayangan

| Token | Nilai | Pemakaian |
|---|---|---|
| `ev-sh-card` | `0 12px 26px -16px rgba(45,23,120,0.4), 0 2px 5px rgba(45,23,120,0.06)` | Kartu isi. |
| `ev-sh-row` | `0 8px 16px -12px rgba(45,23,120,0.35)` | Baris dan kartu kecil. |
| `ev-sh-btn` | `0 4px 0 #3b22a0, inset 0 1px 0 rgba(255,255,255,0.28)` | Tombol 3D: tepi bawah 4px `ev-purple-800` dan kilap tipis di atas. |
| `ev-sh-pop` | `0 12px 20px -10px rgba(45,23,120,0.5)` | Kartu pop dan item terangkat. |
| `ev-sh-sheet` | `0 -18px 40px -12px rgba(26,21,53,0.45)` | Sheet bawah (bayangan ke atas). |

### Gerak

| Token | Nilai | Pemakaian |
|---|---|---|
| `ev-ease-enter` | `cubic-bezier(.2,.9,.25,1)` | Elemen masuk: halaman, sheet, kartu, geser tab. |
| `ev-ease-spring` | `cubic-bezier(.3,1.5,.5,1)` | Muncul dengan pantulan: ikon, centang, toast. |
| `ev-ease-exit` | `cubic-bezier(.5,0,.9,.4)` | Elemen keluar. |
| `ev-ease-standard` | `cubic-bezier(.45,0,.25,1)` | Perpindahan posisi, bilah progres. |
| `ev-t-fast` | `0.2s` | Umpan balik tekan dan warna. |
| `ev-t-exit` | `0.25s` | Elemen menutup. |
| `ev-t-base` | `0.3s` | Transisi umum. |
| `ev-t-mid` | `0.4s` | Perpindahan sedang. |
| `ev-t-enter` | `0.45s` | Blok isi dan bagian yang terbuka. |
| `ev-t-slow` | `0.5s` | Halaman, sheet, hero masuk. |
| `ev-t-page` | `0.6s` | Layar penuh dan pembukaan lingkaran. |

### Ukuran

| Token | Nilai | Pemakaian |
|---|---|---|
| `ev-touch` | `44px` | Area ketuk minimum untuk semua kontrol. Elemen visual boleh lebih kecil, area ketuk diperluas (pola ::after chip). |
| `ev-w-phone` | `390px` | Lebar acuan layar mobile pada halaman referensi. |
| `ev-w-rail` | `72px` | Lebar rel samping di tablet: hanya ikon dan label pendek. Proposal. |
| `ev-w-sidebar` | `248px` | Lebar sidebar desktop: ikon, label, dan modul. Proposal. |
| `ev-w-content` | `1120px` | Lebar maksimum area isi di desktop. Proposal. |
| `ev-w-form` | `560px` | Lebar maksimum formulir agar baris teks tetap nyaman dibaca. Proposal. |
| `ev-w-dialog-s` | `400px` | Dialog konfirmasi singkat. Proposal. |
| `ev-w-dialog-m` | `560px` | Dialog formulir dan sheet versi tablet/desktop. Proposal. |
| `ev-w-panel` | `420px` | Panel detail di samping daftar (tablet dan desktop). Proposal. |

### Breakpoint

| Token | Nilai | Pemakaian |
|---|---|---|
| `ev-bp-tablet` | `600px` | Mulai tablet (600 sampai 1023px). Navigasi bawah berganti rel samping, sheet berganti dialog. |
| `ev-bp-desktop` | `1024px` | Mulai desktop (1024px ke atas). Rel samping melebar menjadi sidebar penuh, daftar kartu menjadi tabel. |
| `ev-bp-wide` | `1440px` | Layar lebar. Isi berhenti melebar di ev-w-content; sisanya jadi margin. |

### Lapisan (z-index)

| Token | Nilai | Pemakaian |
|---|---|---|
| `ev-z-sticky` | `10` | Header dan bilah yang menempel. Proposal. |
| `ev-z-nav` | `20` | Navigasi dan lapisan menu modul. |
| `ev-z-popover` | `40` | Popup, dropdown, tooltip. |
| `ev-z-sheet` | `50` | Sheet dan dialog. |
| `ev-z-detail` | `51` | Halaman detail yang menumpuk di atas sheet. |
| `ev-z-toast` | `70` | Toast selalu di atas lapisan lain. |
| `ev-z-hint` | `80` | Petunjuk gesture, tidak menerima ketukan. |

## Ikon

49 ikon garis di kanvas 24x24 (`fill="none"`, `stroke="currentColor"`, ujung dan sambungan bulat). Tebal garis mengikuti ukuran. Jangan memakai pustaka ikon pihak ketiga. Daftar nama: `check`, `close`, `plus`, `chevron-right`, `chevron-left`, `chevron-down`, `arrow-right`, `arrow-left`, `swap`, `search`, `refresh`, `retry`, `rotate-ccw`, `history`, `clock`, `calendar`, `calendar-days`, `calendar-check`, `calendar-x`, `document`, `document-lines`, `video`, `folder`, `id-card`, `bar-chart`, `trend`, `graduation`, `user-check`, `activity`, `bell`, `help`, `info`, `alert`, `warning`, `alert-circle`, `wifi-off`, `ban`, `wallet`, `banknote`, `heart`, `trash`, `download`, `upload`, `logout`, `play`, `route`, `chat`, `phone`, `mail`.

## Komponen (54)

### Kerangka

| Komponen | Ringkasan |
|---|---|
| **AppShell** | Kerangka halaman: menentukan di mana navigasi, header, dan isi berada pada tiap ukuran layar. |
| **PageHeader** | Kepala halaman. |

### Navigasi

| Komponen | Ringkasan |
|---|---|
| **BottomNav** | Navigasi bawah tetap dengan lima tujuan dan tombol Menu di tengah yang menonjol. |
| **MenuOverlay** | Layar Menu: pemilih modul dan layanan HCIS. |
| **Pagination** | Berpindah halaman pada daftar panjang, plus jejak halaman (breadcrumb). |
| **ShortcutTile** | Pintasan bergambar ke tiga sampai empat tujuan utama sebuah halaman (di Cuti Saya: Riwayat, Jenis cuti, Ketentuan). |
| **SideNav** | Navigasi utama untuk tablet dan desktop; menggantikan BottomNav di layar 600px ke atas. |
| **Tabs** | Segmen untuk berpindah antar tampilan yang setara di satu halaman: "Umum · 3 \| Khusus · 8" (Jenis cuti), "Semua \| Belum dibaca · 3" (Notifikasi). |

### Aksi

| Komponen | Ringkasan |
|---|---|
| **ActionBar** | Bilah aksi yang menempel di dasar layar detail, formulir, dan hasil. |
| **Button** | Tombol utama HCIS Mobile: blok 3D berwarna ungu dengan tepi bawah tebal. |

### Input

| Komponen | Ringkasan |
|---|---|
| **Attachment** | Unggah dan daftar lampiran (surat dokter dan bukti pendukung). |
| **DateRangePicker** | Kalender pemilih rentang tanggal. |
| **FilterChip** | Chip pilihan untuk menyaring daftar: modul (ESS, TPM, LMS), status (Semua 7, Disetujui 5), dan periode. |
| **Select** | Pilihan satu dari daftar tertutup (jenis cuti, atasan, periode). |
| **SelectionControls** | Kontrol pilihan. |
| **TextField** | Kolom isian teks: satu baris dan banyak baris. |

### Pengajuan

| Komponen | Ringkasan |
|---|---|
| **ApprovalStepper** | Menunjukkan tahap persetujuan sebuah pengajuan. |
| **BalanceCard** | Kartu hero saldo cuti di bagian atas halaman, menumpang pada header ungu. |
| **RequestCard** | Kartu satu pengajuan di daftar "Pengajuan aktif". |

### Data

| Komponen | Ringkasan |
|---|---|
| **Accordion** | Kartu lipat: setiap bagian membuka rincian di bawah kepalanya. |
| **ApprovalPath** | Deretan chip kecil yang menyatakan siapa yang menyetujui, berurutan, tanpa menunjukkan status. |
| **Avatar** | Inisial atau foto orang, dengan lencana (badge) angka atau titik untuk notifikasi. |
| **DataTable** | Tabel data untuk layar tablet dan desktop: daftar pengajuan dengan kolom, urutan, dan aksi per baris. |
| **InfoList** | Daftar pasangan label dan nilai di dalam kartu: "Informasi" pada Detail pengajuan, atau ringkasan serupa. |
| **MonthChart** | Kartu ringkasan pemakaian cuti dalam setahun: angka total dan grafik batang dua belas bulan. |
| **ProgressBar** | Bilah kemajuan: unggahan berkas, pemakaian kuota cuti, kelengkapan formulir. |
| **ReceiptCard** | Kartu bukti berbentuk tiket yang merangkum satu pengajuan: kode, status, rentang, jenis, durasi, saldo, dan alur persetujuan. |
| **StatCard** | Kartu angka ringkas: sisa cuti, jumlah menunggu, kehadiran bulan ini. |
| **StatTile** | Kotak angka berwarna untuk ringkasan di dalam panel atau kartu: "12 hari cuti per tahun", "Berjalan 2". |

### Daftar

| Komponen | Ringkasan |
|---|---|
| **HistoryRow** | Baris riwayat pengajuan yang sudah diputuskan, dikelompokkan per bulan. |
| **JobRow** | Satu baris proses latar belakang: export, unduhan, atau tugas terjadwal. |
| **NotificationRow** | Satu baris notifikasi di panel Notifikasi. |

### Status

| Komponen | Ringkasan |
|---|---|
| **StatusChip** | Chip kecil yang menyatakan status satu pengajuan. |
| **SummaryChip** | Pill ringkasan di header: menunjukkan jumlah pengajuan per status sekaligus menjadi filter daftar di bawahnya. |

### Pesan

| Komponen | Ringkasan |
|---|---|
| **Banner** | Pita informasi di puncak halaman untuk keadaan yang memengaruhi seluruh layar. |
| **EmptyState** | Tampilan saat daftar kosong. |
| **Skeleton** | Kerangka abu bergerak yang dipakai saat data memuat, supaya tata letak tidak melompat. |
| **Toast** | Pesan singkat yang melayang di atas navigasi bawah. |

### Umpan balik

| Komponen | Ringkasan |
|---|---|
| **InlineMessage** | Pesan yang menetap di dalam halaman, dekat bagian yang dibahas: galat formulir, peringatan kuota, aturan, konfirmasi. |

### Lapisan

| Komponen | Ringkasan |
|---|---|
| **Dialog** | Jendela modal di tengah layar untuk konfirmasi dan formulir singkat. |
| **Popover** | Panel kecil yang melayang di dekat pemicunya: menu aksi, pilihan, atau modul. |
| **Tooltip** | Penjelasan singkat yang muncul di atas elemen saat disorot. |

### Panel

| Komponen | Ringkasan |
|---|---|
| **ActivityPanel** | Isi panel "Aktivitas": ringkasan jumlah proses, daftar proses per grup, dan tombol bersihkan. |
| **LocationPath** | Isi panel "Lokasi saya": menunjukkan di mana pengguna berada dalam hierarki aplikasi, menu lain pada modul yang sama, dan jalan pindah ke aplikasi lain. |

### Penampung

| Komponen | Ringkasan |
|---|---|
| **ConfirmSheet** | Sheet konfirmasi untuk aksi yang tidak bisa dibatalkan atau mengubah data penting. |
| **Sheet** | Panel yang naik dari bawah untuk memilih sesuatu tanpa meninggalkan halaman. |

### Bantuan

| Komponen | Ringkasan |
|---|---|
| **Coachmark** | Petunjuk tur yang menyorot satu bagian halaman sambil menjelaskannya. |
| **ContactRow** | Baris kontak PIC (penanggung jawab) per modul. |
| **GuideRow** | Baris dokumen panduan: PDF atau video yang bisa dibuka dari tab "Panduan". |
| **HelpPanel** | Isi panel Bantuan: tiga tab (Tur, Panduan, PIC Modul) di bawah kepala berwarna. |
| **TourCard** | Kartu ajakan tur terpandu di tab "Tur" pada panel Bantuan: nama tur, durasi, daftar langkah bernomor, dan satu tombol mulai. |

### Layar penuh

| Komponen | Ringkasan |
|---|---|
| **SendingScreen** | Layar penuh yang menutup halaman selama pengiriman: pengguna melihat pengajuannya "berjalan" ke atasan dan HR. |
| **SuccessScreen** | Layar hasil setelah pengajuan terkirim: ilustrasi perayaan, judul, satu kalimat tindak lanjut, ReceiptCard, lalu ActionBar dengan "Ajukan lagi" dan "Lihat pengajuan saya". |

### Halaman contoh

| Komponen | Ringkasan |
|---|---|
| **HalamanAbsensi** | Halaman contoh (pilot) yang dirancang dengan mengikuti Cara menyusun halaman baru. |

Spesifikasi lengkap tiap komponen ada di `_src/hcis-mobile-design-system/project/components/<Nama>/README.md` dan di situs dokumentasi.

## Panduan

- **Cara menyusun halaman baru**: `_src/hcis-mobile-design-system/project/cara-menyusun-halaman.md`
- **Layout dan responsif**: `_src/hcis-mobile-design-system/project/layout.md`
- **Pola visual**: `_src/hcis-mobile-design-system/project/patterns.md`
- **Matriks state**: `_src/hcis-mobile-design-system/project/states.md`
- **Motion**: `_src/hcis-mobile-design-system/project/motion.md`
- **Gesture**: `_src/hcis-mobile-design-system/project/gestures.md`
- **Aksesibilitas**: `_src/hcis-mobile-design-system/project/accessibility.md`
- **Teks dan microcopy**: `_src/hcis-mobile-design-system/project/microcopy.md`
- **Template halaman**: `_src/hcis-mobile-design-system/project/templates.md`
