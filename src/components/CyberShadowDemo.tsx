import { useState, useRef, useEffect } from "react";
import { Terminal, Shield, Cpu, Zap, Volume2, VolumeX, Sparkles, RefreshCw, X } from "lucide-react";

// Web Audio API helper for sound synthesizer
class SoundFX {
  ctx: AudioContext | null = null;
  enabled = true;

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  beep(freq = 600, duration = 0.05, type: OscillatorType = "sine") {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext policy
    }
  }

  click() {
    this.beep(1200, 0.02, "square");
  }

  success() {
    if (!this.enabled) return;
    this.beep(523.25, 0.08, "sine"); // C5
    setTimeout(() => this.beep(659.25, 0.08, "sine"), 80); // E5
    setTimeout(() => this.beep(783.99, 0.12, "sine"), 160); // G5
  }

  alarm() {
    if (!this.enabled) return;
    this.beep(220, 0.15, "sawtooth");
  }
}

const sfx = new SoundFX();

interface LogLine {
  id: string;
  type: "system" | "user" | "success" | "warning" | "story";
  text: string;
}

const INITIAL_LOGS: LogLine[] = [
  { id: "1", type: "system", text: "NEURAL LINK ESTABLISHED // ARASAKA CYBERDECK OS v4.21" },
  { id: "2", type: "system", text: "Инициализация CyberShadow 2099 RPG Engine... [OK]" },
  { id: "3", type: "story", text: "Вы находитесь в подпольном баре 'Неоновый Срез' в трущобах Нижнего Нео-Токио. Ваш коммуникатор мигает входящим шифрованным сигналом." },
  { id: "4", type: "warning", text: "Введите 'help' для списка доступных команд или запустите квест." },
];

const QUESTS = [
  {
    title: "Взлом хранилища 'Миротех Дата-Центр'",
    target: "Mirotech Corp · Уровень допуска B",
    reward: "+1,200 ¤ / Имплант 'Сетевой бегун'",
    desc: "Корпорация прячет украденный протокол квантового шифрования. Проникните в закрытую подсеть и обойдите активный ICE-файрвол.",
  },
  {
    title: "Перехват конвоя корпоративных синтетиков",
    target: "Kang Tao Sec · Внешний сектор 4",
    reward: "+2,400 ¤ / Наниты восстановления",
    desc: "Агент сопротивления застрял на пути к челноку. Перегрузите городские турели и создайте коридор эвакуации.",
  },
  {
    title: "Экстракция черного чипа памяти",
    target: "Night Club 'Afterlife' · VIP-комната",
    reward: "+3,100 ¤ / Легендарный декриптор",
    desc: "Бывший инженер корпорации оставил чип с приватными ключами в био-хранилище. Охрана настороже.",
  },
];

