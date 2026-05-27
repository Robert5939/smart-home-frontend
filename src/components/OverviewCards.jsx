export default function OverviewCards({ latest }) {
  if (!latest) return null;

  const cheap = latest.tariff <= 5;

  const cards = [
    {
      label: "Total Energy",
      value: latest.totalEnergyKwh?.toFixed(3) ?? "—",
      unit: "kWh",
      colorClass: "accent",
    },
    {
      label: "Cumulative Cost",
      value: latest.costDen?.toFixed(2) ?? "—",
      unit: "den",
      colorClass: "green",
    },
    {
      label: "Current Tariff",
      value: cheap ? "CHEAP" : "PEAK",
      unit: `${latest.tariff} den/kWh`,
      colorClass: cheap ? "green" : "purple",
    },
    {
      label: "Simulation Mode",
      value: latest.fastMode ? "FAST" : "REAL",
      unit: latest.fastMode ? "×60 acceleration" : "×1 real time",
      colorClass: latest.fastMode ? "blue" : "",
    },
  ];

  return (
    <div className="grid-4">
      {cards.map((c) => (
        <div className="card fade-up" key={c.label}>
          <div className="card-label">{c.label}</div>
          <div className={`card-value ${c.colorClass}`}>{c.value}</div>
          <div className="card-unit">{c.unit}</div>
        </div>
      ))}
    </div>
  );
}
