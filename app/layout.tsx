import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { asset, site } from "@/lib/site";
import CookieBanner from "@/components/CookieBanner";
import { LeadModalProvider } from "@/components/LeadModal";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Аутсорсинг линейного персонала в Санкт-Петербурге — ЛГР",
    template: "%s — ЛГР",
  },
  description:
    "Закроем потребность в линейном персонале за 5–7 дней. Склады, производство, ритейл, кухни, гостиницы. Предварительный расчёт за 30 минут. Санкт-Петербург и Ленинградская область.",
  icons: { icon: asset("/images/lgr-favicon.png") },
  openGraph: {
    title: "ЛГР — управляемый аутсорсинг линейного персонала",
    description: site.tagline,
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#111]">
        <LeadModalProvider>
          {children}
          <CookieBanner />
        </LeadModalProvider>
      </body>
    </html>
  );
}
