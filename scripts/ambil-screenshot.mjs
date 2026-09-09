/**
 * Mengambil ulang seluruh tangkapan layar aplikasi untuk landing page ini.
 *
 * Bukan mockup — halaman aplikasinya benar-benar dijalankan, diisi Data Contoh,
 * lalu difoto pada viewport 390×844 dengan kerapatan piksel 3×, kemudian
 * dikecilkan ke lebar 640 px dan disimpan sebagai WebP.
 *
 * Cara pakai:
 *   1. Di repositori aplikasi (duitkurapi):  npm install && npm run dev
 *   2. Di repositori ini:                    npm install playwright
 *   3. node scripts/ambil-screenshot.mjs
 *
 * Jam dipatok ke tanggal tetap supaya angka pada tangkapan layar selalu sama
 * setiap kali diambil ulang — data contohnya memakai tanggal relatif.
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const AKAR    = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KELUAR  = path.join(AKAR, 'img/screens');
const APLIKASI = process.env.DUITKU_URL || 'http://127.0.0.1:5173/#';
const WAKTU   = new Date('2026-09-26T10:32:00');
const LEBAR   = 640;

fs.mkdirSync(KELUAR, { recursive: true });
const browser = await chromium.launch();
const antrean = [];

/** Menyiapkan satu tab yang sudah terisi data contoh. */
async function siapkan(tema) {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    colorScheme: tema,
    locale: 'id-ID',
    timezoneId: 'Asia/Jakarta',
  });
  const page = await ctx.newPage();
  await page.clock.setFixedTime(WAKTU);
  await page.goto(`${APLIKASI}/`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Data Contoh/i }).click();
  await page.waitForTimeout(900);

  if (tema === 'dark') {
    await page.evaluate(() => {
      const d = JSON.parse(localStorage.getItem('duitku:data:v1'));
      d.settings.theme = 'dark';
      localStorage.setItem('duitku:data:v1', JSON.stringify(d));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
  }
  return { ctx, page };
}

async function buka(page, hash) {
  await page.goto(`${APLIKASI}${hash}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
}

async function foto(page, nama) {
  antrean.push({ nama, buf: await page.screenshot() });
  console.log('  ✓', nama);
}

// ------------------------------------------------------------ mode terang ---
{
  const { ctx, page } = await siapkan('light');
  await foto(page, '01-beranda');

  await buka(page, '/transaksi');   await foto(page, '02-transaksi');
  await buka(page, '/hutang');      await foto(page, '03-hutang');

  await page.getByText('Rian Pratama').first().click();
  await page.waitForTimeout(800);
  await foto(page, '04-detail-hutang');

  await page.getByRole('button', { name: /Tagih Sekarang via WhatsApp/i }).click();
  await page.waitForTimeout(900);
  await foto(page, '05-tagih-whatsapp');

  for (const t of await page.getByRole('button').all()) {
    if (/Pengingat Jatuh Tempo/i.test((await t.innerText().catch(() => '')).trim())) {
      await t.click();
      break;
    }
  }
  await page.waitForTimeout(600);
  await foto(page, '06-tagih-tegas');

  await buka(page, '/laporan');     await foto(page, '07-laporan');
  await page.getByRole('button', { name: /Unduh laporan PDF/i }).first().click();
  await page.waitForTimeout(900);
  await foto(page, '08-laporan-pdf');

  await buka(page, '/laporan');
  await page.mouse.wheel(0, 780);
  await page.waitForTimeout(700);
  await foto(page, '13-laporan-grafik');

  await buka(page, '/anggaran');    await foto(page, '09-anggaran');
  await buka(page, '/pengaturan');  await foto(page, '12-pengaturan');

  await buka(page, '/');
  await page.getByRole('button', { name: /Buka asisten keuangan/i }).click();
  await page.waitForTimeout(700);
  await foto(page, '10-asisten-awal');

  const isian = page.getByPlaceholder(/Tanya apa saja/i);
  await isian.fill('kategori apa yang paling boros bulan ini?');
  await isian.press('Enter');
  await page.waitForTimeout(1500);
  await page.mouse.wheel(0, -260);
  await page.waitForTimeout(500);
  await foto(page, '11-asisten-jawab');

  await ctx.close();
}

// ------------------------------------------------------------- mode gelap ---
{
  const { ctx, page } = await siapkan('dark');
  await foto(page, '20-beranda-gelap');
  await buka(page, '/laporan'); await foto(page, '21-laporan-gelap');
  await buka(page, '/hutang');  await foto(page, '22-hutang-gelap');
  await ctx.close();
}

// ------------------------------- dikecilkan & disimpan sebagai WebP ---------
const tab = await browser.newPage();
await tab.goto('about:blank');
let total = 0;

for (const { nama, buf } of antrean) {
  const hasil = await tab.evaluate(async ({ b64, LEBAR }) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = LEBAR;
    c.height = Math.round(img.naturalHeight * (LEBAR / img.naturalWidth));
    const ctx = c.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/webp', 0.86).split(',')[1];
  }, { b64: buf.toString('base64'), LEBAR });

  const bin = Buffer.from(hasil, 'base64');
  fs.writeFileSync(path.join(KELUAR, `${nama}.webp`), bin);
  total += bin.length;
}

console.log(`\n${antrean.length} berkas · ${(total / 1024).toFixed(0)} KB · tersimpan di img/screens/`);
await browser.close();
