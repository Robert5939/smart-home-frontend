import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p) => (
        <div className="tooltip-row" key={p.dataKey}>
          <span className="tooltip-dot" style={{ background: p.fill }} />
          <span>{p.value?.toFixed(4)} kWh</span>
        </div>
      ))}
    </div>
  );
}

export default function DeviceBreakdown({ latest }) {
  if (!latest) return null;

  const data = [
    { name: "Light",  kwh: latest.energyLightKwh,  color: "var(--chart-light)"  },
    { name: "TV",     kwh: latest.energyTvKwh,     color: "var(--chart-tv)"     },
    { name: "Fridge", kwh: latest.energyFridgeKwh, color: "var(--chart-fridge)" },
  ];

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-title">Device Energy Breakdown</div>
          <div className="chart-sub">Cumulative kWh per device</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#8892a4", fontSize: 11, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: "#4a5568", fontSize: 10, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={false}
            width={50}
            tickFormatter={(v) => `${v.toFixed(2)}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="kwh" radius={[4, 4, 0, 0]} maxBarSize={56}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
