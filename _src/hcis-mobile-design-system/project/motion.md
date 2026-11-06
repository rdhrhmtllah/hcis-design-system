# Motion

Gerak dipakai untuk memberi tahu apa yang berubah dan dari mana asalnya, bukan untuk menghibur. Katalog ini disusun dari kode halaman Cuti Saya: nilai di tabel adalah nilai yang benar-benar dipakai halaman itu. Agent tidak menciptakan animasi baru dari nol; ia memilih resep di sini, atau menyusun resep baru dari bahan yang sama lewat "Tangga animasi baru" di bawah.

Semua animasi mati atau disederhanakan saat perangkat meminta "kurangi gerakan" (daftar di akhir).

## 1. Bahan dasar

### Kurva

| Nama | Nilai | Dipakai untuk |
| --- | --- | --- |
| `ev-ease-enter` | `cubic-bezier(.2,.9,.25,1)` | elemen masuk: halaman, sheet, kartu, geser tab |
| `ev-ease-spring` | `cubic-bezier(.3,1.5,.5,1)` | muncul dengan pantulan: ikon, centang, toast, kartu pop |
| `ev-ease-exit` | `cubic-bezier(.5,0,.9,.4)` | elemen keluar |
| `ev-ease-standard` | `cubic-bezier(.45,0,.25,1)` | perpindahan posisi, bilah progres, tutup layar muat |

### Durasi

Tujuh token (lima lama, dua baru). `ev-t-enter` dan `ev-t-page` baru ditambahkan untuk menampung nilai mentah di halaman; resep lama di tabel bawah tetap menulis angka aslinya agar hasil bangunan sama.

| Nama | Nilai | Dipakai untuk |
| --- | --- | --- |
| `ev-t-fast` | 0,2 detik | umpan balik tekan, perubahan warna, baris popover |
| `ev-t-exit` | 0,25 detik | elemen menutup |
| `ev-t-base` | 0,3 detik | transisi umum, isi halaman muncul |
| `ev-t-mid` | 0,4 detik | perpindahan sedang |
| `ev-t-slow` | 0,5 detik | halaman, sheet, dan bagian hero masuk |
| `ev-t-enter` | 0,45 detik | blok isi dan bagian yang terbuka (menampung 0,38 sampai 0,45) |
| `ev-t-page` | 0,6 detik | kepala, blok, dan bilah aksi layar penuh; pembukaan lingkaran (menampung 0,6 dan 0,62) |

### Jarak geser baku

Jarak geser ikut jenis elemen, bukan selera: 8 sampai 16px untuk isi kecil (baris, item menu, isi halaman), 34 sampai 40px untuk geser sejajar (tab, bulan kalender), 52px untuk blok layar penuh, 100% atau 110% untuk panel yang menempel ke tepi layar.

## 2. Aturan arah

Arah gerak selalu menjawab "dari mana ini datang dan ke mana ia pergi". Gerak keluar adalah kebalikan gerak masuk, dengan durasi lebih singkat.

| Elemen | Masuk | Keluar |
| --- | --- | --- |
| Sheet dari bawah | naik dari bawah (`translateY` 100% ke 0) | turun kembali ke bawah |
| Kepala layar penuh | turun dari atas (-110% ke 0) | naik kembali ke atas |
| Bilah aksi bawah | naik dari bawah (110% ke 0), paling akhir | turun kembali, tanpa jeda |
| Blok isi layar penuh | naik 52px sambil muncul | turun 36px sambil hilang |
| Menu dan popover | tumbuh dari tombol pemicunya | menyusut ke tombol yang sama |
| Kartu popover | turun 10px dan membesar dari skala .86 | kebalikannya |
| Tab ke kanan | isi baru datang dari kanan (+34px), isi lama keluar ke kiri | – |
| Tab ke kiri | isi baru datang dari kiri (-34px), isi lama keluar ke kanan | – |
| Bulan berikutnya | geser dari kanan (+40px) | – |
| Bulan sebelumnya | geser dari kiri (-40px) | – |
| Toast | naik 30px dan membesar dari skala .92 dengan pantulan | turun sambil memudar |
| Halaman pertama dibuka | lingkaran terbuka dari tengah bawah layar | lingkaran menutup ke titik yang sama |
| Layar memuat | lingkaran terbuka dari tepi bawah (50% 92%) | menutup ke titik yang sama |

Aturan turunan: sesuatu yang datang dari tepi layar kembali ke tepi itu; sesuatu yang dipicu tombol kembali ke tombol itu; urutan geser mengikuti urutan tab (indeks naik berarti isi datang dari kanan).

