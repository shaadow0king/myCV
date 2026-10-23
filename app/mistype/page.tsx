import type { Metadata } from "next";

// Short link for posts: starts the download from GitHub, so it counts on the products page.
const download = "https://github.com/shaadow0king/keyboard-switcher/releases/latest/download/Mistype.dmg";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Mistype — скачать для Mac",
  description: "Бесплатная программа для Mac, которая исправляет текст, набранный не в той раскладке.",
  robots: { index: false },
};

export default function MistypeDownload() {
  return (
    <main style={{ padding: "48px 16px", maxWidth: 560, margin: "0 auto", lineHeight: 1.5 }}>
      <meta httpEquiv="refresh" content={`0; url=${download}`} />
      <h1>Mistype</h1>
      <p>
        Скачивание началось. Если нет, <a href={download}>скачайте Mistype.dmg</a>. Нужна macOS 15 или новее.
      </p>
      <p>
        <a href={`${basePath}/products/`}>Подробнее о программе</a>
      </p>
    </main>
  );
}
