# HCIS Mobile — Evo Group Design System

> Category: Mobile app · HR employee self-service
> Surface: Phone-first app (390×844), Indonesian UI, light theme

*Purple is structure. Gold is a spark. Status is always a color family plus a word.*

HCIS Mobile is the employee self-service app of Evo Group: attendance (Presensi), leave (Cuti), requests (Pengajuan), learning, documents and company news in one phone app. This system is extracted from two shipped reference pages — Beranda (home) and Cuti Saya (the canonical module page) — and those pages win over any older rule. Runtime values live in the token stylesheet; components and motion live in the app UI kit (see Files & tokens reference).

## Agent brief

Read this first. It is the contract for every new screen.

1. **Source of truth order:** `source/beranda/Main.dc.html` → `source/cuti-saya/` → `colors_and_type.css` → `ui_kits/app/*` → this file. If you find a conflict, the shipped page wins; note the conflict in "Assumptions & open questions".
2. **Tokens only.** Use `--ev-*` variables. No raw hex, no new font sizes, no new radii, no neutral grey shadows.
3. **Language:** UI copy is Bahasa Indonesia, casual-polite, second person **"kamu"**. Never "Anda". Never "Diproses" as a status. A refusal button is **"Tidak jadi"**, never "Batal".
4. **Phone first.** Design at 390×844 with the 68px floating bottom nav and safe areas. Tablet/desktop rules are proposals.
5. **Every overlay has an enter AND an exit.** Unmount only after the exit animation ends (see Motion & interaction). Reduced motion = instant.
6. **Status = color family + word + icon.** Never color alone.
7. **Gold is rare.** Gold appears as a small fill (icon tile, progress bar, badge, spark) with gold-ink text. Never as body text, never as a large surface.
8. **New module page?** Follow "Recipe: new module page" exactly — it mirrors Cuti Saya.

## Product context

- **Who:** Evo Group employees — office and field/shift staff (e.g. shift `EMI-S1 · 07.00–15.00`). Mixed tech comfort, mostly Android, often one-handed, often outdoors.
- **Jobs to be done:** clock in/out (Presensi), check leave balance and apply for leave (Cuti), track request approval (Pengajuan), read company news and celebrations, learn (Pusat Belajar), find a service fast (Menu).
- **Modules in the Menu:** ESS (Personal — default context, chip "ESS · Personal"), TPM, LMS, DMS, VMS. Abbreviations are shown as-is; full names are unconfirmed.
- **Sample data used in references:** Ridho Rahmatullah, NIK 2301045, Shift EMI-S1 · 07.00–15.00, saldo cuti 8 of a 12-day yearly allowance ("Jatah 12 hari"), hutang cuti 0. The greeting uses the signed-in first name ("Halo, NOIR").
- **Main surfaces:** Beranda (home), Presensi, Menu (FAB), Pengajuan, Profil — the five bottom-nav slots.

## Logo

![Evo Group logo](assets/logo.png)

- **Primary:** `assets/logo.png` (Evo Group wordmark, copied from `assets/evo-group-logo.png`).
- **Mark:** `assets/beranda/evo-logo-mark.webp` — used in the gate/splash and inside the 36–40px glass tile on purple headers.
- **Placement:** white or `bg` surfaces at full color; on purple-900 headers use the mark inside a glass tile (white 16% fill, white 22% inset ring).
- **Clear space:** at least the height of the "e" around the wordmark. Minimum wordmark width 72px.
- **Never:** recolor, add shadows, stretch, place on gold, or put the logo in the bottom nav.

## Color palette

Purple carries all structure (headers, actions, active states). Gold is a small accent. Status colors are full families (bg, edge, ink, dot) and always ship with a word. Shadows are purple-tinted.

| Role | Name | Hex | Usage |
|---|---|---|---|
| Brand | purple-900 | #2d1778 | Hero header 240px, module heroes, sheet titles on dark |
| Primary | purple-600 | #5b3bd8 | Primary buttons, active nav icon, selected states, links |
| Primary edge | purple-800 | #3b22a0 | 4px button edge shadow, secondary text on white, chip ink |
| Accent | purple-400 | #8b6cf0 | Focus ring 3px, nav slider gradient start, FAB gradient start |
| Spark | gold | #f7c948 | Small fills only: icon tile in buttons, progress bars, badges |
| Text | ink | #1a1535 | Headings and body text |
| Muted text | ink-2 | #5a5578 | Secondary text, row subtext, captions |
| Page | bg | #f4f2fc | App background behind cards |
| Surface | white | #ffffff | Cards, sheets, nav bar, inputs |
| Waiting | wait-dot | #f57c2a | Menunggu and Di HR dot and progress |
| Approved | ok-dot | #2e9e5b | Disetujui dot, success disc, presence done |
| Rejected | no-dot | #cd3e6a | Ditolak dot, danger button fill, cancel disc |

