"use client";

import { useEffect, useMemo, useState } from "react";

const seedTasks = [
  { id: 1, title: "Finalize A2A Escrow MVP scope", category: "Project", status: "In Progress", priority: "P1", owner: "Kite", due: "2026-02-20" },
  { id: 2, title: "Review token utility model", category: "Investment", status: "Todo", priority: "P1", owner: "Raf", due: "2026-02-21" },
  { id: 3, title: "ClawCity morning report", category: "Daily", status: "Done", priority: "P2", owner: "Kite", due: "2026-02-19" },
  { id: 4, title: "KYA certificate schema draft", category: "Project", status: "Todo", priority: "P1", owner: "Kite", due: "2026-02-22" },
  { id: 5, title: "Investor one-pager updates", category: "Investment", status: "Blocked", priority: "P2", owner: "Both", due: "2026-02-23" },
  { id: 6, title: "Inbox cleanup and labeling", category: "Daily", status: "In Progress", priority: "P3", owner: "Kite", due: "2026-02-19" },
];

const fallbackUsageSeries = [
  { day: "Mon", registered: 0, active: 0, likes: 0, karma: 0 },
  { day: "Tue", registered: 0, active: 0, likes: 0, karma: 0 },
  { day: "Wed", registered: 0, active: 0, likes: 0, karma: 0 },
  { day: "Thu", registered: 0, active: 0, likes: 0, karma: 0 },
  { day: "Fri", registered: 0, active: 0, likes: 0, karma: 0 },
  { day: "Sat", registered: 0, active: 0, likes: 0, karma: 0 },
  { day: "Sun", registered: 0, active: 0, likes: 0, karma: 0 },
];

const categories = ["All", "Daily", "Project", "Investment", "Waiting", "Done"];
const statuses = ["All", "Todo", "In Progress", "Blocked", "Done"];
const priorities = ["All", "P1", "P2", "P3"];

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [usage, setUsage] = useState({
    totals: { totalAgents: 0, activeAgents24h: 0, likesGenerated: 0, karmaGenerated: 0 },
    series: fallbackUsageSeries,
    timeline: [],
  });

  useEffect(() => {
    fetch("/api/moltbook-metrics", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setUsage(d);
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return seedTasks.filter((t) => {
      const byQuery = t.title.toLowerCase().includes(query.toLowerCase());
      const byCategory = category === "All" || t.category === category || (category === "Done" && t.status === "Done");
      const byStatus = status === "All" || t.status === status;
      const byPriority = priority === "All" || t.priority === priority;
      return byQuery && byCategory && byStatus && byPriority;
    });
  }, [query, category, status, priority]);

  const stats = {
    total: seedTasks.length,
    open: seedTasks.filter((t) => t.status !== "Done").length,
    blocked: seedTasks.filter((t) => t.status === "Blocked").length,
    done: seedTasks.filter((t) => t.status === "Done").length,
  };

  const maxActive = Math.max(...usage.series.map((d) => d.active), 1);
  const maxLikes = Math.max(...usage.series.map((d) => d.likes), 1);
  const maxKarma = Math.max(...usage.series.map((d) => d.karma), 1);

  return (
    <main style={styles.page}><div style={styles.container}>
      <h1 style={styles.title}>Kite Ops Dashboard</h1>
      <p style={styles.subtitle}>Filter tasks by daily, project, investment, and execution status.</p>

      <section style={styles.kpis}><Kpi label="Total" value={stats.total} /><Kpi label="Open" value={stats.open} /><Kpi label="Blocked" value={stats.blocked} /><Kpi label="Done" value={stats.done} /></section>

      <section style={styles.filters}>
        <input style={styles.search} placeholder="Search tasks..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <Select value={category} setValue={setCategory} options={categories} />
        <Select value={status} setValue={setStatus} options={statuses} />
        <Select value={priority} setValue={setPriority} options={priorities} />
      </section>

      <section style={styles.tableWrap}><table style={styles.table}><thead><tr><th style={styles.th}>Task</th><th style={styles.th}>Category</th><th style={styles.th}>Status</th><th style={styles.th}>Priority</th><th style={styles.th}>Owner</th><th style={styles.th}>Due</th></tr></thead><tbody>
        {filtered.map((t) => <tr key={t.id}><td style={styles.td}>{t.title}</td><td style={styles.td}>{t.category}</td><td style={styles.td}><Badge text={t.status} /></td><td style={styles.td}>{t.priority}</td><td style={styles.td}>{t.owner}</td><td style={styles.td}>{t.due}</td></tr>)}
      </tbody></table>{filtered.length === 0 && <p style={styles.empty}>No tasks match your filters.</p>}</section>

      <section style={styles.monitorWrap}>
        <div style={styles.monitorHeader}><h2 style={styles.monitorTitle}>Moltbook Agent Usage Monitor</h2><p style={styles.monitorSub}>Live API data in separated green section.</p></div>
        <div style={styles.monitorKpis}>
          <GreenKpi label="Agents Registered (total)" value={usage.totals.totalAgents} />
          <GreenKpi label="Active Agents (24h)" value={usage.totals.activeAgents24h} />
          <GreenKpi label="Likes (feed sample)" value={usage.totals.likesGenerated} />
          <GreenKpi label="Karma (recent sample)" value={usage.totals.karmaGenerated} />
        </div>

        <div style={styles.graphGrid}>
          <GraphCard title="Recent Registrations (sample)">{usage.series.map((d) => <Bar key={`a-${d.day}`} day={d.day} h={(d.registered / Math.max(...usage.series.map((x) => x.registered), 1)) * 100} kind="bar" />)}</GraphCard>
          <GraphCard title="Likes Timeline">{usage.series.map((d) => <Bar key={`l-${d.day}`} day={d.day} h={(d.likes / maxLikes) * 100} kind="soft" />)}</GraphCard>
          <GraphCard title="Karma Timeline">{usage.series.map((d) => <Bar key={`k-${d.day}`} day={d.day} h={(d.karma / maxKarma) * 100} kind="dark" />)}</GraphCard>
        </div>

        <div style={styles.timelineCard}><h3 style={styles.graphTitle}>Live Timeline</h3><div style={styles.timelineList}>{usage.timeline.map((item, i) => <div key={`${item.time}-${i}`} style={styles.timelineRow}><span style={styles.timelineTime}>{item.time}</span><span style={styles.timelineText}>{item.text}</span></div>)}</div></div>
      </section>
    </div></main>
  );
}

