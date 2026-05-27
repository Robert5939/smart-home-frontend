import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p) => (
        <div className="tooltip-row" key={p.dataKey}>
          <span className="tooltip-dot" style={{ background: p.fill }} />
          <span style={{ color: "var(--text-primary)" }}>
            {p.name}:{" "}
            {p.dataKey === "kwh"
              ? `${Number(p.value).toFixed(4)} kWh`
              : `${p.value}%`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TodayChart({ todayHourly }) {
  if (!todayHourly?.length) {
    return (
      <div className="chart-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
        <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
          No data for today yet
        </span>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-title">Today — Hourly Activity</div>
          <div className="chart-sub">kWh used + device on-time % per hour</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={todayHourly} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="hour"
            tick={{ fill: "#4a5568", fontSize: 10, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            interval={2}
          />
          <YAxis
            yAxisId="kwh"
            orientation="left"
            tick={{ fill: "#4a5568", fontSize: 10, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={false}
            width={52}
            tickFormatter={(v) => `${v.toFixed(3)}`}
          />
          <YAxis
            yAxisId="pct"
            orientation="right"
            tick={{ fill: "#4a5568", fontSize: 10, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={false}
            width={40}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Legend
            wrapperStyle={{ fontSize: "0.7rem", fontFamily: "JetBrains Mono", color: "#4a5568", paddingTop: 8 }}
          />
          <Bar yAxisId="kwh"  dataKey="kwh"     name="kWh used"   fill="var(--chart-energy)" fillOpacity={0.8} radius={[3,3,0,0]} maxBarSize={20} />
          <Bar yAxisId="pct"  dataKey="lightPct" name="Light on%"  fill="var(--chart-light)"  fillOpacity={0.5} radius={[3,3,0,0]} maxBarSize={20} />
          <Bar yAxisId="pct"  dataKey="tvPct"    name="TV on%"     fill="var(--chart-tv)"     fillOpacity={0.5} radius={[3,3,0,0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}