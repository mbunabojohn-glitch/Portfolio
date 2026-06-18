import { useState } from "react";
import { motion } from "framer-motion";
import { Player } from "../../types";

interface Props {
  scores: { x: number; o: number };
  onWin: (winner: "X" | "O") => void;
}

const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWinner(b: Player[]): Player | "draw" | null {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  if (b.every(Boolean)) return "draw";
  return null;
}

export default function TicTacToe({ scores, onWin }: Props) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [result, setResult] = useState<Player | "draw" | null>(null);

  const click = (i: number) => {
    if (board[i] || result) return;
    const next = [...board];
    next[i] = turn;
    const w = checkWinner(next);
    setBoard(next);
    setResult(w);
    if (w && w !== "draw") onWin(w);
    else if (!w) setTurn(turn === "X" ? "O" : "X");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setResult(null);
  };

  return (
    <div className="text-center">
      {/* Score board */}
      <div className="flex justify-center gap-8 mb-5">
        <div className="text-center">
          <p className="text-orange-500 font-black text-2xl">{scores.x}</p>
          <p className="text-zinc-600 text-xs font-bold tracking-widest">PLAYER X</p>
        </div>
        <div className="text-zinc-700 font-light text-2xl flex items-center">VS</div>
        <div className="text-center">
          <p className="text-blue-400 font-black text-2xl">{scores.o}</p>
          <p className="text-zinc-600 text-xs font-bold tracking-widest">PLAYER O</p>
        </div>
      </div>

      <p className="text-zinc-400 text-sm font-semibold mb-5">
        {result
          ? result === "draw"
            ? "🤝 It's a Draw!"
            : `🎉 Player ${result} Wins!`
          : `Player ${turn}'s turn`}
      </p>

      <div className="grid grid-cols-3 gap-2 w-52 mx-auto mb-5">
        {board.map((cell, i) => (
          <motion.button
            key={i}
            onClick={() => click(i)}
            whileHover={{ scale: cell ? 1 : 1.06 }}
            whileTap={{ scale: 0.94 }}
            className={`w-16 h-16 text-3xl font-black border-2 transition-all duration-150 ${
              cell === "X"
                ? "text-orange-500 border-orange-500/40 bg-orange-500/5"
                : cell === "O"
                ? "text-blue-400 border-blue-500/40 bg-blue-500/5"
                : "border-zinc-800 hover:border-zinc-600 bg-zinc-900"
            }`}
          >
            {cell}
          </motion.button>
        ))}
      </div>

      <button
        onClick={reset}
        className="text-xs font-bold text-orange-400 border border-orange-500/30 px-5 py-2 hover:bg-orange-500/10 tracking-widest uppercase transition-colors"
      >
        New Game
      </button>
    </div>
  );
}