## 3. Koreografi: urutan "parsial"

Layar penuh tidak muncul sekaligus. Bagian-bagiannya masuk berurutan dari yang memberi konteks ke yang memberi aksi:

1. **Kepala** turun dari atas.
2. **Ringkasan** (kartu atau angka) naik 52px.
3. **Isi** naik 52px dengan jeda lebih lambat.
4. **Bilah aksi** naik dari bawah, paling akhir.

Jeda diatur lewat variabel `--d` pada tiap bagian (`animation-delay: var(--d, 0s)`). Selisih antarbagian 40 sampai 80ms; total urutan masuk sekitar 0,6 detik dan tidak lebih dari 0,8 detik. Saat keluar, semua jeda menjadi 0 dan seluruh bagian bergerak bersamaan, lebih singkat dari masuk.

Hero halaman (ilustrasi, judul, angka besar) memakai tiga gerak masuk berbeda arah agar terasa tersusun: sisi kiri geser dari -16px, bagian atas dari -12px, bagian bawah naik 10px. Satu layar hanya punya satu gerak hero.

## 4. Katalog resep

Nilai di kolom Resep adalah nilai halaman Cuti Saya. Kolom Pakai untuk memberi tahu kapan resep dipilih. Nama resep sama dengan nama keyframe di kode agar mudah dicari.

### Halaman dan shell

| Resep | Gerak | Durasi dan kurva | Pakai untuk |
| --- | --- | --- | --- |
| `cutiReveal` / `cutiRevealOut` | lingkaran `clip-path` membuka dari (195px, 768px) sampai 840px, dan sebaliknya | 0,62 detik masuk, 0,46 detik keluar | membuka dan menutup halaman dari tombol bawah |
| `cutiContent` | naik 14px sambil muncul, tunda 0,12 detik | `ev-t-base` | isi halaman setelah lingkaran terbuka |
| `cutiInX` | geser dari -16px ke 0 | `ev-t-slow`, `ev-ease-spring`, tunda 0,2 detik | sisi kiri hero |
| `cutiInD` | turun dari -12px | `ev-t-slow`, `ev-ease-spring`, tunda 0,26 detik | bagian atas hero |
| `cutiInU` | naik 10px | 0,45 detik, ease-out, tunda 0,32 detik | bagian bawah hero |
| `cutiSwapA` / `cutiSwapB` | naik 10px sambil muncul, dua nama bergantian agar animasi dapat diputar ulang | `ev-t-base` | ganti isi tanpa arah (filter, rentang) |
| `swRA` / `swRB` | masuk dari +34px (kelas `.dR`) | 0,34 detik, `ev-ease-enter` | pindah tab ke kanan |
| `swLA` / `swLB` | masuk dari -34px (kelas `.dL`) | 0,34 detik, `ev-ease-enter` | pindah tab ke kiri |
| `calNA` / `calNB` | geser +40px | 0,34 detik, `ev-ease-enter` | bulan berikutnya |
| `calPA` / `calPB` | geser -40px | 0,34 detik, `ev-ease-enter` | bulan sebelumnya |
| `cutiPop` | naik 16px dan membesar dari skala .9 | 0,28 detik, `ev-ease-spring` | kartu kecil yang muncul |
| `cutiItemIn` | naik 10px dari skala .7 | 0,34 detik, `ev-ease-spring` | item daftar yang baru muncul |
| `.press:active` | turun 2px, kecerahan 97% | `ev-t-fast` | semua elemen yang ditekan |

Pasangan A/B dipakai bergantian (kelas `sa` / `sb`) supaya animasi yang sama bisa diulang di elemen yang sama. Jangan mengganti dengan satu kelas tetap: animasi tidak akan terputar ulang.

### Tombol melayang dan navigasi

| Resep | Gerak | Durasi dan kurva | Pakai untuk |
| --- | --- | --- | --- |
| `.fab-layer` masuk | naik 70% dari bawah, skala .7 ke 1 | transparansi 0,35 detik, geser `ev-t-slow` `ev-ease-spring` | ganti tombol melayang |
| `.fab-layer` keluar | turun 70%, mengecil | `ev-t-base` ease-in, `ev-t-mid` | tombol melayang yang diganti |
| `nv-slider` | indikator tab bergeser | `ev-t-slow`, `ev-ease-spring` | tab aktif pindah |
| `nvStretchA` / `nvStretchB` | indikator memanjang (`scaleX` 2,4 pada 35%) lalu kembali | `ev-t-slow` | peregangan saat tab berpindah jauh |
| `nv-ic` | ikon tab membal | 0,45 detik, `ev-ease-spring` | ikon tab menjadi aktif |

