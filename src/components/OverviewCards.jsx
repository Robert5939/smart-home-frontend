export default function OverviewCards({ latest, dailyStats }) {
  if (!latest) return null;

  // Get today's stats from dailyStats (last entry = today)
  const today = dailyStats?.length ? dailyStats[dailyStats.length - 1] : null;

  const cheap = latest.tariff <= 5;

  const cards = [
    {
      label: "Today's Energy",
      value: today ? today.dailyKwh.toFixed(3) : "—",
      unit:  "kWh today",
      colorClass: "accent",
    },
    {
      label: "Today's Cost",
      value: today ? today.dailyCost.toFixed(2) : "—",
      unit:  "den today",
      colorClass: "green",
    },
    {
      label: "Current Tariff",
      value: cheap ? "CHEAP" : "PEAK",
      unit:  `${latest.tariff} den/kWh`,
      colorClass: cheap ? "green" : "purple",
    },
    {
      label: "Simulation Mode",
      value: latest.fastMode ? "FAST" : "REAL",
      unit:  latest.fastMode ? "×60 acceleration" : "×1 real time",
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