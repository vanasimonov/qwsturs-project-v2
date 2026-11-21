import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Loader2, Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PROFILE, SOCIALS } from "../data";
import { cn } from "../utils/cn";
import { EASE, Reveal, SectionHeader, SocialIcon, useSpotlight } from "./ui";

const TOPICS = ["Веб-разработка", "Дизайн интерфейса", "Консультация", "Другое"];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-white/50">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 block text-xs text-rose-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

const inputCls = (err?: string) =>
  cn(
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:bg-white/[0.06]",
    err ? "border-rose-400/50 focus:border-rose-400" : "border-white/10 focus:border-white/35"
  );

export default function Contact() {
  const onMove = useSpotlight();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [topic, setTopic] = useState(TOPICS[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [copied, setCopied] = useState(false);

  const update = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Введите имя (минимум 2 символа)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Введите корректный email";
    if (form.message.trim().length < 10) e.message = "Расскажите о проекте подробнее (от 10 символов)";
    return e;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    const subject = encodeURIComponent(`[${topic}] Запрос от ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`);
    setTimeout(() => {
      // Opens the visitor's mail client with a fully prepared message
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 900);
  };

  const reset = () => {
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const t = document.createElement("textarea");
      t.value = PROFILE.email;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative scroll-mt-12 px-5 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(99,102,241,0.14),transparent)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="04 — Контакты"
          title={
            <>
              Давайте создадим
              <br />
              что-то выдающееся
            </>
          }
          subtitle="Отвечаю в течение 24 часов. Расскажите о задаче — предложу решение, сроки и бюджет."
        />

        <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          {/* form */}
          <Reveal>
            <div
              onMouseMove={onMove}
              className="spotlight glass hairline-top relative overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              <div className="relative z-[2]">
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                        className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30"
                      >
                        <Check size={28} />
                      </motion.div>
                      <h3 className="mt-6 text-2xl font-semibold tracking-tight">Сообщение подготовлено!</h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
                        Открылся ваш почтовый клиент с готовым письмом на {PROFILE.email}. Если этого не произошло,
                        скопируйте адрес и напишите мне напрямую.
                      </p>
                      <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <button
                          onClick={copyEmail}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/85 active:scale-95"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? "Скопировано" : "Скопировать email"}
                        </button>
                        <button
                          onClick={reset}
                          className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white active:scale-95"
                        >
                          Новое сообщение
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={submit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Ваше имя" error={errors.name}>
                          <input
                            className={inputCls(errors.name)}
                            placeholder="Иван Петров"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            autoComplete="name"
                          />
                        </Field>
                        <Field label="Email" error={errors.email}>
                          <input
                            type="email"
                            className={inputCls(errors.email)}
                            placeholder="ivan@company.com"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            autoComplete="email"
                          />
                        </Field>
                      </div>

                      <div>
                        <span className="mb-2 block text-xs font-medium text-white/50">Тема обращения</span>
                        <div className="flex flex-wrap gap-2">
                          {TOPICS.map((t) => (
                            <button
                              type="button"
                              key={t}
                              onClick={() => setTopic(t)}
                              className={cn(
                                "rounded-full border px-3.5 py-1.5 text-xs transition active:scale-95",
                                topic === t
                                  ? "border-white bg-white text-black"
                                  : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Field label="Сообщение" error={errors.message}>
                        <textarea
                          rows={5}
                          className={cn(inputCls(errors.message), "resize-none")}
                          placeholder="Расскажите о проекте, сроках и целях…"
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                        />
                        <div className="mt-1 text-right font-mono text-[11px] text-white/25">{form.message.length} / 1000</div>
                      </Field>

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white py-3.5 text-sm font-medium text-black transition hover:bg-white/90 active:scale-[0.98] disabled:opacity-80"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Отправка…
                          </>
                        ) : (
                          <>
                            Отправить сообщение
                            <Send size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* side */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <div className="glass hairline-top rounded-3xl p-6 sm:p-7">
                <div className="flex items-center gap-3 text-white/45">
                  <Mail size={16} />
                  <span className="text-xs uppercase tracking-widest">Напрямую</span>
                </div>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="mt-3 block break-all text-xl font-semibold tracking-tight transition hover:text-white/70 sm:text-2xl"
                >
                  {PROFILE.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/65 transition hover:border-white/30 hover:text-white active:scale-95"
                >
                  {copied ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} />}
                  {copied ? "Скопировано" : "Скопировать адрес"}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="flex-1">
              <div className="glass hairline-top h-full rounded-3xl p-3">
                <div className="px-4 pb-2 pt-4 text-xs uppercase tracking-widest text-white/45">Соцсети</div>
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition hover:bg-white/[0.06]"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition group-hover:scale-110 group-hover:text-white">
                      <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{s.name}</span>
                      <span className="block text-xs text-white/40">{s.handle}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-white/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
