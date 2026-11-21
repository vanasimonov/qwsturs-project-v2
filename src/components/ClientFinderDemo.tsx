import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Bot, 
  Search, 
  Filter, 
  Send, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Clock, 
  ExternalLink, 
  Sparkles,
  ShieldAlert,
  Server
} from "lucide-react";

interface Lead {
  id: string;
  source: "Хабр" | "Kwork" | "Telegram";
  title: string;
  budget: string;
  tags: string[];
  score: number;
  time: string;
  summary: string;
  responded?: boolean;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    source: "Хабр",
    title: "Разработка высоконагруженного Telegram-бота для крипто-сигналов и подписок",
    budget: "85 000 ₽",
    tags: ["Python", "Telegram API", "AsyncIO", "PostgreSQL"],
    score: 98,
    time: "2 мин назад",
    summary: "100% совпадение по стеку. Требуется архитектура с очередями и интеграция платежей.",
  },
  {
    id: "lead-2",
    source: "Telegram",
    title: "Парсер бирж фриланса и мониторинг новых заявок с мгновенным алертом",
    budget: "45 000 ₽",
    tags: ["Python", "Парсинг", "BeautifulSoup", "Aiogram"],
    score: 94,
    time: "8 мин назад",
    summary: "Готовый паттерн решения из Client Finder Bot. Быстрый срок реализации.",
  },
  {
    id: "lead-3",
    source: "Kwork",
    title: "Интерактивный лендинг с 3D-моделью и плавными анимациями на React",
    budget: "60 000 ₽",
    tags: ["React", "Three.js", "Tailwind CSS", "GSAP"],
    score: 91,
    time: "15 мин назад",
    summary: "Заказчику нужен стиль Apple / Dark UI. Требуется WebGL-конфигуратор.",
  },
  {
    id: "lead-4",
    source: "Хабр",
    title: "Настройка и деплой VLESS/WireGuard VPN сервера с Telegram-управлением",
    budget: "35 000 ₽",
    tags: ["VLESS", "WireGuard", "Docker", "Linux"],
    score: 88,
    time: "32 мин назад",
    summary: "Прямое совпадение с VPN-инфраструктурой проекта.",
  },
];

export default function ClientFinderDemo({ onClose }: { onClose: () => void }) {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [filterSource, setFilterSource] = useState<string>("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [respondingId, setRespondingId] = useState<string | null>(null);

  const handleRespond = (id: string) => {
    setRespondingId(id);
    setTimeout(() => {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, responded: true } : l))
      );
      setRespondingId(null);
    }, 900);
  };

  const filtered = leads.filter((l) => {
    const matchSource = filterSource === "Все" || l.source === filterSource;
    const matchQuery =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSource && matchQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d12] shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Bot size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold">Client Finder AI Bot</h2>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Radar: 14ms
                </span>
              </div>
              <p className="text-xs text-white/40">Автоматический парсинг, AI-фильтрация и моментальные отклики</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* KPI Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                <span>Найдено сегодня</span>
                <Search size={14} className="text-cyan-400" />
              </div>
              <div className="text-2xl font-bold font-mono">142</div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +24% к вчера
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                <span>AI Скоринг &gt;85%</span>
                <Sparkles size={14} className="text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-mono">38</div>
              <div className="text-[11px] text-white/40 mt-1">Высокий приоритет</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                <span>Средний бюджет</span>
                <Zap size={14} className="text-indigo-400" />
              </div>
              <div className="text-2xl font-bold font-mono">56 000 ₽</div>
              <div className="text-[11px] text-white/40 mt-1">По топ-заявкам</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                <span>Бот-флот</span>
                <Server size={14} className="text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono">3 / 3</div>
              <div className="text-[11px] text-emerald-400 mt-1">Все ноды в сети</div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Поиск по тегам или тексту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/50 outline-none transition"
              />
            </div>

            <div className="flex gap-1.5 self-start sm:self-auto bg-white/[0.04] p-1 rounded-xl border border-white/10">
              {["Все", "Хабр", "Telegram", "Kwork"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterSource(s)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition font-medium ${
                    filterSource === s
                      ? "bg-white text-black shadow-sm"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Leads Feed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-white/40 px-1">
              <span>Лента входящих заказов в реальном времени</span>
              <span>AI Скоринг</span>
            </div>

            <AnimatePresence>
              {filtered.map((lead) => (
                <motion.div
                  key={lead.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-white/70">
                          {lead.source}
                        </span>
                        <span className="text-xs text-white/40 flex items-center gap-1 font-mono">
                          <Clock size={11} /> {lead.time}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-200 transition">
                        {lead.title}
                      </h3>

                      <p className="text-xs text-white/50 leading-relaxed bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                        <span className="text-cyan-400 font-medium">AI Анализ:</span> {lead.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {lead.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/60 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                      <div className="text-right">
                        <div className="text-base font-bold text-white font-mono">{lead.budget}</div>
                        <div className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 font-mono mt-0.5">
                          <Sparkles size={11} />
                          {lead.score}% Match
                        </div>
                      </div>

                      <button
                        onClick={() => handleRespond(lead.id)}
                        disabled={lead.responded || respondingId === lead.id}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition active:scale-95 ${
                          lead.responded
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
                            : "bg-white text-black hover:bg-white/90"
                        }`}
                      >
                        {lead.responded ? (
                          <>
                            <CheckCircle2 size={13} />
                            Отклик отправлен
                          </>
                        ) : respondingId === lead.id ? (
                          <>
                            <span className="h-3 w-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            Генерация отклика...
                          </>
                        ) : (
                          <>
                            <Send size={13} />
                            Автоотклик
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-white/10 px-6 py-3.5 bg-white/[0.01] flex items-center justify-between text-xs text-white/40">
          <span>Синхронизировано с Telegram Bot API · Webhooks OK</span>
          <span className="font-mono text-cyan-400">@AimBoGAttack</span>
        </div>
      </div>
    </div>
  );
}
