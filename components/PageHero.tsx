"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Phone } from "lucide-react";
import Nav from "./Nav";
import { asset, site } from "@/lib/site";

const defaultFacts = [
  { value: "5–7 дней", label: "выход персонала" },
  { value: "Под ваш объём", label: "состав и график смен" },
  { value: "Оформление и учёт", label: "берём на себя" },
  { value: "Контроль выходов", label: "сопровождение после запуска" },
];

export default function PageHero({
  eyebrow,
  title,
  lead,
  image = "warehouse",
  cta = "Обсудить проект",
  ctaHref = "/contacts/",
  secondary,
  crumbs = [],
  facts = defaultFacts,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  image?: string;
  cta?: string;
  ctaHref?: string;
  secondary?: { label: string; href: string };
  crumbs?: { label: string; href: string }[];
  facts?: { value: string; label: string }[] | null;
  compact?: boolean;
}) {
  return (
    <section className={"relative bg-[#0b0f14] overflow-hidden " + (compact ? "pb-14" : "pb-20")}>
      <img
        src={asset(`/images/${image}.webp`)}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-35 [filter:contrast(1.25)_saturate(0.9)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14]/80 via-[#0b0f14]/70 to-[#0b0f14]" />
      <div className="absolute -top-40 right-0 w-[700px] h-[500px] rounded-full bg-accent/15 blur-[140px]" />
      <Nav />

      <div className="relative max-w-6xl mx-auto px-5 md:px-6 pt-[120px] md:pt-[150px]">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center flex-wrap gap-1.5 text-xs text-white/40 mb-6"
          aria-label="Хлебные крошки"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Главная
          </Link>
          {crumbs.map((c) => (
            <React.Fragment key={c.href}>
              <ChevronRight size={12} />
              <Link href={c.href} className="hover:text-white transition-colors">
                {c.label}
              </Link>
            </React.Fragment>
          ))}
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-4"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-semibold text-[34px] sm:text-5xl md:text-[56px] leading-[1.08] tracking-[-0.02em] text-white max-w-4xl"
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-white/75 max-w-[640px] leading-relaxed mt-5"
          >
            {lead}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 mt-8"
        >
          <Link
            href={ctaHref}
            className="rounded-full px-7 py-4 text-center text-base font-semibold bg-accent text-brand-dark hover:bg-peach transition-all hover:scale-105 active:scale-95"
          >
            {cta}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="rounded-full px-7 py-4 text-center text-base font-semibold bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              {secondary.label}
            </Link>
          )}
          <a href={site.phoneHref} className="sm:ml-2 inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium justify-center">
            <Phone size={16} className="text-accent" /> {site.phone}
          </a>
        </motion.div>

        {facts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl"
          >
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl px-5 py-4">
                <p className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight">{f.value}</p>
                <p className="text-[12px] text-white/50 leading-snug mt-1">{f.label}</p>
              </div>
            ))}
          </motion.div>
        )}
        <p className="text-sm text-white/40 mt-6">
          Рассчитаем запуск вашего объекта в течение 30 минут после получения исходных данных
        </p>
      </div>
    </section>
  );
}
