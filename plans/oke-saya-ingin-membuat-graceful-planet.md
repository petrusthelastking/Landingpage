# Plan: RekaKarbon Landing Page + Maps Portal

## Context
Build a full-featured React SPA for **RekaKarbon**, an Indonesian carbon tokenization platform. The app has two main pages:
- **Home** — a rich landing page covering the full blueprint from `rekarbon-landing-page.md`
- **Maps** — an interactive GIS portal with two sub-views: "Peta Konservasi & dMRV" and "Emisi Perusahaan"

Design references (images 4 & 5) show a dark-navy/forest-green aesthetic with light-panel side-drawers, satellite map canvas, and data-dense cards. The visual language is tech-precision + environmental — not generic SaaS blue.

## Aesthetic Stance
**Tech-environmental data platform** — committed dark forest green on near-black canvas, cool light-gray panels for sidebar content, JetBrains Mono for all numerical/data labels, Plus Jakarta Sans for headings/body. No generic rounded SaaS blue — the primary accent is `#16a34a` (green-600) with deep `#052e16` for active surfaces.

**Fonts (Google Fonts)**
- Display/UI: `Plus Jakarta Sans` (weights 400, 500, 600, 700)
- Mono data labels: `JetBrains Mono` (weight 400, 500)

**Token updates in `src/styles/theme.css`**
- `--background`: `#0c1a12` (deep forest, dark mode-first)
- `--foreground`: `#f0fdf4`
- `--card`: `#111f17`
- `--card-foreground`: `#dcfce7`
- `--primary`: `#16a34a`
- `--primary-foreground`: `#f0fdf4`
- `--secondary`: `#1a2e1f`
- `--muted`: `#1f3327`
- `--muted-foreground`: `#86efac`
- `--accent`: `#22c55e`
- `--border`: `rgba(34,197,94,0.15)`
- `--radius`: `0.5rem`

For the Maps sidebar panels specifically, they use a light mode: `#f1f5f1` background with dark text — handled via inline override classes on those specific panel containers.

## File Changes

### `src/styles/fonts.css`
Add Google Fonts import for Plus Jakarta Sans and JetBrains Mono.

### `src/styles/theme.css`
Update `:root` token values (dark-first). Keep `.dark` block and `@theme inline` mapping intact — only update the `:root` values.

### `src/app/App.tsx`
Single file, all state managed with `useState`. Component breakdown (all co-located in one file for self-containment):

```
App
├── Navbar (with page toggle: Home | Maps + sub-nav when on Maps)
├── HomePage
│   ├── HeroSection (tagline, headline, dual CTA, KPI strip)
│   ├── ProblemSolutionSection (comparison table cards)
│   ├── EkosistemSection (4-tab interactive cards: Regulator, KTH, Auditor, Emiten)
│   ├── TeknologiDMRVSection (3-layer vertical diagram)
│   ├── TokenomikSection (ERC-1155 token infographic)
│   ├── BursaKarbonSection (exchange flow + burning chamber)
│   ├── PetaTeaserSection (static map preview with feature bullets)
│   ├── KepatuhanSection (regulation badges / logos)
│   ├── FAQSection (accordion using Radix UI Accordion)
│   ├── CTABannerSection
│   └── Footer
└── MapsPage
    ├── MapSubNavBar (Peta Konservasi & dMRV | Emisi Perusahaan)
    ├── ConservationMapView
    │   ├── GISMapCanvas (Unsplash satellite bg + SVG polygon overlay)
    │   └── RightPanel
    │       ├── TabBar (Detail & Geometri | Daftar Proyek)
    │       ├── DetailGeometriPanel (TN Baluran stats, NDVI/EVI gauge circles, Monitoring Reboisasi, Progress timeline)
    │       └── DaftarProyekPanel (project list cards + TRANSPARANSI BLOCKCHAIN panel)
    └── EmisiPerusahaanMapView
        ├── GISMapCanvas (dark satellite bg + company pin markers + popup card)
        └── RightPanel (Monitoring Debitur list: Semua/Belum Bayar/Lunas tabs + company cards)
```

## Key Implementation Details

### Navigation
- `useState<'home' | 'maps'>('home')` in App root
- Navbar always visible; when `page === 'maps'`, show secondary sub-nav pills
- Maps sub-nav: `useState<'konservasi' | 'emisi'>('konservasi')`

