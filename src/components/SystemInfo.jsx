// Helper used across the file — formats timestamps in Skopje time
function toLocal(date) {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-GB", {
    timeZone: "Europe/Skopje",
    day:    "2-digit",
    month:  "short",
    hour:   "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function SystemInfo({ latest, lastFetch }) {
  if (!latest) return null;

  const cheap = latest.tariff <= 5;

  // Virtual time from ESP32 payload
  const pad   = (n) => (n != null && !isNaN(n)) ? String(n).padStart(2, "0") : "??";
  const vtime = (latest.virtualHour != null && latest.virtualMin != null)
    ? `${pad(latest.virtualHour)}:${pad(latest.virtualMin)}`
    : "—";

  // Real timestamp of this reading, shown in local time
  const readingTime = toLocal(latest.timestamp);
  const fetchTime   = toLocal(lastFetch);

  const items = [
    { key: "Virtual Time",   val: vtime,                              cls: "accent" },
    { key: "Reading Time",   val: readingTime,                        cls: ""       },
    { key: "Last Refresh",   val: fetchTime,                          cls: ""       },
    { key: "Tariff",         val: cheap ? "CHEAP" : "PEAK",           cls: cheap ? "green" : "accent" },
    { key: "Fast Mode",      val: latest.fastMode ? "ENABLED" : "DISABLED", cls: latest.fastMode ? "accent" : "" },
    { key: "WiFi",           val: latest.wifiConnected ? "CONNECTED" : "OFFLINE", cls: latest.wifiConnected ? "green" : "red" },
    { key: "Cloud",          val: "ONLINE",                           cls: "green"  },
    { key: "Fridge Health",  val: latest.fridgeOn ? "OK" : "FAULT",   cls: latest.fridgeOn ? "green" : "red" },
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