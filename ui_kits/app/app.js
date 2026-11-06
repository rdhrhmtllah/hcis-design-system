/* Evo HCIS Mobile — Cuti Saya applied kit: screens + state. Uses EV (components.js). */
(function () {
  var LOGO = '../../assets/evo-group-logo.png';
  var root = document.getElementById('screen');
  var overlay = document.getElementById('overlay');
  var I = EV.icon;

  var state = {
    screen: 'home', filter: 'all', histFilter: 'all', notifTab: 'all', openId: null, reminded: {},
    form: { type: 'tahunan', start: null, end: null, reason: '' },
    requests: [
      { id: 'r1', type: 'Cuti tahunan', icon: 'calendar-days', code: 'CT-26-014', status: 'wait', range: '12–13 November', meta: '2 hari kerja · Potong 2 hari', submitted: '4 Nov 2026, 09:12', reason: 'Acara keluarga di Bandung',
        steps: [{ label: 'Diajukan', sub: '4 Nov', state: 'done' }, { label: 'Atasan', sub: 'Rina S.', state: 'active' }, { label: 'HR', sub: 'Berikutnya', state: 'todo' }] },
      { id: 'r2', type: 'Cuti sakit', icon: 'heart', code: 'CS-26-006', status: 'hr', range: '2–3 November', meta: '2 hari · Tidak potong saldo', submitted: '3 Nov 2026, 07:40', reason: 'Demam, surat dokter terlampir',
        steps: [{ label: 'Diajukan', sub: '3 Nov', state: 'done' }, { label: 'Atasan', sub: '3 Nov', state: 'done' }, { label: 'HR', sub: 'Sedang dicek', state: 'active' }] }
    ],
    history: [
      { id: 'h1', group: 'Oktober 2026', day: '20', mon: 'Okt', title: '20–21 Oktober', meta: 'Cuti tahunan · 2 hari kerja', status: 'ok' },
      { id: 'h2', group: 'Oktober 2026', day: '8', mon: 'Okt', title: '8 Oktober', meta: 'Izin · 4 jam', status: 'no' },
      { id: 'h3', group: 'September 2026', day: '15', mon: 'Sep', title: '15 September', meta: 'Cuti khusus · 1 hari', status: 'cx' },
      { id: 'h4', group: 'September 2026', day: '1', mon: 'Sep', title: '1–3 September', meta: 'Cuti tahunan · 3 hari kerja', status: 'ok' }
    ]
  };
  var TYPES = {
    tahunan: { label: 'Cuti tahunan', sub: 'Potong saldo · sisa 5 hari', icon: 'calendar-days' },
    sakit: { label: 'Cuti sakit', sub: 'Tidak potong saldo · perlu surat dokter', icon: 'heart' },
    khusus: { label: 'Cuti khusus', sub: 'Menikah, duka, kelahiran anak', icon: 'document' },
    tanpa: { label: 'Cuti tanpa gaji', sub: 'Tidak potong saldo · potong gaji', icon: 'banknote' }
  };

  function workdays(s, e) { var n = 0; for (var d = s; d <= e; d++) { var w = new Date(2026, 10, d).getDay(); if (w !== 0 && w !== 6) n++; } return n; }

  /* ---------------- screens ---------------- */
  var screens = {
    home: function () {
      var counts = { all: state.requests.length, wait: 0, hr: 0 };
      state.requests.forEach(function (r) { if (counts[r.status] != null) counts[r.status]++; });
      var list = state.requests.filter(function (r) { return state.filter === 'all' || r.status === state.filter; });
      var header = EV.pageHeader({
        logo: LOGO, eyebrow: 'HCIS Mobile · Evo Group', title: 'Cuti Saya', sub: 'Halo, Dimas. Saldo dan pengajuanmu ada di sini.',
        pill: { label: 'Tur', icon: 'play', attrs: { 'data-act': 'tour' } },
        actions: [{ icon: 'refresh', label: 'Perbarui data', attrs: { 'data-act': 'refresh' } }, { icon: 'help', label: 'Bantuan', attrs: { 'data-act': 'help' } }],
        chips: EV.summaryChips([
          { key: 'all', label: 'Semua', count: counts.all },
          { key: 'wait', label: 'Menunggu', count: counts.wait, dot: 'wait' },
          { key: 'hr', label: 'Di HR', count: counts.hr, dot: 'hr' }
        ], state.filter)
      });
      var used = 5, pending = state.requests.filter(function (r) { return r.status === 'wait' && r.type === 'Cuti tahunan'; }).length ? 2 : 0;
      return header +
        EV.balanceCard({ year: 2026, total: 12, used: used, pending: pending, remaining: 12 - used - pending,
          cta: EV.button({ label: 'Ajukan cuti', icon: 'calendar-check', arrow: true, attrs: { 'data-go': 'form' } }) }) +
        '<div class="section" style="padding-top:var(--ev-sp-16)">' + EV.shortcuts([
          { label: 'Riwayat', icon: 'history', attrs: { 'data-go': 'history' } },
          { label: 'Jenis cuti', icon: 'folder', tone: 'info', attrs: { 'data-act': 'types' } },
          { label: 'Ketentuan', icon: 'document-lines', tone: 'ok', attrs: { 'data-act': 'rules' } }
        ]) + '</div>' +
        '<section class="section"><div class="section__head"><h2 class="section__title">Pengajuan aktif</h2><span class="ev-caption">' + list.length + ' pengajuan</span></div>' +
        '<div class="stack">' + (list.length ? list.map(EV.requestCard).join('') : EV.empty('calendar', 'Belum ada pengajuan aktif', 'Pengajuan yang sedang berjalan akan muncul di sini.')) + '</div></section>' +
        '<section class="section"><div class="section__head"><h2 class="section__title">Terakhir diputuskan</h2><button class="link-btn" data-go="history">Lihat semua ' + I('chevron-right', 16, 2.6) + '</button></div>' +
        state.history.slice(0, 2).map(EV.historyRow).join('') + '</section>';
    },

    form: function () {
      var f = state.form, t = TYPES[f.type];
      var days = f.start ? workdays(f.start, f.end || f.start) : 0;
      var range = f.start ? (f.end && f.end !== f.start ? f.start + '–' + f.end + ' November' : f.start + ' November') : null;
      var deduct = f.type === 'tahunan';
      var over = deduct && days > 5;
      var summary = !f.start ? EV.message('info', 'Pilih tanggal cuti', 'Ketuk tanggal mulai, lalu tanggal selesai. Sabtu dan Minggu tidak dihitung.', 'info')
        : over ? EV.message('no', 'Saldo tidak mencukupi', 'Rentang ini butuh ' + days + ' hari, sisa saldomu 5 hari. Persingkat rentangnya.', 'alert-circle')
        : EV.message('ok', range + ' · ' + days + ' hari kerja', deduct ? 'Potong ' + days + ' hari. Sisa saldomu jadi ' + (5 - days) + ' hari.' : 'Tidak potong saldo.', 'calendar-check');
      return EV.pageHeader({ compact: true, back: { 'data-go': 'home' }, eyebrow: 'Langkah 1 dari 1', title: 'Ajukan cuti' }) +
        '<div class="section" style="padding-top:var(--ev-sp-16)"><div class="stack" style="gap:var(--ev-sp-16)">' +
        '<div class="field"><span class="field__label">Jenis cuti</span><button class="select" data-act="pick-type"><span class="tile" style="width:32px;height:32px">' + I(t.icon, 16, 2.2) + '</span><span class="select__value"><b style="display:block;font-weight:700">' + t.label + '</b><span class="ev-caption">' + t.sub + '</span></span>' + I('chevron-down', 18, 2.4) + '</button></div>' +
        '<div class="card"><div class="field__label" style="margin-bottom:var(--ev-sp-8)">Tanggal cuti</div>' +
        EV.calendar({ year: 2026, month: 10, start: f.start, end: f.end, today: 6, minDay: 9 }) + '</div>' +
        summary +
        '<label class="field"><span class="field__label">Alasan <em>(opsional)</em></span><textarea class="input" data-reason placeholder="Contoh: acara keluarga">' + f.reason + '</textarea></label>' +
        '<div class="card" style="display:flex;gap:var(--ev-sp-12);align-items:center;box-shadow:var(--ev-sh-row)"><span class="tile">' + I('user-check', 20, 2.2) + '</span><div style="flex:1"><div class="ev-label">Disetujui oleh</div><div class="ev-body-strong">Rina Susanti → HR</div></div></div>' +
        '</div></div><div style="height:120px"></div>' +
        '<div class="actionbar">' + EV.button({ label: 'Kirim pengajuan', icon: 'upload', arrow: true, disabled: !f.start || over, attrs: { 'data-act': 'send' } }) + '</div>';
    },

    sending: function () {
      return '<div class="fullscreen" role="status" aria-live="polite">' +
        '<div class="ev-label" style="color:rgba(255,255,255,.72)">CT-26-015</div>' +
        '<div class="route"><span class="route__node is-on">' + I('id-card', 22, 2.2) + '</span><span class="route__line"></span>' +
        '<span class="route__node">' + I('user-check', 22, 2.2) + '</span><span class="route__line" style="opacity:.5"></span>' +
        '<span class="route__node">' + I('document', 22, 2.2) + '</span></div>' +
        '<h1 class="ev-title-l" style="margin:0">Mengirim pengajuan…</h1><p class="ev-body" style="color:rgba(255,255,255,.8);margin:8px 0 0">Menghubungi atasan langsung…</p></div>';
    },

    success: function () {
      var r = state.requests[0];
      return '<div class="ph" style="text-align:center;padding-bottom:96px"><div class="ph__bar"><span class="ph__spacer"></span><button class="glass" aria-label="Tutup" data-go="home">' + I('close', 18, 2.4) + '</button></div>' +
        '<div class="success-disc" style="margin:8px auto 28px">' + I('check', 40, 3.4) + '</div>' +
        '<h1 class="ph__title">Pengajuan terkirim!</h1><p class="ph__sub">Atasan langsung kamu sudah menerima pengajuan ini.</p></div>' +
        '<div style="margin:-72px 16px 0;position:relative;z-index:2" class="receipt enter">' +
        '<div style="display:flex;justify-content:space-between;align-items:center"><span class="ev-label">' + r.code + '</span>' + EV.statusChip('wait') + '</div>' +
        '<div class="ev-title-l" style="margin-top:8px">' + r.range + '</div><div class="ev-body-sm" style="color:var(--ev-ink-2)">' + r.type + ' · ' + r.meta + '</div>' +
        '<div class="receipt__cut"></div>' + EV.stepper(r.steps) + '</div><div style="height:120px"></div>' +
        '<div class="actionbar actionbar--row">' + EV.button({ label: 'Ajukan lagi', variant: 'secondary', attrs: { 'data-go': 'form' } }) + EV.button({ label: 'Lihat pengajuan saya', attrs: { 'data-go': 'home' } }) + '</div>';
    },

    detail: function () {
      var r = state.requests.filter(function (x) { return x.id === state.openId; })[0] || state.requests[0];
      var reminded = state.reminded[r.id];
      var actions = r.status === 'cx' ? '' : '<div class="actionbar actionbar--row">' + EV.button({ label: 'Batalkan', variant: 'secondary', attrs: { 'data-act': 'cancel' } }) +
        (r.status === 'wait' ? EV.button({ label: reminded ? 'Sudah diingatkan' : 'Ingatkan atasan', icon: reminded ? 'check' : 'bell', attrs: { 'data-act': 'remind' } }) : EV.button({ label: 'Unduh bukti', icon: 'download', attrs: { 'data-act': 'download' } })) + '</div>';
      return EV.pageHeader({ compact: true, back: { 'data-go': 'home' }, eyebrow: r.code, title: 'Detail pengajuan' }) +
        '<div class="section" style="padding-top:var(--ev-sp-16)"><div class="stack">' +
        '<div class="card enter"><div style="display:flex;justify-content:space-between;align-items:center"><span class="tile">' + I(r.icon, 20, 2.2) + '</span>' + EV.statusChip(r.status) + '</div>' +
        '<div class="ev-title-l" style="margin-top:14px">' + r.range + '</div><div class="ev-body" style="color:var(--ev-ink-2)">' + r.type + ' · ' + r.meta + '</div>' +
        '<div class="rcard__foot">' + EV.stepper(r.status === 'cx' ? [{ label: 'Diajukan', sub: r.steps[0].sub, state: 'done' }, { label: 'Dibatalkan', sub: 'Oleh kamu', state: 'rejected' }] : r.steps) + '</div></div>' +
        (r.status === 'wait' ? EV.message('wait', 'Menunggu atasan', 'Biasanya diputuskan dalam 1–2 hari kerja. Kamu bisa mengingatkan atasan sekali tiap jam.', 'clock') : '') +
        (r.status === 'hr' ? EV.message('info', 'Sedang dicek HR', 'Atasan sudah setuju. HR memeriksa surat dokter yang kamu lampirkan.', 'user-check') : '') +
        '<div class="card enter"><div class="ev-label" style="margin-bottom:4px">Informasi</div>' + EV.infoList([
          ['Diajukan', r.submitted], ['Jenis', r.type], ['Durasi', r.meta.split(' · ')[0]], ['Saldo', r.meta.split(' · ')[1]], ['Alasan', r.reason]
        ]) + '</div></div></div><div style="height:120px"></div>' + actions;
    },

    history: function () {
      var keys = ['all', 'ok', 'no', 'cx'], words = { all: 'Semua', ok: 'Disetujui', no: 'Ditolak', cx: 'Dibatalkan' };
      var items = state.history.filter(function (h) { return state.histFilter === 'all' || h.status === state.histFilter; });
      var groups = {}; items.forEach(function (h) { (groups[h.group] = groups[h.group] || []).push(h); });
      var body = items.length ? Object.keys(groups).map(function (gk) { return '<div class="month">' + gk + '</div>' + groups[gk].map(EV.historyRow).join(''); }).join('')
        : EV.empty('history', 'Belum ada yang ' + words[state.histFilter].toLowerCase(), 'Tidak ada pengajuan dengan status ini. Coba lihat semua riwayat.');
      return EV.pageHeader({ compact: true, back: { 'data-go': 'home' }, eyebrow: 'Cuti Saya', title: 'Riwayat cuti' }) +
        '<div class="section" style="padding-top:var(--ev-sp-16)"><div class="fchips" role="tablist">' + keys.map(function (k) {
          var n = k === 'all' ? state.history.length : state.history.filter(function (h) { return h.status === k; }).length;
          return '<button class="fchip' + (state.histFilter === k ? ' is-active' : '') + '" data-hfilter="' + k + '" role="tab" aria-selected="' + (state.histFilter === k) + '">' + (k !== 'all' ? '<span class="dot dot--' + k + '"></span>' : '') + words[k] + ' <b>' + n + '</b></button>';
        }).join('') + '</div>' + body + '</div><div style="height:100px"></div>';
    },

    notif: function () {
      var rows = [
        { unread: true, icon: 'user-check', tone: 'info', title: 'Atasan menyetujui CS-26-006', text: 'Pengajuan cuti sakit 2–3 November kini di HR.', time: '2 jam lalu' },
        { unread: true, icon: 'bell', tone: '', title: 'Pengingat terkirim', text: 'Rina Susanti menerima pengingat untuk CT-26-014.', time: 'Kemarin' },
        { unread: true, icon: 'calendar-check', tone: 'ok', title: 'Cuti 20–21 Oktober disetujui', text: 'Saldo terpotong 2 hari.', time: '2 hari lalu' },
        { unread: false, icon: 'calendar-x', tone: 'no', title: 'Izin 8 Oktober ditolak', text: 'Alasan: jadwal audit tim. Ajukan lagi di tanggal lain.', time: '8 Okt 2026, 14:20' }
      ].filter(function (n) { return state.notifTab === 'all' || n.unread; });
      return EV.pageHeader({ compact: true, back: { 'data-go': 'home' }, eyebrow: 'Kotak masuk', title: 'Notifikasi' }) +
        '<div class="section" style="padding-top:var(--ev-sp-16)"><div class="seg" role="tablist"><button data-ntab="all" class="' + (state.notifTab === 'all' ? 'is-active' : '') + '">Semua</button><button data-ntab="unread" class="' + (state.notifTab === 'unread' ? 'is-active' : '') + '">Belum dibaca · 3</button></div>' +
        '<div class="stack" style="margin-top:var(--ev-sp-12);gap:var(--ev-sp-8)">' + rows.map(function (n) {
          return '<div class="nrow' + (n.unread ? ' is-unread' : '') + '"><span class="tile' + (n.tone ? ' tile--' + n.tone : '') + '">' + I(n.icon, 18, 2.2) + '</span><div class="nrow__body"><b>' + n.title + '</b><p>' + n.text + '</p><small>' + n.time + '</small></div></div>';
        }).join('') + '</div></div><div style="height:100px"></div>';
    },

    profile: function () {
      return EV.pageHeader({ compact: true, back: { 'data-go': 'home' }, eyebrow: 'Akun', title: 'Profil' }) +
        '<div class="section" style="padding-top:var(--ev-sp-16)"><div class="card"><div style="display:flex;gap:12px;align-items:center;margin-bottom:8px"><span class="tile tile--gold" style="width:52px;height:52px;font:800 20px/1 var(--font-display)">DP</span><div><div class="ev-title-m">Dimas Pratama</div><div class="ev-caption">Product Analyst · EVO-02817</div></div></div>' +
        EV.infoList([['Unit', 'Digital Product'], ['Atasan', 'Rina Susanti'], ['Bergabung', '14 Feb 2022']]) + '</div>' +
        '<div style="margin-top:16px">' + EV.button({ label: 'Keluar', variant: 'secondary', attrs: { 'data-act': 'logout' } }) + '</div></div><div style="height:100px"></div>';
    }
  };

  var NAV = { home: 'home', history: 'history', notif: 'notif', profile: 'profile' };

  /* ---------------- overlays ---------------- */
  function openSheet(html) { overlay.innerHTML = html; overlay.querySelector('.sheet button, .sheet [tabindex]') && overlay.querySelector('.sheet button').focus(); }
  function closeSheet() { overlay.innerHTML = ''; }
  var toastTimer;
  function toast(t) {
    var host = document.getElementById('toast');
    host.innerHTML = EV.toast(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { host.innerHTML = ''; }, (t.duration || (t.action ? 5.2 : 3.2)) * 1000);
  }
  function menuSheet() {
    var mods = [['calendar-days', 'Cuti', '', 'home'], ['clock', 'Absensi', 'info'], ['trend', 'Lembur', 'wait'], ['banknote', 'Slip gaji', 'ok'], ['graduation', 'Pelatihan', ''], ['folder', 'Dokumen', 'info'], ['help', 'Bantuan', 'wait'], ['logout', 'Keluar', 'no']];
    return '<div class="scrim" data-close></div><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="mn-t"><div class="sheet__handle"></div>' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:18px"><span class="ph__logo" style="width:40px;height:40px;box-shadow:var(--ev-sh-row)"><img src="' + LOGO + '" alt="Evo Group"></span><div><h2 class="sheet__title" id="mn-t" style="font-size:var(--ev-fs-title-m)">Menu HCIS</h2><div class="ev-caption">Layanan karyawan Evo Group</div></div></div>' +
      '<div class="ev-label" style="margin-bottom:12px">Layanan mandiri</div><div class="menu-grid">' + mods.map(function (m) {
        return '<button class="menu-item"' + (m[3] ? ' data-go="' + m[3] + '"' : ' data-act="module"') + '><span class="tile' + (m[2] ? ' tile--' + m[2] : '') + '">' + I(m[0], 22, 2.2) + '</span>' + m[1] + '</button>';
      }).join('') + '</div></div>';
  }
  function typeSheet() {
    return '<div class="scrim" data-close></div><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="ts-t"><div class="sheet__handle"></div><h2 class="sheet__title" id="ts-t">Pilih jenis cuti</h2><p class="sheet__text">Saldo hanya terpotong untuk cuti tahunan.</p>' +
      '<div class="optlist">' + Object.keys(TYPES).map(function (k) {
        var t = TYPES[k];
        return '<button class="opt' + (state.form.type === k ? ' is-active' : '') + '" data-type="' + k + '"><span class="tile">' + I(t.icon, 18, 2.2) + '</span><span class="opt__body"><b>' + t.label + '</b><small>' + t.sub + '</small></span><span class="radio"></span></button>';
      }).join('') + '</div></div>';
  }

  /* ---------------- render ---------------- */
  function render(scrollTop) {
    var s = state.screen;
    var keep = root.scrollTop;
    root.innerHTML = screens[s]();
    /* fixed chrome (nav, action bar, full-screen states) lives outside the scroll area */
    var chrome = document.getElementById('chrome');
    chrome.innerHTML = NAV[s] ? EV.bottomNav(NAV[s]) : '';
    root.querySelectorAll('.actionbar, .fullscreen').forEach(function (n) { chrome.appendChild(n); });
    root.scrollTop = scrollTop === false ? keep : 0;
    document.querySelectorAll('[data-jump]').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-jump') === s); });
  }
  function go(s) { closeSheet(); state.screen = s; render(); }

  /* ---------------- events ---------------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-go],[data-act],[data-nav],[data-open],[data-filter],[data-hfilter],[data-ntab],[data-day],[data-type],[data-close],[data-confirm],[data-jump],[data-toast-action]');
    if (!el) return;
    var d = el.dataset;
    if (d.jump) { if (d.jump === 'detail') state.openId = 'r1'; if (d.jump === 'menu') { state.screen = 'home'; render(); openSheet(menuSheet()); return; } if (d.jump === 'cancel') { state.screen = 'detail'; state.openId = 'r1'; render(); openSheet(cancelSheet()); return; } go(d.jump); return; }
    if (d.go) { if (d.go === 'form') state.form = { type: 'tahunan', start: null, end: null, reason: '' }; go(d.go); return; }
    if (d.nav) { if (d.nav === 'menu') { openSheet(menuSheet()); return; } go(d.nav); return; }
    if (d.open) { var isReq = state.requests.some(function (r) { return r.id === d.open; }); if (isReq) { state.openId = d.open; go('detail'); } else toast({ tone: 'ok', title: 'Bukti tersimpan', sub: 'Bukti pengajuan ada di unduhanmu.' }); return; }
    if (d.filter) { state.filter = d.filter; render(false); return; }
    if (d.hfilter) { state.histFilter = d.hfilter; render(false); return; }
    if (d.ntab) { state.notifTab = d.ntab; render(false); return; }
    if (d.type) { state.form.type = d.type; closeSheet(); render(false); return; }
    if (d.close !== undefined) { closeSheet(); return; }
    if (d.toastAction !== undefined) { document.getElementById('toast').innerHTML = ''; toast({ tone: 'ok', title: 'Data diperbarui', sub: 'Terakhir 10.42' }); return; }
    if (d.confirm !== undefined) {
      var r = state.requests.filter(function (x) { return x.id === state.openId; })[0];
      r.status = 'cx'; closeSheet(); render(false);
      toast({ tone: 'ok', title: 'Pengajuan dibatalkan', sub: r.code + ' tidak lagi menunggu persetujuan.' });
      return;
    }
    if (d.day) {
      var day = +d.day, f = state.form;
      if (!f.start || (f.start && f.end)) { f.start = day; f.end = null; }
      else if (day < f.start) { f.start = day; }
      else { f.end = day; }
      render(false); return;
    }
    switch (d.act) {
      case 'pick-type': openSheet(typeSheet()); break;
      case 'send':
        state.requests.unshift({ id: 'r' + Date.now(), type: TYPES[state.form.type].label, icon: TYPES[state.form.type].icon, code: { tahunan: 'CT', sakit: 'CS', khusus: 'CK', tanpa: 'CG' }[state.form.type] + '-26-015', status: 'wait',
          range: state.form.end && state.form.end !== state.form.start ? state.form.start + '–' + state.form.end + ' November' : state.form.start + ' November',
          meta: workdays(state.form.start, state.form.end || state.form.start) + ' hari kerja · ' + (state.form.type === 'tahunan' ? 'Potong ' + workdays(state.form.start, state.form.end || state.form.start) + ' hari' : 'Tidak potong saldo'),
          submitted: '6 Nov 2026, 10:42', reason: state.form.reason || '—',
          steps: [{ label: 'Diajukan', sub: '6 Nov', state: 'done' }, { label: 'Atasan', sub: 'Rina S.', state: 'active' }, { label: 'HR', sub: 'Berikutnya', state: 'todo' }] });
        go('sending'); setTimeout(function () { if (state.screen === 'sending') go('success'); }, 2200); break;
      case 'cancel': openSheet(cancelSheet()); break;
      case 'remind':
        if (state.reminded[state.openId]) toast({ tone: 'wait', title: 'Sudah diingatkan tadi', sub: 'Pengingat berikutnya bisa dikirim 1 jam setelah yang terakhir.' });
        else { state.reminded[state.openId] = true; render(false); toast({ tone: 'ok', title: 'Pengingat terkirim', sub: 'Atasan menerima notifikasi untuk CT-26-014.' }); }
        break;
      case 'download': toast({ tone: 'ok', title: 'Bukti tersimpan', sub: 'CS-26-006.pdf ada di unduhanmu.' }); break;
      case 'refresh':
        toast({ tone: 'no', title: 'Gagal memperbarui data', sub: 'Periksa sinyal atau Wi-Fi, lalu tarik lagi.', action: 'Coba lagi', duration: 6.5 }); break;
      case 'types': openSheet(typeSheet()); break;
      case 'rules': case 'help': case 'tour': openSheet(rulesSheet()); break;
      case 'module': case 'logout':
        closeSheet(); toast({ tone: 'wait', title: 'Sistem sedang sibuk', sub: 'Server HCIS sedang padat. Coba lagi sebentar lagi.' }); break;
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });
  document.addEventListener('input', function (e) { if (e.target.matches('[data-reason]')) state.form.reason = e.target.value; });

  function rulesSheet() {
    return '<div class="scrim" data-close></div><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="rs-t"><div class="sheet__handle"></div><h2 class="sheet__title" id="rs-t">Ketentuan cuti</h2><p class="sheet__text">Ringkasan aturan cuti karyawan Evo Group 2026.</p>' +
      '<div class="stack" style="margin-top:16px;gap:10px">' +
      EV.message('info', '12 hari cuti tahunan', 'Saldo dihitung per tahun kalender dan tidak bisa dibawa ke tahun berikutnya.', 'calendar-days') +
      EV.message('wait', 'Ajukan paling lambat H-3', 'Atasan butuh waktu memutuskan. Cuti sakit boleh diajukan di hari yang sama.', 'clock') +
      EV.message('ok', 'Sabtu, Minggu, libur nasional', 'Tidak dihitung sebagai hari cuti.', 'check') +
      '</div><div class="sheet__actions">' + EV.button({ label: 'Mengerti', attrs: { 'data-close': '' } }) + '</div></div>';
  }

  function cancelSheet() {
    var r = state.requests.filter(function (x) { return x.id === state.openId; })[0] || state.requests[0];
    return EV.confirmSheet({ title: 'Batalkan pengajuan ini?', text: 'Atasan dan HR tidak akan memprosesnya lagi. Saldo yang tertahan kembali ke sisa cutimu.',
      objTitle: r.range, objSub: r.type + ' · ' + r.code, objIcon: r.icon, confirm: 'Ya, batalkan pengajuan' });
  }

  render();
})();