### Popover, menu, dan sheet

| Resep | Gerak | Durasi dan kurva | Pakai untuk |
| --- | --- | --- | --- |
| `ppScrimIn` / `ppScrimOut` | latar gelap memudar masuk dan keluar | masuk `ev-t-fast`, keluar `ev-t-exit` | latar di belakang popover dan sheet |
| `ppSheetIn` | naik dari 100% ke 0 | `ev-t-slow`, `ev-ease-enter` | sheet membuka |
| `ppSheetOut` | turun ke 100% | 0,28 detik, `ev-ease-exit` | sheet menutup |
| `ppCardIn` / `ppCardOut` | turun 10px, skala .86 ke 1 | masuk lebih panjang dari keluar | kartu popover |
| `ppItemA` / `ppItemB` | naik 8px sambil muncul, bertahap per item | 0,38 detik, `ev-ease-spring` | item di popover dan menu |
| `ppRing` | lonceng bergetar | 4 detik, berulang | ikon lonceng yang punya notifikasi baru |
| `ppBadge` | lencana membal masuk | 0,4 detik, tunda `ev-t-slow` | angka notifikasi |
| `pp-chev` | panah memutar | `ev-t-base`, `ev-ease-spring` | panah buka-tutup |
| `pp-row` | warna baris berubah | `ev-t-fast` | baris ditekan atau ditunjuk |

### Layar penuh (formulir dan hasil)

| Resep | Gerak | Durasi dan kurva | Pakai untuk |
| --- | --- | --- | --- |
| `fxTopIn` / `fxTopOut` | kepala turun dari -110% | 0,6 detik masuk, `ev-t-base` keluar | kepala layar penuh |
| `fxUpIn` | blok naik 52px sambil muncul, tunda `var(--d, 0s)` | 0,6 detik, `ev-ease-enter` | ringkasan dan isi |
| `fxUpOut` | blok turun 36px sambil hilang | 0,26 detik, `ev-ease-exit` | keluar |
| `fxBotIn` / `fxBotOut` | bilah aksi naik dari 110%, tunda 0,1 detik | 0,6 detik masuk, `ev-t-base` keluar | bilah aksi bawah |
| `fxFade` / `fxFadeOut` | memudar | `ev-t-base` | latar atau lapisan tanpa arah |
| `fxReveal` | turun 12px sambil muncul | 0,45 detik, `ev-ease-enter` | bagian yang terbuka setelah aksi |
| `fx-sh` | sheet di atas layar penuh | masuk 0,45 detik, keluar 0,28 detik | pemilih dari dalam formulir |

Kelas `.cuti-form` untuk masuk dan `.cuti-form-out` untuk keluar; saat keluar semua `--d` menjadi 0.

### Bilah atas yang mengikuti scroll

Dipakai hanya bila browser mendukung `animation-timeline: scroll()` (dibungkus `@supports`). Jarak scroll adalah rentang animasi, bukan waktu.

| Resep | Rentang scroll | Efek |
| --- | --- | --- |
| `tbBg` | 0 sampai 56px | latar bilah muncul |
| `tbProg` | seluruh scroll | garis progres memanjang (`scaleX`) |
| `tbTitle` | 0 sampai 44px | judul kecil muncul |
| `tbA` | 22 sampai 62px | grup aksi pertama bergeser |
| `tbB` | 30 sampai 72px | grup aksi kedua bergeser |
| `tbArt` | 0 sampai 150px | ilustrasi kepala memudar |

Rentang saling tumpang tindih dan dimulai berurutan (0, 22, 30) supaya perubahan terasa berlapis. Tanpa dukungan browser, bilah atas langsung dalam keadaan akhir.

### Memuat dan mengirim

