// src/utils/points.js
const LB_KEY = "questify_leaderboard";
const USER_POINTS_PREFIX = "questify_points:";
const AWARD_KEY_PREFIX = "questify_awarded:"; // prevent double-dipping per URL

function readLB() {
  try { return JSON.parse(localStorage.getItem(LB_KEY)) || []; }
  catch { return []; }
}
function writeLB(list) {
  localStorage.setItem(LB_KEY, JSON.stringify(list));
}
function upsertLB(username, points) {
  const lb = readLB();
  const i = lb.findIndex((r) => r.username === username);
  if (i >= 0) lb[i].points = points;
  else lb.push({ username, points });
  lb.sort((a, b) => b.points - a.points);
  writeLB(lb);
}

export function getPoints(username) {
  return parseInt(localStorage.getItem(USER_POINTS_PREFIX + username) || "0", 10);
}
export function setPoints(username, pts) {
  localStorage.setItem(USER_POINTS_PREFIX + username, String(pts));
  upsertLB(username, pts);
}
export function addPoints(username, delta) {
  const total = getPoints(username) + delta;
  setPoints(username, total);
  return total;
}
export function getLeaderboard(limit = 50) {
  const lb = readLB();
  lb.sort((a, b) => b.points - a.points);
  return lb.slice(0, limit);
}

export function hasBeenAwarded(username, url) {
  const key = `${AWARD_KEY_PREFIX}${username}:${url}`;
  return localStorage.getItem(key) === "1";
}
export function markAwarded(username, url) {
  const key = `${AWARD_KEY_PREFIX}${username}:${url}`;
  localStorage.setItem(key, "1");
}
