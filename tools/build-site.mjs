// Membangun situs dokumentasi HCIS Mobile design system + DESIGN.md
// Jalankan dari akar proyek:  node tools/build-site.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createMd, esc, slug } from './md.mjs';

const ROOT = process.cwd();
const SRC = path.join(ROOT, '_src/hcis-mobile-design-system/project');
const OUT = path.join(ROOT, 'hcis-design-system');
const read = (p) => fs.readFileSync(path.join(SRC, p), 'utf8');
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'previews'), { recursive: true });

const tokens = JSON.parse(read('tokens.json'));
const T = (k) => (tokens[k] && tokens[k].tokens) || [];

// ---------- Panduan ----------
const GUIDE_ORDER = ['cara-menyusun-halaman', 'layout', 'patterns', 'states', 'motion', 'gestures', 'accessibility', 'microcopy', 'templates'];
const GUIDE_FALLBACK = {
  'cara-menyusun-halaman': 'Cara menyusun halaman', layout: 'Layout', patterns: 'Pola', states: 'State',
  motion: 'Gerak', gestures: 'Gestur', accessibility: 'Aksesibilitas', microcopy: 'Microcopy', templates: 'Template halaman',
};
const guides = GUIDE_ORDER.filter((g) => fs.existsSync(path.join(SRC, g + '.md'))).map((g) => {
  let src = read(g + '.md');
  let title = GUIDE_FALLBACK[g];
  const m = src.match(/^\s*#\s+(.+)\s*\n/);
  if (m) { title = m[1].trim(); src = src.slice(m.index + m[0].length); }
  return { slug: g, title, src };
});

// ---------- Komponen ----------
const compDirs = fs.readdirSync(path.join(SRC, 'components'), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const comps = compDirs.map((name) => {
  const dir = path.join(SRC, 'components', name);
  const readme = fs.existsSync(path.join(dir, 'README.md')) ? fs.readFileSync(path.join(dir, 'README.md'), 'utf8') : '';
  const preview = fs.existsSync(path.join(dir, 'preview.html')) ? fs.readFileSync(path.join(dir, 'preview.html'), 'utf8') : '';
  const head = preview.match(/<!--\s*@dsCard([^>]*?)-->/);
  const attr = (k) => { const r = head && head[1].match(new RegExp(k + '=(?:"([^"]*)"|(\\S+))')); return r ? (r[1] ?? r[2]) : ''; };
  return { name, readme, preview, group: attr('group'), height: parseInt(attr('height'), 10) || 360, subtitle: attr('subtitle') };
}).sort((a, b) => a.name.localeCompare(b.name));

const cover = comps.find((c) => c.name === 'Cover');
const iconComp = comps.find((c) => c.name === 'Icon');
const docComps = comps.filter((c) => c.name !== 'Cover' && c.name !== 'Icon');

const groupOrder = [];
for (const c of docComps) { const g = c.group || 'Lainnya'; if (!groupOrder.includes(g)) groupOrder.push(g); }
const PREFERRED = ['Kerangka', 'Navigasi', 'Aksi', 'Input', 'Pengajuan', 'Data', 'Daftar', 'Status', 'Pesan', 'Umpan balik', 'Lapisan', 'Panel', 'Penampung', 'Bantuan', 'Layar penuh', 'Halaman contoh'];
groupOrder.sort((a, b) => {
  const ia = PREFERRED.indexOf(a), ib = PREFERRED.indexOf(b);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
});
const byGroup = groupOrder.map((g) => ({ name: g, slug: 'grup-' + slug(g), items: docComps.filter((c) => (c.group || 'Lainnya') === g) }));

// ---------- Markdown ----------
const colorNames = new Set(T('color').map((t) => t.name));
const md = createMd({ components: new Set(compDirs), guides: new Set(GUIDE_ORDER), colorTokens: colorNames });

// ---------- Warna ----------
function hexToRgb(h) {
  const m = String(h).trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let x = m[1];
  if (x.length === 3) x = x.split('').map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16));
}
const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const contrast = (a, b) => { const A = lum(a), B = lum(b); return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05); };
const fmt = (n) => n.toFixed(1).replace('.', ',');

