import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "../data";

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      custom={delay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={slideLeft}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { num: "4+", label: "Projects Shipped" },
  { num: "1+", label: "Years Coding" },
  { num: "3", label: "Active Clients" },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <Reveal>
          <p className="text-orange-500 font-bold text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-orange-500" />
            01 / About
          </p>
          <h2
            className="text-white font-black mb-16"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "-0.02em" }}
          >
            The Dev Behind <br />
            <span className="text-orange-500">the Code</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio - slides left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <p className="text-zinc-400 leading-relaxed font-light">
              I'm a Lagos-based fullstack developer who made the deliberate pivot from
              Animal & Environmental Biology (University of Benin, 2019 to 2023) into software
              engineering. I completed my fullstack programme at{" "}
              <span className="text-orange-400 font-semibold">Pluralcode Academy</span>{" "}
              (Aug 2025 to Feb 2026) and haven't looked back.
            </p>
            <p className="text-zinc-400 leading-relaxed font-light">
              I build end-to-end web applications, from React frontends crafted
              with pixel-level care to robust Node/Express/MongoDB backends with
              proper auth, file storage, and payment flows. I currently work across
              multiple client projects with the{" "}
              <span className="text-orange-400 font-semibold">Aaronic team</span>,
              handling both frontend and backend responsibilities.
            </p>
            <p className="text-zinc-400 leading-relaxed font-light">
              Outside of code, I run Fibonacci pullback strategies on MT5 and think
              about trading systems almost as much as software systems.
            </p>

            <div className="flex gap-3 pt-4">
              <a
                href="https://github.com/mbunabojohn-glitch"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-orange-500 text-black font-bold text-xs tracking-widest uppercase hover:bg-orange-400 transition-colors"
              >
                GitHub →
              </a>
              <a
                href="/MJ_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-zinc-700 text-zinc-300 font-bold text-xs tracking-widest uppercase hover:border-zinc-500 hover:text-white transition-all"
              >
                View CV
              </a>
              <a
                href="/MJ_CV.pdf"
                download
                className="px-5 py-2.5 border border-zinc-700 text-zinc-300 font-bold text-xs tracking-widest uppercase hover:border-zinc-500 hover:text-white transition-all"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Skills + Stats - slides right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-zinc-500 font-bold text-xs tracking-[0.3em] uppercase mb-5">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2 mb-10">
              {SKILLS.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.1, y: -3, borderColor: "rgba(249,115,22,0.7)" }}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-300 border border-zinc-800 bg-zinc-900/50 cursor-default transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map(({ num, label }) => (
                <div key={label} className="border border-zinc-800 bg-zinc-900/30 p-5 text-center">
                  <p
                    className="text-orange-500 font-black text-3xl mb-1"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {num}
                  </p>
                  <p className="text-zinc-600 text-xs font-medium leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
