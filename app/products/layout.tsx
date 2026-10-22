import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Продукты — Геворк Акопян",
  description: "Продукты, которые я создаю с помощью AI.",
  alternates: { canonical: "./" },
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
