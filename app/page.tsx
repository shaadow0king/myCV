"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Language = "ru" | "en";
type Copy = { ru: string; en: string };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const copy = {
  identity: { ru: "Геворк Акопян", en: "Gevork Akopyan" },
  nav: {
    home: { ru: "Главная", en: "Home" },
    experience: { ru: "Опыт", en: "Experience" },
    skills: { ru: "Навыки", en: "Skills" },
    contact: { ru: "Контакты", en: "Contact" },
  },
  hero: {
    role: {
      ru: "QA Engineer · Mobile / Games · Белград, Сербия",
      en: "QA Engineer · Mobile / Games · Belgrade, Serbia",
    },
    greeting: { ru: "Привет, я", en: "Hi, I’m" },
    name: { ru: "Геворк", en: "Gevork" },
    intro: {
      ru: "Тестирую приложения на Android, iOS, Huawei, Amazon и Windows. Оцениваю стабильность, воспроизводимость и влияние ошибок на пользовательский опыт, уделяю внимание UX/UI и логике работы приложений.",
      en: "I test applications across Android, iOS, Huawei, Amazon and Windows. I assess stability, reproducibility and the impact of defects on user experience, with attention to UX/UI and application behavior and logic.",
    },
    quote: {
      ru: "Но чаще всего на что-то жму — и всё ломается.",
      en: "Usually I press something — and everything breaks.",
    },
    contact: { ru: "Связаться со мной", en: "Contact me" },
    experience: { ru: "Смотреть опыт", en: "View experience" },
  },
  experience: {
    label: { ru: "Опыт", en: "Experience" },
    title: { ru: "Профессиональный", en: "Professional" },
    accent: { ru: "опыт", en: "experience" },
    intro: {
      ru: "От тестирования фич до мониторинга релизов, проверки аналитики и наставничества.",
      en: "From feature testing to release monitoring, analytics validation and mentoring.",
    },
    current: { ru: "Сейчас", en: "Current" },
    showMore: { ru: "Показать ещё", en: "Show" },
    items: { ru: "пунктов", en: "more items" },
  },
  skills: {
    label: { ru: "Навыки и инструменты", en: "Skills & tools" },
    title: { ru: "Рабочий стек", en: "A toolset" },
    accent: { ru: "по задачам", en: "built around tasks" },
    intro: {
      ru: "Инструменты, с которыми работаю на этапах анализа требований, тестирования, диагностики, аналитики и релизов.",
      en: "Tools I use across requirements analysis, testing, diagnostics, analytics and releases.",
    },
  },
  contact: {
    label: { ru: "Контакты", en: "Contact" },
    title: { ru: "Связаться", en: "Get" },
    accent: { ru: "со мной", en: "in touch" },
    intro: {
      ru: "Быстрее всего связаться со мной по почте или в Telegram. Полные версии резюме также доступны в этом разделе.",
      en: "The fastest way to reach me is by email or Telegram. Full CV versions are also available in this section.",
    },
    cvRu: { ru: "Резюме на русском", en: "CV in Russian" },
    cvEn: { ru: "Резюме на английском", en: "CV in English" },
    download: { ru: "Скачать", en: "Download" },
  },
};

const focusItems: { title: Copy; detail: Copy }[] = [
  {
    title: { ru: "Кросс-платформенное тестирование", en: "Cross-platform testing" },
    detail: { ru: "Android · iOS · Huawei · Amazon · Windows", en: "Android · iOS · Huawei · Amazon · Windows" },
  },
  {
    title: { ru: "Релизный цикл", en: "Release cycle" },
    detail: { ru: "Требования · регресс · мониторинг", en: "Requirements · regression · monitoring" },
  },
  {
    title: { ru: "Аналитика и трафик", en: "Analytics & traffic" },
    detail: { ru: "Amplitude · Swrve · Charles Proxy", en: "Amplitude · Swrve · Charles Proxy" },
  },
];

