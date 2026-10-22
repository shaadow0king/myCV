"use client";

import { ArrowDown, ArrowLeft, Laptop } from "lucide-react";
import { useEffect, useState } from "react";

type Language = "ru" | "en";
type Copy = { ru: string; en: string };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Product = {
  name: string;
  face: string;
  platform: Copy;
  description: Copy;
  download: string;
};

// Add a product here; the page lists them in this order.
const products: Product[] = [
  {
    name: "Mistype",
    face: "Mt",
    platform: { ru: "macOS 15+ · Apple Silicon", en: "macOS 15+ · Apple Silicon" },
    description: {
      ru: "Исправляет текст, набранный не в той раскладке: ghbdtn → привет. Бесплатно, без подписки.",
      en: "Fixes text typed in the wrong keyboard layout: ghbdtn → привет. Free, no subscription.",
    },
    download: "https://github.com/shaadow0king/keyboard-switcher/releases/latest/download/Mistype.zip",
  },
];

const copy = {
  back: { ru: "Резюме", en: "Resume" },
  title: { ru: "Продукты", en: "Products" },
  intro: { ru: "Программы и утилиты, которые я сделал.", en: "Apps and utilities I've made." },
  download: { ru: "Скачать", en: "Download" },
  macOnly: { ru: "Только для Mac", en: "Mac only" },
  langGroup: { ru: "Выбор языка", en: "Language selector" },
};

export default function Products() {
  const [language, setLanguage] = useState<Language>("ru");
  const t = (value: Copy) => value[language];

  // Same language choice as the home page.
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

  return (
    <>
      <header className="header">
        {/* The home page moves its switcher to the bottom dock on narrow screens; this page has no dock, so it stays. */}
        <div className="header-language products-language">
          <div className="switcher" data-variant="header" role="group" aria-label={t(copy.langGroup)}>
            {(["en", "ru"] as Language[]).map((item) => (
              <button
                key={item}
                className="switcher-option"
                type="button"
                lang={item}
                aria-label={item === "en" ? "English" : "Русский"}
                aria-pressed={language === item}
                data-active={language === item || undefined}
                onClick={() => setLanguage(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <nav className="nav">
          <a className="tab products-back" href={`${basePath}/`}>
            <ArrowLeft size={14} strokeWidth={2.2} aria-hidden="true" />
            {t(copy.back)}
          </a>
        </nav>
      </header>

      <div className="page">
        <main className="panel">
          <div className="group">
            <div className="panel-intro">
              <h1 className="label products-title">{t(copy.title)}</h1>
              <p>{t(copy.intro)}</p>
            </div>
            <ul className="products-list">
              {products.map((product) => (
                <li key={product.name}>
                  <a className="cv-card" href={product.download} aria-label={`${t(copy.download)} ${product.name}`}>
                    <span className="cv-card-face" aria-hidden="true"><span>{product.face}</span></span>
                    <span className="cv-card-copy">
                      <span className="cv-card-heading">
                        <span className="cv-card-title">{product.name}</span>
                        <span className="cv-card-version products-platform" title={t(copy.macOnly)}>
                          <Laptop size={13} strokeWidth={2} aria-label={t(copy.macOnly)} />
                          {t(product.platform)}
                        </span>
                      </span>
                      <span className="cv-card-description">{t(product.description)}</span>
                    </span>
                    <span className="cv-card-open" aria-hidden="true"><ArrowDown size={18} strokeWidth={2} /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
