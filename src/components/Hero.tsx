import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Section } from "../types";

const ROLES = [
  "I build fullstack apps",
  "I write clean APIs",
  "I ship real products",
  "I debug at 2am too",
];

interface HeroProps {
  setActive: (s: Section) => void;
}

export default function Hero({ setActive }: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 140]);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Orange glow blobs */}
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-orange-600/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 w-full pt-28 pb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* ── Photo / Avatar ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center items-center order-first md:order-last mb-6 md:mb-0"
          >
            <div className="relative">
              {/* Decorative frames */}
              <div className="absolute -inset-4 border border-orange-500/20" />
              <div className="absolute -inset-8 border border-orange-500/8" />

              {/* Photo box */}
              <div className="w-52 h-64 md:w-80 md:h-[420px] bg-zinc-950 border border-zinc-800 overflow-hidden relative">
                <img
                  src="/me.png"
                  alt="Mbunabo John Chukwuemeka"
                  className="w-full h-full object-cover object-top"
                />
                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
              </div>

              {/* Floating Lagos badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -bottom-5 -right-5 bg-black border border-orange-500/30 px-4 py-2.5 shadow-xl"
              >
                <p className="text-orange-400 font-bold text-xs tracking-wider">🇳🇬 Lagos, Nigeria</p>
              </motion.div>

              {/* Available dot */}
              <div className="absolute -top-3 -left-3 bg-black border border-orange-500/30 px-3 py-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                <span className="text-zinc-400 text-xs font-bold">Available</span>
              </div>
            </div>
          </motion.div>
          
          {/* ── Text ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-orange-500 font-bold text-xs tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
            >
              <span className="inline-block w-8 h-px bg-orange-500" />
              Hello, world
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-black leading-none mb-2"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", letterSpacing: "-0.02em" }}
            >
              Mbunabo
              <br />
              <span className="text-orange-500">John</span>
            </motion.h1>

            {/* Animated role subtitle */}
            <div className="h-10 overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={roleIdx}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-zinc-300 text-xl font-semibold"
                >
                  {ROLES[roleIdx]}
                </motion.h2>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-500 text-base leading-relaxed mb-10 max-w-md font-light"
            >
              I spent a year going all-in on software, quit biology, joined a bootcamp, shipped real products for real clients. React on the front, Node on the back, MongoDB in the middle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => setActive("projects")}
                className="px-6 py-3.5 bg-orange-500 text-black font-bold text-xs tracking-[0.2em] uppercase hover:bg-orange-400 transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                View Work
                <span className="text-base">→</span>
              </button>
              <button
                onClick={() => setActive("contact")}
                className="px-6 py-3.5 border border-orange-500/40 text-orange-400 font-bold text-xs tracking-[0.2em] uppercase hover:border-orange-500 hover:bg-orange-500/5 transition-all duration-200 w-full sm:w-auto"
              >
                Hire Me
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-zinc-700 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-orange-500 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