| Resep | Gerak | Durasi dan kurva |
| --- | --- | --- |
| `ldIn` / `ldOut` | lingkaran `clip-path` dari 50% 92% | 0,6 detik masuk, 0,45 detik keluar, `ev-ease-standard` |
| `ldSpin` | spinner berputar | 1,1 detik, linear, berulang |
| `ldBar` | bilah progres | 2,1 detik, `ev-ease-standard` |
| `ldMsg` | pesan status bergantian | 0,75 detik per pesan |
| `ldDrift`, `ldStr` | gumpalan latar melayang, garis cahaya | 7 detik, 2,2 detik, berulang |
| `ldCardIn` / `ldCardOut` | kartu membal masuk (skala .5, putar -8 derajat); keluar tunda 0,72 detik | `ev-t-slow` `ev-ease-spring`; keluar `ev-t-base` `ev-ease-exit` |
| `ldTrail`, `ldComet`, `ldPing`, `ldFill` | jejak, komet di jalur, denyut, pengisian | 1,1 detik, jalur `offset-path`, 1,5 detik, `ev-t-slow` spring |
| `pn-load`, `pn-ok`, `pn-net`, `pn-srv`, `pn-con`, `pn-bal` | keadaan jalur persetujuan: memuat, berhasil, jaringan, server, bentrok, saldo; tiap keadaan memakai variasi komet dan jejak | tunda lewat `--s` |

### Berhasil dan gagal

| Resep | Gerak | Durasi dan kurva |
| --- | --- | --- |
| `sxDisc` | cakram membal masuk | 0,6 detik, `ev-ease-spring`, tunda 0,3 detik |
| `sxRing` | cincin menyebar | 1,2 detik |
| `sxDraw` | garis centang tergambar | `ev-t-slow`, tunda 0,65 detik |
| `sxBurst` | konfeti memercik | 1,4 detik, `ev-ease-enter` |
| `sxFill` | garis penghubung terisi | 0,9 detik, tunda 0,8 detik |
| `fxNew` | halo emas di kartu baru | 0,8 detik, tunda 0,35 detik |
| `flShake` | kartu bergetar saat gagal | `ev-t-base` atau `ev-t-slow` |
| `svrIn`, `svBlink`, `svWarn` | keadaan galat server | satu kali, lalu berkedip pelan |

Urutan sukses: cakram, cincin, centang tergambar, konfeti, lalu garis terisi. Tiap tahap menunggu tahap sebelumnya (lihat tunda).

### Toast dan umpan balik

| Resep | Gerak | Durasi dan kurva |
| --- | --- | --- |
| `ttIn` | naik 30px, skala .92 ke 1 | `ev-t-slow`, `ev-ease-spring` |
| `ttOut` | turun dan memudar | `ev-t-exit`, `ev-ease-exit` |
| `ttShkA` / `ttShkB` | getar horizontal untuk galat | bergantian agar dapat diulang |
| `ttBar*` | bilah waktu menyusut | `var(--dur, 3s)`, linear |
| `ttInd` | bilah tak tentu | 1,1 detik, berulang |
| `ttDraw` | ikon tergambar | `ev-t-mid` |
| `tt-spin` | spinner kecil | 0,8 detik |

Durasi toast: 3,2 detik biasa, 5,2 detik dengan tombol aksi, 6,5 detik untuk galat (lihat [Teks dan microcopy](microcopy)).

### Lain-lain

| Resep | Gerak | Durasi dan kurva | Pakai untuk |
| --- | --- | --- | --- |
| `skSh` | kilap skeleton bergeser | 1,5 detik, linear, berulang | memuat daftar |
| `emFl`, `emSp` | ilustrasi kosong melayang, kilau berkedip | 3,2 detik, 2,4 detik | keadaan kosong |
| `apPop` | skala 0 ke 1 | 0,45 detik, `ev-ease-spring` | lencana status, penanda |
| `cfRow` | baris konfirmasi naik 12px | `ev-t-slow`, `ev-ease-enter` | isi ConfirmSheet |
| `cfRing` | cincin denyut | 2 detik, jeda 0,9 detik antar cincin | piringan ConfirmSheet |
| `rbGrow` | batang tumbuh dari bawah (`scaleY`) | 0,7 detik, `ev-ease-spring` | batang MonthChart |
| `ppBar` | kilap bilah progres | 1,6 detik | progres unduhan |
| `cutiFloat`, `cutiPulse`, `cutiTwinkle`, `cutiDrift`, `cutiShine` | hiasan kepala: melayang, berdenyut, berkelip, hanyut, mengkilap | 5,5; 1,8; 2,4; 3,6; 4,5 detik | hanya hiasan kepala gradien |

## 5. Tangga animasi baru

Animasi baru hanya boleh muncul bila resep di atas tidak cukup. Naiki tangga ini berurutan dan berhenti di anak tangga pertama yang cukup.

1. **Cari resep.** Apakah masalahnya sudah terjawab oleh satu resep di katalog? Pakai resep itu apa adanya.
2. **Susun dari bahan dasar.** Apakah dua atau tiga resep bisa disambung (misalnya kepala, ringkasan, isi, bilah aksi)? Susun dengan kurva dan durasi dari token, jarak dari jarak geser baku, dan selisih jeda 40 sampai 80ms.
3. **Resep baru.** Hanya bila 1 dan 2 tidak cukup. Tulis **brief gerak** (di bawah) dan serahkan untuk disetujui sebelum membangun.

