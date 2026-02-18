"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const floatingOffset = Math.min(scrollY * 0.08, 26);

  return (
    <main style={styles.page}>
      <button
        style={{
          ...styles.subscribeBtn,
          transform: `translateY(${floatingOffset}px)`,
        }}
      >
        Subscribe
      </button>

      <div style={styles.heroGlow} />
      <div style={styles.skyline} />

      <section style={styles.centerWrap}>
        <h1 style={styles.title}>hello world</h1>
        <p style={styles.subtitle}>from Rafael</p>
      </section>

      <section style={styles.scrollSpace}>
        <p style={styles.hint}>Scroll to see the floating subscribe button movement.</p>
      </section>
    </main>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "200vh",
    overflow: "hidden",
    color: "#f5f7ff",
    fontFamily: "system-ui, sans-serif",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(74, 124, 255, 0.28), transparent 70%), radial-gradient(1000px 500px at 80% 20%, rgba(159, 61, 255, 0.22), transparent 70%), linear-gradient(180deg, #070a17 0%, #090f25 45%, #05070f 100%)",
  },
  subscribeBtn: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 20,
    border: "1px solid rgba(170, 190, 255, 0.45)",
    borderRadius: "999px",
    padding: "10px 18px",
    color: "#e9eeff",
    fontWeight: 700,
    letterSpacing: "0.2px",
    background: "linear-gradient(135deg, rgba(76, 112, 255, 0.75), rgba(168, 77, 255, 0.75))",
    boxShadow: "0 8px 26px rgba(60, 95, 255, 0.35)",
    backdropFilter: "blur(8px)",
    cursor: "pointer",
    transition: "transform 140ms ease-out",
  },
  heroGlow: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(82, 141, 255, 0.10) 0%, rgba(255,255,255,0.02) 40%, rgba(139,92,246,0.12) 100%)",
    pointerEvents: "none",
  },
  skyline: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "25vh",
    height: "32vh",
    opacity: 0.52,
    background:
      "linear-gradient(180deg, transparent 0%, rgba(9,12,30,0.2) 35%, rgba(7,9,20,0.88) 100%), polygon(0% 100%, 0% 68%, 8% 68%, 8% 48%, 14% 48%, 14% 64%, 21% 64%, 21% 36%, 26% 36%, 26% 70%, 33% 70%, 33% 42%, 38% 42%, 38% 62%, 45% 62%, 45% 30%, 50% 30%, 50% 68%, 58% 68%, 58% 44%, 63% 44%, 63% 60%, 70% 60%, 70% 40%, 74% 40%, 74% 66%, 82% 66%, 82% 46%, 88% 46%, 88% 70%, 100% 70%, 100% 100%)",
    clipPath:
      "polygon(0% 100%, 0% 68%, 8% 68%, 8% 48%, 14% 48%, 14% 64%, 21% 64%, 21% 36%, 26% 36%, 26% 70%, 33% 70%, 33% 42%, 38% 42%, 38% 62%, 45% 62%, 45% 30%, 50% 30%, 50% 68%, 58% 68%, 58% 44%, 63% 44%, 63% 60%, 70% 60%, 70% 40%, 74% 40%, 74% 66%, 82% 66%, 82% 46%, 88% 46%, 88% 70%, 100% 70%, 100% 100%)",
    boxShadow: "0 -20px 70px rgba(70, 100, 255, 0.18)",
    pointerEvents: "none",
  },
  centerWrap: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
    padding: "0 16px",
  },
  title: {
    margin: 0,
    fontSize: "clamp(40px, 7vw, 84px)",
    fontWeight: 800,
    textShadow: "0 0 30px rgba(120,160,255,0.35)",
  },
  subtitle: {
    marginTop: "10px",
    fontSize: "clamp(20px, 2.2vw, 30px)",
    color: "#cfd8ff",
    letterSpacing: "0.3px",
  },
  scrollSpace: {
    height: "100vh",
    display: "grid",
    placeItems: "center",
    position: "relative",
    zIndex: 2,
  },
  hint: {
    color: "rgba(216, 224, 255, 0.85)",
    fontSize: "14px",
  },
};
