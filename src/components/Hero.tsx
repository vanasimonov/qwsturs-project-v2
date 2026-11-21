import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { PROFILE, STATS } from "../data";
import { Counter, EASE } from "./ui";

const LINE_1 = ["Создаю", "цифровые"];
const LINE_2 = ["продукты,"];
const LINE_3 = ["которые", "хочется", "трогать."];

function Word({ children, i, accent }: { children: string; i: number; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className={`inline-block ${accent ? "text-gradient-accent" : ""}`}
        initial={{ y: "110%", opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.35 + i * 0.09, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const glowX = useTransform(sx, (v) => v * 40);
  const glowY = useTransform(sy, (v) => v * 40);

  const onMove = (e: MouseEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  let idx = 0;

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-32 sm:px-8"
    >
      {/* background */}
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <motion.div style={{ x: glowX, y: glowY }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[130px]" />
        <div className="absolute left-[15%] top-[35%] h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-[110px]" />
        <div className="absolute right-[10%] top-[25%] h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[110px]" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0c] to-transparent" />

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Avatar & availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mb-8 flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-50 blur-md group-hover:opacity-80 transition duration-500" />
              <img
                src="/avatar.jpg"
                alt={PROFILE.name}
                className="relative h-16 w-16 rounded-full object-cover border border-white/20 shadow-2xl"
              />
            </div>
            <div className="glass hairline-top inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-[13px] text-white/75">
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="animate-ping-soft absolute h-2 w-2 rounded-full bg-emerald-400" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              </span>
              Открыт к новым проектам · с июня 2026
            </div>
          </motion.div>

          <h1 className="max-w-5xl text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <span className="text-gradient block">
              {LINE_1.map((w) => (
                <Word key={w} i={idx++}>
                  {w}
                </Word>
              ))}
            </span>
            <span className="block">
              {LINE_2.map((w) => (
                <Word key={w} i={idx++} accent>
                  {w}
                </Word>
              ))}
            </span>
            <span className="text-gradient block">
              {LINE_3.map((w) => (
                <Word key={w} i={idx++}>
                  {w}
                </Word>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          >
            Я — <span className="text-white/90">{PROFILE.name}</span>, full-stack разработчик и создатель автономных систем.
            {PROFILE.tagline}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
            className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition active:scale-95 sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Смотреть работы</span>
              <ArrowUpRight size={16} className="relative transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="glass flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white/90 transition hover:bg-white/10 active:scale-95 sm:w-auto"
            >
              Обсудить проект
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-6 flex items-center gap-2 text-xs text-white/35"
          >
            <MapPin size={12} />
            {PROFILE.city}
          </motion.div>
        </div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: EASE }}
          className="glass hairline-top mx-auto mt-16 grid max-w-3xl grid-cols-2 overflow-hidden rounded-3xl md:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-6 text-center ${i % 2 === 1 ? "border-l border-white/[0.07]" : ""} ${
                i > 1 ? "border-t border-white/[0.07] md:border-t-0" : ""
              } ${i > 0 ? "md:border-l md:border-white/[0.07]" : ""}`}
            >
              <div className="text-3xl font-semibold tracking-tight text-white">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-white/40">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollTo("projects")}
        aria-label="Прокрутить вниз"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/30 transition hover:text-white md:block"
      >
        <ArrowDownRight size={20} className="animate-[float_2.5s_ease-in-out_infinite]" />
      </motion.button>
    </section>
  );
}