function colorFamily(n) {
  if (/^ev-purple/.test(n)) return 'Ungu';
  if (/^ev-gold/.test(n)) return 'Emas';
  if (/^ev-(ok|wait|no|cx|info)-/.test(n)) return 'Status';
  if (/^ev-path/.test(n)) return 'Jalur lokasi';
  return 'Tinta dan permukaan';
}
const FAMILY_ORDER = ['Ungu', 'Emas', 'Tinta dan permukaan', 'Status', 'Jalur lokasi'];
const purpleRank = (n) => { const m = n.match(/ev-purple-(\d+)$/); return m ? -parseInt(m[1], 10) : 0; };

function swatch(t) {
  const rgb = hexToRgb(t.value);
  let chips = '';
  if (rgb) {
    const w = contrast(rgb, [255, 255, 255]);
    const k = contrast(rgb, hexToRgb('#1a1530') || [26, 21, 48]);
    chips = `<span class="ratio" title="Kontras terhadap putih">Putih ${fmt(w)}:1</span>`;
    if (k > 0) chips += `<span class="ratio" title="Kontras terhadap tinta gelap">Tinta ${fmt(k)}:1</span>`;
  }
  const fg = rgb && contrast(rgb, [255, 255, 255]) >= 4.5 ? '#fff' : '#1a1530';
  return `<li class="swatch" data-search="${esc(t.name)}">
    <div class="chip" style="background:var(--${t.name});color:${fg}"><span>Aa</span></div>
    <div class="sw-meta"><code class="sw-name">${esc(t.name)}</code><span class="sw-val">${esc(t.value)}</span><span class="sw-ratios">${chips}</span>
    <p>${md.inline(t.usage || '')}</p></div></li>`;
}

function colorsHtml() {
  const fam = {};
  for (const t of T('color')) (fam[colorFamily(t.name)] ||= []).push(t);
  if (fam['Ungu']) fam['Ungu'].sort((a, b) => purpleRank(a.name) - purpleRank(b.name));
  return FAMILY_ORDER.filter((f) => fam[f]).map((f) => `<h4 id="warna-${slug(f)}">${esc(f)} <span class="count">${fam[f].length}</span></h4><ul class="swatches">${fam[f].map(swatch).join('')}</ul>`).join('\n');
}

// ---------- Tipografi ----------
function typeHtml() {
  const fams = tokens.type.families || {};
  let h = `<div class="table-wrap" tabindex="0"><table><thead><tr><th scope="col">Keluarga</th><th scope="col">Tumpukan font</th></tr></thead><tbody>${Object.entries(fams).map(([k, v]) => `<tr><td><code>--font-${esc(k)}</code></td><td><code>${esc(v)}</code></td></tr>`).join('')}</tbody></table></div>`;
  for (const g of tokens.type.groups || []) {
    h += `<h4 id="tipe-${slug(g.name)}">${esc(g.name)} <span class="count">${esc(g.family)}</span></h4><ul class="type-list">`;
    for (const s of g.styles) {
      const style = `font-family:var(--font-${g.family});font-size:${s.fontSize};line-height:${s.lineHeight};font-weight:${s.fontWeight};${s.letterSpacing ? `letter-spacing:${s.letterSpacing};` : ''}${s.textTransform ? `text-transform:${s.textTransform};` : ''}`;
      h += `<li class="type-row"><div class="type-sample" style="${style}">${esc(s.sample || s.name)}</div>
        <div class="type-meta"><code>${esc(s.name)}</code><span>${esc(s.fontSize)} / ${esc(s.lineHeight)} · ${esc(s.fontWeight)}${s.letterSpacing ? ' · ' + esc(s.letterSpacing) : ''}</span><p>${md.inline(s.usage || '')}</p></div></li>`;
    }
    h += '</ul>';
  }
  return h;
}

