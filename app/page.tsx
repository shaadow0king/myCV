"use client";

import Image from "next/image";
import { ArrowDown, Bug, MousePointerClick } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";

type Language = "ru" | "en";
type Copy = { ru: string; en: string };
type TabId = "home" | "experience" | "skills" | "about";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const localize = (value: Copy, language: Language) => value[language];

const copy = {
  name: { ru: "Геворк Акопян", en: "Gevork Akopyan" },
  location: { ru: "QA · Белград", en: "QA · Belgrade" },
  tabs: {
    home: { ru: "Главная", en: "Home" },
    experience: { ru: "Опыт", en: "Experience" },
    skills: { ru: "Навыки", en: "Skills" },
    about: { ru: "Обо мне", en: "About" },
  },
  hero: {
    intro: {
      ru: "Тестирую мобильные игры и приложения на Android, iOS, Huawei, Amazon и Windows. Слежу за стабильностью, UX/UI и логикой.",
      en: "I test mobile games and apps on Android, iOS, Huawei, Amazon and Windows, with an eye on stability, UX/UI and logic.",
    },
    quoteStart: { ru: "Но чаще всего на что-то жму", en: "Usually I press something" },
    quoteEnd: { ru: "— и всё ломается.", en: "— and everything breaks." },
  },
  cv: {
    title: { ru: "Резюме", en: "Resume" },
    version: { ru: "PDF · RU", en: "PDF · EN" },
    description: {
      ru: "Полная версия резюме: опыт, инструменты и контакты.",
      en: "The full resume: experience, tools and contacts.",
    },
    aria: { ru: "Скачать резюме в PDF", en: "Download resume as PDF" },
  },
  heatmap: {
    aria: { ru: "Карьера в QA по неделям", en: "QA career by week" },
        today: { ru: "Сегодня", en: "Today" },
    gap: { ru: "Перерыв", en: "Break" },
  },
  experience: {
    label: { ru: "Опыт работы", en: "Work experience" },
    present: { ru: "наст. время", en: "present" },
    intro: {
      ru: "От тестирования фич до мониторинга релизов, проверки аналитики и наставничества.",
      en: "From feature testing to release monitoring, analytics validation and mentoring.",
    },
    current: { ru: "Текущее место работы, подробности позже.", en: "Current role, details coming soon." },
  },
  skills: {
    label: { ru: "Навыки и инструменты", en: "Skills & tools" },
    intro: {
      ru: "Инструменты, с которыми работаю на этапах анализа требований, тестирования, диагностики, аналитики и релизов.",
      en: "Tools I use across requirements analysis, testing, diagnostics, analytics and releases.",
    },
  },
  about: {
    paragraphs: [
      {
        ru: "Тестирую приложения на Android, iOS, Huawei, Amazon и Windows. Оцениваю стабильность, воспроизводимость и влияние ошибок на пользовательский опыт, уделяю внимание UX/UI и логике работы приложений.",
        en: "I test applications across Android, iOS, Huawei, Amazon and Windows. I assess stability, reproducibility and the impact of defects on user experience, with attention to UX/UI and application behavior and logic.",
      },
      {
        ru: "Работаю на всём релизном цикле: от анализа требований и тест-документации до регресса, проверки аналитики и мониторинга после выпуска.",
        en: "I work across the whole release cycle: from requirements analysis and test documentation to regression, analytics validation and post-release monitoring.",
      },
    ] as Copy[],
    quote: { ru: "Но чаще всего на что-то жму — и всё ломается.", en: "Usually I press something — and everything breaks." },
    connect: { ru: "Связаться", en: "Connect" },
    cvRu: { ru: "Резюме RU", en: "CV RU" },
    cvEn: { ru: "Резюме EN", en: "CV EN" },
  },
  cta: { ru: "Контакты", en: "Contact" },
  ctaBack: { ru: "На главную", en: "Home" },
  langGroup: { ru: "Выбор языка", en: "Language selector" },
  tabsGroup: { ru: "Разделы портфолио", en: "Portfolio sections" },
};

