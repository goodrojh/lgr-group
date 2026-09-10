"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/site";
import type { Profession } from "@/lib/data";

/** Заголовок секции: надзаголовок + h2 + описание. */
export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={"mb-12 " + (align === "center" ? "text-center mx-auto max-w-[720px]" : "max-w-[760px]")}
    >
      <p className={"text-xs font-semibold tracking-[0.2em] uppercase mb-4 " + (dark ? "text-accent" : "text-accent-strong")}>
        {eyebrow}
      </p>
      <h2 className={"text-[30px] md:text-[44px] font-semibold tracking-tight leading-[1.1] " + (dark ? "text-white" : "text-gray-900")}>
        {title}
      </h2>
      {text && <p className={"text-base md:text-lg leading-relaxed mt-4 " + (dark ? "text-white/60" : "text-gray-500")}>{text}</p>}
    </motion.div>
  );
}

/** Список с галочками в карточках. */
export function CheckList({ items, cols = 2 }: { items: string[]; cols?: 1 | 2 | 3 | 4 }) {
  const grid = { 1: "grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={"grid gap-3 " + grid}>
      {items.map((it, i) => (
        <motion.div
          key={it}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 px-5 py-4 hover:bg-white hover:border-accent/40 hover:shadow-lg transition-all"
        >
          <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center shrink-0">
            <Check size={12} className="text-accent-strong" />
          </span>
          <span className="text-[15px] text-gray-700 leading-relaxed">{it}</span>
        </motion.div>
      ))}
    </div>
  );
}

/** Карточка профессии. */
export function ProfessionCard({ p, index = 0 }: { p: Profession; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 6) * 0.06 }}
    >
      <Link
        href={`/${p.industry}/${p.slug}/`}
        className="group block rounded-[20px] bg-white border border-[#f1f1f1] overflow-hidden hover:border-accent hover:shadow-xl transition-all duration-300 h-full"
      >
        <div className="relative h-36 overflow-hidden bg-[#171f27]">
          <img
            src={asset(`/images/${p.image}.webp`)}
            alt={p.imageAlt}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171f27]/60 to-transparent" />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-[#101110] text-[16px]">{p.name}</h3>
            <ArrowUpRight size={18} className="text-gray-300 group-hover:text-accent-strong transition-colors shrink-0" />
          </div>
          <p className="text-[#666767] text-[13px] leading-[1.55] mt-2 line-clamp-2">{p.tasks.join(" ")}</p>
        </div>
      </Link>
    </motion.div>
  );
}
