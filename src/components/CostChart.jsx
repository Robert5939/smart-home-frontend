import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p) => (
        <div className="tooltip-row" key={p.dataKey}>
          <span className="tooltip-dot" style={{ background: p.color ?? p.fill }} />
          <span style={{ color: "var(--text-primary)" }}>
            {p.name}: {Number(p.value).toFixed(2)} den
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CostChart({ dailyStats }) {
  if (!dailyStats?.length) return null;

  // Colour each bar by tariff: green for cheap days, amber for expensive
  const data = dailyStats.map((d) => ({
    ...d,
    barColor: d.avgTariff <= 5 ? "var(--green)" : "var(--accent)",
  }));

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-title">Daily Cost History</div>
          <div className="chart-sub">
            Cost per day in Macedonian Denar ·
            <span style={{ color: "var(--green)",  marginLeft: 8 }}>■ cheap tariff</span>
            <span style={{ color: "var(--accent)", marginLeft: 8 }}>■ peak tariff</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={data} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#4a5568", fontSize: 10, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            interval={Math.floor(dailyStats.length / 8)}
          />
          <YAxis
            tick={{ fill: "#4a5568", fontSize: 10, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={false}
            width={48}
            tickFormatter={(v) => `${v.toFixed(0)}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar
            dataKey="dailyCost"
            name="Daily Cost"
            radius={[3, 3, 0, 0]}
            maxBarSize={32}
            // Use a custom fill per bar based on tariff
            fill="var(--chart-cost)"
            fillOpacity={0.75}
          />
          <Line
            type="monotone"
            dataKey="dailyCost"
            name="Trend"
            stroke="var(--blue)"
            strokeWidth={2}
            dot={false}
            legendType="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}