function GraphCard({ title, children }) { return <div style={styles.graphCard}><h3 style={styles.graphTitle}>{title}</h3><div style={styles.bars}>{children}</div></div>; }
function Bar({ day, h, kind }) { const style = kind === "soft" ? styles.barSoft : kind === "dark" ? styles.barDark : styles.bar; return <div style={styles.barCol}><div style={{ ...style, height: `${h}%` }} /><span style={styles.barLabel}>{day}</span></div>; }
function Select({ value, setValue, options }) { return <select style={styles.select} value={value} onChange={(e) => setValue(e.target.value)}>{options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}</select>; }
function Badge({ text }) { const color = text === "Done" ? "#16a34a" : text === "Blocked" ? "#dc2626" : text === "In Progress" ? "#2563eb" : "#6b7280"; return <span style={{ ...styles.badge, borderColor: color, color }}>{text}</span>; }
function Kpi({ label, value }) { return <div style={styles.kpiCard}><div style={styles.kpiValue}>{value}</div><div style={styles.kpiLabel}>{label}</div></div>; }
function GreenKpi({ label, value }) { return <div style={styles.greenKpiCard}><div style={styles.greenKpiValue}>{value}</div><div style={styles.greenKpiLabel}>{label}</div></div>; }

const styles = {
  page: { minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "Inter, system-ui, sans-serif", padding: "24px" }, container: { maxWidth: "1100px", margin: "0 auto" }, title: { margin: 0, fontSize: "34px", fontWeight: 900 }, subtitle: { marginTop: "8px", color: "#475569" },
  kpis: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "12px", marginTop: "20px" }, kpiCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "14px" }, kpiValue: { fontSize: "28px", fontWeight: 800 }, kpiLabel: { color: "#64748b", fontSize: "13px" },
  filters: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "10px", marginTop: "18px" }, search: { padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px" }, select: { padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", background: "#fff" },
  tableWrap: { marginTop: "16px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden" }, table: { width: "100%", borderCollapse: "collapse" }, th: { textAlign: "left", fontSize: "12px", color: "#64748b", padding: "12px", borderBottom: "1px solid #e2e8f0" }, td: { padding: "12px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" }, badge: { fontSize: "12px", border: "1px solid", borderRadius: "999px", padding: "2px 8px", fontWeight: 600 }, empty: { padding: "16px", color: "#64748b" },
  monitorWrap: { marginTop: "24px", padding: "18px", borderRadius: "16px", border: "1px solid #bbf7d0", background: "linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)" }, monitorHeader: { marginBottom: "12px" }, monitorTitle: { margin: 0, color: "#166534", fontSize: "24px", fontWeight: 900 }, monitorSub: { margin: "6px 0 0", color: "#166534" },
  monitorKpis: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "10px", marginBottom: "14px" }, greenKpiCard: { background: "#fff", border: "1px solid #86efac", borderRadius: "12px", padding: "12px" }, greenKpiValue: { fontSize: "26px", fontWeight: 900, color: "#166534" }, greenKpiLabel: { fontSize: "12px", color: "#166534" },
  graphGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px" }, graphCard: { background: "#fff", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "12px" }, graphTitle: { margin: "0 0 10px", fontSize: "14px", color: "#166534" },
  bars: { height: "140px", display: "grid", gridTemplateColumns: "repeat(7,1fr)", alignItems: "end", gap: "8px" }, barCol: { display: "grid", justifyItems: "center", alignItems: "end", gap: "6px" }, bar: { width: "20px", borderRadius: "8px 8px 3px 3px", background: "#22c55e" }, barSoft: { width: "20px", borderRadius: "8px 8px 3px 3px", background: "#4ade80" }, barDark: { width: "20px", borderRadius: "8px 8px 3px 3px", background: "#16a34a" }, barLabel: { fontSize: "11px", color: "#166534" },
  timelineCard: { marginTop: "12px", background: "#fff", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "12px" }, timelineList: { display: "grid", gap: "8px" }, timelineRow: { display: "grid", gridTemplateColumns: "60px 1fr", gap: "10px", alignItems: "start" }, timelineTime: { fontWeight: 800, color: "#166534", fontSize: "12px" }, timelineText: { color: "#14532d", fontSize: "13px" },
};