### Full purple ramp

| Token | Hex | Use |
|---|---|---|
| purple-950 | #241269 | Deepest gradient stop (learning slide) |
| purple-900 | #2d1778 | Hero / headers |
| purple-800 | #3b22a0 | Edges, ink on light purple |
| purple-700 | #4b2db5 | Header gradient end |
| purple-600 | #5b3bd8 | Action |
| purple-500 | #6d4deb | Hover / illustration |
| purple-accent | #6d4ae0 | Illustration accent |
| purple-400 | #8b6cf0 | Focus, glow |
| purple-300 | #a78bfa | Decorative on dark |
| purple-200 | #e8e2fc | Soft fills |
| purple-150 | #d9d0f5 | Secondary button ring and edge |
| purple-100 | #e4ddfb | Cell inset rings |
| purple-50 | #f1eefc | Row pressed / tint cells |
| purple-edge | #c9bfef | Hairline borders on tint |

### Gold and neutrals

| Token | Hex | Use |
|---|---|---|
| gold-edge | #d49a12 | 2px under-edge of gold tiles |
| gold-ink | #3a2a00 | Text/icon on gold (never gold text on white) |
| ink-3 | #8a84a8 | Decoration and disabled only — never readable text |

### Status families

| Status word | bg | edge | ink | dot |
|---|---|---|---|---|
| Menunggu / Di HR (wait) | #ffe9d6 | #f8cba6 | #7a3200 | #f57c2a |
| Disetujui (ok) | #ddf5e4 | #a9ddba | #14532d | #2e9e5b |
| Ditolak (no) | #ffe0ea | #f2b9cb | #9b1c48 | #cd3e6a |
| Dibatalkan (cx) | #eceaf3 | — | ink-2 | #9a94b8 |
| Info (non-status) | #d6e8ff | #afcbf2 | #1b4a96 | — |

Extra rose tokens for the cancel/danger disc: no-deep #8f1840, no-soft #ff7a9e, no-ring #ffc9d9. Illustration-only path accents: #ff9f55, #ff6b94, #ff8fae (approval-route art, never UI).

### Gradients

- Header: `--ev-header-gradient` 160deg purple-900 → purple-700.
- FAB (as shipped in Beranda): 145deg purple-400 → #4C2FC4. The token `--ev-fab-gradient` (160deg 400 → 700) is the kit approximation; prefer the Beranda value.
- Campaign slides: campaign (600 → 900), wellness (no-deep → 900), learning (800 → 950).

## Typography

- **Display:** "Bricolage Grotesque" — weights 700, 800; fallbacks: Inter, system-ui, sans-serif
- **Body:** "Inter" — weights 400, 500, 600, 700, 800; fallbacks: system-ui, -apple-system, Segoe UI, Roboto, sans-serif

Both fonts are self-hosted variable woff2 files in `fonts/` (Latin subset, see `fonts/LICENSE.txt`). Display is used only for hero numbers, greetings, page titles and success headlines. Everything else is Inter. Default body weight is 500.

### Type scale (the only sizes allowed)

| Token | Size / line-height | Font · weight | Use |
|---|---|---|---|
| display-xl | 56 / 0.95 | Display 800 | Big balance number (saldo cuti) |
| display-l | 32 / 1.05 | Display 800 | Greeting "Halo, NOIR", module hero title |
| title-xl | 26 / 1.1 | Display 800 | Success headline "Pengajuan terkirim!" |
| title-l | 22 / 1.15 | Display 700 | Sheet / page titles |
| section-l | 20 / 1.2 | Display 700 | Section heads on Beranda ("Kabar terbaru") |
| title-m | 18 / 1.2 | Inter 800 | Card titles, h2 inside sheets |
| heading-s | 16 / 1.25 | Inter 700 | Button labels, row titles |
| title-s | 15 / 1.3 | Inter 700 | Small card titles |
| body | 14 / 1.45 | Inter 500 | Paragraphs, inputs |
| body-strong | 14 / 1.3 | Inter 700 | Emphasis in rows |
| body-sm | 13 / 1.45 | Inter 500 | Helper text |
| row-sub | 12.5 / 1.4 | Inter 500 | Row subtext (ink-2) |
| caption | 12 / 1.35 | Inter 600 | Captions, nav labels |
| chip / label | 12 / 16px | Inter 600–700 | Status chips; labels are UPPERCASE with 0.06em tracking |

