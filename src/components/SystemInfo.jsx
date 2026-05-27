export default function SystemInfo({ latest, lastFetch }) {
  if (!latest) return null;

  const cheap = latest.tariff <= 5;
  const pad   = (n) => String(n).padStart(2, "0");
  const vtime = `${pad(latest.virtualHour)}:${pad(latest.virtualMin)}`;
  const fetchStr = lastFetch
    ? lastFetch.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "—";

  const items = [
    { key: "Virtual Time",    val: vtime,                     cls: "accent" },
    { key: "Tariff",          val: cheap ? "CHEAP" : "PEAK",  cls: cheap ? "green" : "accent" },
    { key: "Fast Mode",       val: latest.fastMode ? "ENABLED" : "DISABLED", cls: latest.fastMode ? "accent" : "" },
    { key: "Last Update",     val: fetchStr,                   cls: "" },
    { key: "WiFi Status",     val: "CONNECTED",               cls: "green" },   // placeholder
    { key: "Cloud Status",    val: "ONLINE",                  cls: "green" },   // placeholder
    { key: "Data Points",     val: "—",                       cls: "" },        // filled by parent if needed
    { key: "Fridge Health",   val: latest.fridgeOn ? "OK" : "FAULT", cls: latest.fridgeOn ? "green" : "red" },
  ];

  return (
    <div className="sysinfo-grid">
      {items.map((item) => (
        <div className="sysinfo-item" key={item.key}>
          <div className="sysinfo-key">{item.key}</div>
          <div className={`sysinfo-val ${item.cls}`}>{item.val}</div>
        </div>
      ))}
    </div>
  );
}
