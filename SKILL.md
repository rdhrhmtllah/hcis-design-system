---
name: hcis-mobile-design-system
description: Build Evo Group HCIS Mobile screens (employee self-service, leave, attendance, payslip) with the Evo purple/gold design system, Lucide icons, tactile 3D buttons and Indonesian "kamu" microcopy. Use for any HCIS Mobile page, prototype or component, or anything that should look like the Cuti Saya page.
user-invocable: true
---

# Evo HCIS Mobile design system

## What is inside

| Path | Use it for |
|---|---|
| `DESIGN.md` | The full rulebook: color, type, spacing, shape, components, motion, voice, icons, accessibility, anti-patterns. |
| `colors_and_type.css` | Single runtime entry: every `--ev-*` token, Google Fonts import, `.ev-*` type classes, reduced-motion handling. |
| `build/icons.js` | `evIcon(name, {size, stroke, label})`, `evHydrateIcons(root)` and `evHasIcon(name)` for the full Lucide v1.70.0 set (2,029 icons). |
| `assets/icons/*.svg`, `assets/icons/sprite.svg`, `assets/icons/LICENSE` | The same Lucide icons as files and as the official sprite, plus the ISC license. |
| `preview/icons.html` | Searchable icon gallery; use it to find the right Lucide name. |
| `assets/evo-group-logo.png` | Evo Group logo. |
| `ui_kits/app/kit.css`, `ui_kits/app/components.js` | Ready components (`window.EV`). |
| `ui_kits/app/index.html` | Clickable reference of the whole Cuti Saya flow. |
| `preview/` | One focused card per foundation and component group; start at `preview/index.html`. |

## Source context

- Extracted from the HCIS Mobile *Cuti Saya* (leave) reference page and its handoff: `_src/hcis-mobile-design-system/project/` (guides, per-component specs), `hcis-design-system/` (docs site, `tokens.json`, 57 component previews) and `context/source-context.md`.
- The original Indonesian rulebook is preserved at `context/DESIGN.source.id.md`; provenance and decisions are in `context/provenance.md`.
- Where `microcopy.md` lists "Diproses", the newer rulebook wins: the status word is **Di HR**.

## When to use

- New HCIS Mobile screens: leave, attendance, payslip, reimbursement, training, documents, notifications, profile.
- Prototypes or reviews that must match the Cuti Saya look and voice.
- Checking an existing screen against the rules (use the hard-rule list below).

## How to use

1. Link `colors_and_type.css` and put `class="ev-root"` on `<body>`.
2. Load `build/icons.js`. Render icons with `evIcon('calendar-days', {size: 20})` or `<i data-ev-icon="calendar-days" data-size="20"></i>` + `evHydrateIcons()`. Use any official Lucide name (https://lucide.dev/icons). Never draw custom SVG icons or pull in another icon set. Stroke stays 2.
3. For components, link `ui_kits/app/kit.css` and load `ui_kits/app/components.js`: `EV.button`, `EV.pageHeader`, `EV.summaryChips`, `EV.balanceCard`, `EV.shortcuts`, `EV.statusChip`, `EV.stepper`, `EV.requestCard`, `EV.historyRow`, `EV.infoList`, `EV.message`, `EV.empty`, `EV.bottomNav`, `EV.toast`, `EV.confirmSheet`, `EV.calendar`.
4. Build a page in this order (from `cara-menyusun-halaman.md`):
   1. PageHeader — purple gradient, `display-l` title, glass icon buttons, at most one gold pill.
   2. Hero card overlapping the header — `r-3xl`, `sh-card`, one big `display-xl` number.
   3. SummaryChips / ShortcutTiles when the page has filters or sub-destinations.
   4. Sections — `title-m` heading + white `r-2xl` cards on `--ev-bg`.
   5. Sticky ActionBar or floating BottomNav (64px, gradient FAB in the centre).
   6. Empty, loading (Skeleton), error (what happened → what is safe → what next) and success states.
5. Compare against `preview/` cards and `ui_kits/app/index.html` before finishing.

## Design-system highlights

- **Purple is structure, gold is a spark.** Header gradient `--ev-header-gradient` (purple-900 → 700), primary keys `--ev-purple-600`. Gold `#f7c948` only as small fills with `--ev-gold-ink` text — never gold text on white.
- **Tactile keys.** Primary buttons are 56px, `r-xl`, with a 4px purple edge (`--ev-sh-btn`) that collapses as the key presses down 4px. A gold icon tile leads; an arrow tile may trail.
- **Big numbers.** Balances use `display-xl` Bricolage Grotesque, tabular figures.
- **Status = family + word.** Menunggu, Di HR (both orange wait family), Disetujui (green), Ditolak (rose), Dibatalkan (grey). Never "Diproses"; never colour alone.
- **Soft depth.** White cards on lavender `--ev-bg`, purple-tinted shadows, no grey borders. Icon tiles are rounded squares (`r-md`).
- **Voice.** Indonesian, "kamu", verb-first labels ("Kirim pengajuan"), no emoji, no "Oops"; the refusal option is "Tidak jadi".

## Hard rules (check before finishing)

- Colors only from `--ev-*`; `--ev-ink-3` never for readable text.
- Type sizes only from the 12 registered styles (`.ev-display-xl` … `.ev-label`).
- Touch targets ≥ 44px; focus ring 2px `--ev-purple-600`.
- Motion only from `--ev-ease-*` / `--ev-t-*`; reduced motion respected.
- Sheets come from the bottom; destructive confirmations show the affected object.
- Icons only from Lucide via `evIcon`, stroke 2, inside `r-md` tiles; one icon per meaning across screens.

## Assumptions

- Gold is estimated from the logo; confirm against the official brand code.
- Tablet and desktop rules are proposals.
- No font files were supplied; Bricolage Grotesque and Inter load from Google Fonts.
