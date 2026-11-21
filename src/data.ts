export const PROFILE = {
  name: "Иван Симонов (Qwstur)",
  email: "kosta4132@gmail.com",
  city: "Россия · Удалённо по всему миру",
  title: "Full-Stack Developer & AI Systems Engineer",
  tagline: "Разрабатываю Telegram-боты, интерактивные веб-сервисы, AI-системы и 3D-визуализации",
};

export const NAV = [
  { id: "projects", label: "Проекты" },
  { id: "skills", label: "Стек" },
  { id: "experience", label: "Опыт" },
  { id: "contact", label: "Контакты" },
];

export type Project = {
  id: string;
  title: string;
  category: "Web" | "Mobile" | "Design" | "AI";
  description: string;
  tags: string[];
  year: string;
  metric: string;
  accent: string; // hex
  variant: "chart" | "chat" | "grid" | "nodes" | "list" | "phone";
  live: string;
  code: string;
};

export const PROJECTS: Project[] = [
  {
    id: "client-finder",
    title: "Client Finder AI Bot",
    category: "AI",
    description:
      "Интеллектуальная система парсинга и фильтрации заказов с бирж фриланса (Хабр, Kwork, Telegram-каналы). AI-скоринг заявок, моментальные уведомления и автоотклики.",
    tags: ["Python", "Telegram API", "AsyncIO", "AI / NLP", "SQLite"],
    year: "2025",
    metric: "−80% времени на поиск лидов",
    accent: "#22d3ee",
    variant: "chat",
    live: "https://t.me/AimBoGAttack",
    code: "https://github.com/vanasimonov",
  },
  {
    id: "vpn-infra",
    title: "Telegram Private VPN",
    category: "Web",
    description:
      "Высокоскоростная инфраструктура защищенного VPN-сервиса в Telegram на базе современных протоколов VLESS и WireGuard с автоматической выдачей ключей и биллингом.",
    tags: ["VLESS", "WireGuard", "Node.js", "Docker", "Telegram API"],
    year: "2024",
    metric: "10 Gbps пропускная способность",
    accent: "#34d399",
    variant: "chart",
    live: "https://t.me/AimBoGAttack",
    code: "https://github.com/vanasimonov",
  },
  {
    id: "cybershadow",
    title: "CyberShadow 2099 RPG",
    category: "AI",
    description:
      "Текстовая киберпанк-RPG с процедурной генерацией квестов, системой крафта, инвентаря, пошаговой боевой системой и сохранением сессий.",
    tags: ["Python", "State Machine", "SQLite", "Procedural Gen"],
    year: "2024",
    metric: "500+ сценариев",
    accent: "#818cf8",
    variant: "nodes",
    live: "https://github.com/vanasimonov",
    code: "https://github.com/vanasimonov",
  },
  {
    id: "3d-showcase",
    title: "3D Interactive Showcase",
    category: "Design",
    description:
      "Интерактивная 3D-визуализация мототехники и велосипедов (Regulmoto & Flagman): PBR-материалы, кинематографичный свет, вращение на 360° и взрыв-схема компонентов.",
    tags: ["Three.js", "Blender", "WebGL", "GSAP"],
    year: "2024",
    metric: "60 FPS в WebGL",
    accent: "#f472b6",
    variant: "grid",
    live: "https://github.com/vanasimonov",
    code: "https://github.com/vanasimonov",
  },
  {
    id: "game-infra",
    title: "Gaming Infra & Latency Tweaker",
    category: "Web",
    description:
      "Утилиты для гейминга и серверов: автоматический деплой Minecraft-серверов, оптимизация DPC-задержек Windows и боты для управления игровыми кланами.",
    tags: ["PowerShell", "Node.js", "Discord API", "Windows API"],
    year: "2023",
    metric: "−30% DPC Latency",
    accent: "#fbbf24",
    variant: "list",
    live: "https://github.com/vanasimonov",
    code: "https://github.com/vanasimonov",
  },
  {
    id: "sound-architecture",
    title: "Pastel Rich Sound System",
    category: "Design",
    description:
      "Саунд-дизайн, написание атмосферных битов и авторских MIDI-паков для медиапроектов и игр с ГОСТ-мастерингом и сведением.",
    tags: ["Sound Design", "FL Studio / Ableton", "Audio Mastering"],
    year: "2024",
    metric: "100k+ прослушиваний",
    accent: "#fb923c",
    variant: "phone",
    live: "https://t.me/AimBoGAttack",
    code: "https://github.com/vanasimonov",
  },
];

export const PROJECT_FILTERS = ["Все", "AI", "Web", "Design"] as const;

export type SkillCategory = "Frontend" | "Backend" | "AI & Bots" | "Tools";

export type Skill = {
  name: string;
  category: SkillCategory;
  level: number;
  years: number;
  note: string;
  color: string;
  glyph: string;
};

export const SKILL_FILTERS = ["Все", "Frontend", "Backend", "AI & Bots", "Tools"] as const;

