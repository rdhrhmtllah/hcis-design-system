# Aksesibilitas

## Kontras
- Teks biasa minimal **4,5 : 1**; teks besar (18px tebal atau 24px) minimal 3 : 1.
- `ev-ink-3` (3,5 : 1) **hanya** untuk hiasan, bukan teks yang perlu dibaca.
- Emas tidak boleh jadi warna teks di atas putih (1,57 : 1). Teks di atas emas memakai `ev-gold-ink`.
- Warna `*-dot` untuk titik, ikon, dan garis. Teks di atas status memakai pasangan `*-bg` dan `*-ink`. Teks putih hanya boleh di atas `ev-no-dot` (4,67 : 1, setelah digelapkan dari `#d6416e` yang hanya 4,34) dan `*-deep`; di atas `ev-wait-dot` (2,69) dan `ev-ok-dot` (3,41) tidak boleh.
- Status tidak boleh hanya dibedakan lewat warna: selalu sertakan label teks.

## Area ketuk
Semua kontrol minimal **44 x 44px** (`ev-touch`). Chip yang tampak lebih kecil memperluas area lewat `::after` tak terlihat.

## Papan ketik
- Urutan Tab mengikuti urutan baca. Tidak ada `tabindex` positif.
- Semua aksi gesture punya jalan klik atau tombol.
- `Esc` menutup Dialog, Popover, dan MenuOverlay; fokus kembali ke pemicu.
- Dialog dan Sheet menjebak fokus selama terbuka.
- Panah mengatur Tabs, Select, dan menu; Enter atau Spasi memilih.

## Cincin fokus
Cincin 2px `ev-purple-600` dengan jarak 2px dari tepi, tampil dengan `:focus-visible`. Di atas latar ungu tua pakai `ev-white`. Jangan menghapus outline tanpa pengganti.

## Gerak
Hormati `prefers-reduced-motion`: ganti perpindahan dengan pudar singkat dan matikan kilau Menu.

## Pembaca layar
- Ikon tanpa teks wajib punya `aria-label`.
- Status berubah (toast, galat) diumumkan lewat `role="status"` atau `role="alert"`.
- Tabel memakai `<table>` sungguhan dengan `<th scope>`.