Rules: numbers use tabular figures (`font-variant-numeric: tabular-nums`) for time, dates and counts. Time format is `07.00` (dot), dates `12 Mar 2026`, ranges with an en dash `07.00–15.00`. Never go below 12px.

## Voice & tone

- **Adjectives:** warm, clear, helpful, calm, encouraging
- **Tone:** Casual-polite Indonesian that speaks to the employee as "kamu" like a helpful colleague
- **Use:** kamu, Ajukan, Tidak jadi, Menunggu, Di HR, Disetujui, Ditolak, Dibatalkan, Coba lagi, Lihat semua
- **Avoid:** Anda, Diproses, Batal as refusal, emoji, ALL CAPS sentences, blaming the user, technical error codes as the headline

### Messaging pillars

- Tell the employee what happens next, not just what happened.
- One clear action per message; the button says the verb.
- Status words are fixed and never paraphrased.
- Errors explain the fix in plain words and keep the user's input.

### Microcopy library

| Moment | Copy |
|---|---|
| Greeting | Halo, NOIR |
| Presence card title | Presensi hari ini |
| Leave CTA | Ajukan cuti — sub: "Pilih tanggal dan keperluanmu" |
| Leave CTA at saldo 0 | sub: "Akan tercatat sebagai hutang cuti" (if already in debt: "Hutang cuti akan bertambah") |
| Empty requests | Belum ada pengajuan aktif |
| Celebrations | Perayaan hari ini |
| Approval route | Alur persetujuan / Status persetujuan / Tahapan |
| Sending | Mengirim pengajuan |
| Success | Pengajuan terkirim! |
| Cancel confirm | Batalkan pengajuan ini? — buttons "Ya, batalkan" / "Tidak jadi" |
| Logout confirm | Keluar dari HCIS Mobile? — buttons "Keluar" / "Tidak jadi" |
| Error help heading | Cara memperbaikinya / Yang bisa kamu lakukan / Yang bisa dicoba |
| Reconnected toast | Tersambung kembali — "Data diperbarui 09.41" |
| Notifications sub | "3 belum dibaca" or "Semua sudah dibaca" |
| Location panel | Lokasi saya — "Kamu sedang di sini" |
| Activity panel | Aktivitas — "Proses di latar belakang" |
| Help panel | Butuh bantuan? — "Tur, panduan, dan kontak PIC" |
| Menu search empty | Hasil pencarian (with no-result empty state) |

## Imagery

- **Style:** Soft 3D clay-like illustrations with rounded forms, purple-led palette and warm gold/rose highlights; delivered as webp with transparent backgrounds
- **Subjects:** Time-of-day sky art for the presence hero; ID card with lanyard; hourglass for waiting; gift boxes for celebrations; Evo mark for the gate
- **Treatment:** Illustrations sit on purple-900 heroes or in tint cells; slight float/bob animation allowed (disabled under reduced motion); never cropped by card edges except the hero art which may bleed off the right edge
- **Avoid:** Stock photography of people, flat clipart, neon colors, dark/gloomy scenes, illustrations as buttons

### Asset inventory (`assets/beranda/`)

| File | Use |
|---|---|
| sky-sun.webp / sun-day-small.webp | Daytime presence hero |
| sun-dusk-small.webp / sky-sunset.webp | Afternoon / evening shift |
| sky-moon.webp | Night shift |
| sky-cloud.webp | Decorative layer |
| id-card-lanyard.webp | Profil / identity contexts |
| illus-hourglass.webp | Waiting / empty pending states |
| celebration-gift*.webp | "Perayaan hari ini" (closed, open, preload) |
| evo-logo-mark.webp | Gate / splash, header tile |

Names were assigned during extraction; the originals were unnamed.

## Layout & spacing

