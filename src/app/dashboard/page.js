"use client";

import { useMemo, useState } from "react";

const seedTasks = [
  { id: 1, title: "Finalize A2A Escrow MVP scope", category: "Project", status: "In Progress", priority: "P1", owner: "Kite", due: "2026-02-20" },
  { id: 2, title: "Review token utility model", category: "Investment", status: "Todo", priority: "P1", owner: "Raf", due: "2026-02-21" },
  { id: 3, title: "ClawCity morning report", category: "Daily", status: "Done", priority: "P2", owner: "Kite", due: "2026-02-19" },
  { id: 4, title: "KYA certificate schema draft", category: "Project", status: "Todo", priority: "P1", owner: "Kite", due: "2026-02-22" },
  { id: 5, title: "Investor one-pager updates", category: "Investment", status: "Blocked", priority: "P2", owner: "Both", due: "2026-02-23" },
  { id: 6, title: "Inbox cleanup and labeling", category: "Daily", status: "In Progress", priority: "P3", owner: "Kite", due: "2026-02-19" },
];

const categories = ["All", "Daily", "Project", "Investment", "Waiting", "Done"];
const statuses = ["All", "Todo", "In Progress", "Blocked", "Done"];
const priorities = ["All", "P1", "P2", "P3"];

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

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

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Kite Ops Dashboard</h1>
        <p style={styles.subtitle}>Filter tasks by daily, project, investment, and execution status.</p>

        <section style={styles.kpis}>
          <Kpi label="Total" value={stats.total} />
          <Kpi label="Open" value={stats.open} />
          <Kpi label="Blocked" value={stats.blocked} />
          <Kpi label="Done" value={stats.done} />
        </section>

        <section style={styles.filters}>
          <input
            style={styles.search}
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Select value={category} setValue={setCategory} options={categories} />
          <Select value={status} setValue={setStatus} options={statuses} />
          <Select value={priority} setValue={setPriority} options={priorities} />
        </section>

        <section style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Task</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Owner</th>
                <th style={styles.th}>Due</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td style={styles.td}>{t.title}</td>
                  <td style={styles.td}>{t.category}</td>
                  <td style={styles.td}><Badge text={t.status} /></td>
                  <td style={styles.td}>{t.priority}</td>
                  <td style={styles.td}>{t.owner}</td>
                  <td style={styles.td}>{t.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p style={styles.empty}>No tasks match your filters.</p>}
        </section>
      </div>
    </main>
  );
}

function Select({ value, setValue, options }) {
  return (
    <select style={styles.select} value={value} onChange={(e) => setValue(e.target.value)}>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

function Badge({ text }) {
  const color = text === "Done" ? "#16a34a" : text === "Blocked" ? "#dc2626" : text === "In Progress" ? "#2563eb" : "#6b7280";
  return <span style={{ ...styles.badge, borderColor: color, color }}>{text}</span>;
}

function Kpi({ label, value }) {
  return (
    <div style={styles.kpiCard}>
      <div style={styles.kpiValue}>{value}</div>
      <div style={styles.kpiLabel}>{label}</div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "Inter, system-ui, sans-serif", padding: "24px" },
  container: { maxWidth: "1100px", margin: "0 auto" },
  title: { margin: 0, fontSize: "34px", fontWeight: 900 },
  subtitle: { marginTop: "8px", color: "#475569" },
  kpis: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "12px", marginTop: "20px" },
  kpiCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "14px" },
  kpiValue: { fontSize: "28px", fontWeight: 800 },
  kpiLabel: { color: "#64748b", fontSize: "13px" },
  filters: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "10px", marginTop: "18px" },
  search: { padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px" },
  select: { padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", background: "#fff" },
  tableWrap: { marginTop: "16px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: "12px", color: "#64748b", padding: "12px", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "12px", borderBottom: "1px solid #f1f5f9", fontSize: "14px" },
  badge: { fontSize: "12px", border: "1px solid", borderRadius: "999px", padding: "2px 8px", fontWeight: 600 },
  empty: { padding: "16px", color: "#64748b" },
};
