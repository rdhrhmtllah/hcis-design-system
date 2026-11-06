# Evo HCIS Mobile Design System

Reusable design-system package for **HCIS Mobile** by Evo Group, extracted from the *Cuti Saya* reference page. Purple structure, small gold accents, tactile 3D buttons, big tabular numbers and Indonesian "kamu" copy.

## Product Overview

**HCIS Mobile** is Evo Group's employee self-service app. Employees use it on their phones to handle HR tasks without going through HR staff.

- **Primary surface (source of this system):** *Cuti Saya*, the leave module. It covers:
  - the remaining-leave balance
  - active requests with their approval route (employee → manager → HR)
  - history of past decisions
  - a new-request form with a date-range picker
  - sending and success screens
  - request detail with cancel confirmation
- **Other surfaces sharing the shell:** attendance, payslip, reimbursement, training, documents, performance, notifications and profile. They are reached from the bottom navigation and the centre FAB menu.
- **Core capabilities the design must support:**
  - show balances at a glance
  - make status unmistakable (Menunggu, Di HR, Disetujui, Ditolak, Dibatalkan)
  - guide a request through an approval chain
  - recover gracefully from network errors
  - confirm destructive actions calmly
- **Audience:** office and field employees in Indonesia on mid-range Android phones. All interface copy is Indonesian.

## Source and context references

| Source | What it gave the package |
|---|---|
| `context/source-context.md` | Handoff notes and the brief for the Cuti Saya page. |
| `context/DESIGN.source.id.md` | The original Indonesian rulebook (preserved verbatim). |
| `context/provenance.md` | Which file each token, rule and component came from, plus the decisions taken. |
| `_src/hcis-mobile-design-system/project/` | Guides (`cara-menyusun-halaman.md`, `microcopy.md`, …) and per-component specs `components/<Name>/README.md`. |
| `hcis-design-system/` | Original docs site, `tokens.json`, `assets/tokens.css` and 57 component previews. |
| `EVOGROUP.png` | Logo source, copied to `assets/evo-group-logo.png`. |
| `tools/build-site.mjs`, `tools/md.mjs` | Original docs-site build scripts (preserved, not needed at runtime). |

Conflict resolved: `microcopy.md` still lists "Diproses", but the newer rulebook forbids it. The package uses **Di HR**.

## Package contents

| Path | What it is |
|---|---|
| `DESIGN.md` | The rules: context, color, type, spacing, shape, components, motion, voice, icons, accessibility, anti-patterns, assumptions, sources. |
| `SKILL.md` | Agent-facing skill: what's inside, when and how to use it, hard rules. |
| `colors_and_type.css` | **Single runtime entry.** All `--ev-*` tokens, the font import, `.ev-*` type classes and reduced-motion handling. |
| `preview/` | Focused review cards. See the manifest below. |
| `ui_kits/app/` | Applied, clickable phone kit of the Cuti Saya flow, built only from package files. |
| `assets/` | Logo and icons. See the next section. |
| `build/icons.js` | Runtime icon helper holding the full Lucide set. `build/lucide-tags.js` holds the search tags for the icon gallery. |
| `tools/build-lucide-icons.mjs` | Regenerates the icon runtime and `assets/icons/` from the official `lucide-static` package. |
| `context/` | Source notes, provenance and the original rulebook. |

## Preserved assets, fonts and build artifacts

- **`assets/evo-group-logo.png`:** Evo Group logo, 3051×2998 PNG. On purple it always sits on a white tile.
- **`assets/icons/*.svg`:** all 2,029 Lucide v1.70.0 icons, one file per official name. 24×24 grid, `currentColor`, stroke 2, round caps. Lucide is the only icon set; no custom icons. License (ISC) in `assets/icons/LICENSE`.
- **`assets/icons/sprite.svg`:** the official Lucide sprite (`<symbol id="<lucide-name>">`).
- **`build/icons.js`:** `EV_ICONS`, `evIcon(name, {size, stroke, label})`, `evHydrateIcons(root)` for `[data-ev-icon]`, `evHasIcon(name)` and `evIconNames()`. It accepts Lucide names, official Lucide aliases and the retired Evo names (`EV_ICON_LEGACY`, e.g. `close` → `x`).
- **Upgrade Lucide:** download `lucide-static` from npm, extract it, then run `node tools/build-lucide-icons.mjs <path>/package`.
- **Fonts:** Bricolage Grotesque (display) and Inter (body) load from Google Fonts in `colors_and_type.css`. The source supplied no font files, so there is no `fonts/` folder.
- **Source previews:** `hcis-design-system/previews/*.html` stay as reference. They are not part of the runtime.