type Job = {
  company: string;
  role: string;
  start: [number, number];
  end?: [number, number];
  level: 1 | 2 | 3 | 4;
  bullets: Copy[];
};

const jobs: Job[] = [
  {
    company: "Glam AI",
    role: "QA Specialist",
    start: [2025, 7],
    level: 4,
    bullets: [],
  },
  {
    company: "Playrix",
    role: "QA Specialist",
    start: [2023, 10],
    end: [2025, 5],
    level: 3,
    bullets: [
      { ru: "Ручное тестирование на iOS, Android, Amazon, Huawei и Windows", en: "Manual testing on iOS, Android, Amazon, Huawei and Windows" },
      { ru: "Анализ требований и декомпозиция для проверки соответствия ТЗ", en: "Requirements analysis and decomposition to verify specification compliance" },
      { ru: "Тест-кейсы, чек-листы, тест-планы и баг-репорты в Asana", en: "Test cases, checklists, test plans and bug reports in Asana" },
      { ru: "A/B-тестирование и проверка аналитических событий в Amplitude и Swrve", en: "A/B testing and analytics-event validation in Amplitude and Swrve" },
      { ru: "Тестирование серверной и клиентской игровой логики, релизный регресс", en: "Server and client game-logic testing and release regression" },
      { ru: "Анализ трафика, перехват и подмена запросов через Charles Proxy", en: "Traffic analysis, request interception and modification with Charles Proxy" },
      { ru: "Анализ сбоев и нефатальных ошибок в Sentry", en: "Crash and non-fatal error analysis in Sentry" },
      { ru: "Изменение тестовых серверов через Git для подготовки окружения и настройки событий", en: "Git-based test-server changes for environment and event setup" },
    ],
  },
  {
    company: "Playgendary",
    role: "QA Specialist",
    start: [2023, 4],
    end: [2023, 8],
    level: 2,
    bullets: [
      { ru: "Ручное тестирование на Android и iOS", en: "Manual testing on Android and iOS" },
      { ru: "Тестирование аналитики: сырые данные Adjust и конфигурации Firebase", en: "Analytics testing with Adjust raw data and Firebase configurations" },
      { ru: "Выявление 60+ дефектов в месяц в рамках KPI", en: "Identified 60+ defects per month as part of KPI" },
      { ru: "Установка, логирование и проверка сборок в Android Studio и Xcode", en: "Build installation, logging and verification in Android Studio and Xcode" },
      { ru: "Баг-репорты в Asana и работа с системой контроля версий Git", en: "Bug reporting in Asana and version-control work with Git" },
      { ru: "Тестовая документация и обновление тест-ранов в TestRail", en: "Test documentation and test-run updates in TestRail" },
      { ru: "Выпуск проектов в продакшен и последующий мониторинг", en: "Production releases and subsequent status monitoring" },
    ],
  },
  {
    company: "DominiGames",
    role: "QA Engineer",
    start: [2022, 3],
    end: [2023, 4],
    level: 1,
    bullets: [
      { ru: "Ручное функциональное и нефункциональное тестирование на Android и iOS", en: "Manual functional and non-functional testing on Android and iOS" },
      { ru: "Внутреннее тестирование фич и альфа/бета-тестирование проектов", en: "Internal feature testing and alpha/beta project testing" },
      { ru: "Firebase Analytics, отчётность, тест-планы и тестовая документация", en: "Firebase Analytics, reporting, test plans and test documentation" },
      { ru: "Сборка проектов в Jenkins", en: "Project builds in Jenkins" },
      { ru: "Отслеживание жалоб пользователей через Helpdesk", en: "User-complaint tracking through Helpdesk" },
      { ru: "Обучение стажёров и замещение Team Lead", en: "Intern training and Team Lead replacement" },
    ],
  },
];