// ---------- Jarak, radius, bayangan ----------
const spacingHtml = () => `<ul class="scale">${T('spacing').map((t) => `<li><code>${esc(t.name)}</code><span class="val">${esc(t.value)}</span><span class="bar" style="width:${esc(t.value)}"></span><p>${md.inline(t.usage || '')}</p></li>`).join('')}</ul>`;
const radiusHtml = () => `<ul class="tiles">${T('radius').map((t) => `<li><div class="radius-box" style="border-radius:${esc(t.value)}"></div><code>${esc(t.name)}</code><span class="val">${esc(t.value)}</span><p>${md.inline(t.usage || '')}</p></li>`).join('')}</ul>`;
const shadowHtml = () => `<ul class="tiles shadows">${T('shadow').map((t) => `<li><div class="shadow-box" style="box-shadow:${esc(t.value)}"></div><code>${esc(t.name)}</code><p>${md.inline(t.usage || '')}</p><details><summary>Nilai</summary><code class="block">${esc(t.value)}</code></details></li>`).join('')}</ul>`;

// ---------- Gerak ----------
function bezierSvg(v) {
  const m = v.match(/cubic-bezier\(([^)]+)\)/);
  if (!m) return '';
  const [x1, y1, x2, y2] = m[1].split(',').map(Number);
  const lo = Math.min(0, y1, y2), hi = Math.max(1, y1, y2);
  const S = 100, pad = 8;
  const Y = (y) => (hi - y) * S;
  const H = (hi - lo) * S;
  const d = `M0 ${Y(0)} C${x1 * S} ${Y(y1)} ${x2 * S} ${Y(y2)} ${S} ${Y(1)}`;
  return `<svg class="curve" viewBox="${-pad} ${-pad} ${S + pad * 2} ${H + pad * 2}" role="img" aria-label="Kurva ${esc(v)}">
    <rect x="0" y="${Y(1)}" width="${S}" height="${S}" class="curve-box"/>
    <line x1="0" y1="${Y(0)}" x2="${x1 * S}" y2="${Y(y1)}" class="curve-handle"/>
    <line x1="${S}" y1="${Y(1)}" x2="${x2 * S}" y2="${Y(y2)}" class="curve-handle"/>
    <path d="${d}" class="curve-line"/>
    <circle cx="${x1 * S}" cy="${Y(y1)}" r="3" class="curve-dot"/><circle cx="${x2 * S}" cy="${Y(y2)}" r="3" class="curve-dot"/></svg>`;
}

function motionHtml() {
  const all = T('motion');
  const eases = all.filter((t) => /cubic-bezier/.test(t.value));
  const durs = all.filter((t) => /^[\d.]+m?s$/.test(String(t.value).trim()));
  const sec = (v) => (/ms$/.test(v) ? parseFloat(v) / 1000 : parseFloat(v));
  const max = Math.max(...durs.map((t) => sec(t.value)), 0.1);
  let h = `<h4 id="gerak-kurva">Kurva</h4>
  <div class="motion-ctl"><button type="button" class="btn" data-play>Putar contoh gerak</button><span class="hint reduced-note">Gerak dimatikan karena pengaturan kurangi gerak di perangkatmu.</span></div>
  <ul class="ease-list">${eases.map((t) => `<li><div class="ease-fig">${bezierSvg(t.value)}</div><div class="ease-meta"><code>${esc(t.name)}</code><span class="val">${esc(t.value)}</span><p>${md.inline(t.usage || '')}</p>
    <div class="track" aria-hidden="true"><span class="runner" style="--run-ease:var(--${t.name})"></span></div></div></li>`).join('')}</ul>
  <h4 id="gerak-durasi">Durasi</h4><ul class="scale durations">${durs.map((t) => `<li><code>${esc(t.name)}</code><span class="val">${esc(t.value)}</span><span class="bar" style="width:${Math.round((sec(t.value) / max) * 100)}%"></span><p>${md.inline(t.usage || '')}</p></li>`).join('')}</ul>`;
  const rest = all.filter((t) => !eases.includes(t) && !durs.includes(t));
  if (rest.length) h += tokenTable(rest);
  return h;
}

