import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
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
            {p.name}: {Number(p.value).toFixed(3)} kWh
          </span>
        </div>
      ))}
    </div>
  );
}

export default function EnergyChart({ dailyStats }) {
  if (!dailyStats?.length) return null;

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-title">Daily Energy Consumption</div>
          <div className="chart-sub">kWh used per day · {dailyStats.length} days</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={dailyStats} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
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
            tickFormatter={(v) => `${v.toFixed(1)}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Legend
            wrapperStyle={{ fontSize: "0.7rem", fontFamily: "JetBrains Mono", color: "#4a5568", paddingTop: 8 }}
          />
          {/* Bars for daily usage — shows peaks and valleys clearly */}
          <Bar
            dataKey="dailyKwh"
            name="Daily kWh"
            fill="var(--chart-energy)"
            fillOpacity={0.7}
            radius={[3, 3, 0, 0]}
            maxBarSize={32}
          />
          {/* Line for trend */}
          <Line
            type="monotone"
            dataKey="dailyKwh"
            name="Trend"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={false}
            legendType="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}