### Brief gerak

| Isi | Pertanyaan |
| --- | --- |
| Tujuan | Apa yang diberitahukan gerak ini ke pengguna? Apa yang hilang bila gerak ini tidak ada? |
| Asal dan arah | Dari mana elemen datang dan ke mana pergi? Apa kebalikannya saat keluar? |
| Bahan | Kurva dan durasi dari token yang mana? Berapa jarak geser, dari tabel jarak baku mana? |
| Koreografi | Posisinya di urutan kepala, ringkasan, isi, bilah aksi. Berapa tunda? |
| Gesture | Bila elemen bisa diseret, bagaimana animasi dimatikan saat jari menahan? |
| Kurangi gerakan | Apa versi tanpa gerak atau versi pendeknya? |
| Cara uji | Perangkat nyata mana, apa yang diamati (arah, ketukan, kejutan)? |

Brief yang tidak lengkap tidak diterima. Setelah disetujui dan diuji di perangkat, resepnya didaftarkan ke katalog ini dengan nama keyframe, nilai, dan "pakai untuk".

## 6. Pagar pengaman

- Satu gerak hero per layar. Hiasan berulang hanya di kepala gradien dan keadaan kosong.
- Total urutan masuk layar sekitar 0,6 detik, tidak lebih dari 0,8 detik.
- Hanya `transform` dan `opacity` (plus `clip-path` untuk pembukaan lingkaran). Jangan menganimasikan `width`, `height`, `top`, `left`, atau `box-shadow`.
- Keluar lebih singkat dari masuk, dan jeda keluar selalu 0.
- Gerak menutup searah dengan sumbernya (bagian 2).
- Animasi harus bisa diinterupsi: ketuk kedua atau gesture langsung mengambil alih.
- Animasi CSS dengan fill `both` menimpa transformasi inline. Saat gesture mengendalikan elemen, matikan animasinya lebih dulu.
- Hiasan berulang berhenti saat tab tidak terlihat atau elemen di luar layar.

## 7. Kurangi gerakan

Pada `prefers-reduced-motion: reduce` halaman Cuti Saya tidak memakai versi pendek; animasi dimatikan dan elemen langsung berada di keadaan akhir:

- Berhenti dan langsung ke keadaan akhir: pembukaan lingkaran (`cutiReveal`, `ldIn`), isi halaman (`cutiContent`, hero `cutiIn*`), ganti tab dan bulan (`sa`/`sb`, `cal*`), popover dan sheet (`pp*`), hiasan kepala (`cutiFloat`, `cutiPulse`, `cutiShine`), skeleton, ilustrasi kosong, `cfRow`, `apPop`, `rbGrow`, dan toast.
- Dihilangkan: cincin konfirmasi (`cfRing`), cincin dan konfeti sukses (`sxRing`, `sxBurst`), garis cahaya dan riak layar muat.
- Keadaan akhir informatif tetap tampil: centang sudah tergambar penuh, jalur berhasil sudah terisi, label "Terkirim" langsung terlihat.
- Aturan untuk animasi baru: sediakan blok `prefers-reduced-motion` yang membuat elemen langsung ke keadaan akhir yang bermakna. Gerak yang membawa informasi (spinner) boleh diganti petunjuk statis, jangan dibiarkan kosong.

## 8. Catatan jujur: nilai mentah di halaman

Halaman Cuti Saya memakai beberapa nilai di luar token: durasi 0,28, 0,34, 0,38, 0,45, 0,6, 0,62, 0,7, 0,8, 0,9 detik, dan kurva `ease`, `ease-out`, `ease-in` polos. Nilai-nilai ini sengaja dicatat apa adanya di katalog supaya hasil bangunan sama dengan halaman. Untuk resep baru berlaku: **durasi dan kurva datang dari token atau dari resep terdaftar, tidak ada nilai bebas.**

Sudah disetujui dan ditambahkan: `ev-t-enter` 0,45 detik dan `ev-t-page` 0,6 detik. Angka 0,28, 0,7, 0,8, dan 0,9 detik tetap hanya berlaku di resep yang mencantumkannya; resep baru tidak boleh memakainya.

Belum diuji di perangkat sungguhan: nuansa gerak dan gesture. Rasakan langsung di ponsel sebelum mengunci angka.