export default function CyberShadowDemo({ onClose }: { onClose: () => void }) {
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_LOGS);
  const [inputVal, setInputVal] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [hudStats, setHudStats] = useState({
    credits: 4850,
    ram: 14,
    ice: 92,
    hp: 100,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const toggleSound = () => {
    sfx.enabled = !soundOn;
    setSoundOn(!soundOn);
    if (!soundOn) sfx.click();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    sfx.click();

    const newLogs: LogLine[] = [
      ...logs,
      { id: Date.now().toString(), type: "user", text: `> ${cmd}` },
    ];

    switch (trimmed) {
      case "help":
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "system",
          text: "Команды: help | status | scan | hack | quest | inventory | clear",
        });
        break;

      case "status":
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "system",
          text: `[СТАТУС ПЕРСОНАЖА]: HP: ${hudStats.hp}% | ОЗУ Деки: ${hudStats.ram}/16 GB | ICE: ${hudStats.ice}% | Баланс: ${hudStats.credits} ¤`,
        });
        break;

      case "scan":
        sfx.beep(800, 0.09, "triangle");
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "warning",
          text: "[СКАН СЕТИ]: Обнаружена зашифрованная нода Mirotech Node-09. Защита ICE: 40%. Уязвимость: открытый порт 8080.",
        });
        break;

      case "hack":
        sfx.success();
        setHudStats((prev) => ({
          ...prev,
          credits: prev.credits + 650,
          ram: Math.max(4, prev.ram - 2),
        }));
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "success",
          text: "[УСПЕХ ВЗЛОМА]: Протокол взломан! Получено +650 ¤. Временная нагрузка на деку: 2 GB ОЗУ.",
        });
        break;

      case "quest":
        const nextQ = (currentQuestIndex + 1) % QUESTS.length;
        setCurrentQuestIndex(nextQ);
        sfx.beep(700, 0.1, "sine");
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "story",
          text: `[НОВЫЙ КВЕСТ ПРИНЯТ]: ${QUESTS[nextQ].title} // Цель: ${QUESTS[nextQ].target}`,
        });
        break;

      case "inventory":
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "system",
          text: "Инвентарь: 1) Мономолекулярный клинок 2) Чип-взломщик ICE Breaker v2 3) Синтет-инъектор (2 шт.)",
        });
        break;

      case "clear":
        setLogs([INITIAL_LOGS[0]]);
        setInputVal("");
        return;

      default:
        sfx.alarm();
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: "warning",
          text: `Неизвестная команда: "${cmd}". Введите 'help' для подсказки.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal("");
  };

  const handleNextQuest = () => {
    sfx.click();
    const nextQ = (currentQuestIndex + 1) % QUESTS.length;
    setCurrentQuestIndex(nextQ);
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "story",
        text: `[ГЕНЕРАЦИЯ СЦЕНАРИЯ]: ${QUESTS[nextQ].title}. ${QUESTS[nextQ].desc}`,
      },
    ]);
  };

  const activeQuest = QUESTS[currentQuestIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative flex flex-col w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl border border-indigo-500/30 bg-[#09090e] shadow-[0_0_50px_rgba(99,102,241,0.15)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-indigo-500/20 px-6 py-4 bg-indigo-950/20">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Terminal size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold tracking-wide">CyberShadow 2099 RPG</h2>
                <span className="flex items-center gap-1 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-300 border border-indigo-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  Live Engine v2.4
                </span>
              </div>
              <p className="text-xs text-white/40">Процедурная киберпанк-RPG · Web Audio Synth · CLI Терминал</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/game/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20 transition"
              title="Открыть аркадный взлом в полный экран"
            >
              <Sparkles size={13} />
              <span className="hidden sm:inline">Аркадный взлом</span>
            </a>
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition ${
                soundOn
                  ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
                  : "border-white/10 text-white/40 hover:text-white"
              }`}
              title={soundOn ? "Звук включен" : "Звук выключен"}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* HUD Info Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-6 py-3 border-b border-indigo-500/15 bg-black/40 text-xs font-mono">
          <div className="flex items-center justify-between bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
            <span className="text-white/40 flex items-center gap-1.5">
              <Shield size={13} className="text-emerald-400" /> HP Здоровье
            </span>
            <span className="font-bold text-emerald-400">{hudStats.hp}%</span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
            <span className="text-white/40 flex items-center gap-1.5">
              <Cpu size={13} className="text-cyan-400" /> ОЗУ Деки
            </span>
            <span className="font-bold text-cyan-400">{hudStats.ram} / 16 GB</span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
            <span className="text-white/40 flex items-center gap-1.5">
              <Zap size={13} className="text-indigo-400" /> Защита ICE
            </span>
            <span className="font-bold text-indigo-400">{hudStats.ice}%</span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
            <span className="text-white/40 flex items-center gap-1.5">
              <Sparkles size={13} className="text-amber-400" /> Баланс
            </span>
            <span className="font-bold text-amber-400">{hudStats.credits.toLocaleString()} ¤</span>
          </div>
        </div>

        {/* Main Body: Terminal + Side Quest Card */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* CLI Terminal View */}
          <div className="flex-1 flex flex-col bg-[#07070a] p-4 font-mono text-xs overflow-hidden">
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-indigo-500/20"
            >
              {logs.map((line) => (
                <div
                  key={line.id}
                  className={`leading-relaxed ${
                    line.type === "system"
                      ? "text-indigo-400/80"
                      : line.type === "user"
                      ? "text-cyan-300 font-semibold"
                      : line.type === "success"
                      ? "text-emerald-400 font-medium"
                      : line.type === "warning"
                      ? "text-amber-300"
                      : "text-white/80"
                  }`}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="flex flex-wrap gap-1.5 pt-3 pb-2 border-t border-white/5 text-[11px]">
              <span className="text-white/30 py-1">Быстрые команды:</span>
              {["scan", "hack", "quest", "status", "inventory"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-2.5 py-1 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition active:scale-95"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(inputVal);
              }}
              className="flex items-center gap-2 pt-2 border-t border-white/10"
            >
              <span className="text-indigo-400 font-bold">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Введите команду (например: hack, scan, help)..."
                className="flex-1 bg-transparent text-white outline-none placeholder:text-white/20 font-mono text-xs"
              />
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-[11px] font-sans font-medium text-white transition active:scale-95"
              >
                Отправить
              </button>
            </form>
          </div>

          {/* Right Sidebar: Active Procedural Quest */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-indigo-500/20 bg-black/40 p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40">
                  Активный Сценарий
                </span>
                <button
                  onClick={handleNextQuest}
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 transition"
                  title="Сгенерировать другой квест"
                >
                  <RefreshCw size={12} /> Обновить
                </button>
              </div>

              <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.04] p-4 space-y-3">
                <div className="text-sm font-semibold text-white">{activeQuest.title}</div>
                <div className="text-xs text-white/60 leading-relaxed">{activeQuest.desc}</div>
                <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-white/40">
                    <span>Цель:</span>
                    <span className="text-white/80 font-mono">{activeQuest.target}</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>Награда:</span>
                    <span className="text-amber-400 font-mono">{activeQuest.reward}</span>
                  </div>
                </div>
              </div>

              {/* Matrix Hex Breach Puzzle Visual */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 space-y-2">
                <div className="text-[11px] font-mono text-white/40 flex justify-between items-center">
                  <span>HEX МАТРИЦА СЕТИ</span>
                  <span className="text-emerald-400 text-[10px]">UNLOCKED</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-xs">
                  {["7A", "BD", "E9", "1C", "55", "FF", "2B", "9A"].map((hex, i) => (
                    <button
                      key={i}
                      onClick={() => handleCommand("hack")}
                      className="p-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition active:scale-90"
                    >
                      {hex}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-white/30 pt-3 border-t border-white/10 flex justify-between items-center">
              <span>SQLite State Machine</span>
              <span className="font-mono text-indigo-400">500+ сценариев</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
