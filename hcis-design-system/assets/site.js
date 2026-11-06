(function () {
  'use strict';
  var body = document.body;

  // Menu di layar sempit
  var menuBtn = document.querySelector('.menu-btn');
  function setNav(open) {
    body.classList.toggle('nav-open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setNav(!body.classList.contains('nav-open')); });
  document.addEventListener('click', function (e) {
    if (!body.classList.contains('nav-open')) return;
    if (e.target.closest('.sidebar a[href^="#"]')) setNav(false);
    else if (!e.target.closest('.sidebar') && !e.target.closest('.menu-btn')) setNav(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('nav-open')) { setNav(false); menuBtn && menuBtn.focus(); }
  });

  // Cari di navigasi
  var filter = document.getElementById('nav-filter');
  var empty = document.querySelector('.toc-empty');
  if (filter) filter.addEventListener('input', function () {
    var q = filter.value.trim().toLowerCase();
    var shown = 0;
    document.querySelectorAll('.toc li').forEach(function (li) {
      var a = li.querySelector('a');
      var hit = !q || (a.textContent + ' ' + (a.dataset.search || '')).toLowerCase().indexOf(q) > -1;
      li.hidden = !hit;
      if (hit) shown++;
    });
    document.querySelectorAll('.toc-g').forEach(function (g) {
      var ul = g.nextElementSibling;
      g.hidden = !!q && ul && !ul.querySelector('li:not([hidden])');
    });
    if (empty) empty.hidden = shown > 0;
  });

  // Tautan aktif
  var links = {};
  document.querySelectorAll('.toc a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var current = null;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var a = links[en.target.id];
        if (!a || a === current) return;
        if (current) { current.classList.remove('active'); current.removeAttribute('aria-current'); }
        current = a;
        a.classList.add('active');
        a.setAttribute('aria-current', 'location');
        var side = document.querySelector('.sidebar');
        if (side && getComputedStyle(side).position === 'sticky') {
          var r = a.getBoundingClientRect(), s = side.getBoundingClientRect();
          if (r.top < s.top + 80 || r.bottom > s.bottom - 40) a.scrollIntoView({ block: 'nearest' });
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' });
    Object.keys(links).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  // Sampul: skala iframe 960px ke lebar wadah
  var cover = document.querySelector('[data-cover]');
  if (cover) {
    var frame = cover.querySelector('iframe');
    var fit = function () { frame.style.transform = 'scale(' + cover.clientWidth / 960 + ')'; };
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(cover); else window.addEventListener('resize', fit);
  }

  // Pratinjau lebar ponsel
  document.querySelectorAll('[data-phone]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var fig = btn.closest('.preview');
      var on = !fig.classList.contains('phone');
      fig.classList.toggle('phone', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  });

  // Contoh gerak
  var play = document.querySelector('[data-play]');
  var list = document.querySelector('.ease-list');
  if (play && list) play.addEventListener('click', function () {
    var on = !list.classList.contains('playing');
    list.classList.toggle('playing', on);
    play.textContent = on ? 'Kembalikan' : 'Putar contoh gerak';
  });

  // Cari ikon
  var iconFilter = document.getElementById('icon-filter');
  var iconCount = document.querySelector('[data-icon-count]');
  if (iconFilter) iconFilter.addEventListener('input', function () {
    var q = iconFilter.value.trim().toLowerCase(), n = 0;
    document.querySelectorAll('.icon-grid li').forEach(function (li) {
      var hit = !q || li.dataset.icon.indexOf(q) > -1;
      li.hidden = !hit;
      if (hit) n++;
    });
    if (iconCount) iconCount.textContent = n;
  });
})();
