import { useState, useEffect, useCallback } from "react";
import { fetchReadings, fetchDailyStats, fetchTodayHourly } from "../services/api";

export function useReadings(pollIntervalMs = 15000) {
  const [readings,    setReadings]    = useState([]);
  const [dailyStats,  setDailyStats]  = useState([]);
  const [todayHourly, setTodayHourly] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [lastFetch,   setLastFetch]   = useState(null);

  const load = useCallback(async () => {
    try {
      const [raw, daily, today] = await Promise.all([
        fetchReadings(),
        fetchDailyStats(),
        fetchTodayHourly(),
      ]);
      setReadings(raw);
      setDailyStats(daily);
      setTodayHourly(today);
      setLastFetch(new Date());
      setError(null);
    } catch (e) {
      setError(e.message ?? "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, pollIntervalMs);
    return () => clearInterval(id);
  }, [load, pollIntervalMs]);

  const latest = readings.length ? readings[readings.length - 1] : null;

  return { readings, dailyStats, todayHourly, latest, loading, error, lastFetch };
}