function tokenTable(list) {
  return `<div class="table-wrap" tabindex="0"><table><thead><tr><th scope="col">Token</th><th scope="col">Nilai</th><th scope="col">Pemakaian</th></tr></thead><tbody>${list.map((t) => `<tr><td><code>${esc(t.name)}</code></td><td><code>${esc(t.value)}</code></td><td>${md.inline(t.usage || '')}</td></tr>`).join('')}</tbody></table></div>`;
}
const note = (k) => (tokens[k] && tokens[k].note ? `<p class="note">${md.inline(tokens[k].note)}</p>` : '');

// ---------- Ikon ----------
let icons = {};
let iconReadme = iconComp ? iconComp.readme : '';
const fence = iconReadme.match(/```json\s*\n([\s\S]*?)\n```/);
if (fence) {
  try { icons = JSON.parse(fence[1]); } catch (e) { console.warn('Gagal membaca JSON ikon:', e.message); }
  iconReadme = iconReadme.replace(fence[0], '*Galeri di atas digambar langsung dari data path ikon ini. Data lengkapnya ada di `components/Icon/README.md`.*');
}
function iconGallery() {
  const names = Object.keys(icons);
  return `<div class="icon-tools"><label for="icon-filter">Cari ikon</label><input id="icon-filter" type="search" placeholder="mis. kalender" autocomplete="off"><span class="hint"><span data-icon-count>${names.length}</span> ikon</span></div>
  <ul class="icon-grid">${names.map((n) => `<li data-icon="${esc(n)}"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[n]}</svg><code>${esc(n)}</code></li>`).join('')}</ul>`;
}

// ---------- Komponen ----------
function compHtml(c) {
  const body = md.render(c.readme, { minLevel: 4, shift: 2, idp: `k-${c.name}-` });
  return `<article class="comp" id="komponen-${c.name}" data-search="${esc(c.name + ' ' + c.group + ' ' + c.subtitle)}">
  <header class="comp-head"><span class="group-chip">${esc(c.group || 'Lainnya')}</span><h3>${esc(c.name)}</h3>${c.subtitle ? `<p class="subtitle">${esc(c.subtitle)}</p>` : ''}</header>
  ${c.preview ? previewFrame(c) : ''}
  <div class="prose">${body}</div>
</article>`;
}
function previewFrame(c) {
  return `<figure class="preview">
  <div class="preview-bar"><span class="preview-label">Pratinjau</span>
    <button type="button" class="btn-ghost" data-phone aria-pressed="false">Lebar ponsel 390px</button>
    <a class="btn-ghost" href="previews/${c.name}.html" target="_blank" rel="noopener">Buka di tab baru</a></div>
  <div class="preview-stage"><iframe src="previews/${c.name}.html" title="Pratinjau komponen ${esc(c.name)}" loading="lazy" style="height:${c.height}px"></iframe></div>
</figure>`;
}

