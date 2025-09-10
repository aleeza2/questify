import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsername } from "../utils/auth";
import {
  dayKeyOf, loadResults, calcCurrentStreak,
  buildMonthGrid, formatTime, getDailySet,
  resultCorrectCount, resultTotal
} from "../utils/fon";
import { MEDIA_POOL } from "../data/fonPool";

const DAILY_COUNT = 5;

export default function FakeOrNot() {
  const navigate = useNavigate();

  const userId = getUsername(); // e.g., "bob@email.com"

  const dayKey = dayKeyOf();

  const [results, setResults] = useState(() => loadResults(userId));

  useEffect(() => {
    setResults(loadResults(userId));
  }, [userId]);

  const hasPlayedToday = !!results[dayKey];

  const todayRec = results[dayKey];
  const todayItems = useMemo(() => getDailySet(dayKey, DAILY_COUNT, MEDIA_POOL), [dayKey]);
  const totalForToday = todayItems.length;

  // calendar + streak
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const cells = useMemo(() => buildMonthGrid(calYear, calMonth), [calYear, calMonth]);
  const streak = useMemo(() => calcCurrentStreak(results), [results]);

  function prevMonth() {
    const d = new Date(calYear, calMonth, 1);
    d.setMonth(d.getMonth() - 1);
    setCalYear(d.getFullYear()); setCalMonth(d.getMonth());
  }
  function nextMonth() {
    const d = new Date(calYear, calMonth, 1);
    d.setMonth(d.getMonth() + 1);
    setCalYear(d.getFullYear()); setCalMonth(d.getMonth());
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen text-center px-6 py-12">
      <h1 className="text-5xl font-serif text-medievalRed mb-1">🤔 Fake or Not?</h1>
      <p className="text-lg text-medievalBrown mb-4">
        Daily Challenge • <span className="font-semibold">{dayKey}</span> • {totalForToday} items
      </p>

      <div className="mb-6">
        <span className="px-3 py-1 rounded-full bg-stone-200 text-stone-800">
          🔥 Current streak: <b>{streak}</b> day{streak === 1 ? "" : "s"}
        </span>
      </div>

      {!hasPlayedToday ? (
        <>
          <p className="text-medievalBrown mb-6">One try per day. Good luck!</p>
          <button
            onClick={() => navigate("/fake-or-not/play")}
            className="px-6 py-3 bg-medievalGold rounded-lg text-black font-bold hover:bg-medievalBrown hover:text-white transition"
          >
            Start Today’s Game
          </button>
        </>
      ) : (
        <div className="max-w-xl w-full">
          <p className="text-medievalBrown mb-4">You’ve already played today. Come back tomorrow!</p>
          <div className="rounded-xl ring-1 ring-stone-200 p-4 bg-stone-50 text-left">
            <p className="text-xl font-semibold text-medievalRed">
              Today’s Result
            </p>
            <p className="text-stone-700">
              Score: <b>{resultCorrectCount(todayRec)}</b>/<b>{resultTotal(todayRec) || totalForToday}</b> •{" "}
              Time: <span className="font-mono">{formatTime(todayRec?.ms || 0)}</span>
            </p>
          </div>
        </div>
      )}

      {/* Quest Log calendar */}
      <div className="w-full max-w-3xl mt-12">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-serif text-medievalRed">📅 Your Quest Log</h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="px-2 py-1 rounded bg-stone-200 hover:bg-stone-300">←</button>
            <div className="px-3 py-1 rounded bg-stone-100">
              {new Date(calYear, calMonth).toLocaleString(undefined, { month: "long", year: "numeric" })}
            </div>
            <button onClick={nextMonth} className="px-2 py-1 rounded bg-stone-200 hover:bg-stone-300">→</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-sm">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="text-stone-500">{d}</div>
          ))}
          {cells.map((date, i) => {
            if (!date) return <div key={i} className="h-12" />;
            const key = dayKeyOf(date);
            const rec = results[key];
            const played = !!rec;
            const inMonth = date.getMonth() === calMonth;
            const c = resultCorrectCount(rec);
            const t = resultTotal(rec) || DAILY_COUNT;
            return (
              <div
                key={i}
                className={`h-12 rounded-lg border p-2 flex items-start justify-between
                 ${inMonth ? "border-stone-200" : "border-transparent opacity-40"}
                 ${played ? "bg-green-600 text-white border-green-700" : "bg-stone-50"}
                `}
                title={played ? `Score ${c}/${t} • ${formatTime(rec.ms)}` : "Not played"}
              >
                <span className="text-xs">{date.getDate()}</span>
                {played && <span className="text-xs">{c}/{t}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