const experience: {
  role: string;
  company: string;
  dates: Copy;
  current?: boolean;
  bullets: Copy[];
}[] = [
  {
    role: "QA Specialist",
    company: "Glam AI",
    dates: { ru: "Июль 2025 — настоящее время", en: "July 2025 — Present" },
    current: true,
    bullets: [],
  },
  {
    role: "QA Specialist",
    company: "Playrix",
    dates: { ru: "Октябрь 2023 — май 2025", en: "October 2023 — May 2025" },
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
    role: "QA Specialist",
    company: "Playgendary",
    dates: { ru: "Апрель 2023 — август 2023", en: "April 2023 — August 2023" },
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
    role: "QA Engineer",
    company: "DominiGames",
    dates: { ru: "Март 2022 — апрель 2023", en: "March 2022 — April 2023" },
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

const skills: { number: string; title: Copy; description: Copy; tools: string }[] = [
  {
    number: "/01",
    title: { ru: "Требования и документация", en: "Requirements & documentation" },
    description: {
      ru: "Анализ требований, декомпозиция, тест-кейсы, чек-листы и тест-планы.",
      en: "Requirements analysis, decomposition, test cases, checklists and test plans.",
    },
    tools: "TestRail, Qase, Confluence, Coda, Notion.",
  },
  {
    number: "/02",
    title: { ru: "Тестирование и релизы", en: "Testing & releases" },
    description: {
      ru: "Функциональное, нефункциональное, альфа/бета и регрессионное тестирование на Android, iOS, Huawei, Amazon и Windows.",
      en: "Functional, non-functional, alpha/beta and regression testing on Android, iOS, Huawei, Amazon and Windows.",
    },
    tools: "Android Studio, Xcode, 3uTools, Jenkins, TeamCity.",
  },
  {
    number: "/03",
    title: { ru: "Аналитика и наблюдаемость", en: "Analytics & observability" },
    description: {
      ru: "Проверка аналитических событий и сырых данных, работа с конфигурациями и анализ сбоев.",
      en: "Analytics-event and raw-data validation, configuration work and crash analysis.",
    },
    tools: "Amplitude, Swrve, Adjust, Firebase, Sentry.",
  },
  {
    number: "/04",
    title: { ru: "Трафик и продуктовая работа", en: "Traffic & product work" },
    description: {
      ru: "Перехват и подмена запросов, проверка трафика, баг-репорты, контроль версий и пользовательские обращения.",
      en: "Request interception, traffic validation, bug reporting, version control and user requests.",
    },
    tools: "Charles Proxy, Postman, Git, Asana, HelpShift.",
  },
];

const localize = (value: Copy, language: Language) => value[language];

const moreItemsLabel = (count: number, language: Language) => {
  if (language === "en") return `Show ${count} more items`;
  const noun = count >= 2 && count <= 4 ? "пункта" : "пунктов";
  return `Показать ещё ${count} ${noun}`;
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    const frame = window.requestAnimationFrame(() => {
      if (saved === "ru" || saved === "en") setLanguage(saved);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.08 },
        transition: { duration: 0.42, ease: "easeOut" as const },
      };

  const navItems = [
    ["top", copy.nav.home],
    ["experience", copy.nav.experience],
    ["skills", copy.nav.skills],
    ["contact", copy.nav.contact],
  ] as const;

  return (
    <>
      <header className="site-header">
        <div className="shell site-nav">
          <a className="identity" href="#top" aria-label={`${localize(copy.identity, language)} — ${localize(copy.nav.home, language)}`}>
            <Image className="identity-avatar" src={asset("/assets/img/profile.jpg")} alt={localize(copy.identity, language)} width={84} height={84} priority />
            <span>{localize(copy.identity, language)}</span>
          </a>
          <nav className="nav-links" aria-label={language === "ru" ? "Основная навигация" : "Main navigation"}>
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`}>{localize(label, language)}</a>
            ))}
          </nav>
          <div className="language-switch" role="group" aria-label={language === "ru" ? "Язык сайта" : "Site language"}>
            {(["en", "ru"] as Language[]).map((item) => (
              <button key={item} type="button" className={language === item ? "active" : ""} onClick={() => setLanguage(item)} aria-pressed={language === item}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="shell hero-card">
            <div className="hero-grid">
              <motion.div className="portrait-column" {...reveal}>
                <div className="portrait-frame">
                  <Image src={asset("/assets/img/profile.jpg")} alt={localize(copy.identity, language)} width={480} height={600} priority />
                </div>
                <blockquote className="quote">{localize(copy.hero.quote, language)}</blockquote>
              </motion.div>

              <div className="hero-content">
                <motion.p className="role" {...reveal}>{localize(copy.hero.role, language)}</motion.p>
                <motion.h1 {...reveal}>
                  <span>{localize(copy.hero.greeting, language)}</span>{" "}
                  <em>{localize(copy.hero.name, language)}</em>
                </motion.h1>
                <motion.p className="hero-intro" {...reveal}>{localize(copy.hero.intro, language)}</motion.p>
                <motion.div className="hero-actions" {...reveal}>
                  <a className="button button-primary" href="#contact">{localize(copy.hero.contact, language)}</a>
                  <a className="button button-secondary" href="#experience">{localize(copy.hero.experience, language)}</a>
                </motion.div>
                <motion.div className="focus-strip" {...reveal}>
                  {focusItems.map((item) => (
                    <div className="focus-item" key={item.title.en}>
                      <strong>{localize(item.title, language)}</strong>
                      <span>{localize(item.detail, language)}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section" id="experience">
          <div className="shell section-card">
            <div className="section-inner">
              <motion.div className="section-head" {...reveal}>
                <div>
                  <p className="section-tag">{localize(copy.experience.label, language)}</p>
                  <h2><span>{localize(copy.experience.title, language)}</span>{" "}<em>{localize(copy.experience.accent, language)}</em></h2>
                </div>
                <p className="section-copy">{localize(copy.experience.intro, language)}</p>
              </motion.div>

              <div className="timeline">
                {experience.map((item) => {
                  const visibleBullets = item.bullets.slice(0, 3);
                  const hiddenBullets = item.bullets.slice(3);
                  return (
                    <motion.article className="timeline-item" key={`${item.company}-${item.dates.en}`} {...reveal}>
                      <p className="date">{localize(item.dates, language)}</p>
                      <div className="position-row">
                        <h3>{item.role}</h3>
                        <span className="company">{item.company}</span>
                        {item.current && <span className="current-badge">{localize(copy.experience.current, language)}</span>}
                      </div>
                      {visibleBullets.length > 0 && (
                        <ul className="duties">
                          {visibleBullets.map((bullet) => <li key={bullet.en}>{localize(bullet, language)}</li>)}
                        </ul>
                      )}
                      {hiddenBullets.length > 0 && (
                        <details className="more-details">
                          <summary>{moreItemsLabel(hiddenBullets.length, language)}</summary>
                          <ul className="duties">
                            {hiddenBullets.map((bullet) => <li key={bullet.en}>{localize(bullet, language)}</li>)}
                          </ul>
                        </details>
                      )}
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="page-section" id="skills">
          <div className="shell section-card">
            <div className="section-inner">
              <motion.div className="section-head" {...reveal}>
                <div>
                  <p className="section-tag">{localize(copy.skills.label, language)}</p>
                  <h2><span>{localize(copy.skills.title, language)}</span>{" "}<em>{localize(copy.skills.accent, language)}</em></h2>
                </div>
                <p className="section-copy">{localize(copy.skills.intro, language)}</p>
              </motion.div>

              <div className="skills-grid">
                {skills.map((skill) => (
                  <motion.article className="skill-card" key={skill.number} {...reveal}>
                    <span className="skill-number">{skill.number}</span>
                    <h3>{localize(skill.title, language)}</h3>
                    <p>{localize(skill.description, language)}</p>
                    <strong>{skill.tools}</strong>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="page-section" id="contact">
          <div className="shell section-card contact-card">
            <motion.div className="section-inner contact-layout" {...reveal}>
              <div>
                <p className="section-tag">{localize(copy.contact.label, language)}</p>
                <h2><span>{localize(copy.contact.title, language)}</span>{" "}<em>{localize(copy.contact.accent, language)}</em></h2>
                <p className="contact-copy">{localize(copy.contact.intro, language)}</p>
              </div>
              <div className="contact-actions">
                <a className="contact-button contact-button-wide" href="mailto:Im.gework@gmail.com"><span><strong>Email</strong><small>Im.gework@gmail.com</small></span><b aria-hidden="true">↗</b></a>
                <a className="contact-button" href="https://t.me/dduck0" target="_blank" rel="noreferrer"><span><strong>Telegram</strong><small>@dduck0</small></span><b aria-hidden="true">↗</b></a>
                <a className="contact-button" href="https://www.linkedin.com/in/gevork-akopyan-066948247/" target="_blank" rel="noreferrer"><span><strong>LinkedIn</strong><small>Gevork Akopyan</small></span><b aria-hidden="true">↗</b></a>
                <a className="contact-button cv-button" href={asset("/assets/files/CV.pdf")} download><span><strong>{localize(copy.contact.cvRu, language)}</strong><small>PDF · {localize(copy.contact.download, language)}</small></span><b aria-hidden="true">↓</b></a>
                <a className="contact-button cv-button" href={asset("/assets/files/CV-en.pdf")} download><span><strong>{localize(copy.contact.cvEn, language)}</strong><small>PDF · {localize(copy.contact.download, language)}</small></span><b aria-hidden="true">↓</b></a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer><div className="shell">Gevork Akopyan · QA Engineer</div></footer>
    </>
  );
}
