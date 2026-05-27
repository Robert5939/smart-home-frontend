import axios from "axios";

const BASE_URL = "https://smart-home-backend-1-pozu.onrender.com/api";

export async function fetchReadings() {
  const res = await axios.get(`${BASE_URL}/readings`);
  if (!res.data.success) throw new Error("API returned success: false");
  
  return [...res.data.data].reverse();
}

export async function fetchDailyStats() {
  const res = await axios.get(`${BASE_URL}/readings/daily`);
  if (!res.data.success) throw new Error("Daily stats failed");
  return res.data.data;
}

export async function fetchTodayHourly() {
  const res = await axios.get(`${BASE_URL}/readings/today`);
  if (!res.data.success) throw new Error("Today hourly failed");
  return res.data.data;
}