### GIS Map Canvas (both views)
- No external map library needed — simulate with:
  - `position: relative` container, `overflow: hidden`
  - Unsplash satellite image as `<img>` background (Indonesia aerial/forest imagery)
  - SVG `<polygon>` overlay with `stroke="#22c55e"` green polygon dots for conservation areas
  - `+` / `−` zoom buttons (visual only, CSS scale transform)
  - Bottom-left badge: "PETA GIS NUSACARBON API" / "PETA SENSOR CEROBONG CEMS"
  - Emission view: red/green dot markers with popup card on click

### Right Panels (light-mode inside dark app)
- Panel wrapper gets `bg-[#e8ede9] text-[#1a2e1f]` to match reference screenshots
- Tabs use simple state toggle with `border-b-2 border-green-700` indicator

### NDVI/EVI Gauge Circles
- SVG circle + `strokeDasharray` / `strokeDashoffset` animation
- NDVI: 0.78 (green), EVI: 0.61 (darker green)

### Progress Reboisasi Timeline
- Vertical timeline with green dot markers
- 4 steps, last one tagged "ONGOING" with amber badge

### Blockchain Transparency Panel
- Dark card (`bg-[#0f1f14]`) with monospace green text
- Multi-segment progress bar (green/blue/amber/purple)
- Company buyer cards with "Verifikasi On-Chain" links

### FAQ Accordion
- Use `@radix-ui/react-accordion` primitive with custom styling

### KPI Strip
- Animated counter effect using `useEffect` + `setInterval` counting up on mount
- 4 metrics: tCO2e, Ha, Rp dana, kepatuhan %

### Responsive
- Breakpoint at `lg:` (~1024px)
- Home: single-column stacks below lg
- Maps: full-height split layout, right panel becomes drawer below lg

## Data (all inline)
```ts
const projects = [
  { name: 'TN Baluran', region: 'Jawa Timur', area: '25.000', co2: '1.240.000', selected: true },
  { name: 'TN Gunung Leuser', region: 'Aceh', area: '792.700', co2: '42.500.000' },
  { name: 'Restorasi Gambut Riau', region: 'Riau', area: '120.400', co2: '18.220.000' },
  { name: 'TN Kutai', region: 'Kalimantan Timur', area: '198.600', co2: '14.850.000' },
  { name: 'Sabuk Hijau Sulawesi Utara', region: 'Sulawesi Utara', area: '45.200', co2: '3.120.000' },
]

const companies = [
  { name: 'PLTU Suralaya (Unit 1-8)', type: 'Pembangkit Listrik (PLTU Batubara)', location: 'Cilegon, Banten', deficit: '2.400.000', tagihan: 'Rp 72.0 M', status: 'BELUM BAYAR' },
  { name: 'PT Semen Nusantara Tuban', type: 'Industri Semen & Manufaktur', location: 'Tuban, Jawa Timur', deficit: '1.250.000', tagihan: 'Rp 37.5 M', status: 'BELUM BAYAR' },
  { name: 'PT Nickel Smelter Morowali', type: 'Pengolahan Mineral & Smelter', location: 'Morowali, Sulawesi Tengah', deficit: '1.850.000', tagihan: 'Rp 55.5 M', status: 'BELUM BAYAR' },
  { name: 'PT Pupuk Sriwidjaja Palembang', type: 'Petrokimia & Pupuk', location: 'Palembang, Sumatera Selatan', deficit: '950.000', tagihan: 'Rp 28.5 M', status: 'BELUM BAYAR' },
  { name: 'PT Semen Padang', type: 'Industri Semen', location: 'Padang, Sumatera Barat', deficit: '420.000', tagihan: 'Rp 12.6 M', status: 'LUNAS' },
]
```

## Unsplash Images to Use
- Hero background: aerial forest/jungle Indonesia → `?q=80&w=1600` large
- Map canvas conservation: `photo-1544735716-392fe2489ffa` (aerial rainforest)
- Map canvas emission: darker industrial satellite view

## Verification
After implementation:
1. App renders on `/` — full landing page scrollable, all sections visible
2. Navbar "Maps" click switches to map view
3. Map sub-nav toggles between Konservasi and Emisi views
4. Tab panels toggle in right sidebar (Detail & Geometri / Daftar Proyek)
5. Company popup appears on marker click in Emisi view
6. FAQ accordion items expand/collapse
7. Ecosystem 4-tab section switches between stakeholder cards
8. KPI counters animate on page load
