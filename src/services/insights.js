/**
 * Derives rule-based insights from the latest reading.
 * Returns an array of { text, type } objects where type is
 * "info" | "warning" | "good" | "tip"
 */
export function generateInsights(latest, readings) {
  if (!latest) return [];
  const insights = [];

  const { energyLightKwh, energyTvKwh, energyFridgeKwh, totalEnergyKwh,
          costDen, tariff, tvOn, lightOn, fridgeOn,
          runtimeTvMin, runtimeLightMin, runtimeFridgeMin,
          virtualHour, fastMode } = latest;

  // --- Tariff advice ---
  const cheap = tariff <= 5;
  if (cheap) {
    insights.push({ text: "Current tariff is CHEAP. Good time to run heavy appliances.", type: "good" });
  } else {
    insights.push({ text: "Peak tariff active. Consider deferring non-essential loads to 22:00–07:00.", type: "warning" });
  }

  // --- Dominant device ---
  const deviceEnergy = [
    { name: "Fridge", kwh: energyFridgeKwh },
    { name: "TV",     kwh: energyTvKwh     },
    { name: "Light",  kwh: energyLightKwh  },
  ].sort((a, b) => b.kwh - a.kwh);

  const top = deviceEnergy[0];
  if (totalEnergyKwh > 0) {
    const pct = ((top.kwh / totalEnergyKwh) * 100).toFixed(0);
    insights.push({ text: `${top.name} accounts for ${pct}% of total energy consumption.`, type: "info" });
  }

  // --- TV runtime warning ---
  if (tvOn && runtimeTvMin > 120) {
    insights.push({ text: `TV has been on for ${runtimeTvMin} virtual minutes. Consider switching off when not in use.`, type: "warning" });
  }

  // --- Light efficiency ---
  if (!lightOn && runtimeLightMin > 0) {
    insights.push({ text: "Light is currently off — motion-based auto-off is working correctly.", type: "good" });
  }

  // --- Cost projection ---
  const hoursElapsed = (runtimeFridgeMin && runtimeFridgeMin > 0) ? runtimeFridgeMin / 60 : null;
  if (hoursElapsed && costDen != null && !isNaN(costDen)) {
    const projectedDaily = (costDen / hoursElapsed) * 24;
    insights.push({
      text: `Projected daily cost at current rate: ${projectedDaily.toFixed(1)} den.`,
      type: projectedDaily > 100 ? "warning" : "info",
    });
  }

  // --- Fast mode note ---
  if (fastMode) {
    insights.push({ text: "Fast Mode (×60) is active. Energy values represent accelerated simulation time.", type: "tip" });
  }

  // --- Fridge health ---
  if (!fridgeOn) {
    insights.push({ text: "⚠ Fridge fault detected. Immediate attention required.", type: "warning" });
  }

  // --- Night hour cheap window ---
  if (virtualHour >= 22 || virtualHour < 7) {
    insights.push({ text: "Night-rate window active (22:00–07:00). Maximum savings available.", type: "good" });
  }

  return insights;
}