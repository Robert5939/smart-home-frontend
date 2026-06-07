import { useReadings }    from "../hooks/useReadings";
import OverviewCards      from "../components/OverviewCards";
import StatusCards        from "../components/StatusCards";
import EnergyChart        from "../components/EnergyChart";
import CostChart          from "../components/CostChart";
import TodayChart         from "../components/TodayChart";
import DeviceBreakdown    from "../components/DeviceBreakdown";
import RuntimePanel       from "../components/RuntimePanel";
import SystemInfo         from "../components/SystemInfo";
import InsightsPanel      from "../components/InsightsPanel";

function SectionHeader({ title }) {
  return (
    <div className="section-header">
      <span className="section-title">{title}</span>
      <div className="section-line" />
    </div>
  );
}

export default function Dashboard() {
  const { readings, dailyStats, todayHourly, latest, loading, error, lastFetch } = useReadings(15000);

  if (loading) {
    return (
      <div className="state-center">
        <div className="spinner" />
        <div className="state-label">Connecting to API</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-shell" style={{ paddingTop: 40 }}>
        <div className="error-box">
          <div style={{ marginBottom: 6, fontWeight: 600 }}>Connection Error</div>
          {error}
          <div style={{ marginTop: 8, color: "var(--text-muted)" }}>
            Make sure the Node.js backend is running on http://localhost:3000
          </div>
        </div>
      </div>
    );
  }

  if (!latest) {
    return (
      <div className="state-center">
        <div style={{ fontSize: "2rem" }}>📡</div>
        <div className="state-label">No data yet</div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          Waiting for ESP32 to send its first reading
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">

      {/* ── TOP BAR ── */}
      <header className="topbar">
        <div className="topbar-brand">
          <div className="topbar-icon">⚡</div>
          <div>
            <div className="topbar-title">Smart Home EMS</div>
            <div className="topbar-subtitle">Energy Management System · ESP32</div>
          </div>
        </div>
        <div className="topbar-right">
          <div className="topbar-badge">
            <span className="dot" />
            Live · 15s refresh
          </div>
          <div className="topbar-badge">
            {dailyStats.length} days · {readings.length} readings
          </div>
        </div>
      </header>

      {/* 01 · OVERVIEW — shows TODAY's values */}
      <section className="section">
        <SectionHeader title="01 · Today's Overview" />
        <OverviewCards latest={latest} dailyStats={dailyStats} />
      </section>

      {/* 02 · DEVICE STATUS */}
      <section className="section">
        <SectionHeader title="02 · Device Status" />
        <StatusCards latest={latest} />
      </section>

      {/* 03 · TODAY HOURLY */}
      <section className="section">
        <SectionHeader title="03 · Today's Hourly Activity" />
        <TodayChart todayHourly={todayHourly} />
      </section>

      {/* 04 · 30-DAY ENERGY */}
      <section className="section">
        <SectionHeader title="04 · Daily Energy Consumption — 60 Days" />
        <EnergyChart dailyStats={dailyStats} />
      </section>

      {/* 05 · 30-DAY COST */}
      <section className="section">
        <SectionHeader title="05 · Daily Cost History — 60 Days" />
        <CostChart dailyStats={dailyStats} />
      </section>

      {/* 06 · BREAKDOWN + RUNTIME */}
      <section className="section">
        <SectionHeader title="06 · Device Breakdown" />
        <div className="grid-2">
          <DeviceBreakdown latest={latest} />
          <RuntimePanel latest={latest} />
        </div>
      </section>

      {/* 07 · SYSTEM INFO */}
      <section className="section">
        <SectionHeader title="07 · System Information" />
        <SystemInfo latest={latest} lastFetch={lastFetch} />
      </section>

      {/* 08 · AI INSIGHTS */}
      <section className="section">
        <SectionHeader title="08 · AI Insights" />
        <InsightsPanel latest={latest} readings={readings} />
      </section>

    </div>
  );
}