const skills: { number: string; title: Copy; description: Copy; tools: string[] }[] = [
  {
    number: "/01",
    title: { ru: "Требования и документация", en: "Requirements & documentation" },
    description: {
      ru: "Анализ требований, декомпозиция, тест-кейсы, чек-листы и тест-планы.",
      en: "Requirements analysis, decomposition, test cases, checklists and test plans.",
    },
    tools: ["TestRail", "Qase", "Confluence", "Coda", "Notion"],
  },
  {
    number: "/02",
    title: { ru: "Тестирование и релизы", en: "Testing & releases" },
    description: {
      ru: "Функциональное, нефункциональное, альфа/бета и регрессионное тестирование на Android, iOS, Huawei, Amazon и Windows.",
      en: "Functional, non-functional, alpha/beta and regression testing on Android, iOS, Huawei, Amazon and Windows.",
    },
    tools: ["Android Studio", "Xcode", "3uTools", "Jenkins", "TeamCity"],
  },
  {
    number: "/03",
    title: { ru: "Аналитика и наблюдаемость", en: "Analytics & observability" },
    description: {
      ru: "Проверка аналитических событий и сырых данных, работа с конфигурациями и анализ сбоев.",
      en: "Analytics-event and raw-data validation, configuration work and crash analysis.",
    },
    tools: ["Amplitude", "Swrve", "Adjust", "Firebase", "Sentry"],
  },
  {
    number: "/04",
    title: { ru: "Трафик и продуктовая работа", en: "Traffic & product work" },
    description: {
      ru: "Перехват и подмена запросов, проверка трафика, баг-репорты, контроль версий и пользовательские обращения.",
      en: "Request interception, traffic validation, bug reporting, version control and user requests.",
    },
    tools: ["Charles Proxy", "Postman", "Git", "Asana", "HelpShift"],
  },
];

const contacts = [
  { label: "Telegram", href: "https://t.me/dduck0" },
  { label: "Email", href: "mailto:Im.gework@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gevork-akopyan-066948247/" },
];

const tabIds: TabId[] = ["home", "experience", "skills", "about"];
const hashToTab: Record<string, TabId> = {
  home: "home",
  top: "home",
  experience: "experience",
  skills: "skills",
  about: "about",
  contact: "about",
};

const monthsBetween = (start: [number, number], end: [number, number]) => (end[0] - start[0]) * 12 + (end[1] - start[1]) + 1;

const formatDuration = (months: number, language: Language) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (language === "en") {
    return [years ? `${years} yr` : "", rest ? `${rest} mo` : ""].filter(Boolean).join(" ");
  }
  const yearWord = years === 1 ? "год" : years >= 2 && years <= 4 ? "года" : "лет";
  return [years ? `${years} ${yearWord}` : "", rest ? `${rest} мес.` : ""].filter(Boolean).join(" ");
};

const nowMonth = (): [number, number] => {
  const now = new Date();
  return [now.getFullYear(), now.getMonth() + 1];
};

const formatPeriod = (job: Job, language: Language) => {
  const end = job.end ? String(job.end[0]) : localize(copy.experience.present, language);
  const range = job.start[0] === job.end?.[0] ? String(job.start[0]) : `${job.start[0]} — ${end}`;
  return [range, formatDuration(monthsBetween(job.start, job.end ?? nowMonth()), language)];
};

const jobForDate = (date: Date) => {
  const key = date.getFullYear() * 12 + date.getMonth();
  return jobs.find((job) => {
    const start = job.start[0] * 12 + job.start[1] - 1;
    const end = job.end ? job.end[0] * 12 + job.end[1] - 1 : Infinity;
    return key >= start && key <= end;
  });
};

type Cell = { date: Date; job?: Job; today?: boolean; future?: boolean };

const buildWeeks = (today: Date) => {
  const first = new Date(2022, 2, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7));
  const weeks: { month: Date | null; cells: Cell[] }[] = [];
  const cursor = new Date(start);
  let lastMonth = -1;
  while (cursor <= today) {
    const cells: Cell[] = [];
    let month: Date | null = null;
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(cursor);
      if (date.getMonth() !== lastMonth && date.getDate() <= 7 && date >= first) {
        month = date;
        lastMonth = date.getMonth();
      }
      const isToday = date.toDateString() === today.toDateString();
      cells.push({ date, job: date >= first && date <= today ? jobForDate(date) : undefined, today: isToday, future: date > today });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push({ month, cells });
  }
  return weeks;
};

