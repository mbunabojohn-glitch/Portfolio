import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../types";

const LINKS: Section[] = ["home", "about", "projects", "games", "contact"];

interface NavProps {
  active: Section;
  setActive: (s: Section) => void;
}

export default function Nav({ active, setActive }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-orange-500/15 shadow-xl shadow-black/50"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setActive("home")}
          className="flex items-center gap-1"
        >
          <span className="text-white font-black text-2xl tracking-tight">MJ</span>
          <span className="text-orange-500 font-black text-2xl">.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => setActive(link)}
                className={`relative text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-200 group ${
                  active === link ? "text-orange-500" : "text-zinc-400 hover:text-white"
                }`}
              >
                {link}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-orange-500 transition-all duration-300 ${
                    active === link ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => setActive("contact")}
          className="hidden md:block px-5 py-2 bg-orange-500 text-black text-xs font-bold tracking-widest uppercase hover:bg-orange-400 transition-colors"
        >
          Hire Me
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white flex flex-col gap-1.5 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 origin-center ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              mobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/98 backdrop-blur-xl border-t border-orange-500/10"
          >
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    setActive(link);
                    setMobileOpen(false);
                  }}
                  className={`text-left py-3 text-sm font-bold tracking-[0.2em] uppercase border-b border-zinc-900 transition-colors ${
                    active === link ? "text-orange-500" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => { setActive("contact"); setMobileOpen(false); }}
                className="mt-3 py-3 bg-orange-500 text-black text-xs font-bold tracking-widest uppercase"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
