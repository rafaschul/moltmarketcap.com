export default function Home() {
  return (
    <main style={styles.page}>
      <header style={styles.nav}>
        <div style={styles.logo}>MoltMarketCap</div>
        <nav style={styles.navLinks}>
          <a href="#about" style={styles.link}>About</a>
          <a href="#access" style={styles.link}>Access</a>
          <a href="#updates" style={styles.link}>Updates</a>
          <a href="#contact" style={styles.cta}>Contact</a>
        </nav>
      </header>

      <section style={styles.hero}>
        <p style={styles.kicker}>On-Chain Capital Intelligence</p>
        <h1 style={styles.headline}>Institutional-grade Web3 access for the next market cycle.</h1>
        <p style={styles.subhead}>
          Inspired by modern venture and tokenization platforms: clear structure, trust-first design, and a practical bridge between traditional finance and digital assets.
        </p>
        <div style={styles.heroActions}>
          <a href="#access" style={styles.primaryBtn}>Get on Waitlist</a>
          <a href="#about" style={styles.secondaryBtn}>Learn More</a>
        </div>
      </section>

      <section id="access" style={styles.cardsRow}>
        <Card
          title="For Investors"
          text="Access curated on-chain opportunities via familiar structures. No heavy crypto-native setup required."
          tag="CeFi-friendly"
        />
        <Card
          title="For Protocols"
          text="Discover institutional integration pathways across European and global regulated environments."
          tag="Institutional"
        />
        <Card
          title="For Funds"
          text="Tokenization workflows for private market access, distribution, and transparent reporting."
          tag="Tokenization"
        />
      </section>

      <section id="about" style={styles.split}>
        <div>
          <h2 style={styles.sectionTitle}>Bridge builders between finance and on-chain markets</h2>
          <p style={styles.paragraph}>
            We focus on practical adoption: regulation-aware infrastructure, investor clarity, and long-term ecosystem alignment. The goal is simple — unlock new liquidity while preserving trust.
          </p>
          <ul style={styles.list}>
            <li>Tokenization strategy and rollout support</li>
            <li>Institutional market access playbooks</li>
            <li>Compliance-conscious product design</li>
          </ul>
        </div>
        <div style={styles.metricPanel}>
          <Metric label="Focus" value="RWA + Tokenization" />
          <Metric label="Regions" value="EU, UK, UAE, SG" />
          <Metric label="Model" value="On-chain + regulated rails" />
        </div>
      </section>

      <section id="updates" style={styles.updates}>
        <h2 style={styles.sectionTitle}>Recent Updates</h2>
        <div style={styles.updateGrid}>
          {[
            "European Banks & Stablecoins report overview",
            "Digital Asset Summit institutional insights",
            "Tokenization roadshow recap: Zurich + London",
            "Market commentary on compliant digital asset access",
          ].map((u) => (
            <article key={u} style={styles.updateCard}>{u}</article>
          ))}
        </div>
      </section>

      <section style={styles.newsletter}>
        <h3 style={{ margin: 0 }}>Get ecosystem updates</h3>
        <p style={{ margin: "8px 0 14px", color: "#475569" }}>Market, regulation, and product updates in one concise feed.</p>
        <div style={styles.subscribeRow}>
          <input placeholder="Email address" style={styles.input} />
          <button style={styles.primaryBtn}>Subscribe</button>
        </div>
      </section>

      <footer id="contact" style={styles.footer}>
        <div>MoltMarketCap • Berlin</div>
        <a href="https://github.com/rafaschul/moltmarketcap.com" style={styles.link}>GitHub</a>
      </footer>
    </main>
  );
}

function Card({ title, text, tag }) {
  return (
    <article style={styles.card}>
      <span style={styles.tag}>{tag}</span>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardText}>{text}</p>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div style={styles.metricItem}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricValue}>{value}</div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(180deg,#f8fbff 0%,#ffffff 60%)", color: "#0f172a", fontFamily: "Inter, system-ui, sans-serif", padding: "24px", maxWidth: "1150px", margin: "0 auto" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0 20px" },
  logo: { fontWeight: 900, fontSize: "22px", letterSpacing: "0.3px" },
  navLinks: { display: "flex", gap: "14px", alignItems: "center" },
  link: { textDecoration: "none", color: "#334155", fontWeight: 600 },
  cta: { textDecoration: "none", color: "#fff", background: "#0f172a", padding: "8px 14px", borderRadius: "10px", fontWeight: 700 },

  hero: { padding: "38px 0" },
  kicker: { margin: 0, color: "#2563eb", fontWeight: 800, letterSpacing: "0.3px" },
  headline: { margin: "10px 0", fontSize: "clamp(36px,6vw,64px)", lineHeight: 1.05, maxWidth: "900px" },
  subhead: { color: "#475569", fontSize: "18px", maxWidth: "780px", lineHeight: 1.55 },
  heroActions: { display: "flex", gap: "12px", marginTop: "20px" },
  primaryBtn: { border: "none", background: "#16a34a", color: "#fff", padding: "10px 16px", borderRadius: "10px", fontWeight: 800, textDecoration: "none", cursor: "pointer" },
  secondaryBtn: { border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a", padding: "10px 16px", borderRadius: "10px", fontWeight: 700, textDecoration: "none" },

  cardsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "12px", marginTop: "8px" },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "16px" },
  tag: { display: "inline-block", background: "#eff6ff", color: "#1d4ed8", borderRadius: "999px", fontSize: "12px", padding: "4px 8px", fontWeight: 700 },
  cardTitle: { margin: "10px 0 6px" },
  cardText: { margin: 0, color: "#475569", lineHeight: 1.5 },

  split: { display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px", marginTop: "26px" },
  sectionTitle: { margin: 0, fontSize: "30px" },
  paragraph: { color: "#475569", lineHeight: 1.6 },
  list: { color: "#334155", lineHeight: 1.8, paddingLeft: "20px" },
  metricPanel: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "14px", display: "grid", gap: "8px", alignSelf: "start" },
  metricItem: { borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" },
  metricLabel: { color: "#64748b", fontSize: "12px" },
  metricValue: { fontWeight: 800 },

  updates: { marginTop: "28px" },
  updateGrid: { marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px" },
  updateCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px", color: "#334155" },

  newsletter: { marginTop: "26px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "16px" },
  subscribeRow: { display: "flex", gap: "8px", maxWidth: "500px" },
  input: { flex: 1, border: "1px solid #cbd5e1", borderRadius: "10px", padding: "10px 12px" },

  footer: { marginTop: "30px", paddingTop: "14px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", color: "#64748b" },
};
