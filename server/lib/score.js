// server/lib/score.js
import fs from "fs";
import path from "path";

const DB_FILE = path.resolve(process.cwd(), "data", "leaderboard.json");

function ensureFile() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify({ users: {}, updatedAt: new Date().toISOString() }, null, 2)
    );
  }
}

function readDB() {
  ensureFile();
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDB(db) {
  db.updatedAt = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export function addPoints(email, delta) {
  if (!email) return 0;
  const db = readDB();
  const key = email.toLowerCase();
  db.users[key] = (db.users[key] || 0) + (delta || 0);
  writeDB(db);
  return db.users[key];
}

export function getPoints(email) {
  const db = readDB();
  const key = email?.toLowerCase();
  return key ? (db.users[key] || 0) : 0;
}

export function top(n = 10) {
  const db = readDB();
  return Object.entries(db.users)
    .map(([email, points]) => ({ email, points }))
    .sort((a, b) => b.points - a.points)
    .slice(0, n);
}
