// Konverter markdown kecil untuk README design system HCIS Mobile.
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function slug(s) {
  return String(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'bagian';
}

export function createMd({ components = new Set(), guides = new Set(), colorTokens = new Set() } = {}) {
  const used = new Map();
  const uid = (base) => {
    const n = used.get(base) || 0;
    used.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };

  function link(txt, href) {
    if (/^https?:\/\//.test(href)) return `<a href="${href}" target="_blank" rel="noopener">${txt}</a>`;
    if (href.startsWith('#')) return txt;
    const clean = href.replace(/#.*$/, '').replace(/\/+$/, '');
    const last = clean.split('/').pop().replace(/\.md$/i, '');
    if (components.has(last)) return `<a href="#komponen-${last}">${txt}</a>`;
    if (guides.has(last)) return `<a href="#panduan-${last}">${txt}</a>`;
    if (/^readme$/i.test(last)) {
      const parent = clean.split('/').slice(-2, -1)[0];
      if (components.has(parent)) return `<a href="#komponen-${parent}">${txt}</a>`;
      return `<a href="#pengantar">${txt}</a>`;
    }
    if (last === 'tokens.json') return `<a href="tokens.json">${txt}</a>`;
    return `<span class="xref">${txt}</span>`;
  }

  function inline(t) {
    const codes = [];
    t = t.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
    t = esc(t);
    t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, a, h) => link(a, h.replace(/&amp;/g, '&')));
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/(^|[^\w*])\*(?![\s*])(.+?)(?<![\s*])\*(?!\w)/g, '$1<em>$2</em>');
    t = t.replace(/\u0000(\d+)\u0000/g, (_, n) => {
      const c = codes[+n];
      const name = c.replace(/^--/, '').replace(/^var\(--(.+)\)$/, '$1');
      if (colorTokens.has(name)) return `<code class="tok"><span class="sw" style="background:var(--${name})" aria-hidden="true"></span>${esc(c)}</code>`;
      return `<code>${esc(c)}</code>`;
    });
    return t;
  }

  function codeBlock(code, lang) {
    const n = code.split('\n').length;
    const pre = `<pre class="code"><code${lang ? ` data-lang="${esc(lang)}"` : ''}>${esc(code)}</code></pre>`;
    if (n > 24 || code.length > 1400) {
      return `<details class="code-more"><summary>Tampilkan kode (${esc(lang || 'teks')}, ${n} baris)</summary>${pre}</details>`;
    }
    return pre;
  }

  function list(buf) {
    const items = [];
    for (const l of buf) {
      const m = l.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
      if (m) items.push({ ind: m[1].length, ord: /\d/.test(m[2]), start: parseInt(m[2], 10) || 1, text: m[3] });
      else if (items.length && l.trim()) items[items.length - 1].text += ' ' + l.trim();
    }
    let pos = 0;
    function build(ind) {
      const first = items[pos];
      const tag = first.ord ? 'ol' : 'ul';
      let h = `<${tag}${first.ord && first.start !== 1 ? ` start="${first.start}"` : ''}>`;
      while (pos < items.length && items[pos].ind >= ind) {
        const it = items[pos++];
        h += '<li>' + inline(it.text);
        if (pos < items.length && items[pos].ind > it.ind) h += build(items[pos].ind);
        h += '</li>';
        if (pos < items.length && items[pos].ind === ind && items[pos].ord !== first.ord) break;
      }
      return h + `</${tag}>`;
    }
    let h = '';
    while (pos < items.length) h += build(items[pos].ind);
    return h;
  }

  function cells(r) {
    return r.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));
  }

  // opts.minLevel: tingkat heading terendah; opts.shift: tambahan tingkat; opts.idp: awalan id
  function render(src, { minLevel = 3, shift = 1, idp = '' } = {}) {
    const lines = src.replace(/\r\n?/g, '\n').split('\n');
    const out = [];
    let i = 0;
    const isFence = (l) => /^\s*```/.test(l);
    const isHead = (l) => /^#{1,6}\s/.test(l);
    const isTable = (k) => /^\s*\|/.test(lines[k] || '') && /^\s*\|?\s*:?-{2,}/.test(lines[k + 1] || '');
    const isList = (l) => /^\s*([-*+]|\d+[.)])\s+/.test(l);
    const isHr = (l) => /^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(l);
    const isQuote = (l) => /^\s*>/.test(l);
    const startsBlock = (k) => isFence(lines[k]) || isHead(lines[k]) || isTable(k) || isList(lines[k]) || isHr(lines[k]) || isQuote(lines[k]);

    while (i < lines.length) {
      const l = lines[i];
      if (!l.trim()) { i++; continue; }
      if (isFence(l)) {
        const lang = l.trim().slice(3).trim();
        const buf = [];
        i++;
        while (i < lines.length && !isFence(lines[i])) buf.push(lines[i++]);
        i++;
        out.push(codeBlock(buf.join('\n'), lang));
        continue;
      }
      if (isHead(l)) {
        const m = l.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
        const lvl = Math.min(6, Math.max(minLevel, m[1].length + shift));
        const id = uid(idp + slug(m[2]));
        out.push(`<h${lvl} id="${id}">${inline(m[2])}</h${lvl}>`);
        i++;
        continue;
      }
      if (isTable(i)) {
        const head = cells(lines[i]);
        const aligns = cells(lines[i + 1]).map((c) => (/^:-+:$/.test(c) ? 'center' : /-+:$/.test(c) ? 'right' : ''));
        i += 2;
        const rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
        const al = (k) => (aligns[k] ? ` style="text-align:${aligns[k]}"` : '');
        out.push(`<div class="table-wrap" tabindex="0"><table><thead><tr>${head.map((c, k) => `<th scope="col"${al(k)}>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${head.map((_, k) => `<td${al(k)}>${inline(r[k] || '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
        continue;
      }
      if (isHr(l)) { out.push('<hr>'); i++; continue; }
      if (isQuote(l)) {
        const buf = [];
        while (i < lines.length && isQuote(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ''));
        out.push(`<blockquote>${render(buf.join('\n'), { minLevel, shift, idp })}</blockquote>`);
        continue;
      }
      if (isList(l)) {
        const buf = [];
        while (i < lines.length) {
          const cur = lines[i];
          if (isList(cur) || (cur.trim() && /^\s{2,}\S/.test(cur))) { buf.push(cur); i++; continue; }
          if (!cur.trim()) {
            let k = i;
            while (k < lines.length && !lines[k].trim()) k++;
            if (k < lines.length && isList(lines[k])) { i = k; continue; }
          }
          break;
        }
        out.push(list(buf));
        continue;
      }
      const buf = [l.trim()];
      i++;
      while (i < lines.length && lines[i].trim() && !startsBlock(i)) buf.push(lines[i++].trim());
      out.push(`<p>${inline(buf.join(' '))}</p>`);
    }
    return out.join('\n');
  }

  return { render, inline, uid };
}
