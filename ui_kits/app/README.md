# UI kit — Cuti Saya (HCIS Mobile)

A clickable phone prototype of the complete leave flow. It is built only from this package: `../../colors_and_type.css`, `../../build/icons.js`, `../../assets/evo-group-logo.png` and the three kit files below.

Open `index.html` directly in a browser; there is no build step. The jump list beside the phone opens any screen.

## Structure

```
ui_kits/app/
├── index.html      phone frame (390×844), status bar, jump list, mount points
├── kit.css         every component style, tokens only
├── components.js   window.EV builders → HTML strings
├── app.js          screens, state and interactions
└── README.md
```

`index.html` provides these mount points inside the phone viewport (`position: relative`):

- `#screen`: the scrolling page.
- `#chrome`: fixed BottomNav or ActionBar, moved out of the scroll area.
- `#toast`: transient Toast.
- `#overlay`: scrim plus Sheet.

Scripts load in this order: `build/icons.js` → `components.js` → `app.js`.

Every `icon` argument below takes a Lucide name (https://lucide.dev/icons, or search `preview/icons.html`), e.g. `calendar-days`, `wallet`, `x`. The kit still calls a few retired Evo names (`close`, `document`, `help`…), which `build/icons.js` maps to Lucide. Use Lucide names in new code.

Three main parts make up the kit:

- **App:** the shell in `app.js`. It owns state, renders the active screen into `#screen` and wires events.
- **Sidebar:** the screen jump list beside the phone in `index.html`. Each `data-jump` button opens one screen directly for review.
- **PreviewCard pages:** the `preview/components-*.html` cards and `preview/surface-cuti-saya.html`. They call the same `EV.*` builders, so a component looks identical in the cards and in the App.

## Component files

| File | Role |
|---|---|
| `kit.css` | Component styles for Button, header controls (glass, gold pill), PageHeader, SummaryChip, StatusChip, FilterChip, cards and tiles, BalanceCard, ShortcutTile, RequestCard, ApprovalStepper, HistoryRow, InfoList, fields, segmented tabs, DateRangePicker, InlineMessage, EmptyState, Skeleton, BottomNav, Sheet, ConfirmSheet, option list, Toast, ActionBar, full-screen states, receipt, menu grid and notification rows. Uses only `--ev-*` variables. |
| `components.js` | Pure builders on `window.EV`. Each one returns markup that uses kit classes. No framework and no DOM access. |
| `app.js` | One `state` object, a `render()` per screen, delegated click handlers (`data-go`, `data-act`, `data-open`, `data-nav`, `data-filter`, …), sheets, toasts and Esc-to-close. |

### `window.EV` API

```js
EV.button({ label, variant: 'primary'|'secondary'|'danger', icon, arrow, small, disabled, attrs })
EV.pageHeader({ title, eyebrow, sub, back, logo, pill: {label, icon}, actions: [{icon, label, badge}], chips, compact })
EV.summaryChips([{ key, label, count, dot }], activeKey)
EV.statusChip('wait'|'hr'|'ok'|'no'|'cx')          // Menunggu · Di HR · Disetujui · Ditolak · Dibatalkan
EV.balanceCard({ year, total, used, pending, remaining, cta })
EV.shortcuts([{ label, icon, tone }])
EV.stepper([{ label, sub, state: 'done'|'active'|'todo'|'rejected' }])
EV.requestCard({ id, type, icon, code, status, range, meta, steps })
EV.historyRow({ id, day, mon, title, meta, status })
EV.infoList([[label, valueHtml]])
EV.message(tone, title, text, icon)               // InlineMessage: info | wait | no | ok
EV.empty(icon, title, text)
EV.bottomNav(activeKey)                           // home | history | notif | profile (+ FAB "menu")
EV.toast({ tone: 'ok'|'no'|'wait', title, sub, action, duration })
EV.confirmSheet({ title, text, objTitle, objSub, objIcon, confirm })
EV.calendar({ year, month, start, end, today, minDay })
EV.STATUS, EV.icon(name, size, stroke)
```

## Screens

1. **Beranda cuti:** PageHeader with SummaryChips (they filter the active list), BalanceCard, ShortcutTiles, RequestCards, HistoryRows and BottomNav. The refresh control shows the network-error Toast with a "Coba lagi" action.
2. **Ajukan cuti:**
   - A Select that opens the type Sheet.
   - A DateRangePicker: tap the start, then the end. Weekends are not counted, and days before H-3 are disabled.
   - A live InlineMessage that moves from info to success to "Saldo tidak mencukupi".
   - A TextField and a sticky ActionBar.
3. **Mengirim:** the request travels from employee to manager to HR.
4. **Pengajuan terkirim:** SuccessScreen with a ReceiptCard and a two-button ActionBar.
5. **Detail pengajuan:** status, ApprovalStepper and InfoList. "Ingatkan atasan" works once; a second tap shows a warning toast.
6. **Konfirmasi batal:** ConfirmSheet with "Ya, batalkan pengajuan" and "Tidak jadi". Confirming flips the status to Dibatalkan.
7. **Riwayat cuti:** FilterChips with counts, month groups, and an EmptyState when a filter has no results.
8. **Menu HCIS:** bottom-sheet module grid opened from the FAB.
9. **Notifikasi:** segmented tabs and unread rows.
10. **Profil:** identity card and info list.

## Usage workflow

1. Copy `kit.css` and `components.js` next to your page.
2. Load `colors_and_type.css` and `build/icons.js` before them, and put `class="ev-root"` on `<body>`.
3. Compose screens from `EV.*` builders and inject them with `innerHTML`. Wire behaviour with `data-*` attributes and one delegated listener, as `app.js` does.
4. Place fixed chrome (BottomNav, ActionBar, Toast, Sheet) inside a `position: relative` viewport. Give the scroll area bottom padding so the content clears the chrome.
5. For each new flow, design empty, loading, error and success states.

## Design notes

- **One primary action per screen.** It is the 3D purple key (`--ev-sh-btn`), which presses down 4px. A secondary action uses the white key.
- **Where gold appears:** only the button icon tile, the header pill, the nav active dot, the toast timer bar and the success disc.
- **Status words:** "Di HR" uses the orange wait family because the request is still waiting. "Diproses" is never used.
- **Error colours:** network and server errors are orange (recoverable by retrying). Input conflicts are rose (the input must change).
- **Motion:** sheets and toasts rise with `--ev-ease-enter` / `--ev-ease-spring`. Reduced motion collapses every duration.
- **Accessibility:**
  - Glass buttons are 34px but have a 44px hit area.
  - Sheets use `role="dialog"` and `aria-modal`.
  - Toasts use `role="status"`, and rose messages use `role="alert"`.

## Source basis

- **Layout and flow:** the *Cuti Saya* reference page and `_src/hcis-mobile-design-system/project/cara-menyusun-halaman.md`.
- **Component anatomy:** `_src/hcis-mobile-design-system/project/components/<Name>/README.md` and `hcis-design-system/previews/<Name>.html`.
- **Tokens:** `hcis-design-system/tokens.json` and `assets/tokens.css`, re-exposed in `colors_and_type.css`.
- **Copy:** the rulebook (`context/DESIGN.source.id.md`) and `microcopy.md`. Where they conflict, the rulebook wins.
