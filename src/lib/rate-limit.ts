const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;

const hits = new Map<string, number[]>();

/**
 * Allows MAX_REQUESTS per key per minute.
 * Memory lives only as long as one serverless instance, so this blunts bursts rather than
 * guaranteeing a global limit; move to a shared store if spam ever gets through.
 */
export function allowRequest(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return true;
}
