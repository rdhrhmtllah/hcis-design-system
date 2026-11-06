Isi panel "Aktivitas": ringkasan jumlah proses, daftar proses per grup, dan tombol bersihkan. Di halaman referensi ia tampil di dalam [Popover](../Popover) (mobile: dari bawah). Komponen ini hanya mengatur isi; judul, tombol tutup, dan wadah milik Popover.

**Susunan (dari atas):**
1. **Tiga [StatTile](../StatTile) hitungan** sejajar (Berjalan ungu, Selesai hijau, Terjadwal biru), padding 14 / 16 / 4, jarak `ev-sp-8`.
2. **Grup.** Setiap grup diawali judul huruf kapital 12/600, jarak huruf .4px, warna `ev-purple-accent`, bentuk "BERJALAN · 2" (nama grup, titik tengah, jumlah); padding 10 / 20 / 6. Isi grup adalah daftar [JobRow](../JobRow). Urutan grup tetap: Berjalan, Selesai (termasuk gagal), Terjadwal. Grup kosong tidak ditampilkan.
3. **Keadaan kosong:** satu paragraf rata tengah 13/500 `ev-ink-2`, padding 28 / 16: "Belum ada proses. Unduhan dan export kamu akan muncul di sini." Pakai [EmptyState](../EmptyState) bila panel dibuka di tablet atau desktop (ruang lebih besar).
4. **Bilah bawah "Bersihkan yang selesai":** menempel di dasar panel, tinggi 52, putih, bayangan ke atas ringan, teks 13/700 `ev-purple-800`. Nonaktif (opasitas .4, tidak bisa diketuk) bila tidak ada proses selesai. Hanya membersihkan yang selesai dan gagal; berjalan dan terjadwal tetap.

**Perilaku:** persen proses diperbarui langsung (transisi lebar .8s linear). Batal menghapus baris tanpa konfirmasi karena prosesnya ringan; tombol "Ulangi" mengembalikan baris ke Berjalan. Mengunduh mengubah tombol menjadi "Terunduh". Sakelar terjadwal berlaku seketika dan tidak perlu simpan.

**Gesture:** gulir di dalam daftar; tarik ke bawah dari tepi atas panel menutup panel (lihat [Popover](../Popover)).

**State:** berisi, kosong, memuat ([Skeleton](../Skeleton) tiga JobRow), galat memuat ([InlineMessage](../InlineMessage) di atas daftar dengan "Coba lagi").

**Aksesibilitas:** daftar `role="list"`; setiap JobRow `role="listitem"`. Perubahan jumlah di StatTile diumumkan lewat satu `aria-live="polite"` ("2 berjalan, 3 selesai").

**Responsif:** mobile: isi Popover dari bawah, tinggi maksimal 80%. Tablet: panel samping kanan `ev-w-panel`. Desktop: panel melayang di bawah ikon Aktivitas pada header, lebar `ev-w-panel`. Isi sama di semua. *(usulan)*

**Yang disediakan konsumen:** daftar proses, handler per aksi, handler bersihkan.
