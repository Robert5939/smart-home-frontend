import { generateInsights } from "../services/insights";

const TYPE_META = {
  good:    { icon: "✅", label: "Optimal" },
  warning: { icon: "⚠️",  label: "Advisory" },
  info:    { icon: "ℹ️",  label: "Insight" },
  tip:     { icon: "💡", label: "Tip" },
};

export default function InsightsPanel({ latest, readings }) {
  const insights = generateInsights(latest, readings);

  if (!insights.length) {
    return (
      <div className="card" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
        No insights available yet. Collect more data.
      </div>
    );
  }

  return (
    <div className="insights-grid">
      {insights.map((ins, i) => {
        const meta = TYPE_META[ins.type] ?? TYPE_META.info;
        return (
          <div className={`insight-card ${ins.type} fade-up`} key={i}>
            <div className="insight-icon">{meta.icon}</div>
            <div>
              <div style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>
                {meta.label}
              </div>
              <div className="insight-text">{ins.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
