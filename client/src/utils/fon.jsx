// Shared helpers for Fake-or-Not

export const RESULTS_KEY_PREFIX = "fon_results_v1_"; // per-user namespace

export const dayKeyOf = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const formatTime = (ms) => {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const c = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(c).padStart(2, "0")}`;
};

const normalizeId = (id) =>
  String(id || "guest").trim().toLowerCase();
const keyForUser = (userId) =>
  RESULTS_KEY_PREFIX + encodeURIComponent(normalizeId(userId));

export function loadResults(userId) {
  try {
    return JSON.parse(localStorage.getItem(keyForUser(userId)) || "{}");
  } catch {
    return {};
  }
}

export function saveResult(userId, dayKey, record) {
  const key = keyForUser(userId);
  const cur = loadResults(userId);
  if (!cur[dayKey]) {
    cur[dayKey] = record; // one play per day per user
    localStorage.setItem(key, JSON.stringify(cur));
  }
  return cur;
}

export function calcCurrentStreak(results) {
  const today = new Date();
  let cursor = results[dayKeyOf(today)] ? today : new Date(today.getTime() - 86400000);
  if (!results[dayKeyOf(cursor)]) return 0;

  let s = 0;
  while (results[dayKeyOf(cursor)]) {
    s += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return s;
}

export function buildMonthGrid(year, month /* 0-11 */) {
  const first = new Date(year, month, 1);
  const start = first.getDay(); // 0=Sun
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array(42).fill(null);
  for (let i = 0; i < days; i++) cells[start + i] = new Date(year, month, i + 1);
  return cells;
}

function seededRng(dayKey) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < dayKey.length; i++) {
    h ^= dayKey.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return (h >>> 0) / 4294967296;
  };
}

export function getDailySet(dayKey, count, pool) {
  const rng = seededRng(dayKey);
  const indices = new Set();
  const n = pool.length;
  while (indices.size < Math.min(count, n)) {
    indices.add(Math.floor(rng() * n));
  }
  return [...indices].map((i) => pool[i]);
}

export function resultCorrectCount(res) {
  if (!res) return 0;
  if (typeof res.correctCount === "number") return res.correctCount;
  return res.correct ? 1 : 0;
}
export function resultTotal(res) {
  if (!res) return 0;
  return res.total || (typeof res.correct === "boolean" ? 1 : 0);
}
