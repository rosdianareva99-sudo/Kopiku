/* ============================================================
   KOPIKU CAFÉ — script.js
   Handles:
   1. Page switching (Home ↔ Menu) — SPA
   2. Hamburger menu (mobile)
   3. Menu tab switching (Coffee / Matcha / Bakery)
   4. Smooth scrolling
   5. Active navbar state
   6. Navbar scroll shadow
   ============================================================ */

/* ---- 1. PAGE SWITCHING (SPA) ---- */

/**
 * showPage — tampilkan halaman berdasarkan nama ('home' atau 'menu')
 * @param {string} pageName - nama halaman
 * @param {HTMLElement} clickedLink - elemen <a> yang diklik (untuk update active state)
 */
function showPage(pageName, clickedLink) {
  // Sembunyikan semua halaman
  document.querySelectorAll('.page').forEach(function(page) {
    page.classList.remove('active');
  });

  // Tampilkan halaman yang dipilih
  var targetPage = document.getElementById(pageName + 'Page');
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update active state navbar
  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.classList.remove('active');
  });
  if (clickedLink) {
    clickedLink.classList.add('active');
  }

  // Tutup hamburger menu jika terbuka
  closeHamburger();

  // Scroll ke atas dengan smooth
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ---- 2. HAMBURGER MENU (mobile) ---- */

var hamburgerBtn = document.getElementById('hamburger');
var navLinksEl   = document.getElementById('navLinks');

/** Toggle hamburger menu */
hamburgerBtn.addEventListener('click', function() {
  hamburgerBtn.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

/** Tutup hamburger menu */
function closeHamburger() {
  hamburgerBtn.classList.remove('open');
  navLinksEl.classList.remove('open');
}

/** Tutup hamburger jika klik di luar navbar */
document.addEventListener('click', function(e) {
  var navbar = document.getElementById('navbar');
  if (!navbar.contains(e.target)) {
    closeHamburger();
  }
});


/* ---- 3. MENU TAB SWITCHING ---- */

/**
 * switchTab — tampilkan tab menu yang dipilih
 * @param {string} tabName - nama tab ('coffee', 'matcha', 'bakery')
 * @param {HTMLElement} clickedBtn - tombol tab yang diklik
 */
function switchTab(tabName, clickedBtn) {
  // Sembunyikan semua tab content
  document.querySelectorAll('.tab-content').forEach(function(tab) {
    tab.classList.remove('active');
  });

  // Hilangkan active dari semua tombol tab
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });

  // Tampilkan tab yang dipilih
  var targetTab = document.getElementById('tab-' + tabName);
  if (targetTab) {
    targetTab.classList.add('active');
  }

  // Set tombol aktif
  if (clickedBtn) {
    clickedBtn.classList.add('active');
  }
}


/* ---- 4. SMOOTH SCROLLING (untuk link anchor internal, jika digunakan) ---- */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var targetId = this.getAttribute('href');
    if (targetId === '#') return; // Abaikan href="#" (digunakan SPA)
    var targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ---- 5. NAVBAR SCROLL SHADOW ---- */
window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.style.background = 'rgba(44, 20, 6, 0.97)';
    navbar.style.boxShadow  = '0 4px 24px rgba(0,0,0,0.4)';
  } else {
    navbar.style.background = 'rgba(74, 36, 16, 0.92)';
    navbar.style.boxShadow  = '0 2px 20px rgba(0,0,0,0.3)';
  }
});


/* ---- 6. INISIALISASI: pastikan Coffee tab aktif saat halaman menu dibuka ---- */
document.addEventListener('DOMContentLoaded', function() {
  // Default: tab coffee aktif di halaman menu
  var coffeeTab = document.getElementById('tab-coffee');
  var coffeeBtn = document.querySelector('.tab-btn[data-tab="coffee"]');
  if (coffeeTab) coffeeTab.classList.add('active');
  if (coffeeBtn) coffeeBtn.classList.add('active');
});
