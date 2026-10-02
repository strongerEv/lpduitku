# Carousel Portfolio — @yubuilds

Lima slide siap unggah, **1080 × 1350 px (rasio 4:5)**, dalam identitas visual feed
**@yubuilds**: merah gelap, pendar oranye, aksen kuning, judul kapital tebal.

Postingan ini adalah **studi kasus portfolio** — memperlihatkan aplikasi Duitku sebagai
karya yang dibangun, lalu mengajak pembaca mengobrolkan proyeknya sendiri.

| Berkas | Isi |
|---|---|
| `slide-1.png` | Sampul — apa yang dibangun |
| `slide-2.png` | Masalah yang dipecahkan |
| `slide-3.png` | Fitur inti: menagih via WhatsApp |
| `slide-4.png` | Isi aplikasinya |
| `slide-5.png` | Cara kerjanya dibangun + ajakan DM |

Tangkapan layarnya diambil dari aplikasi yang benar-benar dijalankan, bukan mockup.
Warnanya sengaja dibiarkan hijau — itu memang warna produknya. Bingkainya milik yubuilds,
isinya karya yang ditampilkan.

---

## Mengubah isinya

Semua teks dan tata letaknya ada di [`carousel.html`](carousel.html) — satu berkas, lima
`<section class="slide">`. Ubah teksnya di situ, lalu render ulang:

```bash
# dari akar repositori
npm install playwright && npx playwright install chromium
python3 -m http.server 4173 &
node social/instagram/render.mjs
```

Hasilnya menimpa `slide-1.png` … `slide-5.png`.

Tata letaknya memakai aliran flex dan elemen bawah diturunkan dengan `margin-top:auto`,
jadi kalau teksnya kamu panjangkan, isinya bergeser — bukan saling menimpa.

Mau ganti gambar aplikasinya? Timpa berkas di `src/` dengan nama yang sama (lebar 900 px),
atau ambil ulang lewat [`../../scripts/ambil-screenshot.mjs`](../../scripts/ambil-screenshot.mjs).

### Memakainya ulang untuk proyek lain

Kerangkanya sengaja dibuat tidak terikat Duitku. Untuk studi kasus berikutnya:

1. Salin `carousel.html` dan folder `src/`
2. Ganti isi `src/` dengan tangkapan layar proyek yang baru
3. Ganti teks tiap slide dan baris kanan pada rel bawah (`Duitku · Personal Finance`)
4. Bagian atas (`PROJECT FILE BY YUBUILDS`), rel `Idea → System → App`, dan CTA di slide 5
   dibiarkan apa adanya — itu yang menjaga feed tetap satu nada

---

## Caption siap pakai

> **PROJECT FILE — Duitku**
>
> Satu keluhan yang sering saya dengar: sungkan menagih uang yang sudah dipinjam orang.
> Dari situ alurnya saya bongkar, lalu saya bangun jadi aplikasi.
>
> Duitku mencatat pemasukan dan pengeluaran harian, menyimpan siapa saja yang berhutang,
> lalu menyiapkan pesan penagihannya di WhatsApp — nominal, sisa yang belum dibayar, dan
> sudah berapa lama hutang itu berjalan terisi otomatis. Penggunanya tinggal memilih nada
> pesannya, lalu kirim.
>
> Satu hal yang saya jaga sejak awal: aplikasinya tidak punya server. Semua data tersimpan
> di perangkat penggunanya dan tetap jalan offline — karena catatan hutang memuat nama dan
> nomor WhatsApp orang lain.
>
> Dibangun dengan React + TypeScript, dibungkus Capacitor supaya jalan juga sebagai aplikasi
> Android, dan bisa disinkronkan ke Google Sheets milik pengguna lewat Apps Script.
>
> Punya proses yang masih manual? Ceritakan alurnya lewat DM — nanti kita bongkar bareng.
>
> #yubuilds #projectportfolio #aplikasikustom #reactjs #typescript #googleappsscript
> #googlesheets #automation #digitalisasiumkm #sistembisnis #webdeveloper #appdeveloper

Kalau nanti CTA-nya diarahkan ke tempat lain, ubah tombol di slide 5 (`DM @yubuilds`)
dan baris penutup caption ini.