- **Radius:** 4 · 8 · 12 · 16 · 20 · 24 · 28 · full; hero bottom radius 30; cards 24 (r-2xl); buttons 20 (r-xl); FAB 20 rounded square; bottom nav 28
- **Border:** Avoid hard borders; use 1.5–2px inset rings in purple-100/150 on tint and purple-tinted shadows for elevation
- **Spacing:** 4px base scale 2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 20 · 24 · 32 · 48; page gutter 16; card padding 16; section gap 24

### Posture rules

- Content sits in white cards on the bg page; nothing floats on raw white.
- The purple hero overlaps downward: the presence card overlaps the 240px hero by 48px; module saldo cards overlap the 196px module hero by 22px.
- Keep a 96px bottom safe area for the floating nav (68px + 12px inset + breathing room).
- One primary action per screen region; secondary actions are white buttons or text links.
- Touch targets at least 44px; primary CTAs 56–60px tall.
- Horizontal scrollers (campaigns, shortcuts) bleed to the screen edge with 16px leading padding.

### Phone frame measurements

| Element | Value |
|---|---|
| Canvas | 390 × 844, status bar 44–50 |
| Home hero | 240px tall, purple-900, bottom radius 30 |
| Sticky top bar `.tb` | 96px with 50px top padding, overlaps with margin-bottom −96px; 2px gold scroll progress bar |
| Module hero | 196px, padding-top 104, art 150 × 130 bleeding right |
| Presence card | overlaps hero −48px, r-3xl (28), white, sh-card |
| Presence state pill | 24px tall, r-md |
| Presence cells | r-xl, tint bg, 1.5px inset purple-100 |
| Presence CTA | min-height 60, r-xl, purple-600, sh-btn |
| Segmented control | 42px, r-lg, white 16% track, white thumb r-md with spring |
| Breadcrumb card | white, r-xl, sh-row; rows min-height 52 |
| Calendar cells | 44px |
| Swipe row actions | 164px total width |
| Bottom nav | 68px tall, 12px inset from sides and bottom, r-3xl |

## Shape, elevation & layering

| Shadow token | Value | Use |
|---|---|---|
| sh-card | 0 12 26 −16 purple-900 40% + 0 2 5 purple-900 6% | Cards |
| sh-row | 0 8 16 −12 purple-900 35% | Rows, breadcrumbs |
| sh-btn | 0 4 0 purple-800 + inset top highlight | Primary button (3D edge) |
| sh-pop | 0 12 20 −10 purple-900 50% | Popovers, chips raised |
| sh-sheet | 0 −18 40 −12 ink 45% | Bottom sheets |
| sh-feed | 0 −6 24 purple 10% | Feed sheet over hero |

Z-index ladder: sticky 10 · nav 20 · popover 40 · sheet 50 · detail 51 · toast 70 · hint 80.

Buttons are "physical": a 4px solid under-edge that collapses to 2px when pressed (`translateY(2px)`).

## Iconography

- **Set:** Lucide (stroke icons) via `build/icons.js` → `evIcon(name, {size, stroke})`; SVGs also in `assets/icons/`; gallery `preview/icons.html`.
- **Sizes:** 18 (glass header buttons), 20 (default, rows, buttons), 24 (bottom nav). Stroke 2–2.4.
- **Active nav icon:** filled via fill-opacity transition, color purple-600.
- **Status icons:** wait `clock`, hr `user-check`, ok `check`, no `close`, cx `ban`.
- **Icon tiles:** 38px r-md; gold tile (gold fill, gold-ink icon, 2px gold-edge) inside primary buttons; tinted status tiles in rows.
- Never mix filled and stroke icons in the same row; never use emoji as icons.

## Components

All builders live in `ui_kits/app/components.js` (`EV.*`, HTML strings, no framework). Styles in `kit.css`, `beranda.css`, `module.css`.

