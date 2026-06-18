import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Game } from "../types";
import { useScores } from "../hooks/useScores";
import TicTacToe from "./games/TicTacToe";
import CatchBug from "./games/CatchBug";
import SnakeGame from "./games/Snake";

const GAMES: { id: Game; title: string; desc: string; emoji: string }[] = [
  { id: "tictactoe", title: "Tic Tac Toe", desc: "Classic 2-player strategy game", emoji: "⭕" },
  { id: "catchbug", title: "Catch the Bug", desc: "Squash bugs, spare the good stuff", emoji: "🐛" },
  { id: "snake", title: "Snake", desc: "Arrow keys. Eat apples. Don't crash.", emoji: "🐍" },
];

export default function Games() {
  const [active, setActive] = useState<Game>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { scores, updateTicTacToe, updateCatchBug, updateSnake, resetScores } = useScores();

  return (
    <section id="games" className="py-32 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-16"
          >
          <p className="text-orange-500 font-bold text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-orange-500" />
            03 / Games
          </p>
          <h2
            className="text-white font-black mb-3"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "-0.02em" }}
          >
            Take a Break. <span className="text-orange-500">Play a Game.</span>
          </h2>
          <p className="text-zinc-600 font-light">Scores are saved in your browser. Can you beat the high score?</p>
        </motion.div>

        {/* Game selector cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {GAMES.map((g, i) => (
            <motion.button
              key={g.id}
              initial={{ opacity: 0, x: i % 3 === 0 ? -30 : i % 3 === 2 ? 30 : 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              onClick={() => setActive(active === g.id ? null : g.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`p-6 border text-left transition-all duration-200 ${
                active === g.id
                  ? "border-orange-500 bg-orange-500/5"
                  : "border-zinc-900 hover:border-zinc-700 bg-zinc-950"
              }`}
            >
              <span className="text-4xl mb-4 block">{g.emoji}</span>
              <h3 className="text-white font-black text-lg mb-1">{g.title}</h3>
              <p className="text-zinc-600 text-sm font-light mb-4">{g.desc}</p>

              {/* Mini score display */}
              <div className="flex items-center gap-2">
                <span className="text-zinc-700 text-xs font-bold tracking-wider">BEST:</span>
                {g.id === "tictactoe" && (
                  <span className="text-orange-400 text-xs font-bold">
                    X:{scores.tictactoe.x} · O:{scores.tictactoe.o}
                  </span>
                )}
                {g.id === "catchbug" && (
                  <span className="text-orange-400 text-xs font-bold">{scores.catchbug}</span>
                )}
                {g.id === "snake" && (
                  <span className="text-orange-400 text-xs font-bold">{scores.snake}</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Game canvas */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="border border-zinc-900 bg-zinc-950 p-8 max-w-xl mx-auto"
            >
              <h3 className="text-white font-black text-lg mb-6 text-center">
                {GAMES.find((g) => g.id === active)?.title}
              </h3>

              {active === "tictactoe" && (
                <TicTacToe scores={scores.tictactoe} onWin={updateTicTacToe} />
              )}
              {active === "catchbug" && (
                <CatchBug highScore={scores.catchbug} onScore={updateCatchBug} />
              )}
              {active === "snake" && (
                <SnakeGame highScore={scores.snake} onScore={updateSnake} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset scores */}
        <div className="text-center mt-8">
          <button
            onClick={resetScores}
            className="text-xs font-bold text-zinc-700 hover:text-zinc-500 tracking-widest uppercase transition-colors"
          >
            Reset All Scores
          </button>
        </div>
      </div>
    </section>
  );
}
