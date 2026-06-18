import { useState, useEffect } from "react";
import { Section } from "./types";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Games from "./components/Games";
import Contact from "./components/Contact";

function Footer() {
  return (
    <footer className="py-8 bg-black border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-white font-black text-xl">MJ</span>
          <span className="text-orange-500 font-black text-xl">.</span>
        </div>
        <p className="text-zinc-700 text-xs font-medium">
          Built with React 19 · TypeScript · Tailwind · Framer Motion
        </p>
        <p className="text-zinc-800 text-xs">
          © {new Date().getFullYear()} Mbunabo John Chukwuemeka
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("home");

  useEffect(() => {
    const el = document.getElementById(activeSection);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeSection]);

  // Sync active section on scroll
  useEffect(() => {
    const sections: Section[] = ["home", "about", "projects", "games", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((sec) => {
      const el = document.getElementById(sec);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sec); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden" style={{ fontFamily: "'Mulish', sans-serif" }}>
      <Nav active={activeSection} setActive={setActiveSection} />

      <main>
        <div id="home">
          <Hero setActive={setActiveSection} />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="games">
          <Games />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
