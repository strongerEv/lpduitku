# Landing Page Duitku

Halaman penjualan untuk **[Duitku](https://github.com/strongerEv/duitkurapi)** — aplikasi pencatat
keuangan pribadi & manajemen hutang dengan penagihan langsung via WhatsApp.

HTML + CSS + sedikit JavaScript biasa. **Tanpa framework, tanpa `npm install`, tanpa proses build.**
Buka `index.html` di browser, halamannya langsung jalan.

---

## ⚡ Dua hal yang perlu kamu isi

Keduanya ada di paling atas berkas [`js/main.js`](js/main.js):

```js
const CHECKOUT_URL = '';   // ← tempel link checkout-mu di sini
const HARGA        = '';   // ← tulis angkanya saja, contoh: '149.000'
```

| Yang diisi | Efeknya |
|---|---|
| `CHECKOUT_URL` | Semua tombol **“Dapatkan Duitku”** di halaman (navbar, hero, kartu harga, CTA penutup) langsung mengarah ke sana. Selama masih kosong, tombolnya cuma menggulir ke bagian Harga — jadi halaman tetap aman dipublikasikan. |
| `HARGA` | Angka di kartu harga. Tanpa `Rp`, tanpa spasi — cukup `149.000`. Selama kosong, yang tampil tanda `—`. |

Isi paket di kartu harga ada di `index.html`, cari `<ul class="ticks price-list">`.
Ganti isinya sesuai apa yang benar-benar didapat pembeli.

---

## 🚀 Cara menerbitkan

Isinya statis semua, jadi bisa di-hosting di mana saja tanpa konfigurasi.

**GitHub Pages** — *Settings → Pages → Source: Deploy from a branch*, pilih branch ini
dan folder `/ (root)`. Berkas `.nojekyll` sudah disertakan supaya Pages tidak memproses ulang isinya.

**Netlify / Vercel / Cloudflare Pages** — seret foldernya, atau hubungkan repo ini
tanpa mengisi build command dan tanpa output directory.

**Server sendiri** — salin seluruh isi folder ke direktori web. Sudah selesai.

Mencoba di komputer sendiri:

```bash
python3 -m http.server 4173
# buka http://127.0.0.1:4173
```

---

## 📁 Isi repositori

```
index.html            Seluruh halaman
css/style.css         Tampilan — palet & radiusnya diambil dari design system aplikasinya
css/fonts.css         Deklarasi font
js/main.js            Link checkout, harga, menu mobile, animasi scroll
fonts/                Plus Jakarta Sans (variable, subset latin, 27 KB) + lisensinya
img/icon.svg          Logo Duitku
img/og.png            Gambar pratinjau saat tautannya dibagikan
img/screens/          16 tangkapan layar aplikasi, mode terang & gelap
scripts/              Skrip pengambil ulang tangkapan layar
.nojekyll             Supaya GitHub Pages menyajikan berkasnya apa adanya
```

---

## 🖼️ Tangkapan layarnya dari mana?

Bukan mockup — semuanya diambil dari aplikasi Duitku yang benar-benar dijalankan, diisi
Data Contoh, lalu difoto pakai Playwright di viewport 390×844 dengan kerapatan piksel 3×,
kemudian dikecilkan ke lebar 640 px dan disimpan sebagai WebP (16 berkas, total ±840 KB).

Kalau tampilan aplikasinya berubah, ambil ulang semuanya dengan satu perintah:

```bash
# 1. jalankan aplikasinya dulu di repositori duitkurapi
npm run dev

# 2. lalu di repositori ini
npm install playwright && npx playwright install chromium
node scripts/ambil-screenshot.mjs
```

Skripnya memakai jam yang dipatok ke satu tanggal tetap, jadi angka pada tangkapan layar
selalu sama persis setiap kali diambil ulang — data contoh aplikasinya memakai tanggal relatif.
Kalau aplikasinya jalan di alamat lain, set `DUITKU_URL` sebelum menjalankan skripnya.

> Playwright hanya dibutuhkan untuk mengambil ulang gambar. Landing page-nya sendiri
> tetap tanpa dependensi apa pun.

---

## 🎨 Catatan desain

- Palet, radius sudut, dan bayangannya menyalin `src/index.css` milik aplikasi
  (hijau `#12996B` → mint `#1FD08A`) supaya halaman ini dan aplikasinya terasa satu keluarga.
- **Mode gelap** mengikuti setelan perangkat pengunjung lewat `prefers-color-scheme`.
- **Tanpa pemanggilan pihak ketiga.** Fontnya di-host sendiri, tidak ada analitik, tidak ada
  CDN, tidak ada tracker — sejalan dengan janji privasi yang tertulis di halamannya.
- Kalau JavaScript mati, seluruh isi halaman tetap terbaca; yang hilang cuma animasinya.
- Menghormati `prefers-reduced-motion` untuk pengunjung yang mematikan animasi.

---

## 📄 Lisensi

Kode halaman ini mengikuti lisensi aplikasinya (MIT).
Font Plus Jakarta Sans berlisensi SIL Open Font License 1.1 — lihat [`fonts/OFL.txt`](fonts/OFL.txt).
