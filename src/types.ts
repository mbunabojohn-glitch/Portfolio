export type Section = "home" | "about" | "projects" | "certificates" | "games" | "contact";
export type Game = "tictactoe" | "catchbug" | "snake" | null;
export type Player = "X" | "O" | null;
export type SnakeDir = "UP" | "DOWN" | "LEFT" | "RIGHT";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  codeUrl: string;
  image: string;
  status: "live" | "building";
}

export interface Certificate {
  title: string;
  provider: string;
  issued: string;
  description: string;
  file: string;
}

export interface GameScores {
  tictactoe: { x: number; o: number };
  catchbug: number;
  snake: number;
}
