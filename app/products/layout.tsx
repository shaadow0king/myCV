import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Продукты — Геворк Акопян",
  description: "Программы и утилиты, которые я сделал.",
  alternates: { canonical: "./" },
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
