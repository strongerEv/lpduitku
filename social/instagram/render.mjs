/**
 * Merender carousel.html menjadi lima berkas PNG 1080 × 1350 (rasio 4:5)
 * yang siap diunggah ke Instagram.
 *
 * Cara pakai, dari akar repositori:
 *   python3 -m http.server 4173 &
 *   node social/instagram/render.mjs
 *
 * Hasilnya ditulis ke social/instagram/slide-1.png … slide-5.png
 */

import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR  = path.dirname(fileURLToPath(import.meta.url));
const URL  = process.env.CAROUSEL_URL || 'http://127.0.0.1:4173/social/instagram/carousel.html';
const EXE  = process.env.CHROMIUM_PATH || undefined;

const browser = await chromium.launch(EXE ? { executablePath: EXE } : {});
const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 1,
  locale: 'id-ID',
});

await page.goto(URL, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

const slide = page.locator('.slide');
const jumlah = await slide.count();

for (let i = 0; i < jumlah; i++) {
  const berkas = path.join(DIR, `slide-${i + 1}.png`);
  await slide.nth(i).screenshot({ path: berkas });
  console.log('✓', path.basename(berkas));
}

console.log(`\n${jumlah} slide · 1080 × 1350 · siap diunggah`);
await browser.close();