// ---------- Salin preview ----------
const definedVars = new Set([...['color', 'spacing', 'radius', 'shadow', 'breakpoint', 'size', 'zIndex', 'motion'].flatMap((k) => T(k).map((t) => t.name)), 'font-display', 'font-body']);
const missing = new Set();
for (const c of comps) {
  if (!c.preview) continue;
  let h = c.preview.replace(/<!--\s*@dsCard[^>]*?-->\s*/, '');
  const local = new Set([...h.matchAll(/--([\w-]+)\s*:/g)].map((m) => m[1]));
  for (const m of h.matchAll(/var\(--([\w-]+)/g)) if (!definedVars.has(m[1]) && !local.has(m[1])) missing.add(m[1]);
  const link = '<link rel="stylesheet" href="../assets/tokens.css">';
  h = /<head[^>]*>/i.test(h) ? h.replace(/<head[^>]*>/i, (m) => m + '\n' + link) : link + '\n' + h;
  fs.writeFileSync(path.join(OUT, 'previews', c.name + '.html'), h);
}
if (missing.size) console.warn('Variabel tanpa definisi di preview:', [...missing].join(', '));

// ---------- tokens.css ----------
let css = `/* Dibangun dari tokens.json (${esc(tokens.name)} v${tokens.version}). Jangan diedit manual. */\n:root {\n`;
for (const [k, v] of Object.entries(tokens.type.families || {})) css += `  --font-${k}: ${v};\n`;
for (const k of ['color', 'spacing', 'radius', 'shadow', 'breakpoint', 'size', 'zIndex', 'motion']) {
  css += `  /* ${k} */\n`;
  for (const t of T(k)) css += `  --${t.name}: ${t.value};\n`;
}
css += '}\n';
fs.writeFileSync(path.join(OUT, 'assets/tokens.css'), css);

// ---------- Salin aset ----------
const logoSrc = path.join(ROOT, 'EVOGROUP.png');
if (fs.existsSync(logoSrc)) fs.copyFileSync(logoSrc, path.join(OUT, 'assets/evo-group-logo.png'));
fs.copyFileSync(path.join(SRC, 'tokens.json'), path.join(OUT, 'tokens.json'));

// ---------- Navigasi ----------
const FOUND = [['warna', 'Warna'], ['tipografi', 'Tipografi'], ['jarak', 'Jarak'], ['radius', 'Radius'], ['bayangan', 'Bayangan'], ['gerak', 'Gerak'], ['ukuran', 'Ukuran, layar, lapisan']];
const navLink = (href, txt, extra = '') => `<li><a href="#${href}" data-search="${esc(txt + ' ' + extra)}">${esc(txt)}</a></li>`;
const nav = `<nav class="toc" aria-label="Daftar isi">
  <div class="toc-sec"><ul>${navLink('pengantar', 'Pengantar')}</ul></div>
  <div class="toc-sec"><p class="toc-h"><a href="#fondasi">Fondasi</a></p><ul>${FOUND.map(([s, t]) => navLink(s, t, 'fondasi token')).join('')}</ul></div>
  <div class="toc-sec"><p class="toc-h"><a href="#panduan">Panduan</a></p><ul>${guides.map((g) => navLink('panduan-' + g.slug, g.title, g.slug)).join('')}</ul></div>
  <div class="toc-sec"><ul>${navLink('ikon', 'Ikon', 'icon svg')}</ul></div>
  <div class="toc-sec"><p class="toc-h"><a href="#komponen">Komponen <span class="count">${docComps.length}</span></a></p>
  ${byGroup.map((g) => `<p class="toc-g"><a href="#${g.slug}">${esc(g.name)}</a></p><ul>${g.items.map((c) => navLink('komponen-' + c.name, c.name, c.group + ' ' + c.subtitle)).join('')}</ul>`).join('\n')}</div>
  <p class="toc-empty" hidden>Tidak ada yang cocok.</p>
</nav>`;

// ---------- Halaman ----------
const projReadme = read('README.md');
const html = `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tokens.name)} · Design System</title>
<meta name="description" content="Dokumentasi design system HCIS Mobile Evo Group: token, panduan, ikon, dan ${docComps.length} komponen.">
<link rel="icon" href="assets/evo-group-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="assets/tokens.css">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
<a class="skip" href="#isi">Lewati ke isi</a>
<header class="topbar">
  <a class="brand" href="#pengantar"><img src="assets/evo-group-logo.png" alt="Evo Group" width="36" height="36"><span>HCIS Mobile</span></a>
  <button type="button" class="menu-btn" aria-controls="sidebar" aria-expanded="false">Menu</button>
</header>
<div class="layout">
<aside class="sidebar" id="sidebar">
  <a class="brand" href="#pengantar"><img src="assets/evo-group-logo.png" alt="Evo Group" width="44" height="44"><span><strong>HCIS Mobile</strong><small>Design system · v${esc(tokens.version)}</small></span></a>
  <div class="search"><label for="nav-filter" class="sr-only">Cari di dokumentasi</label><input id="nav-filter" type="search" placeholder="Cari komponen atau panduan" autocomplete="off"></div>
  ${nav}
  <div class="downloads"><a href="tokens.json" download>Unduh tokens.json</a><a href="../DESIGN.md">Buka DESIGN.md</a></div>
</aside>
<main id="isi" class="main">

<section id="pengantar" class="hero">
  <p class="eyebrow">Evo Group · ${esc(tokens.name)}</p>
  <h1>Design system HCIS Mobile</h1>
  <p class="lead">Token, panduan, ikon, dan ${docComps.length} komponen untuk halaman karyawan HCIS Mobile. Semua isi diambil dari halaman acuan Cuti Saya.</p>
  <dl class="facts"><div><dt>Komponen</dt><dd>${docComps.length}</dd></div><div><dt>Token warna</dt><dd>${T('color').length}</dd></div><div><dt>Ikon</dt><dd>${Object.keys(icons).length}</dd></div><div><dt>Panduan</dt><dd>${guides.length}</dd></div></dl>
  ${cover && cover.preview ? `<div class="cover" data-cover><iframe src="previews/Cover.html" title="Sampul design system HCIS Mobile" width="960" height="${cover.height}" tabindex="-1"></iframe></div>` : ''}
  <div class="prose">${md.render(projReadme, { minLevel: 3, shift: 1, idp: 'p-' })}</div>
</section>

<section id="fondasi" class="block">
  <p class="eyebrow">Fondasi</p><h2>Token</h2>
  <p class="lead">Nilai di bawah dibaca langsung dari <a href="tokens.json"><code>tokens.json</code></a>. Di kode, panggil sebagai variabel CSS, misalnya <code>var(--ev-purple-600)</code>.</p>
  <section id="warna"><h3>Warna</h3>${note('color')}<p class="hint">Rasio di tiap contoh adalah kontras warna itu terhadap putih dan terhadap tinta <code>ev-ink</code>. Teks butuh minimal 4,5:1.</p>${colorsHtml()}</section>
  <section id="tipografi"><h3>Tipografi</h3>${typeHtml()}</section>
  <section id="jarak"><h3>Jarak</h3>${note('spacing')}${spacingHtml()}</section>
  <section id="radius"><h3>Radius</h3>${note('radius')}${radiusHtml()}</section>
  <section id="bayangan"><h3>Bayangan</h3>${note('shadow')}${shadowHtml()}</section>
  <section id="gerak"><h3>Gerak</h3>${note('motion')}${motionHtml()}</section>
  <section id="ukuran"><h3>Ukuran, layar, lapisan</h3>
    <h4 id="ukuran-ukuran">Ukuran</h4>${note('size')}${tokenTable(T('size'))}
    <h4 id="ukuran-breakpoint">Breakpoint</h4>${note('breakpoint')}${tokenTable(T('breakpoint'))}
    <h4 id="ukuran-lapisan">Lapisan (z-index)</h4>${note('zIndex')}${tokenTable(T('zIndex'))}</section>
</section>

<section id="panduan" class="block">
  <p class="eyebrow">Panduan</p><h2>Cara memakai sistem ini</h2>
  ${guides.map((g) => `<section id="panduan-${g.slug}" class="guide"><h3>${esc(g.title)}</h3><div class="prose">${md.render(g.src, { minLevel: 4, shift: 2, idp: `g-${g.slug}-` })}</div></section>`).join('\n')}
</section>

<section id="ikon" class="block">
  <p class="eyebrow">Fondasi</p><h2>Ikon</h2>
  ${iconGallery()}
  ${iconComp && iconComp.preview ? previewFrame(iconComp) : ''}
  <div class="prose">${md.render(iconReadme, { minLevel: 3, shift: 2, idp: 'k-Icon-' })}</div>
</section>

<section id="komponen" class="block">
  <p class="eyebrow">Komponen</p><h2>${docComps.length} komponen</h2>
  <p class="lead">Dikelompokkan sesuai kartu di file ekspor. Tiap pratinjau adalah file asli dari ekspor, ditampilkan apa adanya. Pakai tombol <strong>Lebar ponsel 390px</strong> untuk melihatnya di lebar ponsel.</p>
  ${byGroup.map((g) => `<section id="${g.slug}" class="group"><h2 class="group-h">${esc(g.name)} <span class="count">${g.items.length}</span></h2>${g.items.map(compHtml).join('\n')}</section>`).join('\n')}
</section>

<footer class="foot"><p>${esc(tokens.name)} · versi token ${esc(tokens.version)}. Dibangun dari ekspor design system HCIS Mobile.</p></footer>
</main>
</div>
<script src="assets/site.js" defer></script>
</body>
</html>
`;
fs.writeFileSync(path.join(OUT, 'index.html'), html);

// ---------- DESIGN.md ----------
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const mdTable = (list) => `| Token | Nilai | Pemakaian |\n|---|---|---|\n${list.map((t) => `| \`${t.name}\` | \`${cell(t.value)}\` | ${cell(t.usage)} |`).join('\n')}\n`;
const firstSentence = (s) => {
  const p = s.replace(/\r/g, '').split(/\n\s*\n/).map((x) => x.trim()).find((x) => x && !/^[#|`\-]/.test(x)) || '';
  const plain = p.replace(/\*\*|`|\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ');
  const m = plain.match(/^(.+?[.!?])(\s|$)/);
  return cell(m ? m[1] : plain.slice(0, 180));
};
let D = `# ${tokens.name} — Design System

Design system untuk halaman karyawan **HCIS Mobile** milik **Evo Group**. Halaman acuannya adalah *Cuti Saya*: semua token dan komponen diambil dari halaman itu. Dokumentasi lengkap dengan pratinjau ada di \`hcis-design-system/index.html\`; nilai token mentah ada di \`hcis-design-system/tokens.json\` dan \`hcis-design-system/assets/tokens.css\`.

## Prinsip

### Suara dan bahasa
- Bahasa Indonesia, memanggil pembaca dengan **kamu**, nada ramah dan singkat.
- Judul dan tombol berupa kata kerja atau frasa pendek: "Ajukan cuti", "Batalkan", "Coba lagi".
- Status memakai kata yang dipahami karyawan: **Menunggu**, **Di HR**, **Disetujui**, **Ditolak**, **Dibatalkan**. Jangan memakai "Diproses".
- Pesan galat menyebut apa yang terjadi lalu apa yang bisa dilakukan.
- Huruf kapital hanya di awal kalimat dan nama diri. Pengecualian: gaya \`label\` (huruf besar untuk label kelompok).
- Tanpa emoji. Penanda memakai ikon garis.

### Warna
- **Ungu adalah struktur.** Header dan hero \`ev-purple-900\` sampai \`ev-purple-700\`, tombol utama \`ev-purple-600\`, teks dan ikon ungu \`ev-purple-800\`.
- **Emas (\`ev-gold\`) adalah warna merek Evo.** Hanya sebagai isian kecil (ikon tombol, pill, titik aktif, kilau) dengan teks \`ev-gold-ink\` di atasnya. Jangan pernah memakai emas sebagai warna teks di atas putih.
- Teks utama \`ev-ink\` di atas \`ev-white\` atau \`ev-bg\`; teks sekunder \`ev-ink-2\`. Jangan memakai \`ev-ink-3\` untuk teks yang perlu dibaca.
- Status selalu satu keluarga utuh (\`-bg\`, \`-ink\`, \`-dot\`) dan selalu membawa kata atau ikon, bukan warna saja. Sukses hijau, menunggu oranye, ditolak mawar, dibatalkan abu.
- Kontras teks minimal 4,5:1.

### Tipografi
- **Bricolage Grotesque** (\`--font-display\`) untuk judul halaman, angka besar, judul bagian, dan tanggal. **Inter** (\`--font-body\`) untuk semua yang lain.
- Hierarki memakai bobot: angka besar 800, judul 700, nama dan nilai 600, isi 500.
- Angka tabular di seluruh antarmuka. Jangan membuat ukuran baru di luar gaya yang terdaftar.

### Bentuk dan layout
- Kartu memakai \`ev-r-2xl\` dengan \`ev-sh-card\`. Ubin ikon berbentuk persegi membulat \`ev-r-md\`, bukan lingkaran.
- Area ketuk minimum \`ev-touch\` (44px).
- Breakpoint: mobile sampai 599px, tablet 600–1023px, desktop 1024px ke atas. Aturan tablet dan desktop masih berupa usulan.
- Logo Evo Group di atas ungu gelap selalu ditaruh di kartu putih.

### Aksesibilitas
- Cincin fokus 2px \`ev-purple-600\` dengan jarak 2px (putih di atas ungu gelap).
- Ikon yang bisa diketuk selalu punya teks atau \`aria-label\`.
- Hormati \`prefers-reduced-motion\`: gerak diganti perubahan langsung atau pudar singkat.

### Gerak
- Masuk dengan \`ev-ease-enter\`, keluar dengan \`ev-ease-exit\`, pantulan kecil dengan \`ev-ease-spring\`, perpindahan posisi dengan \`ev-ease-standard\`.
- Durasi dari \`ev-t-fast\` (0.2s) sampai \`ev-t-page\` (0.6s). Gerak menjelaskan perubahan state, bukan hiasan.

## Tipografi

| Gaya | Keluarga | Ukuran | Tinggi baris | Bobot | Pemakaian |
|---|---|---|---|---|---|
${(tokens.type.groups || []).flatMap((g) => g.styles.map((s) => `| \`${s.name}\` | ${g.family} | ${s.fontSize} | ${s.lineHeight} | ${s.fontWeight} | ${cell(s.usage)} |`)).join('\n')}

