import { useState, useCallback } from "react";
import { GameScores } from "../types";

const STORAGE_KEY = "mj_portfolio_scores";

const defaultScores: GameScores = {
  tictactoe: { x: 0, o: 0 },
  catchbug: 0,
  snake: 0,
};

function loadScores(): GameScores {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultScores;
    return { ...defaultScores, ...JSON.parse(raw) };
  } catch {
    return defaultScores;
  }
}

function saveScores(scores: GameScores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // storage blocked — silently ignore
  }
}

export function useScores() {
  const [scores, setScores] = useState<GameScores>(loadScores);

  const updateTicTacToe = useCallback((winner: "X" | "O") => {
    setScores((prev) => {
      const next: GameScores = {
        ...prev,
        tictactoe: {
          x: prev.tictactoe.x + (winner === "X" ? 1 : 0),
          o: prev.tictactoe.o + (winner === "O" ? 1 : 0),
        },
      };
      saveScores(next);
      return next;
    });
  }, []);

  const updateCatchBug = useCallback((score: number) => {
    setScores((prev) => {
      if (score <= prev.catchbug) return prev;
      const next: GameScores = { ...prev, catchbug: score };
      saveScores(next);
      return next;
    });
  }, []);

  const updateSnake = useCallback((score: number) => {
    setScores((prev) => {
      if (score <= prev.snake) return prev;
      const next: GameScores = { ...prev, snake: score };
      saveScores(next);
      return next;
    });
  }, []);

  const resetScores = useCallback(() => {
    saveScores(defaultScores);
    setScores(defaultScores);
  }, []);

  return { scores, updateTicTacToe, updateCatchBug, updateSnake, resetScores };
}