| Component | Builder | Key spec |
|---|---|---|
| Button | `EV.button` | primary / secondary / danger / small; 56px min (44 small); r-xl; optional gold icon tile and trailing arrow tile; press = 2px travel |
| Page header | `EV.pageHeader` | Glass back button (aria-label "Kembali"), title, eyebrow, actions with badges, context pill |
| Hero header | `EV.heroHeader` | 240px purple-900, greeting in display-l, art layer |
| Presence card | `EV.presenceCard` | State pill, in/out cells, 60px CTA, done state uses ok family |
| Stat chips | `EV.statChips` / `EV.summaryChips` | Counts per status family |
| Status chip | `EV.statusChip` | 24px, r 12, dot + word (+ icon); hr uses the wait family |
| Balance card | `EV.balanceCard` | Saldo in display-xl, bar = saldo/12, hutang chip turns wait family when > 0; emphasis when saldo ≤ 2 |
| Shortcuts | `EV.shortcuts` | Horizontal tile row (Ajukan baru) |
| Stepper | `EV.stepper` | Approval route / Tahapan with per-step status |
| Request card | `EV.requestCard` | Type, dates, status chip, swipe actions |
| History row | `EV.historyRow` | Swipeable, commits at 80px |
| Info list | `EV.infoList` | Label/value rows ("Informasi") |
| Message | `EV.message` | Inline banners: info / ok / wait / no families |
| Empty state | `EV.empty` | Illustration + title + one action |
| Bottom nav | `EV.bottomNav` | See spec below |
| Campaigns | `EV.campaigns` | Slides with campaign / wellness / learning gradients |
| Cutoff calendar | `EV.cutoffCalendar` / `EV.calendar` | 44px cells, today ring, range selection |
| Streak card | `EV.streakCard` | Attendance streak |
| Module list | `EV.moduleList` | Menu rows by module group |
| Learning card | `EV.learningCard` | Pusat Belajar |
| Feed sheet | `EV.feedSheet` | Kabar terbaru over hero, sh-feed |
| Toast | `EV.toast` | Bottom 92px, ink bg, r-xl, 3px gold countdown bar, swipe to dismiss |
| Confirm sheet | `EV.confirmSheet` | 56px rose disc with 8px no-bg ring, object summary in r-lg tint, danger + "Tidak jadi" |

### Bottom nav (as shipped in Beranda)

- 68px tall, inset 12px, white, r-3xl, sh-pop.
- Slots in order: **Beranda · Presensi · [Menu FAB] · Pengajuan · Profil**.
- Labels 12px / 600; icons 24px; active = purple-600 with filled icon.
- Active indicator: a 28 × 4px bar at the top edge, purple-400 → purple-600 gradient with glow, sliding between slots with a stretch animation (alternating `nvStretchA` / `nvStretchB`).
- **FAB:** 56px rounded square (r-xl 20), raised `top: -24px`, 4px white border, 145deg purple-400 → #4C2FC4 gradient, `aria-haspopup="dialog"`. It is NOT a circle and the nav is NOT 64px.
- FAB opens the Menu on tap or on an upward drag (dy < −48, or fast flick vy < −0.5 with dy < −20).

## Screens & flows

### Beranda (home)

1. Gate / splash with Evo mark (skeleton for ~900ms on first load).
2. Hero 240px: greeting "Halo, NOIR", date, time-of-day sky art; sticky top bar with context chip "ESS · Personal", notification, activity and help icons.
3. Presence card "Presensi hari ini" overlapping the hero.
4. "Kalender cutoff", "Ringkasan" stats, "Ajukan baru" shortcuts, "Perayaan hari ini", "Pusat Belajar", campaigns, feed "Kabar terbaru".
5. Top-bar panels (each opens from its icon with a caret): **Lokasi saya**, **Notifikasi** (filters all/unread, "Tandai semua dibaca"), **Aktivitas**, **Butuh bantuan?** (tabs Tur / Panduan / PIC).

### Menu (FAB)

Full-screen purple reveal from the FAB center. Search field, module tabs (ESS, TPM, LMS, DMS, VMS — swipe left/right to change), grouped rows; the current module row is white with purple text. Search shows "Hasil pencarian" or an empty state.

### Cuti flow (module page = Cuti Saya)

1. Module hero 196px + saldo card (−22px overlap).
2. Primary CTA "Ajukan cuti".
3. Form "Ajukan cuti": Jenis cuti (tabs umum / khusus → "Jenis cuti khusus"), Tanggal cuti (calendar sheet), Alasan cuti, Surat dokter (when required).
4. Submit → loading "Mengirim pengajuan" → success "Pengajuan terkirim!" → the new card pulses into the list.
5. Detail "Detail pengajuan": Status persetujuan, Alur persetujuan, Informasi; cancel → confirm sheet "Batalkan pengajuan ini?".

## States