export const SKILLS: Skill[] = [
  { name: "Telegram Bot API", category: "AI & Bots", level: 98, years: 5, note: "Архитектура высоконагруженных ботов, WebApp, платежи, mtproto.", color: "#229ED9", glyph: "✈" },
  { name: "Python", category: "Backend", level: 95, years: 5, note: "AsyncIO, aiohttp, парсеры, интеграция LLM, FastAPI.", color: "#3776AB", glyph: "Py" },
  { name: "TypeScript", category: "Frontend", level: 92, years: 4, note: "Строгая типизация, интерфейсы, безопасные API.", color: "#3178C6", glyph: "TS" },
  { name: "React & Vite", category: "Frontend", level: 93, years: 4, note: "Компоненты, хуки, SPA, оптимизация бандла.", color: "#61DAFB", glyph: "⚛" },
  { name: "Tailwind CSS", category: "Frontend", level: 96, years: 4, note: "Дизайн-системы, адаптивная верстка, анимации.", color: "#38BDF8", glyph: "~" },
  { name: "Framer Motion & GSAP", category: "Frontend", level: 90, years: 3, note: "Кинематографичные переходы, 60 FPS, физика анимаций.", color: "#E879F9", glyph: "◐" },
  { name: "Node.js", category: "Backend", level: 88, years: 4, note: "REST API, микросервисы, скрипты автоматизации.", color: "#339933", glyph: "⬢" },
  { name: "Three.js & Blender", category: "AI & Bots", level: 86, years: 3, note: "3D-моделирование, шейдеры, PBR-текстурирование, WebGL.", color: "#EA7600", glyph: "3D" },
  { name: "VLESS & WireGuard", category: "Tools", level: 92, years: 3, note: "Развертывание защищенных VPN-туннелей, сетевые протоколы.", color: "#10B981", glyph: "🛡" },
  { name: "Docker & Linux", category: "Tools", level: 85, years: 4, note: "Контейнеризация сервисов, оркестрация, деплой на VPS.", color: "#2496ED", glyph: "🐳" },
  { name: "SQLite & PostgreSQL", category: "Backend", level: 89, years: 4, note: "Реляционные базы данных, миграции, индексы.", color: "#336791", glyph: "🗄" },
  { name: "Git & Automation", category: "Tools", level: 92, years: 5, note: "CI/CD, GitHub, написание скриптов автоматизации рутины.", color: "#F05032", glyph: "⑂" },
];

export type Job = {
  period: string;
  role: string;
  company: string;
  description: string;
  points: string[];
  stack: string[];
  current?: boolean;
};

export const EXPERIENCE: Job[] = [
  {
    period: "2024 — сейчас",
    role: "Lead Systems & Bot Architect",
    company: "Freelance & Independent Studio",
    description: "Разработка сложных Telegram-экосистем, AI-парсер-ботов, VPN-инфраструктуры и заказных веб-интерфейсов.",
    points: [
      "Разработал Client Finder AI Bot — сократил время ручного поиска лидов с бирж на 80%",
      "Запустил защищенную VPN-сеть на VLESS/WireGuard с пропускной способностью 10 Gbps",
      "Создал интерактивные 3D-конфигураторы техники на Three.js с 60 FPS в браузере",
    ],
    stack: ["Python", "Telegram API", "React", "TypeScript", "Three.js", "Docker"],
    current: true,
  },
  {
    period: "2023 — 2024",
    role: "Full-Stack Developer",
    company: "Bot & Web Solutions",
    description: "Создание заказных веб-приложений, скриптов автоматизации и ботов для игровых и коммерческих проектов.",
    points: [
      "Собрал движок текстовой RPG CyberShadow 2099 с 500+ процедурными сценариями",
      "Автоматизировал продажи цифровых товаров и инвентаря на FunPay",
      "Внедрил утилиты оптимизации задержек и DPC-латентности для киберспортивных конфигураций",
    ],
    stack: ["Node.js", "Python", "SQLite", "PowerShell", "Framer Motion"],
  },
  {
    period: "2021 — 2023",
    role: "Junior Web Developer & Sound Designer",
    company: "Creative Projects",
    description: "Первые коммерческие веб-проекты, верстка интерфейсов и саунд-дизайн для медиаконтента.",
    points: [
      "Сдал 25+ веб-проектов и ботов для частных клиентов",
      "Спродюсировал трек и MIDI-паки Pastel Rich с 100k+ прослушиваний",
      "Освоил полный цикл: от прототипа и архитектуры до продакшна на сервере",
    ],
    stack: ["JavaScript", "HTML5/CSS3", "FL Studio", "Git"],
  },
];

export const STATS = [
  { value: 5, suffix: "+", label: "лет в разработке" },
  { value: 40, suffix: "+", label: "готовых проектов" },
  { value: 10, suffix: "k+", label: "пользователей в ботах" },
  { value: 99, suffix: "%", label: "Lighthouse Score" },
];

export const SOCIALS = [
  { name: "GitHub", handle: "@vanasimonov", href: "https://github.com/vanasimonov", icon: "github" },
  { name: "Telegram", handle: "@AimBoGAttack", href: "https://t.me/AimBoGAttack", icon: "telegram" },
  { name: "Email", handle: "kosta4132@gmail.com", href: "mailto:kosta4132@gmail.com", icon: "mail" },
] as const;
