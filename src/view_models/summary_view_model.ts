import { Platform } from "react-native";
import { parseSummary, type Summary } from "../models/summary_wikipedia";

let cachedSummary: Summary | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 60_000;

export default async function getSummary(): Promise<Summary> {
  const now = Date.now();
  if (cachedSummary && now - cachedAt < CACHE_TTL_MS) {
    return cachedSummary;
  }

  const url = "https://en.wikipedia.org/api/rest_v1/page/random/summary";
  const clientName = `first-react-native/1.0 (${Platform.OS}; contact: avshon@gmail.com)`;
  const headers = {
    "User-Agent": clientName,
    "Api-User-Agent": clientName,
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Response status: ${response.status}. Body: ${errorBody}`);
  }

  const payload = await response.json();
  cachedSummary = parseSummary(payload);
  cachedAt = now;
  return cachedSummary;
}
