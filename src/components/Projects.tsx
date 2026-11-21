import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import { PROJECTS, PROJECT_FILTERS, type Project } from "../data";
import { cn } from "../utils/cn";
import { EASE, GithubIcon, Pill, Reveal, SectionHeader, useSpotlight } from "./ui";
import ClientFinderDemo from "./ClientFinderDemo";
import CyberShadowDemo from "./CyberShadowDemo";

/** Abstract UI preview rendered with pure CSS, tinted by project accent */
function Visual({ p }: { p: Project }) {
  const c = p.accent;
  const soft = `${c}33`;
  const bar = (h: number, i: number) => (
    <div
      key={i}
      className="flex-1 origin-bottom rounded-t-md transition-transform duration-700 ease-out group-hover:scale-y-[1.15]"
      style={{
        height: `${h}%`,
        background: `linear-gradient(180deg, ${c}, ${c}22)`,
        transitionDelay: `${i * 40}ms`,
      }}
    />
  );

  return (
    <div className="relative h-52 overflow-hidden border-b border-white/[0.07] bg-[#0d0d10] sm:h-56">
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 70% 0%, ${soft}, transparent 65%)` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="absolute inset-x-6 bottom-0 top-8 rounded-t-2xl border border-b-0 border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-transform duration-700 ease-out group-hover:-translate-y-2">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="ml-3 h-2 w-24 rounded-full bg-white/10" />
        </div>

        {p.variant === "chart" && (
          <div className="flex h-[calc(100%-1.5rem)] items-end gap-2 pb-0">
            {[40, 62, 48, 80, 58, 92, 70, 100].map(bar)}
          </div>
        )}

        {p.variant === "chat" && (
          <div className="flex flex-col gap-2.5">
            <div className="h-7 w-3/5 rounded-xl rounded-bl-sm bg-white/[0.07]" />
            <div
              className="ml-auto h-7 w-2/3 rounded-xl rounded-br-sm transition-all duration-500 group-hover:w-3/4"
              style={{ background: `${c}55` }}
            />
            <div className="h-7 w-1/2 rounded-xl rounded-bl-sm bg-white/[0.07]" />
            <div className="flex gap-1 pl-2 pt-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: c, animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {p.variant === "grid" && (
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg border border-white/10 transition-all duration-500"
                style={{
                  background: i % 3 === 0 ? `${c}44` : "rgba(255,255,255,0.04)",
                  transitionDelay: `${i * 30}ms`,
                  borderRadius: i % 2 === 0 ? "999px" : undefined,
                }}
              />
            ))}
          </div>
        )}

        {p.variant === "nodes" && (
          <svg viewBox="0 0 300 120" className="h-[calc(100%-1.5rem)] w-full">
            <g stroke={c} strokeOpacity="0.5" strokeWidth="1.5" fill="none" strokeDasharray="4 4">
              <path d="M50 30 C 110 30, 110 80, 160 80" />
              <path d="M50 90 C 110 90, 110 80, 160 80" />
              <path d="M200 80 C 240 80, 240 40, 270 40" />
              <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1s" repeatCount="indefinite" />
            </g>
            {[
              [30, 22],
              [30, 82],
              [160, 70],
              [250, 30],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="40" height="20" rx="6" fill={i === 2 ? `${c}55` : "rgba(255,255,255,0.06)"} stroke="rgba(255,255,255,0.18)" />
            ))}
          </svg>
        )}

        {p.variant === "list" && (
          <div className="flex flex-col gap-2">
            {[80, 65, 90, 50].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-md" style={{ background: i === 0 ? c : "rgba(255,255,255,0.08)" }} />
                <span className="h-2 rounded-full bg-white/10 transition-all duration-700 group-hover:brightness-150" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        )}

        {p.variant === "phone" && (
          <div className="flex h-[calc(100%-1.5rem)] items-center justify-center gap-4">
            <div className="relative h-full w-20 rounded-2xl border border-white/15 bg-black/40 p-2">
              <div className="mb-2 h-1 w-6 rounded-full bg-white/20" />
              <div className="mx-auto mt-3 h-10 w-10 rounded-full border-4 transition-transform duration-700 group-hover:rotate-180" style={{ borderColor: c, borderTopColor: "transparent" }} />
              <div className="mt-3 h-1.5 rounded-full bg-white/10" />
              <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/10" />
            </div>
            <div className="flex flex-col gap-2">
              {[70, 50, 60].map((w, i) => (
                <div key={i} className="h-3 rounded-full bg-white/10" style={{ width: w }} />
              ))}
              <div className="h-6 w-16 rounded-full" style={{ background: `${c}66` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ p, index, onOpenDemo }: { p: Project; index: number; onOpenDemo: (id: string) => void }) {
  const onMove = useSpotlight();
  const hasInteractiveDemo = p.id === "client-finder" || p.id === "cybershadow";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE, layout: { duration: 0.5, ease: EASE } }}
      onMouseMove={onMove}
      className="spotlight group glass hairline-top flex flex-col overflow-hidden rounded-3xl transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-white/20"
    >
      <div 
        className={cn("relative z-[2]", hasInteractiveDemo && "cursor-pointer")}
        onClick={() => hasInteractiveDemo && onOpenDemo(p.id)}
      >
        <Visual p={p} />
      </div>

      <div className="relative z-[2] flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/35">
            {p.category} · {p.year}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: p.accent }}>
            <TrendingUp size={12} />
            {p.metric}
          </span>
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-white">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{p.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <Pill key={t} className="transition-colors group-hover:border-white/20 group-hover:text-white/80">
              {t}
            </Pill>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 border-t border-white/[0.07] pt-5">
          {hasInteractiveDemo ? (
            <button
              type="button"
              onClick={() => onOpenDemo(p.id)}
              className="group/l inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/85 active:scale-95 shadow-sm"
            >
              <span>Запустить демо</span>
              <ArrowUpRight size={14} className="transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
            </button>
          ) : (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="group/l inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-white/85 active:scale-95"
            >
              Live demo
              <ArrowUpRight size={14} className="transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
            </a>
          )}
          <a
            href={p.code}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/70 transition hover:border-white/30 hover:bg-white/5 hover:text-white active:scale-95"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            Код
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("Все");
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const list = filter === "Все" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative scroll-mt-12 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="01 — Избранные работы"
            title={
              <>
                Проекты, которыми
                <br />я горжусь
              </>
            }
            subtitle="Продукты от идеи до релиза: исследование, дизайн, разработка и поддержка."
          />
          <Reveal className="mb-12 md:mb-16">
            <div className="glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1">
              {PROJECT_FILTERS.map((f) => (
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
                      layoutId="proj-filter"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <Card key={p.id} p={p} index={i} onOpenDemo={setActiveDemo} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Project Demos */}
      {activeDemo === "client-finder" && (
        <ClientFinderDemo onClose={() => setActiveDemo(null)} />
      )}
      {activeDemo === "cybershadow" && (
        <CyberShadowDemo onClose={() => setActiveDemo(null)} />
      )}
    </section>
  );
}