function LanguageSwitcher({ language, onChange, variant }: { language: Language; onChange: (language: Language) => void; variant: "header" | "dock" }) {
  return (
    <div className="switcher" data-variant={variant} role="group" aria-label={localize(copy.langGroup, language)}>
      {(["en", "ru"] as Language[]).map((item) => (
        <button
          key={item}
          className="switcher-option"
          type="button"
          lang={item}
          aria-label={item === "en" ? "English" : "Русский"}
          aria-pressed={language === item}
          data-active={language === item || undefined}
          onClick={() => onChange(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function CareerHeatmap({ language }: { language: Language }) {
  const [today, setToday] = useState<Date | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const [fades, setFades] = useState({ left: false, right: false });
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setToday(new Date()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const weeks = useMemo(() => (today ? buildWeeks(today) : []), [today]);

  const updateFades = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;
    setFades({ left: node.scrollLeft > 4, right: node.scrollLeft + node.clientWidth < node.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node || !weeks.length) return;
    node.scrollLeft = node.scrollWidth;
    updateFades();
    window.addEventListener("resize", updateFades);
    return () => window.removeEventListener("resize", updateFades);
  }, [weeks, updateFades]);

  const locale = language === "ru" ? "ru-RU" : "en-US";
  const monthFormat = new Intl.DateTimeFormat(locale, { month: "short" });
  const dayFormat = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" });

  const showTooltip = (event: MouseEvent<HTMLSpanElement>, cell: Cell) => {
    const frame = frameRef.current;
    if (!frame) return;
    const box = event.currentTarget.getBoundingClientRect();
    const host = frame.getBoundingClientRect();
    const label = cell.today ? localize(copy.heatmap.today, language) : cell.job ? cell.job.company : localize(copy.heatmap.gap, language);
    const x = Math.min(Math.max(box.left - host.left + box.width / 2, 70), host.width - 70);
    setTooltip({ x, y: box.top - host.top, text: `${dayFormat.format(cell.date)} · ${label}` });
  };

  return (
    <section className="heatmap" aria-label={localize(copy.heatmap.aria, language)}>
      <div className="heatmap-frame" ref={frameRef}>
        <div className="heatmap-fade" data-side="left" data-show={fades.left || undefined} aria-hidden="true" />
        <div className="heatmap-fade" data-side="right" data-show={fades.right || undefined} aria-hidden="true" />
        <div className="heatmap-scroll" ref={scrollRef} onScroll={updateFades} onMouseLeave={() => setTooltip(null)}>
          <div className="heatmap-cols" style={{ minHeight: 100 }}>
            {weeks.map((week) => (
              <div className="heatmap-col" key={week.cells[0].date.toISOString()}>
                <span className="heatmap-month">{week.month ? monthFormat.format(week.month).replace(".", "") : ""}</span>
                {week.cells.map((cell) => (
                  <span
                    key={cell.date.toISOString()}
                    className="cell"
                    data-level={cell.job ? cell.job.level : 0}
                    data-today={cell.today || undefined}
                    data-future={cell.future || undefined}
                    data-weekend={cell.date.getDay() % 6 === 0 || undefined}
                    onMouseEnter={cell.future ? undefined : (event) => showTooltip(event, cell)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {tooltip && (
          <div className="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
            {tooltip.text}
          </div>
        )}
      </div>
      <div className="heatmap-legend">
        {[...jobs].reverse().map((job) => (
          <span key={job.company}>
            <span className="cell" data-level={job.level} />
            {job.company}
          </span>
        ))}
      </div>
    </section>
  );
}

function ExperienceRow({ job, language }: { job: Job; language: Language }) {
  return (
    <article className="row">
      <span className="logo" data-current={!job.end || undefined} aria-hidden="true">
        {job.company[0]}
      </span>
      <p className="row-company">{job.company}</p>
      <p className="row-role">{job.role}</p>
      <p className="row-period">
        {formatPeriod(job, language).map((part, index) => (
          <span key={part}>
            {index > 0 && <span className="row-period-dot"> · </span>}
            {part}
          </span>
        ))}
      </p>
    </article>
  );
}

function JobProjects({ job, language }: { job: Job; language: Language }) {
  const [railY, setRailY] = useState<number | null>(null);

  const moveRail = (event: MouseEvent<HTMLLIElement>) => {
    const item = event.currentTarget;
    setRailY(item.offsetTop + item.offsetHeight / 2);
  };

  if (!job.bullets.length) {
    return (
      <ul className="job-projects">
        <li className="job-empty">{localize(copy.experience.current, language)}</li>
      </ul>
    );
  }

  return (
    <ul
      className="job-projects"
      data-rail-active={railY !== null || undefined}
      style={{ "--rail-y": `${railY ?? 0}px` } as CSSProperties}
      onMouseLeave={() => setRailY(null)}
    >
      {job.bullets.map((bullet) => (
        <li className="job-item" key={bullet.en} onMouseEnter={moveRail}>
          {localize(bullet, language)}
        </li>
      ))}
    </ul>
  );
}

const reveal = (index: number, className = "") => ({ className: `reveal ${className}`.trim(), style: { "--reveal-index": index } as CSSProperties });

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const [tab, setTab] = useState<TabId>("home");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ home: null, experience: null, skills: null, about: null });

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    const syncHash = () => {
      const next = hashToTab[window.location.hash.replace("#", "")];
      if (next) setTab(next);
    };
    const frame = window.requestAnimationFrame(() => {
      if (saved === "ru" || saved === "en") setLanguage(saved);
      syncHash();
    });
    window.addEventListener("hashchange", syncHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  const selectTab = (next: TabId) => {
    setTab(next);
    window.history.replaceState(null, "", next === "home" ? window.location.pathname : `#${next}`);
    window.scrollTo({ top: 0 });
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = tabIds.indexOf(tab);
    const map: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabIds.length - 1 };
    if (!(event.key in map)) return;
    event.preventDefault();
    const next = tabIds[(map[event.key] + tabIds.length) % tabIds.length];
    selectTab(next);
    tabRefs.current[next]?.focus();
  };

  const cvHref = asset(language === "ru" ? "/assets/files/CV.pdf" : "/assets/files/CV-en.pdf");

  return (
    <>
      <header className="header">
        <div className="header-language">
          <LanguageSwitcher language={language} onChange={setLanguage} variant="header" />
        </div>
        <nav className="nav" role="tablist" aria-label={localize(copy.tabsGroup, language)}>
          {tabIds.map((id) => (
            <button
              key={id}
              ref={(node) => {
                tabRefs.current[id] = node;
              }}
              id={`tab-${id}`}
              className="tab"
              type="button"
              role="tab"
              aria-controls={`panel-${id}`}
              aria-selected={tab === id}
              tabIndex={tab === id ? 0 : -1}
              data-active={tab === id || undefined}
              onClick={() => selectTab(id)}
              onKeyDown={onTabKey}
            >
              {localize(copy.tabs[id], language)}
            </button>
          ))}
        </nav>
      </header>

      <div id="top" className="page">
        {tab === "home" && (
          <main id="panel-home" className="home" role="tabpanel" aria-labelledby="tab-home">
            <section className="hero">
              <div className="hero-media">
                <Image src={asset("/assets/img/profile.jpg")} alt={localize(copy.name, language)} width={1280} height={1280} priority />
                <div className="hero-gradient" aria-hidden="true" />
              </div>
              <div className="intro">
                <div className="identity">
                  <p className="identity-name">{localize(copy.name, language)}</p>
                  <p>{localize(copy.location, language)}</p>
                </div>
                <div className="description">
                  <p>{localize(copy.hero.intro, language)}</p>
                  <p className="quote-line">
                    <span>{localize(copy.hero.quoteStart, language)}</span>
                    <span className="platforms" aria-hidden="true">
                      <span className="platform"><MousePointerClick strokeWidth={2.4} /></span>
                      <span className="platform"><Bug strokeWidth={2.4} /></span>
                    </span>
                    <span>{localize(copy.hero.quoteEnd, language)}</span>
                  </p>
                </div>
              </div>
            </section>

            <div className="product-activity">
              <a className="cv-card" href={cvHref} download aria-label={localize(copy.cv.aria, language)}>
                <span className="cv-card-face" aria-hidden="true"><span>QA_</span></span>
                <span className="cv-card-copy">
                  <span className="cv-card-heading">
                    <span className="cv-card-title">{localize(copy.cv.title, language)}</span>
                    <span className="cv-card-version">{localize(copy.cv.version, language)}</span>
                  </span>
                  <span className="cv-card-description">{localize(copy.cv.description, language)}</span>
                </span>
                <span className="cv-card-open" aria-hidden="true"><ArrowDown size={18} strokeWidth={2} /></span>
              </a>
              <CareerHeatmap language={language} />
            </div>

            <section className="experience">
              <p className="label">{localize(copy.experience.label, language)}</p>
              <span className="accent" />
              <div className="experience-list">
                {jobs.map((job) => <ExperienceRow key={job.company} job={job} language={language} />)}
              </div>
            </section>
          </main>
        )}

        {tab === "experience" && (
          <main id="panel-experience" className="panel" role="tabpanel" aria-labelledby="tab-experience">
            <div className="group">
              <div {...reveal(0, "panel-intro")}>
                <p className="label">{localize(copy.experience.label, language)}</p>
                <span className="accent" />
                <p>{localize(copy.experience.intro, language)}</p>
              </div>
              <div className="job-list">
                {jobs.map((job, index) => (
                  <section className="job" key={job.company}>
                    <div {...reveal(index * 2 + 1)}>
                      <ExperienceRow job={job} language={language} />
                    </div>
                    <div {...reveal(index * 2 + 2)}>
                      <JobProjects job={job} language={language} />
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </main>
        )}

        {tab === "skills" && (
          <main id="panel-skills" className="panel" role="tabpanel" aria-labelledby="tab-skills">
            <div className="group">
              <div {...reveal(0, "panel-intro")}>
                <p className="label">{localize(copy.skills.label, language)}</p>
                <span className="accent" />
                <p>{localize(copy.skills.intro, language)}</p>
              </div>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <article className="skill reveal" key={skill.number} style={{ "--reveal-index": index + 1 } as CSSProperties}>
                    <span className="skill-number">{skill.number}</span>
                    <h3>{localize(skill.title, language)}</h3>
                    <p>{localize(skill.description, language)}</p>
                    <div className="chips">
                      {skill.tools.map((tool) => <span className="chip" key={tool}>{tool}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </main>
        )}

        {tab === "about" && (
          <main id="panel-about" className="panel" role="tabpanel" aria-labelledby="tab-about">
            <div className="group about">
              <div {...reveal(0, "about-glow")}>
                <div className="about-photo">
                  <Image src={asset("/assets/img/profile.jpg")} alt={localize(copy.name, language)} width={444} height={444} />
                </div>
              </div>
              <div {...reveal(1, "connect")}>
                <p className="label">{localize(copy.about.connect, language)}</p>
                <ul className="connect-list">
                  {contacts.map((item) => (
                    <li key={item.label}>
                      <a className="connect-link" href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li><a className="connect-link" href={asset("/assets/files/CV.pdf")} download>{localize(copy.about.cvRu, language)}</a></li>
                  <li><a className="connect-link" href={asset("/assets/files/CV-en.pdf")} download>{localize(copy.about.cvEn, language)}</a></li>
                </ul>
              </div>
              <div {...reveal(2, "about-copy")}>
                {copy.about.paragraphs.map((paragraph) => <p key={paragraph.en}>{localize(paragraph, language)}</p>)}
                <p className="muted">{localize(copy.about.quote, language)}</p>
              </div>
            </div>
          </main>
        )}
      </div>

      <div className="dock-wrap">
        <div className="dock">
          <button className="cta" type="button" aria-controls={tab === "about" ? "panel-home" : "panel-about"} onClick={() => selectTab(tab === "about" ? "home" : "about")}>
            {localize(tab === "about" ? copy.ctaBack : copy.cta, language)}
          </button>
          <div className="dock-language">
            <LanguageSwitcher language={language} onChange={setLanguage} variant="dock" />
          </div>
        </div>
      </div>
    </>
  );
}