| State | Rule |
|---|---|
| Loading | Skeleton blocks in purple-50 with shimmer (main ~900ms, notifications ~550ms); never spinners for full pages |
| Empty | Illustration + one-line title + one action ("Belum ada pengajuan aktif") |
| Error | Title says what failed; section "Cara memperbaikinya" with numbered fixes; keep user input; "Coba lagi" |
| Offline | Banner while offline; on reconnect toast "Tersambung kembali" + "Data diperbarui HH.MM" |
| Pressed | Buttons travel 2px; rows tint purple-50 |
| Focus | 3px purple-400 ring, 2px offset |
| Disabled | ink-3 text, no shadow, no press travel |
| Selected | purple-600 fill with white text, or white thumb on segmented control |
| Low balance | saldo ≤ 2 → bolder caption with a wait dot |

## Motion & interaction

Easing and duration tokens:

| Token | Value |
|---|---|
| ease-enter | cubic-bezier(.2,.9,.25,1) |
| ease-spring | cubic-bezier(.3,1.5,.5,1) |
| ease-exit | cubic-bezier(.5,0,.9,.4) |
| ease-standard | cubic-bezier(.45,0,.25,1) |
| t-fast / t-exit / t-base | 0.2s / 0.25s / 0.3s |
| t-mid / t-enter / t-slow / t-page | 0.4s / 0.45s / 0.5s / 0.6s |

Exits are always faster than enters and use ease-exit.

### Overlay choreography (enter → exit, unmount delay)

| Overlay | Enter | Exit | Unmount after |
|---|---|---|---|
| Menu (FAB) | clip-path circle from FAB center (195px 768px) 0 → 840px, ~0.62s ease-enter; content rises 14px → 0 after 0.12s; items pop in from 10px + scale .7, staggered | circle closes back into the FAB (~0.5s ease-exit), content drops 10px and fades in 0.2s | 620ms |
| Full page / form | background fades (t-base); top bar slides in from −110%; blocks rise in with `--d` stagger over 0.6s ease-enter; bottom bar rises at 0.1s | top bar slides out, blocks drop in ~0.26s (stagger removed), background fades | 360ms |
| Top-bar panel | scrim fades in 0.25s; card scales/drops from its icon (origin at the icon, caret aligned) 0.5s ease-enter; rows alternate spring in 0.38s | card out 0.28s ease-exit; scrim out 0.2s | 360ms |
| Bottom sheet | scrim 0.25s; sheet rises 0.45s ease-enter | sheet drops 0.28s ease-exit; scrim fades 0.25s | 300ms |
| Toast | rises 30px + scale .92 → 1 with spring 0.5s (optional shake for errors) | fades/drops 0.25s ease-exit | 250ms |
| Loading card | pops from scale .5 rotate −8deg with spring, then exits at 0.72s | — | auto |

Kit implementation: `ui_kits/app/motion.css` (`evRevealIn/Out`, `evContentIn/Out`, `evItemIn`, `evFade/evFadeOut`, `evTopIn/Out`) and `EV.UNMOUNT = {menu:620, page:360, form:360, sheet:300, toast:250}`, `EV.overlay()`.

### Gestures

- **Edge swipe back** on pages: follows the finger (translateX), commits on release.
- **Pull down** on sheets and Menu: scales down up to 3%; past 76px it closes.
- **FAB drag up** opens the Menu (thresholds in Bottom nav).
- **Swipe rows**: reveal 164px of actions; commits at ≥ 80px.
- **Horizontal swipe** in Menu changes module; in Help/Jenis cuti changes tab.
- **Escape** closes the open panel (desktop/keyboard).
- Haptics: 10ms vibrate on commit where supported.

### Scroll

Module pages: header fades in 0.7s, the next six blocks spring in with 80ms stagger from 140ms; later blocks animate on view (scroll-driven, when supported); hero art parallaxes over the first 220px; counters count up on view.

### Reduced motion

`prefers-reduced-motion: reduce` → all keyframes off, transitions off, unmount delay 0 (`EV.reducedMotion`), confetti hidden. State changes still happen instantly.

## Accessibility

- Contrast: ink on white/bg and white on purple-600/900 pass AA; status ink on status bg passes AA; ink-3 is never used for readable text; gold never carries text except gold-ink on gold.
- Focus ring 3px purple-400 on every interactive element.
- Touch targets ≥ 44px; nav items full-height.
- Status always has a word (never color only).
- Overlays: `role="dialog"`, `aria-modal`, focus moves into the overlay and returns to the trigger on close; FAB has `aria-haspopup="dialog"`.
- Icon-only buttons have Indonesian `aria-label`s ("Kembali", "Notifikasi", "Tutup").
- Respect reduced motion and system text scaling (layout must not break at 120%).

