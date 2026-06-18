import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "../data";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-[#050505] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-orange-500 font-bold text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-orange-500" />
            02 / Projects
          </p>
          <h2
            className="text-white font-black mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "-0.02em" }}
          >
            Things I've <span className="text-orange-500">Built</span>
          </h2>
          <p className="text-zinc-600 font-light mb-16 max-w-lg">
            A mix of client work, team projects, and personal experiments — from SaaS platforms to trading tools.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              className="group border border-zinc-900 hover:border-orange-500/50 bg-zinc-950 overflow-hidden transition-all duration-300 flex flex-col shadow-lg shadow-transparent hover:shadow-orange-500/10"
            >
              {/* Thumbnail */}
              <div className="h-52 bg-zinc-900 relative overflow-hidden flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Overlay gradient - removed for all projects */}
                
                {/* Fallback title text - removed for all projects */}

                {/* Status */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 tracking-wider ${
                      project.status === "live"
                        ? "bg-green-500/15 text-green-400 border border-green-500/25"
                        : "bg-orange-500/15 text-orange-400 border border-orange-500/25"
                    }`}
                  >
                    {project.status === "live" ? "● LIVE" : "⟳ BUILDING"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-white font-black text-xl mb-2 group-hover:text-orange-300 transition-colors" style={{ letterSpacing: "-0.01em" }}>
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-5 font-light flex-1">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold text-orange-400/70 bg-orange-500/5 border border-orange-500/10 px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-orange-500 text-black font-bold text-xs tracking-widest uppercase hover:bg-orange-400 transition-colors"
                  >
                    View Live →
                  </a>
                  <a
                  href={project.codeUrl}
                  target={project.codeUrl === "#" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-zinc-800 text-zinc-400 font-bold text-xs tracking-widest uppercase hover:border-zinc-600 hover:text-white transition-all"
                >
                  {project.codeUrl === "#" ? "Private Repo" : "Source"}
                </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
