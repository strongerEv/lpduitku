# Carousel Instagram — Duitku

Lima slide siap unggah, **1080 × 1350 px (rasio 4:5)** — ukuran potret penuh Instagram.

| Berkas | Isi |
|---|---|
| `slide-1.png` | Sampul — apa ini aplikasinya |
| `slide-2.png` | Masalah yang dipecahkan |
| `slide-3.png` | Fungsi utama: menagih via WhatsApp |
| `slide-4.png` | Kegunaan sehari-hari |
| `slide-5.png` | Privasi &amp; ajakan |

Tangkapan layarnya diambil dari aplikasi Duitku yang benar-benar dijalankan, bukan mockup.

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

Mau ganti gambar aplikasinya? Timpa berkas di `src/` dengan nama yang sama
(lebar 900 px), atau ambil ulang dari aplikasinya lewat
[`../../scripts/ambil-screenshot.mjs`](../../scripts/ambil-screenshot.mjs).

---

## Caption siap pakai

> Pernah menalangi teman, lalu bingung sendiri menagihnya?
>
> Duitku mencatat pemasukan, pengeluaran, dan siapa saja yang berhutang padamu — lalu
> menyiapkan pesan penagihannya di WhatsApp. Nominal, sisa yang belum dibayar, dan sudah
> berapa lama hutang itu berjalan terisi otomatis. Kamu tinggal pilih nada pesannya, lalu kirim.
>
> Yang bikin tenang: Duitku tidak punya server dan tidak punya akun. Semua catatanmu —
> termasuk nama dan nomor WhatsApp orang lain — tersimpan di HP-mu sendiri, dan tetap
> jalan tanpa internet.
>
> Geser untuk kenalan. Link ada di bio.
>
> #duitku #catatankeuangan #keuanganpribadi #aturduit #hutangpiutang #melekfinansial
> #keuangankeluarga #usahakecil #umkm #aplikasikeuangan

Ganti **“Link ada di bio”** di slide 5 dan di caption kalau tautannya ditaruh di tempat lain.
