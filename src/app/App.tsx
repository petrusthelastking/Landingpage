import { useState, useEffect } from "react";
import {
  LayoutDashboard, BarChart2, Bell, Settings,
  Play, ArrowUpRight, Check,
  Leaf, Globe, Download, Search, Plus, Minus,
  ArrowRight, TrendingUp, Shield,
  TreePine, Factory, FlaskConical, Building2,
  ChevronDown, ChevronUp,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────────

const conservationProjects = [
  { id: 1, name: "TN Baluran", region: "Jawa Timur", area: "25.000", co2: "1.240.000", ndvi: 0.78, evi: 0.61, pohon: "174K / 200K", harga: "Rp 260.000 / t", anggaran: "Rp 4.850.000.000", tercairkan: "Rp 3.750.000.000" },
  { id: 2, name: "TN Gunung Leuser", region: "Aceh", area: "792.700", co2: "42.500.000", ndvi: 0.84, evi: 0.71, pohon: "820K / 900K", harga: "Rp 280.000 / t", anggaran: "Rp 12.400.000.000", tercairkan: "Rp 9.200.000.000" },
  { id: 3, name: "Restorasi Gambut Riau", region: "Riau", area: "120.400", co2: "18.220.000", ndvi: 0.65, evi: 0.52, pohon: "340K / 500K", harga: "Rp 240.000 / t", anggaran: "Rp 7.100.000.000", tercairkan: "Rp 4.800.000.000" },
  { id: 4, name: "TN Kutai", region: "Kalimantan Timur", area: "198.600", co2: "14.850.000", ndvi: 0.81, evi: 0.68, pohon: "290K / 350K", harga: "Rp 270.000 / t", anggaran: "Rp 9.200.000.000", tercairkan: "Rp 6.400.000.000" },
  { id: 5, name: "Sabuk Hijau Sulawesi Utara", region: "Sulawesi Utara", area: "45.200", co2: "3.120.000", ndvi: 0.72, evi: 0.58, pohon: "98K / 120K", harga: "Rp 255.000 / t", anggaran: "Rp 2.600.000.000", tercairkan: "Rp 1.900.000.000" },
];

const emisiCompanies = [
  { id: 1, name: "PLTU Suralaya (Unit 1–8)", type: "Pembangkit Listrik (PLTU Batubara)", location: "Cilegon, Banten", deficit: "2.400.000", tagihan: "Rp 72.0 M", status: "BELUM BAYAR", aktual: 3.9, kuota: 1.5, x: 32, y: 55 },
  { id: 2, name: "PT Semen Nusantara Tuban", type: "Industri Semen & Manufaktur", location: "Tuban, Jawa Timur", deficit: "1.250.000", tagihan: "Rp 37.5 M", status: "BELUM BAYAR", aktual: 2.8, kuota: 1.5, x: 52, y: 58 },
  { id: 3, name: "PT Nickel Smelter Morowali", type: "Pengolahan Mineral & Smelter", location: "Morowali, Sulawesi Tengah", deficit: "1.850.000", tagihan: "Rp 55.5 M", status: "BELUM BAYAR", aktual: 3.2, kuota: 1.4, x: 72, y: 52 },
  { id: 4, name: "PT Pupuk Sriwidjaja Palembang", type: "Petrokimia & Pupuk", location: "Palembang, Sumatera Selatan", deficit: "950.000", tagihan: "Rp 28.5 M", status: "BELUM BAYAR", aktual: 1.9, kuota: 1.0, x: 22, y: 62 },
  { id: 5, name: "PT Smelter Aluminium Banteng", type: "Pengolahan Logam Dasar", location: "Batulicin, Kalimantan Selatan", deficit: "620.000", tagihan: "Rp 18.6 M", status: "BELUM BAYAR", aktual: 1.6, kuota: 1.0, x: 62, y: 48 },
  { id: 6, name: "PT Semen Padang", type: "Industri Semen", location: "Padang, Sumatera Barat", deficit: "0", tagihan: "Rp 0", status: "LUNAS", aktual: 1.2, kuota: 1.5, x: 18, y: 50 },
  { id: 7, name: "PT Kertas Kraft Aceh", type: "Pulp & Kertas", location: "Lhokseumawe, Aceh", deficit: "0", tagihan: "Rp 0", status: "LUNAS", aktual: 0.9, kuota: 1.2, x: 16, y: 42 },
];

const ekosistemTabs = [
  {
    id: "regulator", label: "Regulator", icon: Building2, color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe",
    role: "Kementerian LHK / DJP / Pemerintah",
    desc: "Mengalokasikan kuota emisi nasional, mengawasi kepatuhan pajak, dan menjaga kedaulatan hutan Indonesia.",
    features: ["Alokasi kuota emisi resmi PTBAE-PU", "Dashboard neraca emisi industri nasional secara real-time", "Emergency Asset Freeze untuk membekukan aset bermasalah secara on-chain", "Integrasi pencatatan penerimaan kas negara & audit kepatuhan perpajakan"],
  },
  {
    id: "kth", label: "KTH & Komunitas", icon: TreePine, color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0",
    role: "Kelompok Tani Hutan & Masyarakat Adat",
    desc: "Menjaga kawasan hutan konservasi, restorasi mangrove, dan agroforestry untuk mencetak kredit karbon terverifikasi.",
    features: ["Pemetaan batas spasial poligon GIS WGS84 (Drag & Drop Coordinates)", "Unggah berkas SK Perhutanan Sosial & log penanaman pohon", "Dompet karbon (Carbon Wallet) untuk menerima pendapatan penjualan kredit SPE-GRK", "Pencairan hasil penjualan langsung ke rekening BUMDes tanpa potongan perantara"],
  },
  {
    id: "auditor", label: "Auditor & dMRV", icon: FlaskConical, color: "#7c3aed", bg: "#faf5ff", border: "#e9d5ff",
    role: "Auditor Independen & AI dMRV Engine",
    desc: "Memverifikasi pertumbuhan biomassa dan membuktikan keabsahan pengurangan emisi (Additionality).",
    features: ["Analisis tutupan kanopi & indeks vegetasi satelit NusaCarbon API / Sentinel-2", "Inspeksi ortofoto drone dan segmentasi tajuk pohon otomatis (AI Tree Crown Detection)", "Cross-correlation AI Engine untuk mendeteksi manipulasi pelaporan emisi pabrik", "Verification Gate untuk menandatangani otorisasi pencetakan token (minting)"],
  },
  {
    id: "emiten", label: "Emiten Korporasi", icon: Factory, color: "#ea580c", bg: "#fff7ed", border: "#fed7aa",
    role: "Industri Beremisi Tinggi: Semen, PLTU, Pulp & Kertas",
    desc: "Memenuhi batas emisi tahunan dan menghindari sanksi denda pajak karbon sesuai UU No. 7/2021 HPP.",
    features: ["Kalkulator neraca emisi CEMS vs kuota batas atas", "Proyeksi denda pajak karbon berjalan berdasarkan tarif UU HPP (Rp 650.000 / ton defisit)", "Pembelian kredit SPE-GRK di Bursa Karbon dengan proteksi Cap-Control", "Brankas Burning Chamber (10 fraksi = 1 tCO2e) & penerbitan Sertifikat Kepatuhan resmi A4"],
  },
];

const faqItems = [
  {
    q: "Bagaimana RekaKarbon mencegah penipuan kredit karbon ganda (double counting)?",
    a: "Setiap kredit karbon dicetak dalam bentuk token ERC-1155 yang terikat secara unik dengan koordinat poligon GIS spasial dan hash metadata audit yang tidak dapat diduplikasi di jaringan Verichain.",
  },
  {
    q: "Apakah emiten bisa memborong kredit karbon untuk menaikkan harga pasar?",
    a: "Tidak. Protokol bursa RekaKarbon dilengkapi sistem Cap Control yang membatasi volume pembelian maksimal sesuai nilai defisit emisi aktual yang tercatat di sistem pemantauan CEMS.",
  },
  {
    q: "Apa yang terjadi jika kawasan hutan proyek konservasi mengalami kebakaran?",
    a: "Sistem akan memicu Emergency Asset Freeze untuk token terkait. Pemilik token dapat menukarkan token beku tersebut secara langsung dengan token cadangan dari Global Reserve Pool 5% melalui fungsi Insurance Swap.",
  },
  {
    q: "Bagaimana pembagian hasil penjualan sampai ke petani hutan?",
    a: "Transaksi penjualan di bursa langsung mengalokasikan saldo pendapatan ke dompet digital KTH yang terdaftar dan dapat dicairkan secara akuntabel ke rekening BUMDes setempat.",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────────

function GaugeCircle({ value, label, color = "#84c93b" }: { value: number; label: string; color?: string }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - value * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 48 48)" style={{ transition: "stroke-dashoffset 1s ease" }} />
        <text x="48" y="53" textAnchor="middle" fill={color} fontSize="16"
          fontFamily="JetBrains Mono, monospace" fontWeight="500">{value.toFixed(2)}</text>
      </svg>
      <span className="text-xs font-mono text-gray-500 tracking-widest">{label}</span>
    </div>
  );
}

// ─── Dashboard Mockup (RekaKarbon) ───────────────────────────────────────────────

function MiniBarChart({ active, heights }: { active?: boolean; heights: number[] }) {
  return (
    <div className="flex items-end gap-0.5 h-7">
      {heights.map((h, i) => (
        <div key={i} style={{ height: `${h}%`, width: 3, borderRadius: 2 }}
          className={active ? "bg-white/60" : "bg-gray-300"} />
      ))}
    </div>
  );
}

function DashboardMockup() {
  const cards = [
    { label: "Proyek KTH",     value: "12",    unit: "aktif",  active: true,  heights: [55, 70, 45, 85, 60, 40, 75, 55] },
    { label: "CEMS Industri",  value: "2.4M",  unit: "tCO2e", active: false, heights: [40, 60, 80, 50, 70, 45, 55, 65] },
    { label: "Token SPE-GRK",  value: "48.2K", unit: "token", active: false, heights: [65, 45, 75, 55, 40, 70, 50, 60] },
    { label: "Hutan Lindung",  value: "14.250",unit: "Ha",    active: false, heights: [35, 55, 45, 60, 40, 50, 45, 40] },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-full relative">
      <div className="flex" style={{ height: 460 }}>
        {/* Sidebar */}
        <div className="w-44 bg-white border-r border-gray-100 flex flex-col py-5 px-3 shrink-0">
          <div className="flex items-center gap-2 mb-6 px-2">
            <Leaf size={15} className="text-[#84c93b]" />
            <span className="text-xs font-bold text-gray-800 tracking-tight">RekaKarbon</span>
          </div>
          <nav className="space-y-0.5 flex-1">
            {[
              { icon: LayoutDashboard, label: "dashboard",    active: true },
              { icon: Globe,           label: "peta publik",  active: false },
              { icon: BarChart2,       label: "neraca emisi", active: false },
              { icon: TreePine,        label: "proyek KTH",   active: false },
              { icon: Settings,        label: "pengaturan",   active: false },
            ].map(({ icon: Icon, label, active }, i) => (
              <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${active ? "text-gray-900 font-semibold" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}>
                <Icon size={13} />
                {label}
              </div>
            ))}
          </nav>
          <div className="px-2 py-2 rounded-lg bg-green-50 border border-green-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="text-[8px] text-green-700 font-mono font-bold leading-tight">Besu Node Active</span>
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col bg-gray-50 min-w-0">
          {/* Top bar */}
          <div className="flex justify-between items-center px-5 py-3.5 bg-white border-b border-gray-100 shrink-0">
            <div>
              <div className="text-sm font-bold text-gray-900">Selamat datang, Pak Admin!</div>
              <div className="text-[11px] text-gray-400">Ini ringkasan neraca karbon nasional hari ini.</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono bg-green-50 border border-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Chain ID 1337</span>
              <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100">
                <Bell size={12} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-5 gap-2 p-4 shrink-0">
            {cards.map((c) => (
              <div key={c.label} className={`rounded-xl p-3 flex flex-col gap-2 ${c.active ? "bg-[#84c93b]" : "bg-white border border-gray-100 shadow-sm"}`}>
                <div className={`text-[9px] font-medium leading-tight ${c.active ? "text-white/80" : "text-gray-400"}`}>{c.label}</div>
                <MiniBarChart active={c.active} heights={c.heights} />
                <div className={`text-[11px] font-bold ${c.active ? "text-white" : "text-gray-700"}`}>{c.value} {c.unit}</div>
              </div>
            ))}
            {/* Audit gauge widget */}
            <div className="rounded-xl border border-gray-100 shadow-sm bg-white flex flex-col items-center justify-center p-2 gap-0.5">
              <div className="text-[8px] text-gray-400 font-medium">Audit dMRV</div>
              <svg viewBox="0 0 60 34" className="w-full">
                <path d="M 5 30 A 25 25 0 0 0 55 30" fill="none" stroke="#f3f4f6" strokeWidth="5" strokeLinecap="round" />
                <path d="M 5 30 A 25 25 0 0 0 52 6"  fill="none" stroke="#84c93b" strokeWidth="5" strokeLinecap="round" />
                <path d="M 52 6 A 25 25 0 0 0 55 30"  fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                <line x1="30" y1="30" x2="51" y2="7" stroke="#1c3a1c" strokeWidth="2" strokeLinecap="round" />
                <circle cx="30" cy="30" r="2" fill="#1c3a1c" />
              </svg>
              <div className="text-[9px] font-bold text-[#84c93b]">98.7%</div>
              <div className="text-[7px] text-gray-400">terverifikasi</div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-2 px-4 pb-4 flex-1">
            {/* tCO2e */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="text-[10px] text-gray-400 mb-1">total tCO2e terverifikasi</div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-gray-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>48.200</span>
                <span className="text-[10px] text-gray-400">tCO2e</span>
              </div>
              <div className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-[9px] font-semibold px-1.5 py-0.5 rounded-full my-1.5 w-fit">↑ 12.4% bulan ini</div>
              <div className="space-y-1">
                {([
                  { k: "Kredit diterbitkan", v: "48.200 token" },
                  { k: "Kredit dibakar",     v: "12.450 token" },
                  { k: "Cadangan 5%",        v: "2.410 token"  },
                ] as { k: string; v: string }[]).map((row) => (
                  <div key={row.k} className="flex justify-between">
                    <span className="text-[9px] text-gray-400">{row.k}</span>
                    <span className="text-[9px] font-medium text-gray-600">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Dana KTH */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm flex flex-col">
              <div className="text-[10px] text-gray-400 mb-1">dana KTH tersalurkan</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Rp 3,85 M</span>
              </div>
              <div className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-[9px] font-semibold px-1.5 py-0.5 rounded-full mb-3 w-fit">🌳 Direct-to-BUMDes</div>
              <div className="space-y-1.5">
                {([
                  { label: "TN Gunung Leuser",  pct: 72, color: "#1c3a1c" },
                  { label: "TN Kutai",          pct: 45, color: "#84c93b" },
                  { label: "Restorasi Gambut",  pct: 38, color: "#4ade80" },
                ] as { label: string; pct: number; color: string }[]).map((row) => (
                  <div key={row.label} className="flex items-center gap-1.5">
                    <span className="text-[8px] text-gray-400 w-20 truncate">{row.label}</span>
                    <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Kepatuhan */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm flex flex-col">
              <div className="text-[10px] text-gray-400 mb-1">kepatuhan regulasi</div>
              <div className="flex items-start justify-between mb-1">
                <span className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>100%</span>
                <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
                  <Shield size={14} className="text-[#84c93b]" />
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#84c93b] rounded-full w-full" />
              </div>
              <div className="text-[9px] text-gray-400">UU No. 7/2021 HPP</div>
              <div className="text-[9px] text-gray-400">Perpres 98/2021</div>
              <div className="text-[9px] text-gray-400">ISO 14064-2 &amp; 14064-3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────────

function Navbar({ page, setPage, mapView, setMapView }: {
  page: "home" | "maps";
  setPage: (p: "home" | "maps") => void;
  mapView: "konservasi" | "emisi";
  setMapView: (v: "konservasi" | "emisi") => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const solidBg = scrolled || page === "maps";
  const linkBase = `text-[14px] font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap`;
  const linkCls  = solidBg
    ? `${linkBase} text-gray-600 hover:text-gray-900 hover:bg-gray-100`
    : `${linkBase} text-gray-800 hover:text-gray-900 hover:bg-white/30`;
  const activeCls = solidBg
    ? `${linkBase} text-gray-900 font-semibold`
    : `${linkBase} text-gray-900 font-semibold`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solidBg ? "bg-white/96 backdrop-blur-md shadow-sm border-b border-gray-200/50" : "bg-transparent"}`}>
      <div className="max-w-[1200px] mx-auto px-8 h-[62px] flex items-center justify-between gap-8">

        {/* Left nav: Home + Maps */}
        <nav className="flex items-center gap-1">
          <button onClick={() => setPage("home")} className={page === "home" ? activeCls : linkCls}>
            Home
          </button>
          <button onClick={() => setPage("maps")} className={page === "maps" ? activeCls : linkCls}>
            Maps
          </button>
        </nav>

        {/* Center brand mark */}
        <button onClick={() => setPage("home")} className="flex flex-col items-center gap-0.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#1c3a1c] flex items-center justify-center shadow-sm">
            <Leaf size={16} className="text-[#84c93b]" />
          </div>
          <span className="text-[10px] font-bold tracking-tight text-gray-800 leading-none" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>RekaKarbon</span>
        </button>

        {/* Right: node status + CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] font-mono text-green-700 font-semibold">Besu Node Active</span>
          </div>
          <button onClick={() => setPage("maps")}
            className="flex items-center gap-1.5 px-5 py-2 bg-[#1c3a1c] text-white text-[13px] font-semibold rounded-xl hover:bg-[#243824] transition-colors shadow-sm">
            Masuk ke Portal
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────────

function HeroSection({ setPage }: { setPage: (p: "home" | "maps") => void }) {
  const kpis = [
    { val: "48.200+", unit: "tCO2e",   label: "Total Kredit Karbon Terverifikasi dMRV" },
    { val: "14.250",  unit: "Ha",       label: "Kawasan Konservasi & Perhutanan Sosial Terlindungi" },
    { val: "Rp 3,85 M+", unit: "",     label: "Dana Karbon Tersalurkan Langsung ke Kelompok Tani Hutan (KTH)" },
    { val: "100%",    unit: "",         label: "Kepatuhan Regulasi UU No. 7/2021 HPP & Perpres 98/2021" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#a8ccdc]">
      {/* Sky photo with clouds */}
      <img
        src="https://images.unsplash.com/photo-1768482055878-af07eeb275c8?w=1600&h=900&fit=crop&auto=format&q=75"
        alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />
      {/* Fade sky photo into page background at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "40%", background: "linear-gradient(to top,#f8faf6 0%,#eef6f9 25%,transparent 100%)", zIndex: 1 }} />

      {/* Left bonsai tree */}
      <div className="absolute bottom-0 left-0 pointer-events-none select-none overflow-hidden"
        style={{ height: "82%", width: "22%", maxWidth: 320, zIndex: 2 }}>
        <img src="https://images.unsplash.com/photo-1765810655660-c3e907524d1e?w=600&h=860&fit=crop&auto=format"
          alt="" className="w-full h-full object-cover object-right" style={{ transform: "scaleX(-1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right,transparent 30%,#eef6f9 100%)" }} />
      </div>
      {/* Right bonsai tree */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden"
        style={{ height: "82%", width: "22%", maxWidth: 320, zIndex: 2 }}>
        <img src="https://images.unsplash.com/photo-1765810655660-c3e907524d1e?w=600&h=860&fit=crop&auto=format"
          alt="" className="w-full h-full object-cover object-left" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to left,transparent 30%,#eef6f9 100%)" }} />
      </div>

      <div className="relative flex flex-col items-center text-center px-6 pt-24 pb-10" style={{ zIndex: 3 }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/50 text-xs font-medium text-gray-700 mb-7 shadow-sm">
          🇮🇩 Infrastruktur Kepatuhan Karbon Nasional &amp; dMRV Terakreditasi
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold text-gray-900 leading-[1.08] max-w-4xl mb-5"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Integritas Pasar Karbon Indonesia: Presisi Digital dMRV, Kepatuhan Regulasi, dan Keadilan Komunitas Hutan.
        </h1>

        <p className="text-sm md:text-base text-gray-600 max-w-2xl mb-8 leading-relaxed">
          Platform berbasis blockchain pertama di Indonesia yang mengintegrasikan pengawasan emisi cerobong industri (CEMS), audit satelit &amp; drone otomatis, serta perdagangan kredit karbon bergaransi asuransi permanen tanpa celah greenwashing.
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
          <button onClick={() => setPage("maps")}
            className="flex items-center gap-2 px-6 py-3 bg-[#1c3a1c] text-white font-semibold rounded-xl hover:bg-[#243824] transition-colors text-sm shadow-lg shadow-black/20">
            Eksplorasi Portal Transparansi
            <ArrowUpRight size={15} />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300/70 bg-white/50 backdrop-blur text-gray-700 font-semibold rounded-xl hover:bg-white/70 transition-colors text-sm">
            <div className="w-5 h-5 rounded-full border border-gray-400/60 flex items-center justify-center">
              <Play size={7} className="text-gray-600 ml-0.5" fill="currentColor" />
            </div>
            Masuk Sebagai Pelaku Usaha / KTH
          </button>
        </div>

        {/* KPI Strip */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white/70 backdrop-blur rounded-2xl border border-white/60 shadow-sm px-4 py-4 text-left">
              <div className="flex items-baseline gap-1 mb-1 flex-wrap">
                <span className="text-xl font-extrabold text-gray-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{k.val}</span>
                {k.unit && <span className="text-xs text-gray-500 font-medium">{k.unit}</span>}
              </div>
              <div className="text-[10px] text-gray-500 leading-snug">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="w-full max-w-5xl relative" style={{ zIndex: 4 }}>
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

// ─── Compliance Strip ──────────────────────────────────────────────────────────────

function ComplianceStripSection() {
  const items = ["UU No. 7/2021 HPP", "Perpres No. 98/2021", "SRN-PPI", "ISO 14064-2", "ISO 14064-3", "Hyperledger Besu Enterprise EVM"];
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-[11px] text-gray-400 font-medium tracking-widest mb-7 uppercase">
          Teraudit dan patuh terhadap regulasi nasional &amp; standar internasional
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {items.map((item, i) => (
            <span key={i} className="text-gray-300 font-black text-sm tracking-tight select-none">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem vs Solution ──────────────────────────────────────────────────────────

function ProblemSolutionSection() {
  const rows = [
    {
      problem: "Audit Manual Berbulan-bulan: Verifikasi lapangan lambat, mahal, dan rawan manipulasi sampel.",
      solution: "Otomatisasi dMRV Multi-Modal: Analisis indeks NDVI satelit + Ortofoto LiDAR drone dalam hitungan menit.",
    },
    {
      problem: "Risiko Greenwashing & Double Counting: Data emisi dilaporkan sepihak tanpa verifikasi independen.",
      solution: "Audit Silang AI: Korelasi otomatis antara sensor emisi cerobong (CEMS) dengan beban daya listrik gardu PLN.",
    },
    {
      problem: "Risiko Reversal Hutan Terbakar: Jika hutan terbakar, kredit karbon yang dibeli pembeli hangus dan tidak sah.",
      solution: "Smart Contract Global Reserve 5%: Dana cadangan asuransi otomatis yang menjamin penggantian kredit jika terjadi bencana.",
    },
    {
      problem: "Ketimpangan Petani Lokal: Mayoritas keuntungan terserap oleh broker/perantara perizinan.",
      solution: "Direct-to-Community Wallet: Pembagian hasil penjualan langsung ke kas KTH & BUMDes secara on-chain.",
    },
  ];

  return (
    <section id="solusi" className="py-24 bg-[#f7f9f5]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-500 mb-5 shadow-sm">
            ⚖️ Masalah vs Solusi
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Mengapa RekaKarbon?
          </h2>
          <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
            Perbedaan kontras antara pasar karbon tradisional dengan inovasi RekaKarbon.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-red-500">
            <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs">❌</span>
            Tantangan Pasar Konvensional
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#1c3a1c]">
            <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs">✅</span>
            Terobosan Solusi RekaKarbon
          </div>
        </div>

        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="p-5 border-r border-gray-100 bg-red-50/30">
                <p className="text-sm text-gray-600 leading-relaxed">{row.problem}</p>
              </div>
              <div className="p-5 bg-green-50/30">
                <p className="text-sm text-[#1c3a1c] font-medium leading-relaxed">{row.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Ecosystem 4 Pillars ──────────────────────────────────────────────────────────

function EcosystemSection() {
  const [activeTab, setActiveTab] = useState("regulator");
  const tab = ekosistemTabs.find(t => t.id === activeTab)!;
  const Icon = tab.icon;

  return (
    <section id="ekosistem" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[11px] text-gray-500 mb-5">
            🔄 Ekosistem 4 Pilar Terintegrasi
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Setiap Peran, Satu Platform.
          </h2>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="inline-flex bg-gray-100 rounded-xl p-1 gap-1 min-w-max">
            {ekosistemTabs.map((t) => {
              const TIcon = t.icon;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  <TIcon size={12} style={{ color: activeTab === t.id ? t.color : undefined }} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: tab.border, backgroundColor: tab.bg }}>
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-10">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${tab.color}20` }}>
                <Icon size={24} style={{ color: tab.color }} />
              </div>
              <div className="text-[10px] font-mono tracking-widest mb-1" style={{ color: tab.color }}>
                {tab.role.toUpperCase()}
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{tab.label}</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{tab.desc}</p>
              <div className="space-y-3">
                {tab.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${tab.color}20` }}>
                      <Check size={9} style={{ color: tab.color }} />
                    </div>
                    <span className="text-sm text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center p-10 border-l" style={{ borderColor: tab.border }}>
              <div className="w-44 h-44 rounded-3xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: `${tab.color}15`, border: `2px solid ${tab.border}` }}>
                <Icon size={72} style={{ color: tab.color, opacity: 0.75 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── dMRV Triple Check ────────────────────────────────────────────────────────────

function DMRVSection() {
  const layers = [
    {
      num: "01", emoji: "🛰️",
      title: "Citra Satelit Multi-Spektral (Makro)",
      desc: "Pemantauan makro berkala menggunakan sensor optik satelit untuk mengukur indeks biomassa NDVI, kadar klorofil daun, dan kelembapan tutupan kanopi secara historis.",
      tech: "NusaCarbon API / Sentinel-2",
      color: "#3b82f6",
    },
    {
      num: "02", emoji: "🚁",
      title: "Drone Ortofoto & LiDAR Sub-Sentimeter (Mikro)",
      desc: "Pengambilan data elevasi digital (DEM/DSM) beresolusi tinggi untuk menghitung kerapatan individu pohon dan struktur volume tegakan kayu per meter persegi.",
      tech: "AI Tree Crown Detection",
      color: "#7c3aed",
    },
    {
      num: "03", emoji: "🤖",
      title: "AI Anomaly Cross-Correlation (Integritas Cerobong)",
      desc: "Model pembelajaran mesin yang membandingkan log sensor CEMS dengan konsumsi energi listrik gardu PLN guna memastikan korporasi tidak mematikan sensor cerobong saat beban produksi puncak.",
      tech: "CEMS × PLN Gardu Correlation",
      color: "#ea580c",
    },
  ];

  return (
    <section id="dmrv" className="py-24 bg-[#f7f9f5]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-500 mb-5 shadow-sm">
            🛰️ Arsitektur Teknologi
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Triple-Check dMRV Framework:<br />Verifikasi Tanpa Kompromi.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {layers.map((l) => (
            <div key={l.num} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="text-3xl">{l.emoji}</div>
                <div>
                  <div className="text-[9px] font-mono tracking-widest text-gray-400">LAPISAN</div>
                  <div className="text-sm font-mono font-bold" style={{ color: l.color }}>{l.num}</div>
                </div>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{l.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">{l.desc}</p>
              <div className="px-3 py-2 rounded-lg text-xs font-mono font-semibold"
                style={{ backgroundColor: `${l.color}15`, color: l.color }}>{l.tech}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tokenomics + Burning Chamber ────────────────────────────────────────────────

function TokenomicsSection() {
  const tokens = [
    {
      id: "Token ID 1",
      name: "PTBAE-PU",
      sub: "Batas Atas Emisi",
      desc: "Kuota legal dari pemerintah sebagai plafon toleransi emisi industri per tahun.",
      tag: "Regulasi Pemerintah",
      color: "#3b82f6",
    },
    {
      id: "Token ID ≥ 2",
      name: "SPE-GRK",
      sub: "Sertifikat Pengurangan Emisi",
      desc: "Kredit karbon terverifikasi proyek KTH. 1 Token = 1 tCO2e yang telah diaudit dMRV secara penuh.",
      tag: "1 Token = 1 tCO2e",
      color: "#16a34a",
    },
    {
      id: "Token ID 0",
      name: "GLOBAL_RESERVE",
      sub: "Inovasi Asuransi 5%",
      desc: "Setiap 1.000 SPE-GRK dicetak → 950 unit ke pengelola hutan, 50 unit (5%) otomatis ke Global Reserve Pool. Jika hutan terbakar, token dapat ditukar 1:1 melalui Insurance Swap.",
      tag: "Insurance Swap",
      color: "#f59e0b",
    },
  ];

  return (
    <section id="tokenomik" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[11px] text-gray-500 mb-5">
            ⛓️ Tokenomik ERC-1155
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Token Cerdas dengan Mekanisme<br />Asuransi Permanen.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {tokens.map((t) => (
            <div key={t.id} className="rounded-2xl border border-gray-100 shadow-sm bg-white flex flex-col overflow-hidden">
              <div className="h-2" style={{ backgroundColor: t.color }} />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{t.id}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: `${t.color}15`, color: t.color }}>{t.tag}</span>
                </div>
                <div className="text-xl font-extrabold text-gray-900 mb-0.5"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{t.name}</div>
                <div className="text-xs text-gray-400 mb-3">{t.sub}</div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Burning Chamber */}
        <div className="rounded-2xl overflow-hidden shadow-sm bg-gray-900">
          <div className="p-8">
            <div className="text-[10px] font-mono tracking-widest text-gray-400 mb-3">🛒 BURSA KARBON &amp; PROTOKOL BURNING CHAMBER</div>
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-2"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Bursa Karbon Anti-Spekulasi (Cap Control)
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Pasar fraksional yang membatasi pembelian emiten hanya sebesar jumlah defisit emisi aktif mereka. Spekulan tidak dapat memborong pasokan kredit masyarakat.
                </p>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Konversi Fraksi",    val: "10 Fraksi Token = 1.0 tCO2e Emisi Tertutupi" },
                  { label: "Sertifikat",          val: "TxHash On-Chain + QR-Code verifikasi (A4)" },
                  { label: "Mekanisme Bakar",     val: "Irreversible Burn-to-Retire" },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-800 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                    <span className="text-[10px] text-gray-400 shrink-0">{s.label}</span>
                    <span className="text-[10px] font-mono text-[#84c93b] font-bold text-right">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Map Teaser ───────────────────────────────────────────────────────────────────

function MapTeaserSection({ setPage }: { setPage: (p: "home" | "maps") => void }) {
  return (
    <section id="transparansi" className="py-24 bg-[#f7f9f5]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-500 mb-5 shadow-sm">
            🗺️ Teaser Peta Transparansi Spasial
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Eksplorasi Transparansi Karbon Terbuka<br />untuk Seluruh Rakyat Indonesia.
          </h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Melalui portal publik RekaKarbon, siapa pun — mulai dari akademisi, jurnalis lingkungan, hingga investor ESG — dapat memantau kondisi kesehatan hutan konservasi secara spasial dan meninjau rekam jejak kepatuhan emisi korporasi nasional secara transparan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: "🌐", text: "Visualisasi poligon batas hutan konservasi interaktif (Esri Satellite Layer)" },
            { icon: "📊", text: "Tampilan visual gauge NDVI kesehatan vegetasi (0.00 – 1.00) per kawasan" },
            { icon: "🔗", text: "Penelusuran hash transaksi on-chain (Verichain Hash Explorer)" },
          ].map((f) => (
            <div key={f.text} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-3">
              <span className="text-2xl shrink-0">{f.icon}</span>
              <span className="text-sm text-gray-600 leading-snug">{f.text}</span>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 h-72 bg-gray-800">
          <img src="https://images.unsplash.com/photo-1646928234724-ddfac30993e6?w=1200&h=500&fit=crop&auto=format&q=80"
            alt="Peta transparansi" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="15,20 75,10 88,55 55,82 12,65" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="0.4" />
            {[{ x: 32, y: 55 }, { x: 52, y: 58 }, { x: 72, y: 52 }, { x: 22, y: 62 }].map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="1.5" fill="#ef4444" stroke="white" strokeWidth="0.3" />
            ))}
          </svg>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold text-white mb-1.5">Peta Konservasi &amp; Emisi Industri Indonesia</div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-[10px] text-green-300">Kawasan Konservasi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-[10px] text-red-300">Emisi Belum Bayar</span>
                </div>
              </div>
            </div>
            <button onClick={() => setPage("maps")}
              className="flex items-center gap-2 px-4 py-2 bg-[#84c93b] text-[#1c3a1c] font-bold text-xs rounded-xl hover:bg-[#72b534] transition-colors shadow-lg">
              Buka Peta Publik <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Commitment ───────────────────────────────────────────────────────────────────

function CommitmentSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[11px] text-gray-500 mb-5">
            📜 Komitmen Kami
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Terbangun di atas teknologi<br />yang tidak bisa dibohongi.
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <p className="text-base text-gray-600 leading-relaxed mb-6 italic">
              "Kami membangun RekaKarbon karena pasar karbon Indonesia butuh lebih dari sekadar janji. Kami butuh bukti yang tidak bisa dimanipulasi — dan itulah mengapa setiap ton CO₂ yang diklaim harus melewati tiga lapisan verifikasi independen."
            </p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=80&h=80&fit=crop&auto=format"
                alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-bold text-gray-900 text-sm">Ahmad Fauzi</div>
                <div className="text-xs text-gray-400">Founder &amp; CTO, RekaKarbon</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-4xl font-extrabold text-gray-900"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>48.200+</div>
                <div className="w-10 h-10 bg-[#84c93b]/15 rounded-xl flex items-center justify-center">
                  <Leaf size={18} className="text-[#84c93b]" />
                </div>
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">tCO2e Terverifikasi dMRV</div>
              <div className="text-xs text-gray-500 mt-1">Total kredit karbon yang telah melewati triple-check audit</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-4xl font-extrabold text-gray-900"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Rp 3,85 M</div>
                <div className="w-10 h-10 bg-[#84c93b]/15 rounded-xl flex items-center justify-center">
                  <TrendingUp size={18} className="text-[#84c93b]" />
                </div>
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Dana Tersalurkan ke KTH</div>
              <div className="text-xs text-gray-500 mt-1">Langsung ke dompet BUMDes tanpa perantara atau potongan broker</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="py-24 bg-[#f7f9f5]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-500 mb-5 shadow-sm">
            ❓ FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button className="w-full flex items-start justify-between gap-4 p-5 text-left"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span className="text-sm font-semibold text-gray-800 leading-snug">{item.q}</span>
                {openIdx === i
                  ? <ChevronUp size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  : <ChevronDown size={16} className="text-gray-400 shrink-0 mt-0.5" />}
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 pt-1 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Bottom ───────────────────────────────────────────────────────────────────

function CTASectionBottom({ setPage }: { setPage: (p: "home" | "maps") => void }) {
  return (
    <section className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#9cc8e0 0%,#b5d8ec 30%,#cfe7f4 60%,#e5f3fa 85%,#f0f8fc 100%)" }}>
      <div className="absolute bottom-0 left-0 h-[85%] w-52 lg:w-64 pointer-events-none select-none" style={{ zIndex: 1 }}>
        <img src="https://images.unsplash.com/photo-1765810655660-c3e907524d1e?w=400&h=600&fit=crop&auto=format"
          alt="" className="w-full h-full object-cover object-right" style={{ transform: "scaleX(-1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right,transparent 30%,#cfe7f4 100%)" }} />
      </div>
      <div className="absolute bottom-0 right-0 h-[85%] w-52 lg:w-64 pointer-events-none select-none" style={{ zIndex: 1 }}>
        <img src="https://images.unsplash.com/photo-1765810655660-c3e907524d1e?w=400&h=600&fit=crop&auto=format"
          alt="" className="w-full h-full object-cover object-left" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to left,transparent 30%,#cfe7f4 100%)" }} />
      </div>

      <div className="relative py-28 px-6 text-center" style={{ zIndex: 2 }}>
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur text-[11px] text-gray-600 mb-6 shadow-sm border border-white/40">
          🚀 Bergabunglah Sekarang
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Siap Mewujudkan Kepatuhan Emisi<br />dan Transparansi Karbon Berkeadilan?
        </h2>
        <p className="text-sm text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
          Bergabunglah dengan ekosistem RekaKarbon. Akselerasi dekarbonisasi industri Anda atau daftarkan kawasan perhutanan sosial Anda hari ini.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button onClick={() => setPage("maps")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1c3a1c] text-white font-semibold rounded-xl hover:bg-[#243824] transition-colors text-sm shadow-lg shadow-black/15">
            Daftar / Masuk Portal
            <ArrowUpRight size={15} />
          </button>
          <button onClick={() => setPage("maps")}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300/70 bg-white/50 backdrop-blur text-gray-700 font-semibold rounded-xl hover:bg-white/70 transition-colors text-sm">
            <Globe size={14} />
            Buka Peta Transparansi
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#1a1f18] pt-14 pb-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Leaf size={17} className="text-[#84c93b]" />
              <div>
                <div className="text-white font-bold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>RekaKarbon</div>
                <div className="text-[9px] text-gray-500 font-mono">Verichain Platform</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Platform dMRV &amp; Kepatuhan Karbon Terpadu Indonesia. Menjaga integritas iklim melalui teknologi terdesentralisasi dan keadilan sosial.
            </p>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-gray-500 tracking-widest mb-4 uppercase">Ekosistem</div>
            <ul className="space-y-2.5">
              {["Portal Transparansi","Bursa Karbon","Brankas Offset","Audit AI dMRV","Dompet KTH"].map(l => (
                <li key={l} className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors">{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-gray-500 tracking-widest mb-4 uppercase">Regulasi</div>
            <ul className="space-y-2.5">
              {["UU HPP No. 7/2021","Perpres 98/2021","Panduan Metodologi dMRV","Standar ISO 14064"].map(l => (
                <li key={l} className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors">{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-gray-500 tracking-widest mb-4 uppercase">Keamanan &amp; Node</div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono text-green-400 font-bold">Mainnet Besu Node Active</span>
            </div>
            <ul className="space-y-2">
              {["Zero-Gas Network","SHA-256 Verichain Signer","Chain ID 1337","Permissioned EVM"].map(l => (
                <li key={l} className="text-xs text-gray-400">{l}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          © 2026 RekaKarbon Platform. Hak Cipta Dilindungi Undang-Undang. Verichain dMRV Protocol.
        </div>
      </div>
    </footer>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: "home" | "maps") => void }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <ComplianceStripSection />
      <ProblemSolutionSection />
      <EcosystemSection />
      <DMRVSection />
      <TokenomicsSection />
      <MapTeaserSection setPage={setPage} />
      <CommitmentSection />
      <FAQSection />
      <CTASectionBottom setPage={setPage} />
      <Footer />
    </>
  );
}

// ─── GIS Canvas ───────────────────────────────────────────────────────────────────

function GISCanvas({ type, selectedCompany, onSelectCompany }: {
  type: "konservasi" | "emisi";
  selectedCompany?: number | null;
  onSelectCompany?: (id: number | null) => void;
}) {
  return (
    <div className="relative flex-1 bg-gray-800 overflow-hidden">
      <img
        src={type === "konservasi"
          ? "https://images.unsplash.com/photo-1646928234724-ddfac30993e6?w=1400&h=900&fit=crop&auto=format&q=80"
          : "https://images.unsplash.com/photo-1655671051848-28022f1dc3f0?w=1400&h=900&fit=crop&auto=format&q=80"}
        alt="Satellite map" className="absolute inset-0 w-full h-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gray-900/20" />

      <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur rounded-lg px-3 py-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-mono text-green-400">GIS MAP CANVAS</span>
      </div>
      <button className="absolute top-3 right-3 bg-white/90 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 font-medium hover:bg-white transition-all shadow-sm">Focus Area</button>
      <div className="absolute right-3 top-14 flex flex-col gap-1">
        <button className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow text-gray-700 hover:bg-gray-50"><Plus size={14} /></button>
        <button className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow text-gray-700 hover:bg-gray-50"><Minus size={14} /></button>
      </div>

      {type === "konservasi" ? (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="15,20 75,10 88,55 55,82 12,65" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="0.3" />
          {[{ x: 15, y: 20 }, { x: 75, y: 10 }, { x: 88, y: 55 }, { x: 55, y: 82 }, { x: 12, y: 65 }].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="1.2" fill="#22c55e" />
          ))}
        </svg>
      ) : (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {emisiCompanies.map((c) => (
            <g key={c.id} onClick={() => onSelectCompany?.(selectedCompany === c.id ? null : c.id)} style={{ cursor: "pointer" }}>
              <circle cx={c.x} cy={c.y} r={selectedCompany === c.id ? 3.5 : 2.5}
                fill={c.status === "BELUM BAYAR" ? "#ef4444" : "#22c55e"} stroke="white" strokeWidth="0.4" opacity={0.9} />
              {selectedCompany === c.id && (
                <circle cx={c.x} cy={c.y} r="5" fill="none"
                  stroke={c.status === "BELUM BAYAR" ? "#ef4444" : "#22c55e"} strokeWidth="0.4" opacity="0.5" />
              )}
            </g>
          ))}
        </svg>
      )}

      {type === "emisi" && selectedCompany && (() => {
        const c = emisiCompanies.find(x => x.id === selectedCompany);
        if (!c) return null;
        const isBelum = c.status === "BELUM BAYAR";
        return (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-76 bg-white rounded-2xl shadow-2xl border border-gray-100 z-10 overflow-hidden"
            style={{ minWidth: 288 }}>
            {/* accent bar */}
            <div className={`h-1 w-full ${isBelum ? "bg-red-500" : "bg-[#84c93b]"}`} />
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className={`text-[9px] font-mono font-bold tracking-widest mb-1 ${isBelum ? "text-red-500" : "text-[#1c3a1c]"}`}>
                    {isBelum ? "EMITEN BELUM BAYAR KARBON" : "EMITEN LUNAS OFFSET"}
                  </div>
                  <div className="font-extrabold text-gray-900 text-sm leading-tight"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{c.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{c.type} · {c.location}</div>
                </div>
                <button onClick={() => onSelectCompany?.(null)}
                  className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors shrink-0 ml-2 text-sm leading-none">×</button>
              </div>
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400">Defisit Karbon</span>
                  <span className={`font-mono font-bold text-xs ${isBelum ? "text-red-500" : "text-green-600"}`}>
                    {c.deficit === "0" ? "— (Lunas)" : c.deficit + " tCO2e"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400">Tagihan Offset</span>
                  <span className="font-mono font-bold text-xs text-gray-800">{c.tagihan}</span>
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${isBelum ? "bg-red-500" : "bg-[#84c93b]"}`}
                  style={{ width: `${Math.min((c.aktual / (c.aktual + 0.5)) * 100, 100)}%` }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-gray-400">Aktual: {c.aktual}M tCO2e</span>
                <span className="text-[9px] text-gray-400">Kuota: {c.kuota}M tCO2e</span>
              </div>
            </div>
          </div>
        );
      })()}

      <div className="absolute bottom-3 left-3">
        {type === "konservasi" ? (
          <div className="bg-black/60 backdrop-blur rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs font-mono text-green-400">Area Proyek Aktif</span>
          </div>
        ) : (
          <div className="bg-black/60 backdrop-blur rounded-lg px-3 py-2 space-y-1">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /><span className="text-xs font-mono text-red-300">Belum Bayar Karbon</span></div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400" /><span className="text-xs font-mono text-green-300">Lunas Offset Karbon</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Conservation Right Panel ──────────────────────────────────────────────────────

function ConservationRightPanel({ selected, setSelected }: { selected: number; setSelected: (i: number) => void }) {
  const [tab, setTab] = useState<"detail" | "daftar">("detail");
  const project = conservationProjects[selected];

  return (
    <div className="w-80 xl:w-96 shrink-0 bg-white flex flex-col overflow-hidden border-l border-gray-200">
      <div className="flex border-b border-gray-200">
        <button onClick={() => setTab("detail")}
          className={`flex-1 py-3 text-xs font-semibold transition-all ${tab === "detail" ? "border-b-2 border-[#1c3a1c] text-[#1c3a1c]" : "text-gray-400 hover:text-gray-600"}`}>
          Detail &amp; Geometri
        </button>
        <button onClick={() => setTab("daftar")}
          className={`flex-1 py-3 text-xs font-semibold transition-all ${tab === "daftar" ? "border-b-2 border-[#1c3a1c] text-[#1c3a1c]" : "text-gray-400 hover:text-gray-600"}`}>
          Daftar Proyek
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {tab === "detail" ? (
          <div className="p-4 space-y-4">
            <div>
              <div className="text-[10px] font-mono text-gray-400 tracking-widest mb-1">PROYEK DIPILIH</div>
              <div className="text-xl font-bold text-gray-900">{project.name}</div>
              <div className="text-sm text-gray-500">{project.region}</div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1c3a1c] hover:bg-[#243824] text-white rounded-lg text-xs font-semibold transition-all">
              <Download size={13} /> Unduh Laporan Anggaran (PDF)
            </button>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Luas Area",     value: project.area + " Ha" },
                { label: "Cadangan CO2",  value: project.co2 + " tCO2e" },
                { label: "Pohon Ditanam", value: project.pohon },
                { label: "Harga SPE-GRK", value: project.harga, green: true },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="text-[10px] text-gray-400 mb-1">{s.label}</div>
                  <div className={`text-sm font-bold ${s.green ? "text-[#1c3a1c]" : "text-gray-900"}`}>{s.value}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-500 tracking-widest mb-3">INDEKS KESEHATAN VEGETASI</div>
              <div className="flex justify-around">
                <GaugeCircle value={project.ndvi} label="NDVI" color="#1c3a1c" />
                <GaugeCircle value={project.evi}  label="EVI"  color="#84c93b" />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-500 tracking-widest mb-2">TRANSPARANSI BLOCKCHAIN</div>
              <div className="bg-gray-900 rounded-xl p-4">
                <div className="text-[10px] font-mono text-gray-400 mb-1">TOTAL ANGGARAN RESTORASI</div>
                <div className="font-mono font-bold text-[#84c93b] text-sm mb-2">{project.anggaran}</div>
                <div className="h-2 rounded-full overflow-hidden bg-gray-700 flex mb-1">
                  <div className="h-full bg-[#84c93b]" style={{ width: "77%" }} />
                  <div className="h-full bg-blue-500"  style={{ width: "10%" }} />
                  <div className="h-full bg-amber-500" style={{ width: "7%" }} />
                </div>
                <div className="text-[10px] font-mono text-gray-400">Tercairkan: {project.tercairkan}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <div className="text-[10px] font-mono text-gray-500 tracking-widest mb-2">SEMUA PROYEK</div>
            {conservationProjects.map((p, i) => (
              <button key={p.id} onClick={() => { setSelected(i); setTab("detail"); }}
                className={`w-full text-left rounded-xl p-4 border transition-all ${i === selected ? "bg-[#1c3a1c] border-[#1c3a1c] text-white" : "bg-white border-gray-200 hover:border-green-300 hover:shadow-sm"}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className={`font-bold text-sm ${i === selected ? "text-white" : "text-gray-900"}`}>{p.name}</div>
                  <div className={`text-xs ${i === selected ? "text-green-200" : "text-gray-400"}`}>{p.region}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className={`text-[10px] uppercase tracking-wide ${i === selected ? "text-green-200" : "text-gray-400"}`}>Area</div>
                    <div className={`font-mono font-bold text-xs ${i === selected ? "text-white" : "text-gray-800"}`}>{p.area} ha</div>
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase tracking-wide ${i === selected ? "text-green-200" : "text-gray-400"}`}>Cadangan CO2</div>
                    <div className={`font-mono font-bold text-xs ${i === selected ? "text-green-200" : "text-[#1c3a1c]"}`}>{p.co2} tCO2e</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Emisi Right Panel ─────────────────────────────────────────────────────────────

function EmisiRightPanel({ selectedId, setSelectedId }: { selectedId: number | null; setSelectedId: (id: number | null) => void }) {
  const [tab, setTab] = useState<"semua" | "belum" | "lunas">("semua");
  const belumBayar = emisiCompanies.filter(c => c.status === "BELUM BAYAR");
  const lunas      = emisiCompanies.filter(c => c.status === "LUNAS");
  const displayed  = tab === "semua" ? emisiCompanies : tab === "belum" ? belumBayar : lunas;

  return (
    <div className="w-80 xl:w-96 shrink-0 bg-white flex flex-col overflow-hidden border-l border-gray-100 shadow-[-4px_0_12px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 bg-white shrink-0 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[10px] font-mono text-gray-400 tracking-widest">MONITORING DEBITUR KARBON</div>
            <div className="text-sm font-extrabold text-gray-900 mt-0.5 leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Neraca Emisi Industri</div>
          </div>
          <span className="text-[10px] font-mono bg-red-50 border border-red-100 text-red-600 px-2.5 py-1 rounded-xl font-bold">
            {belumBayar.length} Defisit
          </span>
        </div>

        {/* Filter tabs — same pill pattern as ecosystem tabs in home */}
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {(["semua", "belum", "lunas"] as ("semua" | "belum" | "lunas")[]).map((val) => {
            const labelMap: Record<string, string> = {
              semua: `Semua (${emisiCompanies.length})`,
              belum: `Defisit (${belumBayar.length})`,
              lunas: `Lunas (${lunas.length})`,
            };
            const isActive = tab === val;
            return (
              <button key={val} onClick={() => setTab(val)}
                className={`flex-1 py-1.5 text-[10px] font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? val === "belum"
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                {labelMap[val]}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full text-xs bg-gray-50 border border-gray-100 rounded-xl pl-8 pr-3 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#84c93b] focus:ring-1 focus:ring-[#84c93b]/30 transition-all"
            placeholder="Cari perusahaan atau wilayah..." />
        </div>
      </div>

      {/* Company list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#f7f9f5]">
        {displayed.map((c) => {
          const isSelected = selectedId === c.id;
          const isBelum    = c.status === "BELUM BAYAR";
          return (
            <button key={c.id} onClick={() => setSelectedId(isSelected ? null : c.id)}
              className={`w-full text-left rounded-2xl p-4 border transition-all shadow-sm ${
                isSelected
                  ? isBelum ? "bg-red-700 border-red-600" : "bg-[#1c3a1c] border-[#1c3a1c]"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
              }`}>
              <div className="flex justify-between items-start mb-1.5">
                <div className={`font-extrabold text-xs leading-snug pr-2 ${isSelected ? "text-white" : "text-gray-900"}`}
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{c.name}</div>
                <span className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  isBelum
                    ? isSelected ? "bg-red-500/40 text-red-100" : "bg-red-50 text-red-600"
                    : isSelected ? "bg-[#84c93b]/30 text-[#84c93b]" : "bg-green-50 text-green-700"
                }`}>{c.status}</span>
              </div>
              <div className={`text-[10px] mb-2.5 ${isSelected ? "text-gray-300" : "text-gray-400"}`}>{c.type} · {c.location}</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className={`text-[9px] uppercase tracking-widest font-medium ${isSelected ? "text-gray-300" : "text-gray-400"}`}>Defisit</div>
                  <div className={`font-mono font-bold text-xs mt-0.5 ${
                    isBelum
                      ? isSelected ? "text-red-200" : "text-red-600"
                      : isSelected ? "text-[#84c93b]" : "text-green-600"
                  }`}>
                    {c.deficit === "0" ? "—" : c.deficit + " tCO2e"}
                  </div>
                </div>
                <div>
                  <div className={`text-[9px] uppercase tracking-widest font-medium ${isSelected ? "text-gray-300" : "text-gray-400"}`}>Tagihan</div>
                  <div className={`font-mono font-bold text-xs mt-0.5 ${isSelected ? "text-white" : "text-gray-800"}`}>{c.tagihan}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Maps Page ─────────────────────────────────────────────────────────────────────

function MapsPage({ mapView, setMapView }: { mapView: "konservasi" | "emisi"; setMapView: (v: "konservasi" | "emisi") => void }) {
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 62px)" }}>
      {/* ── Maps sub-header — matches dashboard header row aesthetic ── */}
      <div className="px-5 py-0 h-[58px] border-b border-gray-100 bg-white flex items-center justify-between shrink-0 shadow-sm">

        {/* Left: title block */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[15px] font-extrabold text-gray-900 leading-none"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {mapView === "konservasi" ? "Peta Poligon Konservasi" : "Monitoring Emisi & Defisit Karbon"}
            </h1>
            <p className="text-[10px] text-gray-400 mt-0.5 font-mono">
              {mapView === "konservasi" ? "Real-time · GIS WGS84 · Sentinel-2 dMRV" : "CEMS Integration · PLN Gardu Correlation · On-chain"}
            </p>
          </div>

          {/* Toggle — same pattern as ecosystem tabs on home */}
          <div className="flex items-center pl-4 border-l border-gray-100">
            <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
              <button onClick={() => setMapView("konservasi")}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  mapView === "konservasi" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}>
                <Globe size={11} className={mapView === "konservasi" ? "text-[#1c3a1c]" : ""} />
                Konservasi
              </button>
              <button onClick={() => setMapView("emisi")}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  mapView === "emisi" ? "bg-red-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}>
                <Factory size={11} />
                Emisi
              </button>
            </div>
          </div>
        </div>

        {/* Right: live status chips — same pill style as dashboard top-bar */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-50 border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-mono text-green-700 font-bold">Besu Node Live</span>
          </div>
          {mapView === "konservasi" ? (
            <>
              <span className="px-3 py-1.5 rounded-xl bg-[#f0fdf4] border border-green-100 text-[10px] font-mono font-bold text-[#1c3a1c]">5 Proyek Aktif</span>
              <span className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-[10px] font-mono font-bold text-gray-600">1.18M Ha</span>
            </>
          ) : (
            <>
              <span className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-100 text-[10px] font-mono font-bold text-red-600">5 Emiten Defisit</span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-100 text-[10px] font-mono font-bold text-amber-700">Rp 212.1 M Tunggakan</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {mapView === "konservasi" ? (
          <>
            <GISCanvas type="konservasi" />
            <ConservationRightPanel selected={selectedProject} setSelected={setSelectedProject} />
          </>
        ) : (
          <>
            <GISCanvas type="emisi" selectedCompany={selectedCompany} onSelectCompany={setSelectedCompany} />
            <EmisiRightPanel selectedId={selectedCompany} setSelectedId={setSelectedCompany} />
          </>
        )}
      </div>
    </div>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage]       = useState<"home" | "maps">("home");
  const [mapView, setMapView] = useState<"konservasi" | "emisi">("konservasi");

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar page={page} setPage={setPage} mapView={mapView} setMapView={setMapView} />
      <main className="pt-16">
        {page === "home" ? <HomePage setPage={setPage} /> : <MapsPage mapView={mapView} setMapView={setMapView} />}
      </main>
    </div>
  );
}
