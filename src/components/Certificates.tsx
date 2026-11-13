import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CERTIFICATES } from "../data";

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

export default function Certificates() {
  return (
    <section id="certificates" className="py-32 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Reveal>
          <p className="text-orange-500 font-bold text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-orange-500" />
            03 / Certificates
          </p>
          <h2
            className="text-white font-black mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "-0.02em" }}
          >
            Credentials I've <span className="text-orange-500">Earned</span>
          </h2>
          <p className="text-zinc-600 font-light mb-16 max-w-lg">
            Certifications and diplomas that validate my expertise in software development.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {CERTIFICATES.map((cert, i) => (
            <motion.article
              key={cert.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              className="group border border-zinc-900 hover:border-orange-500/50 bg-zinc-950 overflow-hidden transition-all duration-300 flex flex-col shadow-lg shadow-transparent hover:shadow-orange-500/10"
            >
              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <div className="text-orange-400/70 text-xs font-bold mb-2 tracking-widest uppercase">
                  {cert.provider}
                </div>
                <h3 className="text-white font-black text-xl mb-3 group-hover:text-orange-300 transition-colors" style={{ letterSpacing: "-0.01em" }}>
                  {cert.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-5 font-light flex-1">
                  {cert.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-zinc-600 text-xs font-medium">
                    Issued: <span className="text-zinc-400">{cert.issued}</span>
                  </div>
                </div>

                {/* View Certificate Button */}
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-orange-500 text-black font-bold text-xs tracking-widest uppercase hover:bg-orange-400 transition-colors text-center"
                >
                  View Certificate →
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
