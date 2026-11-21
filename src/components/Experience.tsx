import { motion, useScroll, useSpring } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { EXPERIENCE, type Job } from "../data";
import { EASE, Pill, SectionHeader, useSpotlight } from "./ui";

function Item({ job, index }: { job: Job; index: number }) {
  const onMove = useSpotlight();
  return (
    <div className="relative pl-12 md:pl-20">
      {/* node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="absolute left-0 top-7 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-[#0a0a0c] md:left-[6px]"
      >
        {job.current ? (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping-soft absolute h-full w-full rounded-full bg-emerald-400" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
        ) : (
          <span className="font-mono text-[10px] text-white/50">0{EXPERIENCE.length - index}</span>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
        onMouseMove={onMove}
        className="spotlight glass hairline-top group rounded-3xl p-6 transition-colors duration-500 hover:border-white/20 sm:p-8"
      >
        <div className="relative z-[2]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">{job.period}</span>
            {job.current && (
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                Текущая роль
              </span>
            )}
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{job.role}</h3>
          <div className="mt-1 text-sm text-white/45">{job.company}</div>
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">{job.description}</p>

          <ul className="mt-5 space-y-2.5">
            {job.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/65">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[0.07] text-white/70 transition-colors group-hover:bg-white group-hover:text-black">
                  <Check size={11} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {job.stack.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="relative scroll-mt-12 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="03 — Опыт и roadmap"
          title={
            <>
              Путь от верстальщика
              <br />к лиду продукта
            </>
          }
          subtitle="Каждый этап добавлял новый слой навыков: от кода до дизайна и управления командой."
        />

        <div ref={ref} className="relative">
          {/* track */}
          <div className="absolute bottom-0 left-[18px] top-0 w-px bg-white/[0.08] md:left-6" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-[18px] top-0 w-px origin-top bg-gradient-to-b from-indigo-400 via-cyan-300 to-white/80 md:left-6"
          />
          <div className="space-y-6 md:space-y-8">
            {EXPERIENCE.map((job, i) => (
              <Item key={job.company} job={job} index={i} />
            ))}
          </div>
        </div>

        {/* next step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-8 pl-12 md:pl-20"
        >
          <div className="absolute left-0 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-dashed border-white/25 bg-[#0a0a0c] text-white/50 md:left-[6px]">
            ?
          </div>
          <div className="rounded-3xl border border-dashed border-white/15 p-6 text-sm text-white/50 sm:p-8">
            <span className="font-medium text-white/80">Следующая глава — ваш проект.</span> Расскажите, что вы строите, и
            посмотрим, как я могу помочь.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
