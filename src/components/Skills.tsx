import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SKILLS, SKILL_FILTERS, type Skill } from "../data";
import { cn } from "../utils/cn";
import { EASE, Reveal, SectionHeader, useSpotlight } from "./ui";

function Tile({ s, index, selected, onSelect }: { s: Skill; index: number; selected: boolean; onSelect: () => void }) {
  const onMove = useSpotlight();
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ duration: 0.45, delay: index * 0.025, ease: EASE, layout: { duration: 0.45, ease: EASE } }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={onMove}
      onClick={onSelect}
      onFocus={onSelect}
      aria-pressed={selected}
      className={cn(
        "spotlight group glass hairline-top relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl p-4 text-left transition-all duration-500 hover:-translate-y-1 sm:p-5",
        selected && "border-white/30 bg-white/[0.07]"
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: s.color }}
      />
      <div className="relative z-[2] flex items-start justify-between">
        <span
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-base font-semibold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
          style={{ color: s.color }}
        >
          {s.glyph}
        </span>
        <span className="font-mono text-[11px] text-white/35">{s.level}%</span>
      </div>
      <div className="relative z-[2]">
        <div className="text-sm font-medium text-white sm:text-[15px]">{s.name}</div>
        <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${s.color}88, ${s.color})` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${s.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + index * 0.03, ease: EASE }}
          />
        </div>
      </div>
    </motion.button>
  );
}

export default function Skills() {
  const [filter, setFilter] = useState<(typeof SKILL_FILTERS)[number]>("Все");
  const [selected, setSelected] = useState<Skill>(SKILLS[0]);
  const list = filter === "Все" ? SKILLS : SKILLS.filter((s) => s.category === filter);
  const marquee = [...SKILLS, ...SKILLS];

  return (
    <section id="skills" className="relative scroll-mt-12 px-5 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.06] blur-[130px]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="02 — Технологический стек"
          title={
            <>
              Инструменты,
              <br />
              которыми я владею
            </>
          }
          subtitle="Нажмите на навык, чтобы увидеть подробности. Фильтруйте по направлениям."
        />

        <Reveal className="mb-8">
          <div className="glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1">
            {SKILL_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors",
                  filter === f ? "text-black" : "text-white/55 hover:text-white"
                )}
              >
                {filter === f && (
                  <motion.span
                    layoutId="skill-filter"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {list.map((s, i) => (
                <Tile key={s.name} s={s} index={i} selected={selected.name === s.name} onSelect={() => setSelected(s)} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* detail panel */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass hairline-top relative overflow-hidden rounded-3xl p-6 sm:p-7">
              <motion.div
                key={selected.name + "glow"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl"
                style={{ background: selected.color }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="relative"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-xl font-semibold"
                      style={{ color: selected.color }}
                    >
                      {selected.glyph}
                    </span>
                    <div>
                      <div className="text-xl font-semibold tracking-tight">{selected.name}</div>
                      <div className="font-mono text-[11px] uppercase tracking-widest text-white/40">{selected.category}</div>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-white/55">{selected.note}</p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                      <div className="text-2xl font-semibold">{selected.years}</div>
                      <div className="text-xs text-white/40">лет опыта</div>
                    </div>
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                      <div className="text-2xl font-semibold">{selected.level}%</div>
                      <div className="text-xs text-white/40">уровень</div>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scaleY: 0.3, opacity: 0.3 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.4 }}
                        className="h-6 flex-1 origin-bottom rounded-sm"
                        style={{
                          background: i < Math.round(selected.level / 10) ? selected.color : "rgba(255,255,255,0.08)",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      {/* marquee */}
      <div className="relative mt-20 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="animate-marquee flex w-max gap-3">
          {marquee.map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm text-white/45"
            >
              <span style={{ color: s.color }}>{s.glyph}</span>
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
