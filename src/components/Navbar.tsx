import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, PROFILE } from "../data";
import { cn } from "../utils/cn";

export default function Navbar() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    const hero = document.getElementById("home");
    if (hero) {
      const heroObs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), {
        rootMargin: "-45% 0px -50% 0px",
      });
      heroObs.observe(hero);
      return () => {
        observer.disconnect();
        heroObs.disconnect();
      };
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), open ? 250 : 0);
  };

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-400 via-cyan-300 to-white"
      />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "glass hairline-top flex w-full max-w-3xl items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500",
            scrolled ? "bg-[#0a0a0c]/70 shadow-[0_8px_40px_rgba(0,0,0,0.5)]" : "bg-transparent"
          )}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          >
            <img
              src="/avatar.jpg"
              alt="Avatar"
              className="h-6 w-6 rounded-full object-cover border border-white/20"
            />
            <span className="hidden sm:inline">{PROFILE.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => go(n.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    active === n.id ? "text-white" : "text-white/55 hover:text-white"
                  )}
                >
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{n.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => go("contact")}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/85 active:scale-95"
            >
              Связаться
            </button>
            <button
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/80 transition hover:bg-white/10 md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0a0a0c]/90 px-6 pt-28 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/[0.07]"
                >
                  <button
                    onClick={() => go(n.id)}
                    className="flex w-full items-center justify-between py-5 text-3xl font-semibold tracking-tight text-white/90"
                  >
                    {n.label}
                    <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
