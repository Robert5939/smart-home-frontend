function DeviceCard({ icon, name, isOn, isFault, runtime, energy }) {
  const statusClass = isFault ? "fault" : isOn ? "active" : "inactive";
  const iconClass   = isFault ? "red"   : isOn ? "green"  : "grey";
  const badge       = isFault ? "FAULT" : isOn  ? "ON"    : "OFF";
  const badgeClass  = isFault ? "badge-fault" : isOn ? "badge-on" : "badge-off";

  return (
    <div className={`device-card ${statusClass} fade-up`}>
      <div className="device-icon-row">
        <div className={`device-icon ${iconClass}`}>{icon}</div>
        <span className={`device-status-badge ${badgeClass}`}>{badge}</span>
      </div>
      <div>
        <div className="device-name">{name}</div>
        <div className="device-runtime">
          Runtime: {Math.round(runtime ?? 0)} min &nbsp;·&nbsp; {energy?.toFixed(3)} kWh
        </div>
      </div>
    </div>
  );
}

export default function StatusCards({ latest }) {
  if (!latest) return null;

  return (
    <div className="grid-3">
      <DeviceCard
        icon="💡"
        name="Light"
        isOn={latest.lightOn}
        isFault={false}
        runtime={latest.runtimeLightMin}
        energy={latest.energyLightKwh}
      />
      <DeviceCard
        icon="📺"
        name="Television"
        isOn={latest.tvOn}
        isFault={false}
        runtime={latest.runtimeTvMin}
        energy={latest.energyTvKwh}
      />
      <DeviceCard
        icon="❄️"
        name="Fridge"
        isOn={latest.fridgeOn}
        isFault={!latest.fridgeOn}
        runtime={latest.runtimeFridgeMin}
        energy={latest.energyFridgeKwh}
      />
    </div>
  );
}
