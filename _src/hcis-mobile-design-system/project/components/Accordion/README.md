Kartu lipat: setiap bagian membuka rincian di bawah kepalanya. Disalin dari kartu jenis cuti pada halaman Jenis cuti.

**Kepala (tinggi minimal 72px):** ubin ikon 42px `ev-r-lg` (latar tint, garis 1px `-edge`, ikon `-ink`), judul `title-s` 15/700, dua baris keterangan 12/600 (`ev-ink-2`, lalu `ev-purple-800` untuk alur), dan di kanan kapsul emas `ev-r-md` tinggi 24px ("12 hari / tahun", teks `ev-gold-ink` 12/600) dengan panah 20px `ev-purple-800` di bawahnya. Panah berputar 180 derajat (`ev-t-base`).

**Kartu:** `ev-white`, `ev-r-2xl`, `ev-sh-card`, jarak antar kartu 10px.

**Isi terbuka:** garis atas 1px `ev-purple-50`, padding 14px.
- **Aturan:** butir persegi 7px `ev-r-xs` `ev-purple-400`, teks `body-sm` 13/500.
- **Alur persetujuan:** kotak `ev-tint` dengan garis 1px `ev-purple-100`, `ev-r-lg`; langkah bernomor ubin 24px `ev-r-md` dihubungkan garis 4px (`ev-purple-600` untuk yang selesai), nama langkah 13/700 dan keterangan 12/500 di bawahnya.
- **Tombol:** [Button](../Button) utama tinggi 50px "Ajukan cuti ini".

**Perilaku:** satu kepala = satu tombol dengan `aria-expanded` dan `aria-controls`. Boleh buka satu per satu (bukaan baru menutup yang lain) atau banyak, sesuai konteks. Isi terungkap dengan tinggi dan pudar `ev-t-base`; `prefers-reduced-motion` langsung berganti.

**State:** tertutup, terbuka, hover (kepala `ev-purple-50`), fokus (cincin 2px), nonaktif (pudar 55%, kapsul abu).

**Responsif:** penuh lebar di mobile; tablet dan desktop dua kolom bila kartu pendek. *(usulan)*

**Yang disediakan konsumen:** ikon dan warna tint, judul, keterangan, kapsul, isi, status bukaan.
