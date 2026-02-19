import { NextResponse } from "next/server";
import fs from "node:fs";

const BASE = "https://moltbook.com";

function dayKey(d) {
  return new Date(d).toISOString().slice(0, 10);
}

function shortDay(iso) {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

async function getJson(path, headers = {}) {
  const res = await fetch(`${BASE}${path}`, { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`${path} ${res.status}`);
  return res.json();
}

export async function GET() {
  try {
    let apiKey = process.env.MOLTBOOK_API_KEY || "";
    if (!apiKey) {
      const p = "/root/.openclaw/workspace/.secrets/moltbook-kitescout.json";
      if (fs.existsSync(p)) {
        apiKey = JSON.parse(fs.readFileSync(p, "utf8")).api_key || "";
      }
    }

    const [stats, recent, me, feed] = await Promise.all([
      getJson("/api/v1/stats"),
      getJson("/api/v1/agents/recent?limit=50"),
      apiKey ? getJson("/api/v1/agents/me", { Authorization: `Bearer ${apiKey}` }) : Promise.resolve({}),
      apiKey ? getJson("/api/v1/feed", { Authorization: `Bearer ${apiKey}` }) : Promise.resolve({ posts: [] }),
    ]);

    const days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - (6 - i));
      d.setUTCHours(0, 0, 0, 0);
      return d.toISOString().slice(0, 10);
    });

    const regByDay = Object.fromEntries(days.map((d) => [d, 0]));
    const karmaByDay = Object.fromEntries(days.map((d) => [d, 0]));
    for (const a of recent.agents || []) {
      const k = dayKey(a.created_at || a.createdAt || Date.now());
      if (k in regByDay) {
        regByDay[k] += 1;
        karmaByDay[k] += Number(a.karma || 0);
      }
    }

    const likesByDay = Object.fromEntries(days.map((d) => [d, 0]));
    for (const p of feed.posts || []) {
      const k = dayKey(p.created_at || Date.now());
      if (k in likesByDay) likesByDay[k] += Number(p.upvotes || 0);
    }

    const series = days.map((d) => ({
      day: shortDay(d),
      registered: regByDay[d],
      active: Math.round(Number(stats.activeAgents24h || 0) / 7),
      likes: likesByDay[d],
      karma: karmaByDay[d],
    }));

    const timeline = [
      { time: "Now", text: `Active agents (24h): ${stats.activeAgents24h || 0}` },
      { time: "Now", text: `New posts (24h): ${stats.newPosts24h || 0}` },
      { time: "Now", text: `New comments (24h): ${stats.newComments24h || 0}` },
      { time: "Now", text: `Your agent karma: ${me?.agent?.karma ?? 0}` },
      { time: "Now", text: `Recent agents sampled: ${(recent.agents || []).length}` },
    ];

    return NextResponse.json({
      ok: true,
      totals: {
        totalAgents: Number(stats.totalAgents || 0),
        activeAgents24h: Number(stats.activeAgents24h || 0),
        likesGenerated: (feed.posts || []).reduce((s, p) => s + Number(p.upvotes || 0), 0),
        karmaGenerated: (recent.agents || []).reduce((s, a) => s + Number(a.karma || 0), 0),
      },
      series,
      timeline,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
