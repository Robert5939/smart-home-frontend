function RuntimeBar({ label, color, minutes, maxMinutes, icon }) {
  const pct = maxMinutes > 0 ? Math.min((minutes / maxMinutes) * 100, 100) : 0;

  return (
    <div>
      <div className="runtime-row">
        <div className="runtime-label">
          <span className="runtime-dot" style={{ background: color }} />
          <span>{icon} {label}</span>
        </div>
        <div className="runtime-value">{Math.round(minutes)} min</div>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function RuntimePanel({ latest }) {
  if (!latest) return null;

  const { runtimeLightMin = 0, runtimeTvMin = 0, runtimeFridgeMin = 0 } = latest;
  const maxMinutes = Math.max(runtimeLightMin, runtimeTvMin, runtimeFridgeMin, 1);

  return (
    <div className="runtime-card">
      <div className="card-label" style={{ marginBottom: 18 }}>Device Runtime (virtual minutes)</div>
      <RuntimeBar label="Light"  icon="💡" color="var(--chart-light)"  minutes={runtimeLightMin}  maxMinutes={maxMinutes} />
      <RuntimeBar label="TV"     icon="📺" color="var(--chart-tv)"     minutes={runtimeTvMin}     maxMinutes={maxMinutes} />
      <RuntimeBar label="Fridge" icon="❄️" color="var(--chart-fridge)" minutes={runtimeFridgeMin} maxMinutes={maxMinutes} />
    </div>
  );
}
