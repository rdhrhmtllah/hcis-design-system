/* =====================================================================
   Evo HCIS Mobile — component builders (HTML strings).
   Requires build/icons.js (evIcon) and kit.css. No framework.
   Each builder returns markup that uses only kit.css classes + --ev-* tokens.
   ===================================================================== */
(function (g) {
  var I = function (n, s, w) { return g.evIcon(n, { size: s || 20, stroke: w }); };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var attrs = function (o) { return o ? Object.keys(o).map(function (k) { return ' ' + k + '="' + esc(o[k]) + '"'; }).join('') : ''; };

  /* Status words are fixed. Never "Diproses". */
  var STATUS = {
    wait: { word: 'Menunggu', icon: 'clock' },
    hr: { word: 'Di HR', icon: 'user-check' },
    ok: { word: 'Disetujui', icon: 'check' },
    no: { word: 'Ditolak', icon: 'close' },
    cx: { word: 'Dibatalkan', icon: 'ban' }
  };

  var EV = {
    STATUS: STATUS,
    icon: I,

    /* Button: variant = primary | secondary | danger; icon -> gold tile; arrow -> trailing tile */
    button: function (o) {
      o = o || {};
      var v = o.variant && o.variant !== 'primary' ? ' btn--' + o.variant : '';
      var center = !o.icon && !o.arrow ? ' btn--center' : '';
      var sm = o.small ? ' btn--sm' : '';
      return '<button class="btn' + v + center + sm + '"' + (o.disabled ? ' disabled' : '') + attrs(o.attrs) + '>' +
        (o.icon ? '<span class="btn__tile">' + I(o.icon, 20, 2.4) + '</span>' : '') +
        '<span class="btn__label">' + esc(o.label) + '</span>' +
        (o.arrow ? '<span class="btn__arrow">' + I('arrow-right', 20, 2.4) + '</span>' : '') +
        '</button>';
    },

    /* PageHeader: { title, eyebrow, sub, back, actions:[{icon,label,badge,attrs}], pill:{label,icon,attrs}, chips:html, compact, logo } */
    pageHeader: function (o) {
      var bar = '<div class="ph__bar">' +
        (o.back ? '<button class="glass" aria-label="Kembali"' + attrs(o.back) + '>' + I('arrow-left', 18, 2.4) + '</button>' : '') +
        (o.logo ? '<span class="ph__logo"><img src="' + o.logo + '" alt="Evo Group"></span>' : '') +
        '<span class="ph__spacer"></span>' +
        (o.pill ? '<button class="gold-pill"' + attrs(o.pill.attrs) + '><span class="gold-pill__dot">' + I(o.pill.icon || 'play', 12, 2.6) + '</span>' + esc(o.pill.label) + '</button>' : '') +
        (o.actions || []).map(function (a) {
          return '<button class="glass" aria-label="' + esc(a.label) + '"' + attrs(a.attrs) + '>' + I(a.icon, 18, 2.2) +
            (a.badge ? '<span class="glass__badge">' + a.badge + '</span>' : '') + '</button>';
        }).join('') + '</div>';
      return '<header class="ph' + (o.compact ? ' ph--compact' : '') + '">' + bar +
        (o.eyebrow ? '<div class="ph__eyebrow">' + esc(o.eyebrow) + '</div>' : '') +
        '<h1 class="ph__title">' + esc(o.title) + '</h1>' +
        (o.sub ? '<p class="ph__sub">' + esc(o.sub) + '</p>' : '') +
        (o.chips || '') + '</header>';
    },

    /* SummaryChips on purple: items [{key,label,count,dot}] */
    summaryChips: function (items, active) {
      return '<div class="sumchips" role="tablist" aria-label="Saring pengajuan">' + items.map(function (c) {
        return '<button class="sumchip' + (c.key === active ? ' is-active' : '') + '" role="tab" aria-selected="' + (c.key === active) + '" data-filter="' + c.key + '">' +
          (c.dot ? '<span class="dot dot--' + c.dot + '"></span>' : '') + esc(c.label) + ' <b>' + c.count + '</b></button>';
      }).join('') + '</div>';
    },

    statusChip: function (key) {
      var s = STATUS[key];
      return '<span class="chip chip--' + key + '"><span class="dot dot--' + key + '"></span>' + s.word + '</span>';
    },

    /* BalanceCard: { remaining, total, used, pending, year, cta } */
    balanceCard: function (o) {
      var u = o.used / o.total * 100, p = o.pending / o.total * 100;
      return '<section class="hero enter" aria-label="Saldo cuti">' +
        '<div class="hero__top"><div><div class="ev-label">Sisa cuti tahunan ' + o.year + '</div>' +
        '<div class="hero__num"><strong>' + o.remaining + '</strong><span>dari ' + o.total + ' hari</span></div></div>' +
        '<span class="tile tile--gold">' + I('wallet', 20, 2.2) + '</span></div>' +
        '<div class="track" role="img" aria-label="' + o.used + ' hari terpakai, ' + o.pending + ' hari menunggu"><i class="used" style="width:' + u + '%"></i><i class="pend" style="width:' + p + '%"></i></div>' +
        '<div class="legend"><span><i class="sw" style="background:var(--ev-purple-600)"></i>Terpakai <b>' + o.used + '</b></span>' +
        '<span><i class="sw" style="background:var(--ev-wait-dot)"></i>Menunggu <b>' + o.pending + '</b></span>' +
        '<span><i class="sw" style="background:var(--ev-track)"></i>Sisa <b>' + o.remaining + '</b></span></div>' +
        (o.cta ? '<div class="hero__cta">' + o.cta + '</div>' : '') + '</section>';
    },

    shortcuts: function (items) {
      return '<div class="shortcuts">' + items.map(function (s) {
        return '<button class="shortcut"' + attrs(s.attrs) + '><span class="tile' + (s.tone ? ' tile--' + s.tone : '') + '">' + I(s.icon, 18, 2.2) + '</span>' + esc(s.label) + '</button>';
      }).join('') + '</div>';
    },

    /* ApprovalStepper: steps [{label, sub, state: done|active|todo|rejected}] */
    stepper: function (steps) {
      return '<ol class="stepper" style="list-style:none;margin:0;padding:0">' + steps.map(function (s) {
        var inner = s.state === 'done' ? I('check', 12, 4) : s.state === 'rejected' ? I('close', 12, 4) : '';
        return '<li class="step is-' + s.state + '"><span class="step__node">' + inner + '</span><span class="step__label">' + esc(s.label) + '</span>' +
          (s.sub ? '<span class="step__sub">' + esc(s.sub) + '</span>' : '') + '</li>';
      }).join('') + '</ol>';
    },

    /* RequestCard: { id, type, icon, code, status, range, meta, steps } */
    requestCard: function (r) {
      return '<button class="rcard enter" data-open="' + r.id + '">' +
        '<div class="rcard__top"><span class="tile">' + I(r.icon, 20, 2.2) + '</span>' +
        '<span class="rcard__type"><b>' + esc(r.type) + '</b><small>' + esc(r.code) + '</small></span>' + EV.statusChip(r.status) + '</div>' +
        '<div class="rcard__range">' + esc(r.range) + '</div><div class="rcard__meta">' + esc(r.meta) + '</div>' +
        (r.steps ? '<div class="rcard__foot">' + EV.stepper(r.steps) + '</div>' : '') + '</button>';
    },

    /* HistoryRow: { id, day, mon, title, meta, status } */
    historyRow: function (h) {
      return '<button class="hrow" data-open="' + h.id + '"><span class="dtile"><b>' + h.day + '</b><small>' + h.mon + '</small></span>' +
        '<span class="hrow__body"><div class="hrow__title">' + esc(h.title) + '</div><div class="hrow__meta">' + esc(h.meta) + '</div></span>' +
        EV.statusChip(h.status) + '</button>';
    },

    infoList: function (rows) {
      return '<dl class="info" style="margin:0">' + rows.map(function (r) { return '<div class="info__row"><dt>' + esc(r[0]) + '</dt><dd>' + r[1] + '</dd></div>'; }).join('') + '</dl>';
    },

    message: function (tone, title, text, icon) {
      return '<div class="msg msg--' + tone + '" role="' + (tone === 'no' ? 'alert' : 'status') + '">' + I(icon || 'info', 18, 2.2) + '<div><b>' + esc(title) + '</b>' + esc(text) + '</div></div>';
    },

    empty: function (icon, title, text) {
      return '<div class="empty"><span class="tile">' + I(icon, 24, 2.2) + '</span><b>' + esc(title) + '</b><p>' + esc(text) + '</p></div>';
    },

    /* BottomNav (Beranda): active = home | presensi | requests | profile; centre FAB opens Menu */
    bottomNav: function (active) {
      var it = function (k, icon, label) {
        return '<button class="bnav__item' + (active === k ? ' is-active' : '') + '" data-nav="' + k + '"' + (active === k ? ' aria-current="page"' : '') + '>' + I(icon, 24, 2) + label + '</button>';
      };
      return '<nav class="bnav" aria-label="Navigasi utama">' + it('home', 'home', 'Beranda') + it('presensi', 'clock', 'Presensi') +
        '<div class="bnav__slot"><button class="bnav__fab" data-nav="menu" aria-label="Menu" aria-haspopup="dialog">' + I('grid', 22, 2.2) + '</button>Menu</div>' +
        it('requests', 'document-lines', 'Pengajuan') + it('profile', 'user', 'Profil') + '</nav>';
    },

    /* ---------------- Beranda components ---------------- */

    /* HeroHeader: { date, name, shift, card (img src), gift (img src), giftCount } */
    heroHeader: function (o) {
      return '<header class="bh">' +
        '<div class="bh__sky" aria-hidden="true"></div>' +
        '<div class="bh__text"><div class="bh__date">' + esc(o.date) + '</div>' +
        '<h1 class="bh__hello">Halo, ' + esc(o.name) + '</h1>' +
        '<span class="bh__shift">' + I('clock', 14, 2.6) + esc(o.shift) + '</span></div>' +
        (o.card ? '<button class="bh__card" aria-label="Buka kartu digital" data-act="card"><span class="bh__strap"></span><img src="' + esc(o.card) + '" alt="" width="76" height="120"></button>' : '') +
        '</header>';
    },

    /* StatChip row: [{ key, label, value, unit, tone: ''|ok|wait|info|purple, pct, icon, attrs }] */
    statChips: function (items) {
      return '<div class="stats" role="list" aria-label="Ringkasan periode cutoff">' + items.map(function (s) {
        return '<button class="stat stat--' + (s.tone || 'plain') + '" role="listitem"' + attrs(s.attrs) + ' aria-label="' + esc(s.label + ': ' + s.value + ' ' + s.unit) + '">' +
          '<span class="stat__top"><span class="stat__ic">' + I(s.icon || 'calendar', 14, 2.4) + '</span><b class="stat__val">' + esc(s.value) + '</b><small>' + esc(s.unit) + '</small></span>' +
          '<span class="stat__label">' + esc(s.label) + '</span><span class="stat__bar"><i style="width:' + (s.pct || 0) + '%"></i></span></button>';
      }).join('') + '</div>';
    },

    /* PresenceCard: { inTime, inNote, outTime, outNote, ringMain, ringSub, pct, status:{tone,text}, checkout:{label,sub}|null, done } */
    presenceCard: function (o) {
      var r = 34, c = 2 * Math.PI * r, off = c * (1 - (o.pct || 0) / 100);
      return '<section class="pres card" aria-label="Presensi hari ini">' +
        '<div class="pres__head"><h2 class="pres__title">Presensi hari ini</h2><span class="pres__state pres__state--' + o.status.tone + '"><i></i>' + esc(o.status.text) + '</span></div>' +
        '<div class="pres__row"><div class="pres__cells">' +
        '<div class="pres__cell is-in"><span>Masuk</span><b>' + esc(o.inTime) + '</b><small>' + esc(o.inNote) + '</small></div>' +
        '<div class="pres__cell"><span>Pulang</span><b>' + esc(o.outTime) + '</b><small>' + esc(o.outNote) + '</small></div></div>' +
        '<div class="ring" role="img" aria-label="' + esc(o.ringMain + ' ' + o.ringSub) + '"><svg width="84" height="84" viewBox="0 0 84 84"><circle cx="42" cy="42" r="' + r + '" class="ring__track"/><circle cx="42" cy="42" r="' + r + '" class="ring__val" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"/></svg>' +
        '<span class="ring__txt"><b>' + esc(o.ringMain) + '</b><small>' + esc(o.ringSub) + '</small></span></div></div>' +
        (o.done ? '<div class="pres__done">' + '<span class="tile tile--ok">' + I('check', 18, 3) + '</span><span><b>Sudah check out</b><small>Pulang ' + esc(o.outTime) + ' · sampai besok</small></span></div>'
          : o.checkout ? '<button class="pres__cta" data-act="checkout"><span class="btn__tile">' + I('logout', 20, 2.4) + '</span><span class="pres__cta-l"><b>' + esc(o.checkout.label) + '</b><small>' + esc(o.checkout.sub) + '</small></span><span class="btn__arrow">' + I('arrow-right', 20, 2.4) + '</span></button>' : '') +
        '</section>';
    },

    /* CampaignCarousel: [{ kind: campaign|wellness|learning, tag, title, cta }] */
    campaigns: function (slides, active) {
      return '<section class="camp" aria-roledescription="carousel" aria-label="Kampanye"><div class="camp__track">' + slides.map(function (s, i) {
        return '<button class="slide slide--' + s.kind + '" aria-label="' + esc(s.tag + ': ' + s.title + '. ' + s.cta) + '" data-act="slide"><span class="slide__tag">' + esc(s.tag) + '</span><span class="slide__title">' + esc(s.title) + '</span><span class="slide__cta">' + esc(s.cta) + I('arrow-right', 14, 2.6) + '</span></button>';
      }).join('') + '</div><div class="camp__dots" aria-hidden="true">' + slides.map(function (s, i) { return '<i' + (i === (active || 0) ? ' class="is-on"' : '') + '></i>'; }).join('') + '</div></section>';
    },

    /* CutoffCalendar: { range, left, days:[{d, kind: ''|ok|wait|cx|off|today|future}], expanded } */
    cutoffCalendar: function (o) {
      var dows = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
      return '<section class="section"><div class="section__head"><h2 class="section__title">Kalender cutoff</h2><button class="link-btn" data-act="cal-toggle">' + (o.expanded ? 'Ringkas' : 'Lihat semua') + I(o.expanded ? 'chevron-down' : 'chevron-right', 16, 2.6) + '</button></div>' +
        '<div class="card cut"><div class="cut__meta"><span class="ev-label">' + esc(o.range) + '</span><span class="cut__left">' + esc(o.left) + '</span></div>' +
        '<div class="cut__grid">' + dows.map(function (d) { return '<span class="cut__dow">' + d + '</span>'; }).join('') +
        o.days.map(function (x) { return x ? '<span class="cut__day cut__day--' + (x.kind || 'plain') + '">' + x.d + '</span>' : '<span></span>'; }).join('') + '</div>' +
        '<div class="legend"><span><i class="sw" style="background:var(--ev-ok-dot)"></i>Hadir</span><span><i class="sw" style="background:var(--ev-wait-dot)"></i>Lembur/telat</span><span><i class="sw" style="background:var(--ev-purple-400)"></i>Cuti</span><span><i class="sw" style="background:var(--ev-cx-dot)"></i>Libur</span></div></div></section>';
    },

    /* StreakCard: { days, rank, pct, filled, total, note } */
    streakCard: function (o) {
      var seg = ''; for (var i = 0; i < o.total; i++) seg += '<i' + (i < o.filled ? ' class="is-on"' : '') + '></i>';
      return '<div class="streak"><div class="streak__row"><div class="streak__a"><span>Streak kehadiran</span><div><b>' + o.days + '</b> hari beruntun</div></div><span class="streak__sep"></span>' +
        '<button class="streak__b" aria-label="Peringkat tim, nomor ' + o.rank + '"><span>Peringkat tim</span><div><b>#' + o.rank + '</b> ' + o.pct + '%</div></button></div>' +
        '<div class="streak__seg">' + seg + '</div><p class="streak__note">' + esc(o.note) + '</p></div>';
    },

    /* ModuleList: [{ icon, tone, title, sub, value, attrs }] — ESS/TPM/LMS/DMS/VMS rows */
    moduleList: function (rows) {
      return '<div class="mlist">' + rows.map(function (r) {
        return '<button class="mrow"' + attrs(r.attrs) + '><span class="tile' + (r.tone ? ' tile--' + r.tone : '') + '">' + I(r.icon, 18, 2.2) + '</span><span class="mrow__body"><b>' + esc(r.title) + '</b><small>' + esc(r.sub) + '</small></span>' +
          (r.value != null ? '<span class="mrow__val">' + esc(r.value) + '</span>' : '') + I('chevron-right', 16, 2.6) + '</button>';
      }).join('') + '</div>';
    },

    /* LearningCard: { title, pct, note } */
    learningCard: function (o) {
      return '<button class="learn card" data-act="learn"><span class="learn__top"><span class="tile tile--info">' + I('graduation', 20, 2.2) + '</span><span><span class="ev-label" style="text-transform:none;letter-spacing:0">Lanjutkan belajar</span><b class="learn__title">' + esc(o.title) + '</b></span></span>' +
        '<span class="learn__prog"><span class="learn__bar" role="progressbar" aria-label="Kemajuan kursus" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + o.pct + '"><i style="width:' + o.pct + '%"></i></span><b>' + o.pct + '%</b></span>' +
        '<span class="learn__note">' + esc(o.note) + '</span></button>';
    },

    /* FeedSheet: { unread, chips:[{key,label}], active, items:[{id, initials, tone, title, who, kind, when, body, likes, liked}] } */
    feedSheet: function (o) {
      return '<section class="feed" aria-labelledby="feed-t"><span class="feed__grab" aria-hidden="true"></span>' +
        '<div class="feed__head"><h2 class="feed__title" id="feed-t">Kabar terbaru</h2>' + (o.unread ? '<span class="feed__badge">' + o.unread + ' baru</span>' : '') + '<span class="ph__spacer"></span><button class="link-btn" data-act="feed-all">Semua</button></div>' +
        '<div class="fchips feed__chips" role="tablist">' + o.chips.map(function (c) {
          return '<button class="fchip' + (o.active === c.key ? ' is-active' : '') + '" role="tab" aria-selected="' + (o.active === c.key) + '" data-feed="' + c.key + '">' + esc(c.label) + '</button>';
        }).join('') + '</div>' +
        '<div class="stack" style="gap:var(--ev-sp-10)">' + (o.items.length ? o.items.map(function (f) {
          return '<article class="post"><span class="post__av post__av--' + f.tone + '">' + esc(f.initials) + '</span><div class="post__body"><div class="post__meta"><b>' + esc(f.who) + '</b><span>' + esc(f.kind) + ' · ' + esc(f.when) + '</span></div>' +
            '<h3 class="post__title">' + esc(f.title) + '</h3><p>' + esc(f.body) + '</p>' +
            '<button class="post__like' + (f.liked ? ' is-liked' : '') + '" data-like="' + f.id + '" aria-pressed="' + !!f.liked + '" aria-label="Suka, ' + f.likes + '">' + I('heart', 16, 2.4) + f.likes + '</button></div></article>';
        }).join('') : EV.empty('bell', 'Belum ada kabar di sini', 'Coba pilih kategori lain.')) + '</div></section>';
    },

    /* Toast: { tone: ok|no|wait, title, sub, action, duration } */
    toast: function (t) {
      var icon = t.tone === 'ok' ? 'check' : t.tone === 'no' ? 'wifi-off' : 'alert';
      var d = t.duration || (t.action ? (t.tone === 'no' ? 6.5 : 5.2) : 3.2);
      return '<div class="toast toast--' + t.tone + '" role="status"><span class="toast__icon">' + I(icon, 18, 2.6) + '</span>' +
        '<span class="toast__body"><b>' + esc(t.title) + '</b>' + (t.sub ? '<small>' + esc(t.sub) + '</small>' : '') + '</span>' +
        (t.action ? '<button class="toast__action" data-toast-action>' + esc(t.action) + '</button>' : '') +
        '<i class="toast__bar" style="animation-duration:' + d + 's"></i></div>';
    },

    /* ConfirmSheet (danger) */
    confirmSheet: function (o) {
      return '<div class="scrim" data-close></div><div class="sheet sheet--confirm" role="dialog" aria-modal="true" aria-labelledby="cs-t">' +
        '<div class="sheet__handle"></div><div class="danger-disc">' + I(o.icon || 'calendar-x', 24, 2.4) + '</div>' +
        '<h2 class="sheet__title" id="cs-t">' + esc(o.title) + '</h2><p class="sheet__text">' + esc(o.text) + '</p>' +
        '<div class="objbox"><span class="tile">' + I(o.objIcon || 'calendar', 18, 2.2) + '</span><span class="objbox__body"><b>' + esc(o.objTitle) + '</b><small>' + esc(o.objSub) + '</small></span></div>' +
        '<div class="sheet__actions">' + EV.button({ label: o.confirm, variant: 'danger', attrs: { 'data-confirm': '' } }) +
        EV.button({ label: 'Tidak jadi', variant: 'secondary', attrs: { 'data-close': '' } }) + '</div></div>';
    },

    /* Calendar month. o = { year, month (0-11), start, end, today, minDay } */
    calendar: function (o) {
      var MON = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      var first = new Date(o.year, o.month, 1), days = new Date(o.year, o.month + 1, 0).getDate();
      var lead = (first.getDay() + 6) % 7, html = '';
      ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'].forEach(function (d) { html += '<div class="cal__dow">' + d + '</div>'; });
      for (var i = 0; i < lead; i++) html += '<div></div>';
      for (var d = 1; d <= days; d++) {
        var dow = (lead + d - 1) % 7, cls = ['cal__cell'];
        var off = d < (o.minDay || 0);
        if (off) cls.push('is-off');
        if (dow >= 5) cls.push('is-weekend');
        if (o.start && d === o.start) cls.push('is-start');
        if (o.end && d === o.end) cls.push('is-end');
        if (o.start && o.end && d > o.start && d < o.end) cls.push('is-in');
        if (o.start && !o.end && d === o.start) cls.push('is-end');
        if (d === o.today) cls.push('is-today');
        html += '<button class="' + cls.join(' ') + '" data-day="' + d + '"' + (off ? ' disabled' : '') + ' aria-label="' + d + ' ' + MON[o.month] + '"><span>' + d + '</span></button>';
      }
      return '<div class="cal"><div class="cal__head"><button class="cal__nav" aria-label="Bulan sebelumnya">' + I('chevron-left', 18, 2.4) + '</button>' +
        '<span class="cal__month">' + MON[o.month] + ' ' + o.year + '</span><button class="cal__nav" aria-label="Bulan berikutnya">' + I('chevron-right', 18, 2.4) + '</button></div>' +
        '<div class="cal__grid">' + html + '</div></div>';
    }
  };
  /* Siklus overlay persis Beranda: mount -> .is-open -> (tutup) .is-closing -> unmount.
     Waktu unmount mengikuti animasi keluar terpanjang tiap jenis (lihat motion.css). */
  EV.UNMOUNT = { menu: 620, page: 360, form: 360, sheet: 300, toast: 250 };
  EV.reducedMotion = function () {
    try { return !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
  };
  EV.overlay = function (els, kind, onUnmount) {
    var list = [].concat(els).filter(Boolean), timer = null, open = false;
    var ms = EV.reducedMotion() ? 0 : (EV.UNMOUNT[kind] || 300);
    function set(add, rm) { list.forEach(function (el) { el.classList.remove(rm); el.classList.add(add); }); }
    return {
      open: function () {
        clearTimeout(timer); open = true;
        list.forEach(function (el) { el.hidden = false; });
        set('is-open', 'is-closing');
      },
      close: function () {
        if (!open) return; open = false;
        set('is-closing', 'is-open');
        clearTimeout(timer);
        timer = setTimeout(function () {
          list.forEach(function (el) { el.classList.remove('is-closing'); el.hidden = true; });
          if (onUnmount) onUnmount();
        }, ms);
      },
      isOpen: function () { return open; }
    };
  };
  /* Isi yang berganti (tab bantuan, filter notifikasi): tukar .pp-a/.pp-b agar animasi diputar ulang. */
  EV.swap = function (el) {
    var n = (+el.getAttribute('data-seq') || 0) + 1;
    el.setAttribute('data-seq', n);
    el.classList.remove('pp-a', 'pp-b');
    el.classList.add(n % 2 ? 'pp-a' : 'pp-b');
  };
  /* ================= Halaman modul (dari Cuti Saya) — butuh module.css ================= */

  /* TopBar: { ctx:'ESS · Personal', title, sub, notif:number, proc:bool } */
  EV.topBar = function (o) {
    return '<div class="tb"><span class="tb__bg"></span><span class="tb__prog"></span>' +
      '<div class="tb__left"><div class="tb-a"><button class="ctx" data-act="crumbs" aria-label="Jalur halaman, ' + esc(o.ctx) + '"><span class="pp-tile">' + I('grid', 16, 2.2) + '</span>' + esc(o.ctx) + I('chevron-down', 14, 2.6) + '</button></div>' +
      '<div class="tb-b" aria-hidden="true"><b>' + esc(o.title) + '</b><small>' + esc(o.sub || o.ctx) + '</small></div></div>' +
      '<button class="tb__act" data-act="notif" aria-label="Notifikasi' + (o.notif ? ', ' + o.notif + ' belum dibaca' : '') + '"><span class="pp-tile' + (o.notif ? ' pp-ring' : '') + '">' + I('bell', 16, 2.2) + (o.notif ? '<span class="pp-badge">' + o.notif + '</span>' : '') + '</span></button>' +
      '<button class="tb__act" data-act="proc" aria-label="Proses berjalan"><span class="pp-tile">' + I('activity', 16, 2.2) + (o.proc ? '<span class="pp-dot"></span>' : '') + '</span></button>' +
      '<button class="help-pill" data-act="help">' + I('help', 16, 2.2) + 'Bantuan</button></div>';
  };

  /* ModuleHero: { title, pills:[{tone:''|wait|ok, label, attrs}] } — 196px, ilustrasi melayang */
  EV.moduleHero = function (o) {
    var art = '<svg class="mh__art" viewBox="0 0 150 130" aria-hidden="true"><g class="float">' +
      '<rect x="34" y="26" width="84" height="80" rx="14" fill="var(--ev-purple-600)"/>' +
      '<rect x="34" y="26" width="84" height="22" rx="11" fill="var(--ev-purple-400)"/>' +
      '<rect x="48" y="16" width="8" height="20" rx="4" fill="var(--ev-purple-150)"/><rect x="96" y="16" width="8" height="20" rx="4" fill="var(--ev-purple-150)"/>' +
      '<g fill="var(--ev-purple-300)"><rect x="46" y="58" width="14" height="12" rx="3"/><rect x="68" y="58" width="14" height="12" rx="3"/><rect x="46" y="78" width="14" height="12" rx="3"/><rect x="90" y="78" width="14" height="12" rx="3"/></g>' +
      '<rect x="90" y="58" width="14" height="12" rx="3" fill="var(--ev-gold)"/><rect x="68" y="78" width="14" height="12" rx="3" fill="var(--ev-gold)"/></g>' +
      '<g fill="var(--ev-gold)"><path class="sp" d="M20 30l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/><path class="sp" d="M134 18l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2z"/><path class="sp" d="M130 104l2 4 4 2-4 2-2 4-2-4-4-2 4-2z"/></g>' +
      '<g fill="var(--ev-purple-300)" opacity=".6"><circle cx="14" cy="92" r="2.5"/><circle cx="24" cy="110" r="1.8"/><circle cx="142" cy="66" r="2"/></g></svg>';
    return '<header class="mh">' + art + '<h1 class="mh__ttl">' + esc(o.title) + '</h1>' +
      '<div class="mh__pills">' + (o.pills || []).map(function (p) {
        return '<button class="sm-pill' + (p.tone ? ' sm-pill--' + p.tone : '') + '"' + attrs(p.attrs) + '><i></i>' + esc(p.label) + '</button>';
      }).join('') + '</div></header>';
  };

  /* SaldoCard: { saldo, hutang, jatah } — 12 segmen: sisa ungu, terpakai abu, hutang merah muda */
  EV.saldoCard = function (o) {
    var j = o.jatah || 12, seg = '';
    for (var i = 0; i < j; i++) seg += '<i' + (i < o.saldo ? '' : i < j - (o.hutang || 0) ? ' class="is-used"' : ' class="is-debt"') + '></i>';
    return '<section class="saldo" aria-label="Hak cuti tahunan"><div class="saldo__head"><h2>Hak cuti tahunan</h2>' +
      '<button class="saldo__info" data-act="saldo-info" aria-label="Cara saldo dihitung">' + I('info', 16, 2.4) + '</button>' +
      '<span class="saldo__quota">Jatah ' + j + ' hari</span></div>' +
      '<div class="saldo__row"><div class="saldo__num"><strong>' + o.saldo + '</strong><span>hari</span></div>' +
      '<div class="saldo__debt"><span>Hutang cuti</span><b' + (o.hutang ? '' : ' class="is-zero"') + '>' + (o.hutang || 0) + ' hari</b></div></div>' +
      '<div class="saldo__dots" role="img" aria-label="Sisa ' + o.saldo + ' dari ' + j + ' hari' + (o.hutang ? ', hutang ' + o.hutang + ' hari' : '') + '">' + seg + '</div></section>';
  };

  /* ReqSwipeCard: { id, mon, day, range, meta, status, msg, step (0-3), isNew } */
  EV.reqSwipeCard = function (r) {
    var tr = '';
    for (var i = 0; i < 4; i++) {
      if (i) tr += '<s' + (i <= r.step ? ' class="is-on"' : '') + '></s>';
      tr += '<i class="' + (i < r.step ? 'is-on' : i === r.step ? 'is-now' : '') + '"></i>';
    }
    return '<div class="swrow' + (r.isNew ? ' is-new' : '') + '" data-g="swrow" data-id="' + r.id + '">' +
      '<div class="swrow__acts"><button class="swrow__remind" data-remind="' + r.id + '" tabindex="-1">' + I('bell', 18, 2.4) + 'Ingatkan</button>' +
      '<button class="swrow__cancel" data-cancel="' + r.id + '" tabindex="-1">' + I('trash', 18, 2.4) + 'Batalkan</button></div>' +
      '<div class="swrow__face"><button class="rq" data-open="' + r.id + '"><span class="dt"><small>' + esc(r.mon) + '</small><b>' + esc(r.day) + '</b></span>' +
      '<span class="rq__body"><span class="rq__top">' + EV.statusChip(r.status) + '</span><span class="rq__range">' + esc(r.range) + '</span><span class="rq__meta">' + esc(r.meta) + '</span></span>' + I('chevron-right', 18, 2.6) + '</button>' +
      '<div class="rq__foot"><span>' + esc(r.msg) + '</span><span class="mtrack" aria-hidden="true">' + tr + '</span></div></div></div>';
  };

  /* PopPage: { id, title, sub, gold:{label,attrs,disabled}, head (html di bawah judul), body } -> .ov-page */
  EV.popPage = function (o) {
    return '<section class="ov-page" id="' + o.id + '" role="dialog" aria-modal="true" aria-labelledby="' + o.id + '-t" hidden><div class="fx-bg"></div>' +
      '<div class="pop-head fx-top"><div class="pop-head__bar"><button class="pop-close" data-close aria-label="Tutup">' + I('arrow-left', 18, 2.4) + '</button>' +
      '<div class="pop-head__t"><h2 class="popHead" id="' + o.id + '-t">' + esc(o.title) + '</h2>' + (o.sub ? '<p class="popSub">' + esc(o.sub) + '</p>' : '') + '</div>' +
      (o.gold ? '<button class="pop-gold"' + (o.gold.disabled ? ' disabled' : '') + attrs(o.gold.attrs) + '>' + esc(o.gold.label) + '</button>' : '') + '</div>' + (o.head || '') + '</div>' +
      '<div class="pop-body"' + (o.foot ? ' style="padding-bottom:120px"' : '') + '>' + o.body + '</div>' +
      (o.foot ? '<div class="actionbar fx-bot">' + o.foot + '</div>' : '') + '</section>';
  };

  /* Segmented di header ungu: labels [a,b], v 0|1 */
  EV.popSeg = function (labels, v) {
    return '<div class="pseg" role="tablist" data-v="' + v + '"><span class="pseg__thumb"></span>' + labels.map(function (l, i) {
      return '<button role="tab" data-seg="' + i + '" aria-selected="' + (i === v) + '" class="' + (i === v ? 'is-active' : '') + '">' + esc(l) + '</button>';
    }).join('') + '</div>';
  };

  /* Crumbs: [{ label, sub, here, attrs }] */
  EV.crumbs = function (list) {
    return '<div class="crumbs">' + list.map(function (c) {
      return '<button class="crumb' + (c.here ? ' is-here" aria-current="page' : '') + '"' + attrs(c.attrs) + '><span>' + esc(c.label) + (c.sub ? '<small>' + esc(c.sub) + '</small>' : '') + '</span>' +
        (c.here ? '<span class="here-chip">Di sini</span>' : I('chevron-right', 16, 2.6)) + '</button>';
    }).join('') + '</div>';
  };

  /* LinkRows: [{ icon, tone, title, sub, attrs, disabled, trail }] dalam kartu .sh-row */
  EV.linkRows = function (rows) {
    return '<div class="sh-row">' + rows.map(function (r) {
      return '<button class="lrow"' + (r.disabled ? ' aria-disabled="true"' : '') + attrs(r.attrs) + '><span class="tile' + (r.tone ? ' tile--' + r.tone : '') + '">' + I(r.icon, 18, 2.2) + '</span>' +
        '<span class="lrow__body"><b>' + esc(r.title) + '</b>' + (r.sub ? '<small>' + esc(r.sub) + '</small>' : '') + '</span>' + (r.trail || I('chevron-right', 16, 2.6)) + '</button>';
    }).join('') + '</div>';
  };

  /* ProcPanel body: { jobs:[{id,title,sub,state: run|done|plan|fail}] } */
  EV.procBody = function (jobs) {
    var n = function (s) { return jobs.filter(function (j) { return j.state === s; }).length; };
    var stats = '<div class="pstats"><div class="pstat"><b>' + n('run') + '</b><span>Berjalan</span></div><div class="pstat pstat--ok"><b>' + n('done') + '</b><span>Selesai</span></div><div class="pstat pstat--info"><b>' + n('plan') + '</b><span>Terjadwal</span></div></div>';
    if (!jobs.length) return stats + EV.empty('activity', 'Belum ada proses', 'Unduhan dan export kamu akan muncul di sini.');
    var row = function (j) {
      var tile = j.state === 'done' ? 'tile--ok' : j.state === 'fail' ? 'tile--no' : j.state === 'plan' ? 'tile--info' : '';
      var ic = j.state === 'done' ? 'check' : j.state === 'fail' ? 'alert' : j.state === 'plan' ? 'calendar' : 'download';
      var act = j.state === 'run' ? '<button class="job__act" data-job-stop="' + j.id + '">Hentikan</button>'
        : j.state === 'fail' ? '<button class="job__act job__act--gold" data-job-retry="' + j.id + '">Ulangi</button>'
        : j.state === 'done' ? '<button class="job__act" data-job-open="' + j.id + '">Buka</button>' : '';
      return '<div class="job"><span class="tile ' + tile + '">' + I(ic, 18, 2.2) + '</span><span class="job__body"><b>' + esc(j.title) + '</b>' +
        (j.state === 'run' ? '<span class="job__bar" role="progressbar" aria-label="Sedang berjalan"></span>' : '') +
        '<small' + (j.state === 'fail' ? ' class="is-no"' : '') + '>' + esc(j.sub) + '</small></span>' + act + '</div>';
    };
    return stats + '<div class="pop-label">Aktivitas</div><div class="sh-row">' + jobs.map(row).join('') + '</div>' +
      (n('done') ? EV.button({ label: 'Bersihkan yang selesai', variant: 'secondary', attrs: { 'data-act': 'clear-done' } }) : '');
  };

  /* MenuPanel: { tabs:[key], active, freq:[{icon,label,attrs}], items:[{icon,label,here,attrs}], query } -> isi .ov-content */
  EV.menuBody = function (o) {
    return '<div class="mn-head"><div><h2 class="mn-title" id="mn-t">Menu</h2><p class="mn-sub">Semua modul dan layanan HCIS</p></div>' +
      '<button class="pop-close" data-close aria-label="Tutup menu">' + I('close', 18, 2.4) + '</button></div>' +
      '<label class="mn-search">' + I('search', 18, 2.4) + '<input type="search" placeholder="Cari menu atau layanan" aria-label="Cari menu atau layanan" value="' + esc(o.query || '') + '" data-menu-q></label>' +
      '<div class="mn-label">Sering dikunjungi</div><div class="mn-freq">' + o.freq.map(function (f) {
        return '<button' + attrs(f.attrs) + '><span class="pp-tile">' + I(f.icon, 14, 2.4) + '</span>' + esc(f.label) + '</button>';
      }).join('') + '</div>' +
      '<div class="mn-tabs" role="tablist">' + o.tabs.map(function (t) {
        return '<button class="mn-tab' + (t === o.active ? ' is-active' : '') + '" role="tab" aria-selected="' + (t === o.active) + '" data-mtab="' + t + '">' + t + '</button>';
      }).join('') + '</div>' +
      '<div class="mn-grid" data-menu-grid>' + EV.menuItems(o.items) + '</div>';
  };
  EV.menuItems = function (items) {
    if (!items.length) return '<p class="mn-empty" style="grid-column:1/-1">Menu tidak ditemukan. Coba kata kunci lain.</p>';
    return items.map(function (m, i) {
      return '<button class="cuti-item' + (m.here ? ' is-here' : '') + '" style="--d:' + (0.34 + i * 0.05).toFixed(2) + 's"' + attrs(m.attrs) + '><span class="cuti-item__tile">' + I(m.icon, 20, 2.2) + '</span>' + esc(m.label) + '</button>';
    }).join('');
  };

  /* CancelSheet (lengkap): { code, range, meta, status } */
  EV.cancelSheet = function (o) {
    var r = function (icon, tone, t, s) { return '<div class="cf-r"><span class="tile tile--' + tone + '">' + I(icon, 16, 2.4) + '</span><span><b>' + t + '</b><small>' + s + '</small></span></div>'; };
    return '<div class="scrim" data-close></div><div class="sheet sheet--confirm cf" role="dialog" aria-modal="true" aria-labelledby="cf-t">' +
      '<div class="sheet__handle"></div><div class="cf-disc">' + I('calendar-x', 24, 2.4) + '</div>' +
      '<h2 class="sheet__title" id="cf-t">Batalkan pengajuan ini?</h2><p class="sheet__text">Proses approval akan dihentikan seketika.</p>' +
      '<div class="cf-obj"><span class="cf-obj__top">' + esc(o.code) + EV.statusChip(o.status) + '</span><b>' + esc(o.range) + '</b><small>' + esc(o.meta) + '</small></div>' +
      '<div class="cf-after"><div class="pop-label" style="margin:0">Setelah dibatalkan</div>' +
      r('ban', 'no', 'Approval dihentikan', 'Atasan tidak lagi menerima permintaan ini.') +
      r('wallet', 'ok', 'Saldo dikembalikan', 'Hari cuti kembali ke saldo kamu.') +
      r('refresh', 'info', 'Bisa diajukan ulang', 'Tanggal yang sama tetap bisa kamu ajukan kembali.') + '</div>' +
      '<div class="sheet__actions">' + EV.button({ label: 'Ya, batalkan pengajuan', variant: 'danger', attrs: { 'data-confirm': '' } }) +
      EV.button({ label: 'Tidak jadi', variant: 'secondary', attrs: { 'data-close': '' } }) + '</div></div>';
  };

  g.EV = EV;
})(window);