## Preview manifest

Start at `preview/index.html`, which shows every card in a grid. The machine-readable list is `preview/manifest.json`.

| Card | Shows |
|---|---|
| `preview/colors-primary.html` | Purple ramp, gold accent, ink and surfaces, header gradient. |
| `preview/colors-status.html` | Five status families (bg, edge, ink, dot) with chips, and the orange-vs-rose error rule. |
| `preview/typography-specimens.html` | The 12 type styles in Bricolage Grotesque and Inter, tabular numbers. |
| `preview/spacing-tokens.html` | Spacing scale, page anatomy, 44px touch target, widths and breakpoints. |
| `preview/radius-shadows.html` | Radii, purple-tinted shadows, the 3D key edge, icon tile shape. |
| `preview/motion-tokens.html` | Easings (animated) and durations. |
| `preview/icons.html` | Searchable Lucide gallery of all 2,029 icons (click to copy a name), the size scale, tile treatments and the old Evo name → Lucide map. |
| `preview/brand-logo.html` | Logo on white and on purple (inside a white tile), and the header lockup. |
| `preview/components-buttons.html` | Primary, secondary and danger buttons; pressed, loading and disabled states; link and header controls. |
| `preview/components-status-chips.html` | StatusChip, SummaryChip, FilterChip, ApprovalStepper, segmented tabs. |
| `preview/components-cards.html` | BalanceCard, ShortcutTile, RequestCard, HistoryRow, InfoList. |
| `preview/components-inputs.html` | Select, TextField, focus and error states, DateRangePicker, option list. |
| `preview/components-navigation.html` | PageHeader (home and compact), BottomNav, FAB menu grid. |
| `preview/components-feedback.html` | InlineMessage, Toast, EmptyState, Skeleton, sending and success screens. |
| `preview/components-sheets.html` | ConfirmSheet (danger) and picker sheet over a scrim. |
| `preview/surface-cuti-saya.html` | The Cuti Saya home assembled from the system. |

## ui_kits/app

`ui_kits/app/index.html` is a 390×844 clickable phone that runs the whole leave flow: home → form → sending → success → detail → cancel sheet, plus history, notifications, profile and the FAB menu. Fixed chrome (BottomNav, ActionBar, Toast, Sheet) is positioned inside the phone viewport. Structure and the `window.EV` API are documented in `ui_kits/app/README.md`.

## Reuse workflow

1. **Start a screen:**
   - Link `colors_and_type.css` and add `class="ev-root"` on `<body>`.
   - Load `build/icons.js`.
   - For ready components, also load `ui_kits/app/kit.css` and `ui_kits/app/components.js`.
2. **Compose in the documented order:** PageHeader → hero card → chips/shortcuts → sections of cards → ActionBar or BottomNav → empty, loading, error and success states. See `SKILL.md` and `DESIGN.md` §6.
3. **Write copy** in Indonesian with the "kamu" voice and verb-first labels. Use only the five status words.

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="ui_kits/app/kit.css">
<body class="ev-root">
  <div id="app"></div>
  <script src="build/icons.js"></script>
  <script src="ui_kits/app/components.js"></script>
  <script>
    document.getElementById('app').innerHTML =
      EV.pageHeader({ title: 'Cuti Saya', eyebrow: 'Halo, Dimas' }) +
      EV.balanceCard({ remaining: 8, total: 12, used: 2, pending: 2, year: 2026,
        cta: EV.button({ label: 'Ajukan cuti', icon: 'plus', arrow: true }) });
  </script>
</body>
```

## Review workflow

1. Open `preview/index.html` and compare the new screen against the relevant cards.
2. Walk the same flow in `ui_kits/app/index.html`.
3. Check the hard rules in `SKILL.md`:
   - tokens only, no new type sizes
   - status words always visible, never "Diproses"
   - 44px targets and a visible focus ring
   - gold only as a fill
   - reduced motion honoured
4. Check `DESIGN.md` §11 for anti-patterns.

## Assumptions

- Gold `#f7c948` was estimated from the logo. Verify it against the official brand code.
- Tablet and desktop rules are proposals.
- Fonts load from Google Fonts because no font files were supplied.