## Responsive

- **Phone (< 600px):** the reference. Single column, floating bottom nav, FAB Menu.
- **Tablet (600–1023px, proposal):** 72px side rail replaces the bottom nav; content max 560px for forms; sheets become 560px centered dialogs.
- **Desktop (≥ 1024px, proposal):** 248px sidebar, content max 1120px, panels 420px from the right, dialogs 400/560px.

## Recipe: new module page

1. Sticky top bar `.tb` (glass back button, title, actions) over a 196px purple-900 module hero with right-bleeding illustration.
2. Summary card overlapping the hero by 22px (r-2xl, padding 16): the module's main number in display-xl plus a progress bar.
3. One primary CTA (60px, gold icon tile + arrow tile) with a helpful sub line.
4. Stat chips for status counts.
5. Active items as request cards with status chips; history as swipeable rows grouped by month.
6. Empty state with illustration when there are no items.
7. Detail as a full page (Status persetujuan → Alur persetujuan → Informasi); destructive actions via the confirm sheet.
8. Apply the scroll stagger and overlay choreography from Motion & interaction; test reduced motion.

## Anti-patterns

- Circular FAB, 64px nav, or labels under the FAB.
- "Anda", "Diproses", "Batal" as refusal, emoji anywhere.
- Gold text on white, large gold areas, gold buttons.
- Status shown with color only, or invented status words.
- Grey/black shadows, hard 1px grey borders.
- Overlays that disappear without an exit animation, or unmount before the exit ends.
- Spinners for page loads; skeletons are the rule.
- Raw hex or new font sizes outside the scale.
- Using prototype review controls (state toggles, simulators) as product UI.

## Pre-ship checklist

- [ ] Only `--ev-*` tokens; sizes from the type scale.
- [ ] Copy uses "kamu", fixed status words, "Tidak jadi".
- [ ] Bottom nav and FAB match the Beranda spec.
- [ ] Every overlay has enter + exit and correct unmount delay.
- [ ] Reduced motion tested.
- [ ] Loading, empty, error, offline states designed.
- [ ] Focus rings visible; targets ≥ 44px; aria labels in Indonesian.
- [ ] Contrast AA checked; ink-3 not used for text.

## Files & tokens reference

| Path | Contents |
|---|---|
| `source/beranda/Main.dc.html` | Shipped Beranda reference (primary evidence) |
| `source/cuti-saya/` | Shipped Cuti Saya module page |
| `colors_and_type.css` | All `--ev-*` tokens and @font-face |
| `fonts/` | Bricolage Grotesque + Inter variable woff2, license |
| `ui_kits/app/kit.css` | Core components |
| `ui_kits/app/beranda.css` | Home-specific components |
| `ui_kits/app/module.css` | Module page layout |
| `ui_kits/app/motion.css` | Overlay keyframes |
| `ui_kits/app/components.js` | `EV` builders, STATUS, UNMOUNT |
| `build/icons.js`, `assets/icons/` | Lucide icons |
| `assets/beranda/` | Illustrations |
| `assets/logo.png`, `brand.json` | Logo for the design-system panel |
| `preview/` | Review cards |

## Glossary

| Term | Meaning |
|---|---|
| Beranda | Home |
| Presensi | Attendance / clock in-out |
| Pengajuan | Request (leave, permit, etc.) |
| Cuti | Leave; saldo cuti = leave balance; hutang cuti = leave debt |
| Jatah | Yearly allowance (12 days) |
| Di HR | Request is with HR for final approval |
| Kalender cutoff | Payroll/attendance cutoff calendar |
| Perayaan | Celebrations (birthdays, anniversaries) |
| Pusat Belajar | Learning center |
| PIC | Person in charge (contact) |

## Assumptions & open questions

- Gold #f7c948 is extracted from the app, not confirmed against an official Evo Group brand book.
- Full names of TPM, LMS, DMS, VMS are not confirmed.
- Tablet and desktop rules are proposals; only the phone layout is shipped.
- Fonts are Latin subsets; other scripts need full font files.
- Illustration file names were assigned during extraction.
- Source copy that used "Anda" or "Batal" was normalized to "kamu" and "Tidak jadi" (status "Batal" → "Dibatalkan").
- Prototype review controls in the sources are tools, not components.
- `ui_kits/app/index.html` + `app.js` still show an older Cuti Saya demo and do not yet reflect the Beranda nav/FAB spec.
