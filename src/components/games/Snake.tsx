import { useState, useEffect, useRef } from "react";
import { SnakeDir } from "../../types";

const COLS = 20;
const ROWS = 14;

interface Pos { x: number; y: number }

interface Props {
  highScore: number;
  onScore: (score: number) => void;
}

function randFood(snake: Pos[]): Pos {
  let f: Pos;
  do {
    f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((p) => p.x === f.x && p.y === f.y));
  return f;
}

const DELTA: Record<SnakeDir, Pos> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};
const OPP: Record<SnakeDir, SnakeDir> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };

export default function SnakeGame({ highScore, onScore }: Props) {
  const [snake, setSnake] = useState<Pos[]>([{ x: 10, y: 7 }, { x: 9, y: 7 }, { x: 8, y: 7 }]);
  const [food, setFood] = useState<Pos>({ x: 15, y: 7 });
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);
  const [newRecord, setNewRecord] = useState(false);
  const [cellSize, setCellSize] = useState(18);
  const containerRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef<SnakeDir>("RIGHT");
  const scoreRef = useRef(0);

  // Calculate cell size on resize
  useEffect(() => {
    const calculateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newCellSize = Math.floor(containerWidth / COLS);
        setCellSize(newCellSize);
      }
    };
    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, SnakeDir> = {
        ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
        w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
      };
      const d = map[e.key];
      if (!d || d === OPP[dirRef.current]) return;
      e.preventDefault();
      dirRef.current = d;
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Game loop
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setSnake((prev) => {
        const d = DELTA[dirRef.current];
        const head = { x: prev[0].x + d.x, y: prev[0].y + d.y };

        // Wall or self collision
        if (
          head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
          prev.some((p) => p.x === head.x && p.y === head.y)
        ) {
          const s = scoreRef.current;
          if (s > highScore) setNewRecord(true);
          onScore(s);
          setPlaying(false);
          setDead(true);
          return prev;
        }

        const ate = head.x === food.x && head.y === food.y;
        const next = [head, ...prev];
        if (!ate) next.pop();
        else {
          const ns = scoreRef.current + 1;
          scoreRef.current = ns;
          setScore(ns);
          setFood(randFood(next));
        }
        return next;
      });
    }, 120);
    return () => clearInterval(t);
  }, [playing, food, highScore, onScore]);

  const start = () => {
    const init: Pos[] = [{ x: 10, y: 7 }, { x: 9, y: 7 }, { x: 8, y: 7 }];
    setSnake(init);
    dirRef.current = "RIGHT";
    setFood(randFood(init));
    setScore(0); scoreRef.current = 0;
    setDead(false); setNewRecord(false);
    setPlaying(true);
  };

  const press = (d: SnakeDir) => {
    if (d !== OPP[dirRef.current]) dirRef.current = d;
  };

  return (
    <div className="text-center select-none">
      {/* Scores */}
      <div className="flex justify-between items-center mb-3 px-1">
        <div>
          <p className="text-orange-500 font-black text-xl">{score}</p>
          <p className="text-zinc-700 text-xs font-bold">SCORE</p>
        </div>
        <div>
          <p className="text-yellow-500 font-black text-xl">{Math.max(score, highScore)}</p>
          <p className="text-zinc-700 text-xs font-bold">BEST</p>
        </div>
        <p className="text-zinc-600 text-xs font-medium">Arrow keys / WASD</p>
      </div>

      {/* Board */}
      <div className="flex justify-center">
        <div
          ref={containerRef}
          className="relative border border-zinc-800 bg-zinc-950 overflow-hidden"
          style={{ 
            width: 'min(90vw, 400px)', 
            height: cellSize * ROWS
          }}
        >
          {/* Food */}
          <div
            className="absolute flex items-center justify-center"
            style={{ 
              width: cellSize, 
              height: cellSize, 
              left: food.x * cellSize, 
              top: food.y * cellSize,
              fontSize: `${Math.max(cellSize * 0.7, 12)}px`
            }}
          >
            🍎
          </div>

          {/* Snake segments */}
          {snake.map((seg, i) => (
            <div
              key={`${seg.x}-${seg.y}-${i}`}
              className={`absolute transition-none ${i === 0 ? "bg-orange-500" : "bg-orange-500/40"}`}
              style={{ 
                width: cellSize - 1, 
                height: cellSize - 1, 
                left: seg.x * cellSize, 
                top: seg.y * cellSize 
              }}
            />
          ))}

          {/* Overlay */}
          {!playing && (
            <div className="absolute inset-0 bg-black/92 flex flex-col items-center justify-center gap-3">
              {dead && (
                <div className="text-center">
                  <p className="text-red-400 font-black text-2xl mb-1">{score}</p>
                  {newRecord && (
                    <p className="text-yellow-400 text-xs font-bold tracking-widest mb-2">
                      🏆 NEW HIGH SCORE!
                    </p>
                  )}
                </div>
              )}
              <button
                onClick={start}
                className="bg-orange-500 text-black font-bold text-xs px-7 py-3 hover:bg-orange-400 tracking-widest uppercase transition-colors"
              >
                {dead ? "Try Again" : "Start Snake"}
              </button>
              {!dead && (
                <p className="text-zinc-600 text-xs">Eat 🍎 · Don't hit the walls</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile d-pad */}
      <div className="mt-4 inline-grid gap-1" style={{ gridTemplateColumns: "repeat(3, 2.5rem)", gridTemplateRows: "repeat(2, 2.5rem)" }}>
        <button
          onClick={() => press("UP")}
          className="col-start-2 row-start-1 border border-zinc-700 text-zinc-300 hover:border-orange-500/50 hover:text-orange-400 transition-colors flex items-center justify-center text-sm"
        >
          ↑
        </button>
        <button
          onClick={() => press("LEFT")}
          className="col-start-1 row-start-2 border border-zinc-700 text-zinc-300 hover:border-orange-500/50 hover:text-orange-400 transition-colors flex items-center justify-center text-sm"
        >
          ←
        </button>
        <button
          onClick={() => press("DOWN")}
          className="col-start-2 row-start-2 border border-zinc-700 text-zinc-300 hover:border-orange-500/50 hover:text-orange-400 transition-colors flex items-center justify-center text-sm"
        >
          ↓
        </button>
        <button
          onClick={() => press("RIGHT")}
          className="col-start-3 row-start-2 border border-zinc-700 text-zinc-300 hover:border-orange-500/50 hover:text-orange-400 transition-colors flex items-center justify-center text-sm"
        >
          →
        </button>
      </div>
    </div>
  );
}
