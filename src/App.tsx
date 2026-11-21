import { ArrowUp } from "lucide-react";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { PROFILE } from "./data";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0c] font-sans text-white">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="relative border-t border-white/[0.07] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-white/35 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}. Спроектировано и написано с любовью к деталям.
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-white/30 hover:text-white active:scale-95"
          >
            Наверх
            <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
