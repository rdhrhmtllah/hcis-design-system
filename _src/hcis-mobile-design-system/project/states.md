# Matriks state

Daftar keadaan yang wajib dirancang untuk setiap jenis komponen. Komponen baru belum selesai bila ada baris "wajib" yang belum punya tampilan. Keadaan umum dijelaskan sekali di sini; keadaan khusus ada di panduan masing-masing komponen.

## Keadaan umum interaksi
| State | Tampilan | Berlaku untuk |
|---|---|---|
| Normal | seperti panduan komponen | semua |
| Hover (hanya penunjuk halus) | naik 2px atau latar `ev-tint`; kursor pointer | tombol, baris, kartu yang bisa diketuk |
| Ditekan | tombol 3D turun, tepi bawah menipis; baris berlatar `ev-tint`; durasi `ev-t-fast` | semua yang bisa diketuk |
| Fokus (papan ketik) | garis 2px `ev-purple-600`, jarak 2px, mengikuti radius | semua yang bisa difokus |
| Nonaktif | `aria-disabled`, isian `ev-purple-150`, teks `ev-ink-3`, tanpa bayangan; tetap bisa diketuk bila perlu menjelaskan alasannya | tombol, kolom, pilihan |
| Terpilih | isian `ev-purple-50`, garis 2px `ev-purple-600`, tanda centang | pilihan, filter, baris |
| Memuat | [Skeleton](components/Skeleton) atau label kata kerja berjalan; tombol nonaktif | tombol, daftar, kartu |
| Kosong | [EmptyState](components/EmptyState) atau satu baris keterangan | daftar, panel |
| Galat | [InlineMessage](components/InlineMessage) atau layar galat; selalu ada aksi pemulihan | isian, daftar, aksi |
| Berhasil | label berubah menyatakan hasil, nada `ev-ok-*`, toast bila di luar layar | aksi |

## Matriks per jenis komponen
Tanda ● = wajib ada, ○ = bila relevan, – = tidak berlaku.
| Komponen | Normal | Hover | Ditekan | Fokus | Nonaktif | Terpilih | Memuat | Kosong | Galat | Berhasil |
|---|---|---|---|---|---|---|---|---|---|---|
| Button, ActionBar | ● | ○ | ● | ● | ● | – | ● | – | ○ | ● |
| ShortcutTile, FilterChip, Tabs | ● | ○ | ● | ● | ○ | ● | – | – | – | – |
| TextField, Select, DateRangePicker | ● | ○ | – | ● | ● | – | ○ | – | ● | ○ |
| Attachment | ● | ○ | ● | ● | ● | – | ● | – | ● | ● |
| SelectionControls | ● | ○ | ● | ● | ● | ● | – | – | ○ | – |
| RequestCard, HistoryRow, NotificationRow, JobRow, GuideRow, ContactRow | ● | ○ | ● | ● | ○ | ○ | ● | – | – | – |
| Accordion, ContactRow, HistoryRow (buka-tutup) | ● | ○ | ● | ● | – | ● | ○ | – | – | – |
| DataTable, ActivityPanel, HelpPanel | ● | ○ | ● | ● | – | ○ | ● | ● | ● | – |
| StatCard, StatTile, MonthChart, BalanceCard | ● | – | ○ | ○ | – | – | ● | ● | ○ | – |
| Sheet, ConfirmSheet, Dialog, Popover | ● (masuk/keluar) | – | – | ● (jebakan fokus) | – | ○ | ○ | – | ● | ○ |
| Toast, Banner, InlineMessage | ● (empat nada) | – | ○ | ○ | – | – | – | – | – | – |
| SendingScreen, SuccessScreen | ● | – | – | ● | – | – | ● | – | ● | ● |

## Keadaan data per halaman
Setiap halaman yang memuat data harus menggambar lima keadaan ini, urutan keputusannya: **memuat → galat → kosong → berisi**. Pratinjau kondisi data (tray di halaman referensi) hanya alat desain dan harus dihapus sebelum produksi. Hanya baris pertama (urutan) yang dibaca dari halaman; angka waktu di bawah adalah usulan.
| Keadaan | Tampilan | Aturan |
|---|---|---|
| Memuat | Skeleton dengan bentuk dan tinggi yang sama dengan isi nyata | Usulan: tampil setelah 150ms dan minimal 400ms agar tidak berkedip |
| Galat | InlineMessage atau layar galat dengan "Coba lagi" | Data lama tetap ditampilkan bila ada (jangan mengosongkan) |
| Kosong | EmptyState dengan teks dari [Teks dan microcopy](microcopy) | Aksi hanya bila relevan |
| Berisi | Isi normal | Masuk bergantian bila pertama muncul |
| Luring | Banner/bilah peringatan di atas ("Tidak ada koneksi") dengan data terakhir | Pulih: toast "Tersambung kembali" |

## Aturan gerak per state
Masuk `ev-ease-enter` dengan durasi dari resep di [Gerak](motion) (umumnya `ev-t-base` sampai `ev-t-slow`); keluar `ev-ease-exit`, lebih singkat dari masuk; ditekan `ev-t-fast`; sakelar dan indikator tab memakai `ev-ease-spring`. Semua animasi mati atau diganti perubahan instan pada `prefers-reduced-motion` (lihat [Gerak](motion)).
