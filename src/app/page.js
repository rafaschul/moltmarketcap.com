"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const floatingOffset = Math.min(scrollY * 0.08, 26);
  const dark = theme === "dark";

  const c = dark
    ? {
        pageBg: "linear-gradient(180deg,#0b1220 0%,#0f172a 60%)",
        text: "#e5e7eb",
        muted: "#94a3b8",
        card: "#111827",
        border: "#243041",
        link: "#cbd5e1",
        kicker: "#60a5fa",
        primary: "#22c55e",
      }
    : {
        pageBg: "linear-gradient(180deg,#f8fbff 0%,#ffffff 60%)",
        text: "#0f172a",
        muted: "#64748b",
        card: "#ffffff",
        border: "#e2e8f0",
        link: "#334155",
        kicker: "#2563eb",
        primary: "#16a34a",
      };

  return (
    <main style={{ ...styles.page, background: c.pageBg, color: c.text, padding: isMobile ? "16px" : "24px" }}>
      <button
        onClick={() => setTheme(dark ? "light" : "dark")}
        style={{ ...styles.themeBtn, background: dark ? "rgba(15,23,42,.7)" : "rgba(255,255,255,.7)", color: c.text, borderColor: c.border }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <a
        href="#contact"
        style={{
          ...styles.floatingContact,
          right: isMobile ? "12px" : "20px",
          bottom: isMobile ? "12px" : "20px",
          padding: isMobile ? "10px 14px" : "12px 18px",
          transform: `translateY(${floatingOffset}px)`,
          color: c.text,
        }}
      >
        Contact
      </a>

      <header style={{ ...styles.nav, flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? "10px" : 0 }}>
        <div style={styles.logoWrap}>
          <div style={{ ...styles.logoBadge, borderColor: c.border, background: dark ? "#0f172a" : "rgba(255,255,255,0.8)" }}>
            <img src="/bcp-logo.jpg" alt="BCP Partners logo" style={styles.logoImage} />
          </div>
          <div>
            <div style={styles.logo}>MoltMarketCap</div>
            <div style={{ ...styles.logoSub, color: c.muted }}>On-Chain Venture Access</div>
          </div>
        </div>
        <nav style={{ ...styles.navLinks, flexWrap: "wrap", gap: isMobile ? "10px" : "14px" }}>
          <a href="#about" style={{ ...styles.link, color: c.link }}>About</a>
          <a href="#access" style={{ ...styles.link, color: c.link }}>Access</a>
          <a href="#updates" style={{ ...styles.link, color: c.link }}>Updates</a>
          <a href="#contact" style={{ ...styles.cta, padding: isMobile ? "7px 12px" : "8px 14px" }}>Contact</a>
        </nav>
      </header>

      <section style={styles.hero}>
        <div style={{ ...styles.heroVisual, height: isMobile ? 120 : 160, borderColor: c.border }}>
          <div style={styles.heroBlobA} />
          <div style={styles.heroBlobB} />
          <div style={{ ...styles.heroCard, background: c.card, borderColor: c.border, color: c.text }}>Institutional • Tokenization • RWA</div>
        </div>
        <p style={{ ...styles.kicker, color: c.kicker }}>On-Chain Capital Intelligence</p>
        <h1 style={{ ...styles.headline, fontSize: isMobile ? "40px" : "clamp(36px,6vw,64px)" }}>Institutional-grade Web3 access for the next market cycle.</h1>
        <p style={{ ...styles.subhead, fontSize: isMobile ? "16px" : "18px", color: c.muted }}>
          Inspired by modern venture and tokenization platforms: clear structure, trust-first design, and a practical bridge between traditional finance and digital assets.
        </p>
        <div style={styles.heroActions}>
          <a href="#access" style={{ ...styles.primaryBtn, background: c.primary }}>Get on Waitlist</a>
          <a href="#about" style={{ ...styles.secondaryBtn, background: c.card, borderColor: c.border, color: c.text }}>Learn More</a>
        </div>
      </section>

      <section id="access" style={styles.sectionBlock}>
        <h2 style={styles.sectionTitle}>Access</h2>
        <p style={{ ...styles.sectionIntro, color: c.muted }}>Two clear entry points: investor access and protocol integration.</p>
        <div style={styles.cardsRow}>
          <Card title="For Investors" text="Access curated on-chain opportunities via familiar structures. No heavy crypto-native setup required." tag="CeFi-friendly" icon="📈" c={c} />
          <Card title="For Protocols" text="Discover institutional integration pathways across European and global regulated environments." tag="Institutional" icon="🏦" c={c} />
          <Card title="For Funds" text="Tokenization workflows for private market access, distribution, and transparent reporting." tag="Tokenization" icon="🧩" c={c} />
        </div>
      </section>

      <section id="about" style={{ ...styles.split, gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr" }}>
        <div>
          <h2 style={styles.sectionTitle}>Bridge builders between finance and on-chain markets</h2>
          <p style={{ ...styles.paragraph, color: c.muted }}>
            We focus on practical adoption: regulation-aware infrastructure, investor clarity, and long-term ecosystem alignment.
          </p>
          <ul style={{ ...styles.list, color: c.link }}>
            <li>Tokenization strategy and rollout support</li>
            <li>Institutional market access playbooks</li>
            <li>Compliance-conscious product design</li>
          </ul>
        </div>
        <div style={{ ...styles.metricPanel, background: c.card, borderColor: c.border }}>
          <Metric label="Focus" value="RWA + Tokenization" c={c} />
          <Metric label="Regions" value="EU, UK, UAE, SG" c={c} />
          <Metric label="Model" value="On-chain + regulated rails" c={c} />
        </div>
      </section>

      <section id="updates" style={styles.sectionBlock}>
        <h2 style={styles.sectionTitle}>Updates</h2>
        <p style={{ ...styles.sectionIntro, color: c.muted }}>Latest activity and market intelligence snapshots.</p>
        <div style={styles.updateGrid}>
          {["European Banks & Stablecoins report overview", "Digital Asset Summit institutional insights", "Tokenization roadshow recap: Zurich + London", "Market commentary on compliant digital asset access"].map((u) => (
            <article key={u} style={{ ...styles.updateCard, background: c.card, borderColor: c.border, color: c.link }}>{u}</article>
          ))}
        </div>
      </section>

      <section style={{ ...styles.newsletter, background: dark ? "#0f172a" : "#f8fafc", borderColor: c.border }}>
        <h3 style={{ margin: 0 }}>Get ecosystem updates</h3>
        <p style={{ margin: "8px 0 14px", color: c.muted }}>Market, regulation, and product updates in one concise feed.</p>
        <div style={{ ...styles.subscribeRow, flexDirection: isMobile ? "column" : "row" }}>
          <input placeholder="Email address" style={{ ...styles.input, background: c.card, borderColor: c.border, color: c.text }} />
          <button style={{ ...styles.primaryBtn, background: c.primary, width: isMobile ? "100%" : "auto" }}>Subscribe</button>
        </div>
      </section>

      <footer id="contact" style={{ ...styles.footer, flexDirection: isMobile ? "column" : "row", gap: isMobile ? "8px" : 0, alignItems: isMobile ? "flex-start" : "center", borderTopColor: c.border, color: c.muted }}>
        <div>MoltMarketCap • Berlin</div>
        <a href="https://github.com/rafaschul/moltmarketcap.com" style={{ ...styles.link, color: c.link }}>GitHub</a>
      </footer>
    </main>
  );
}

function Card({ title, text, tag, icon, c }) {
  return (
    <article style={{ ...styles.card, background: c.card, borderColor: c.border }}>
      <div style={styles.icon}>{icon}</div>
      <span style={styles.tag}>{tag}</span>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={{ ...styles.cardText, color: c.muted }}>{text}</p>
    </article>
  );
}

function Metric({ label, value, c }) {
  return (
    <div style={{ ...styles.metricItem, borderBottomColor: c.border }}>
      <div style={{ ...styles.metricLabel, color: c.muted }}>{label}</div>
      <div style={styles.metricValue}>{value}</div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", maxWidth: "1150px", margin: "0 auto" },
  themeBtn: { position: "fixed", top: "14px", right: "14px", zIndex: 55, border: "1px solid", borderRadius: "999px", padding: "8px 12px", fontWeight: 700, backdropFilter: "blur(10px)", cursor: "pointer" },
  floatingContact: { position: "fixed", zIndex: 50, textDecoration: "none", fontWeight: 700, borderRadius: "999px", border: "1px solid rgba(255,255,255,0.55)", background: "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.28))", boxShadow: "0 8px 32px rgba(31,38,135,0.18)", backdropFilter: "blur(14px) saturate(140%)", WebkitBackdropFilter: "blur(14px) saturate(140%)", transition: "transform 140ms ease-out" },
  nav: { display: "flex", justifyContent: "space-between", padding: "8px 0 20px" },
  logoWrap: { display: "flex", alignItems: "center", gap: "10px" },
  logoBadge: { width: 70, height: 52, borderRadius: 12, overflow: "hidden", border: "1px solid", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)", display: "grid", placeItems: "center" },
  logoImage: { width: "100%", height: "100%", objectFit: "cover" },
  logo: { fontWeight: 900, fontSize: "22px", letterSpacing: "0.3px" },
  logoSub: { fontSize: 12 },
  navLinks: { display: "flex", alignItems: "center" },
  link: { textDecoration: "none", fontWeight: 600 },
  cta: { textDecoration: "none", color: "#fff", background: "#0f172a", padding: "8px 14px", borderRadius: "10px", fontWeight: 700 },
  hero: { padding: "24px 0 38px", position: "relative" },
  heroVisual: { borderRadius: 16, background: "linear-gradient(135deg,#e2f7e8,#dbeafe)", border: "1px solid", marginBottom: 16, position: "relative", overflow: "hidden" },
  heroBlobA: { position: "absolute", width: 180, height: 180, borderRadius: "50%", background: "rgba(34,197,94,0.25)", right: 40, top: -30 },
  heroBlobB: { position: "absolute", width: 140, height: 140, borderRadius: "50%", background: "rgba(37,99,235,0.2)", right: 140, bottom: -40 },
  heroCard: { position: "absolute", left: 20, bottom: 20, border: "1px solid", borderRadius: 12, padding: "8px 12px", fontWeight: 700 },
  kicker: { margin: 0, fontWeight: 800, letterSpacing: "0.3px" },
  headline: { margin: "10px 0", lineHeight: 1.05, maxWidth: "900px" },
  subhead: { maxWidth: "780px", lineHeight: 1.55 },
  heroActions: { display: "flex", gap: "12px", marginTop: "20px" },
  primaryBtn: { border: "none", color: "#fff", padding: "10px 16px", borderRadius: "10px", fontWeight: 800, textDecoration: "none", cursor: "pointer" },
  secondaryBtn: { border: "1px solid", padding: "10px 16px", borderRadius: "10px", fontWeight: 700, textDecoration: "none" },
  sectionBlock: { marginTop: 18 },
  sectionTitle: { margin: 0, fontSize: "30px" },
  sectionIntro: { marginTop: 8 },
  cardsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "12px", marginTop: "8px" },
  card: { border: "1px solid", borderRadius: "14px", padding: "16px" },
  icon: { fontSize: 24 },
  tag: { display: "inline-block", background: "#eff6ff", color: "#1d4ed8", borderRadius: "999px", fontSize: "12px", padding: "4px 8px", fontWeight: 700 },
  cardTitle: { margin: "10px 0 6px" },
  cardText: { margin: 0, lineHeight: 1.5 },
  split: { display: "grid", gap: "16px", marginTop: "26px" },
  paragraph: { lineHeight: 1.6 },
  list: { lineHeight: 1.8, paddingLeft: "20px" },
  metricPanel: { border: "1px solid", borderRadius: "14px", padding: "14px", display: "grid", gap: "8px", alignSelf: "start" },
  metricItem: { borderBottom: "1px solid", paddingBottom: "8px" },
  metricLabel: { fontSize: "12px" },
  metricValue: { fontWeight: 800 },
  updateGrid: { marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px" },
  updateCard: { border: "1px solid", borderRadius: "12px", padding: "12px" },
  newsletter: { marginTop: "26px", border: "1px solid", borderRadius: "14px", padding: "16px" },
  subscribeRow: { display: "flex", gap: "8px", maxWidth: "500px" },
  input: { flex: 1, border: "1px solid", borderRadius: "10px", padding: "10px 12px" },
  footer: { marginTop: "30px", paddingTop: "14px", borderTop: "1px solid", display: "flex", justifyContent: "space-between" },
};