Tumpukan font: ${Object.entries(tokens.type.families || {}).map(([k, v]) => `\`--font-${k}: ${v}\``).join('; ')}.

## Token

${tokens.color.note ? `> ${cell(tokens.color.note)}\n\n` : ''}### Warna

${mdTable(T('color'))}
### Jarak

${mdTable(T('spacing'))}
### Radius

${mdTable(T('radius'))}
### Bayangan

${mdTable(T('shadow'))}
### Gerak

${mdTable(T('motion'))}
### Ukuran

${mdTable(T('size'))}
### Breakpoint

${mdTable(T('breakpoint'))}
### Lapisan (z-index)

${mdTable(T('zIndex'))}
## Ikon

${Object.keys(icons).length} ikon garis di kanvas 24x24 (\`fill="none"\`, \`stroke="currentColor"\`, ujung dan sambungan bulat). Tebal garis mengikuti ukuran. Jangan memakai pustaka ikon pihak ketiga. Daftar nama: ${Object.keys(icons).map((n) => `\`${n}\``).join(', ')}.

## Komponen (${docComps.length})

${byGroup.map((g) => `### ${g.name}\n\n| Komponen | Ringkasan |\n|---|---|\n${g.items.map((c) => `| **${c.name}** | ${firstSentence(c.readme) || cell(c.subtitle)} |`).join('\n')}\n`).join('\n')}
Spesifikasi lengkap tiap komponen ada di \`_src/hcis-mobile-design-system/project/components/<Nama>/README.md\` dan di situs dokumentasi.

## Panduan

${guides.map((g) => `- **${g.title}**: \`_src/hcis-mobile-design-system/project/${g.slug}.md\``).join('\n')}
`;
fs.writeFileSync(path.join(ROOT, 'DESIGN.md'), D);

console.log(`OK: ${docComps.length} komponen, ${byGroup.length} grup (${groupOrder.join(', ')}), ${guides.length} panduan, ${Object.keys(icons).length} ikon.`);
