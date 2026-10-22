import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Продукты — Геворк Акопян",
  description: "Небольшие бесплатные программы: название, что делает, скачать.",
  alternates: { canonical: "./" },
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
