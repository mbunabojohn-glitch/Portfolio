import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BUGS = ["🐛", "🐞", "🦗", "🦟", "🐜"];
const GOOD = ["✅", "🚀", "⭐", "💡", "🔥"];

interface Props {
  highScore: number;
  onScore: (score: number) => void;
}

interface Item {
  id: number;
  x: number;
  y: number;
  emoji: string;
  isBug: boolean;
}

export default function CatchBug({ highScore, onScore }: Props) {
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const nextId = useRef(0);
  const scoreRef = useRef(0);

  const spawn = useCallback(() => {
    const isBug = Math.random() > 0.35;
    const emoji = isBug
      ? BUGS[Math.floor(Math.random() * BUGS.length)]
      : GOOD[Math.floor(Math.random() * GOOD.length)];
    setItems((prev) => [
      ...prev.slice(-10),
      { id: nextId.current++, x: Math.random() * 78 + 2, y: Math.random() * 68 + 5, emoji, isBug },
    ]);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const spawnInterval = setInterval(spawn, 800);
    const ticker = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(spawnInterval);
          clearInterval(ticker);
          setPlaying(false);
          const s = scoreRef.current;
          setFinalScore(s);
          onScore(s);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { clearInterval(spawnInterval); clearInterval(ticker); };
  }, [playing, spawn, onScore]);

  const hit = (id: number, isBug: boolean) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (isBug) {
      const next = scoreRef.current + 1;
      scoreRef.current = next;
      setScore(next);
    } else {
      setMisses((m) => m + 1);
    }
  };

  const start = () => {
    setScore(0); scoreRef.current = 0;
    setMisses(0); setTimeLeft(20);
    setItems([]); setFinalScore(null); setPlaying(true);
  };

  return (
    <div className="text-center">
      {/* Header row */}
      <div className="flex justify-between items-center mb-3 px-1">
        <div>
          <p className="text-orange-500 font-black text-xl">{score}</p>
          <p className="text-zinc-700 text-xs font-bold">SCORE</p>
        </div>
        <div>
          <p className="text-white font-black text-xl">{timeLeft}s</p>
          <p className="text-zinc-700 text-xs font-bold">TIME</p>
        </div>
        <div>
          <p className="text-yellow-500 font-black text-xl">{highScore}</p>
          <p className="text-zinc-700 text-xs font-bold">BEST</p>
        </div>
        <div>
          <p className="text-red-400 font-black text-xl">{misses}</p>
          <p className="text-zinc-700 text-xs font-bold">MISS</p>
        </div>
      </div>

      {/* Game arena */}
      <div className="relative w-full h-52 bg-zinc-950 border border-zinc-800 overflow-hidden mb-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.button
              key={item.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => hit(item.id, item.isBug)}
              className="absolute text-2xl cursor-pointer hover:scale-125 transition-transform select-none"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              {item.emoji}
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Overlay when not playing */}
        {!playing && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-3">
            {finalScore !== null && (
              <div className="text-center mb-1">
                <p className="text-white font-black text-2xl">{finalScore}</p>
                {finalScore >= highScore && finalScore > 0 && (
                  <p className="text-yellow-400 text-xs font-bold tracking-widest">🏆 NEW HIGH SCORE!</p>
                )}
              </div>
            )}
            <button
              onClick={start}
              className="bg-orange-500 text-black font-bold text-xs px-7 py-3 hover:bg-orange-400 transition-colors tracking-widest uppercase"
            >
              {finalScore !== null ? "Play Again" : "Start Game"}
            </button>
            {finalScore === null && (
              <p className="text-zinc-600 text-xs font-medium">Tap bugs 🐛 · Avoid good stuff ✅</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
