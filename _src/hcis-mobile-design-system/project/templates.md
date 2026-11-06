# Template halaman

Resep susunan untuk enam jenis halaman. Setiap template menyebut komponen mana, dalam urutan apa, dengan jarak berapa. Mobile adalah acuan dan diambil dari halaman Cuti Saya; tablet dan desktop adalah usulan (lihat [Layout dan responsif](layout)).

**Satuan jarak halaman (mobile):** margin samping kartu `ev-sp-14`; jarak antar kartu atau bagian `ev-sp-12`; jarak antar baris daftar `ev-sp-8` sampai `ev-sp-10`; ruang bawah sebelum BottomNav 40px; kepala bagian (label kecil) padding 12 / 6 / 6.

## 1. Beranda modul (contoh: Cuti Saya)
1. **Hero** ([PageHeader](components/PageHeader) varian beranda): gradien ungu, sapaan, ringkasan dalam pil.
2. **Ilustrasi** (satu panggung ilustrasi di bawah hero).
3. **[BalanceCard](components/BalanceCard)** "Hak cuti tahunan" dengan tombol ⓘ (lihat [Tooltip](components/Tooltip)).
4. **[ShortcutTile](components/ShortcutTile)** tiga pintasan (`nav`, margin atas `ev-sp-14`).
5. **Pengajuan aktif:** kepala bagian lalu daftar [RequestCard](components/RequestCard); bila kosong [EmptyState](components/EmptyState); saat memuat [Skeleton](components/Skeleton).
6. **[BottomNav](components/BottomNav)** menempel dasar.
Penggulir: seluruh halaman di bawah hero ikut bergulir; BottomNav tetap.

## 2. Halaman daftar (contoh: Riwayat)
1. **Kepala halaman penuh** ([PageHeader](components/PageHeader) varian dalam): tombol kembali kaca, judul 22/700, keterangan 12/500, pil emas konteks ("2026").
2. **Ringkasan** ([MonthChart](components/MonthChart) atau [StatTile](components/StatTile)).
3. **Saringan** ([FilterChip](components/FilterChip)), membungkus, area 44px.
4. **Daftar** dikelompokkan per bulan dengan kepala bulan; baris [HistoryRow](components/HistoryRow).
5. Keadaan: memuat (Skeleton 72px), kosong (EmptyState per saringan), galat ([InlineMessage](components/InlineMessage) + "Coba lagi").
Padding isi: 4 / 14 / 40. Isi masuk bergantian 80ms dengan `fx-up`.

## 3. Halaman detail (contoh: Detail pengajuan)
1. Kepala halaman penuh dengan kode pengajuan sebagai judul.
2. **Banner status** ([Banner](components/Banner)): hasil keputusan atau keadaan terkini ("Pengajuan disetujui").
3. **Kartu ringkasan:** rentang, [StatusChip](components/StatusChip), [InfoList](components/InfoList) bentuk B.
4. **Kartu "Status persetujuan":** [ApprovalStepper](components/ApprovalStepper) vertikal dengan waktu per tahap.
5. **Kartu "Informasi":** InfoList bentuk A.
6. **[ActionBar](components/ActionBar)** isi 1, menempel dasar. Ruang bawah isi = tinggi bilah + `ev-sp-12`.
Kartu bersusun dengan jarak `ev-sp-12`, masuk bergantian 80ms.

## 4. Formulir bertahap (contoh: Ajukan cuti)
1. Kepala halaman penuh dengan judul jenis ("Cuti tahunan") dan pil langkah ("Langkah 1 dari 2").
2. **Kartu bernomor:** tiap bagian satu kartu (nomor 24px di kiri judul). Isi: [TextField](components/TextField), [Select](components/Select), [DateRangePicker](components/DateRangePicker), [Attachment](components/Attachment), [SelectionControls](components/SelectionControls).
3. **[InlineMessage](components/InlineMessage)** untuk pesan validasi dan aturan jenis cuti.
4. **[ActionBar](components/ActionBar)** isi 2: ringkasan + tombol "Pilih tanggal cuti" lalu "Kirim pengajuan".
5. **[SendingScreen](components/SendingScreen)** menutup layar saat kirim, lalu [SuccessScreen](components/SuccessScreen) atau layar galat. Data isian dipertahankan pada galat.
Validasi: tombol utama nonaktif tetapi tetap dapat diketuk untuk menampilkan alasan; kolom bermasalah digulir ke tampilan dan diberi pesan di bawahnya, bukan alert.

## 5. Menu semua modul
[MenuOverlay](components/MenuOverlay) menutup layar dari FAB menu: kolom pencarian di atas, kisi ubin modul (ubin 3D), modul aktif ditandai. Tutup dengan tombol silang, gesture turun, atau memilih modul. Di tablet dan desktop diganti [SideNav](components/SideNav). *(usulan)*

## 6. Panel sampingan (Notifikasi, Aktivitas, Bantuan, Lokasi saya)
Semua dibuka lewat [Popover](components/Popover): kepala gradien dengan judul, pil emas, dan (untuk Notifikasi dan Bantuan) tab kaca; isi bergulir di bawahnya. Isi per panel: [NotificationRow](components/NotificationRow), [ActivityPanel](components/ActivityPanel), [HelpPanel](components/HelpPanel), [LocationPath](components/LocationPath). Aturan: satu panel terbuka pada satu waktu; membuka panel lain menukar isi dengan pergantian halus (`popSwap`), bukan menumpuk.

## Aturan umum
- Satu tombol utama per layar. Satu panel atau sheet pada satu waktu.
- Kepala halaman penuh selalu punya tombol kembali 44px (ubin kaca 34px) di kiri.
- Aksi utama halaman berada di [ActionBar](components/ActionBar), bukan melayang di isi.
- Keadaan memuat, kosong, dan galat wajib ada di setiap daftar (lihat [Matriks state](states)).
