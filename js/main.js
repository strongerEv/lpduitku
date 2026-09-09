/* ==========================================================================
   Duitku — Landing Page
   ==========================================================================
   ▼▼▼  DUA HAL YANG PERLU KAMU ISI SENDIRI  ▼▼▼
   ========================================================================== */

/* 1) Link checkout.
      Tempel link checkout-mu di antara tanda kutip di bawah ini.
      Semua tombol "Dapatkan Duitku" di halaman langsung ikut berubah.
      Selama masih kosong, tombolnya cuma menggulir ke bagian Harga. */
const CHECKOUT_URL = '';

/* 2) Harga.
      Tulis angkanya saja tanpa "Rp", contoh: '149.000'.
      Selama masih kosong, yang tampil tanda "—". */
const HARGA = '';

/* ==========================================================================
   Di bawah ini tidak perlu diubah.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------- link checkout --- */
  var tombol = document.querySelectorAll('[data-checkout]');
  if (CHECKOUT_URL && CHECKOUT_URL.trim()) {
    tombol.forEach(function (el) {
      el.href = CHECKOUT_URL.trim();
      el.rel = 'noopener';
    });
  }

  /* ------------------------------------------------------------ harga --- */
  if (HARGA && HARGA.trim()) {
    document.querySelectorAll('[data-price]').forEach(function (el) {
      el.textContent = HARGA.trim();
    });
  }

  /* ------------------------------------------------------ tahun footer --- */
  var tahun = document.getElementById('year');
  if (tahun) tahun.textContent = String(new Date().getFullYear());

  /* -------------------------------------------------------- menu mobile --- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function tutupMenu() {
    if (!links) return;
    links.classList.remove('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Buka menu');
    }
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var terbuka = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', terbuka ? 'true' : 'false');
      toggle.setAttribute('aria-label', terbuka ? 'Tutup menu' : 'Buka menu');
    });

    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) tutupMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') tutupMenu();
    });
  }

  /* --------------------------------------------------- bayangan navbar --- */
  var nav = document.getElementById('nav');
  var lewat = false;

  function cekScroll() {
    var perlu = window.scrollY > 8;
    if (perlu !== lewat) {
      lewat = perlu;
      if (nav) nav.classList.toggle('scrolled', perlu);
    }
  }
  cekScroll();
  window.addEventListener('scroll', cekScroll, { passive: true });

  /* ------------------------------------------------ animasi saat scroll --- */
  var target = document.querySelectorAll('.reveal');
  var kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (kurangiGerak || !('IntersectionObserver' in window)) {
    target.forEach(function (el) { el.classList.add('in'); });
  } else {
    var pengamat = new IntersectionObserver(function (entri) {
      entri.forEach(function (e) {
        // Elemen yang terlewat karena digulir cepat (sudah di atas layar)
        // tetap ditampilkan, supaya tidak ada bagian halaman yang kosong.
        if (!e.isIntersecting && e.boundingClientRect.top >= 0) return;
        e.target.classList.add('in');
        pengamat.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    target.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
      pengamat.observe(el);
    });
  }

  /* ------------------------------------- galeri: geser pakai tombol panah --- */
  var galeri = document.getElementById('gallery');
  if (galeri) {
    galeri.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var langkah = galeri.clientWidth * 0.6;
      galeri.scrollBy({
        left: e.key === 'ArrowRight' ? langkah : -langkah,
        behavior: kurangiGerak ? 'auto' : 'smooth'
      });
    });
  }
})();
