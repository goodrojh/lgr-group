"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { priceList, priceFactors } from "@/lib/data";
import { asset } from "@/lib/site";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const included = [
  "Подбор и проверка исполнителей под требования объекта",
  "Оформление и кадровый учёт на стороне ЛГР",
  "Организация выходов и замена при невыходе",
  "Менеджер ЛГР и единый канал коммуникации",
  "Учёт часов, план/факт и отчётность по регламенту",
  "Материальная ответственность по договору",
];

const extra = ["Транспорт и доставка персонала", "Рабочая одежда и СИЗ", "Питание и бытовые условия", "Допуски и медицинские документы"];

export default function Pricing({ compact = false }: { compact?: boolean }) {
  const min = Math.min(...priceList.map((p) => p.rate));
  return (
    <section id="pricing" className="w-full bg-[#f7f7f9] py-20 md:py-24 px-5 md:px-[60px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 flex flex-col items-center"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-4">Стоимость</p>
            <h2 className="font-semibold text-[34px] md:text-[48px] text-[#111011] leading-[1.15] mb-3 max-w-[800px] tracking-tight">
              Прозрачные ставки. <br className="hidden md:block" /> Итог — под условия объекта
            </h2>
            <p className="text-[16px] text-[#898989] max-w-[560px]">
              Базовые ставки помогут оценить порядок затрат. Итоговая стоимость зависит от состава, графика,
              операций, условий площадки и даты запуска.
            </p>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full grid lg:grid-cols-[1.15fr_1fr] gap-6 items-stretch"
        >
          {/* Таблица ставок */}
          <motion.div variants={itemVariants} className="bg-white rounded-[24px] border border-black/5 overflow-hidden">
            <div className="p-7 md:p-8 border-b border-gray-100 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-semibold text-[24px] text-[#111011] mb-1">Базовые ставки</h3>
                <p className="text-sm text-[#898989]">Ориентир для предварительного расчёта, ₽/час</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wider text-gray-400">от</p>
                <p className="text-[36px] font-semibold text-[#111011] leading-none tracking-tight">
                  {min} <span className="text-base font-normal text-[#898989]">₽/час</span>
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2">
              {priceList.map((p, i) => (
                <div
                  key={p.role}
                  className={
                    "flex items-center justify-between px-7 md:px-8 py-3.5 text-[15px] border-b border-gray-50 " +
                    (i % 2 === 0 ? "sm:border-r" : "")
                  }
                >
                  <span className="text-[#333]">{p.role}</span>
                  <span className="font-semibold text-[#111011] whitespace-nowrap">от {p.rate} ₽/ч</span>
                </div>
              ))}
            </div>
            <div className="p-7 md:p-8">
              <p className="text-xs text-gray-400 leading-relaxed">
                Цифры в таблице не заменяют расчёт объекта: итог зависит от входных условий и состава работ.
                При сравнении с другими предложениями проверяйте, что входит в ставку.
              </p>
            </div>
          </motion.div>

          {/* Что входит */}
          <div className="flex flex-col gap-6">
            <motion.div
              variants={itemVariants}
              className="flex-1 rounded-[24px] p-7 md:p-8 relative overflow-hidden flex flex-col justify-between group text-white"
            >
              <div className="absolute inset-0 z-0">
                <img src={asset("/images/pricing.webp")} alt="" className="w-full h-full object-cover [filter:contrast(1.2)]" />
                <div className="absolute inset-0 bg-[#171f27]/85" />
              </div>
              <div className="relative z-10">
                <h3 className="font-semibold text-[24px] mb-1">Что уже входит в ставку</h3>
                <p className="text-sm text-white/60 mb-6">Организация работы персонала — на стороне ЛГР</p>
                <ul className="space-y-3">
                  {included.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] text-white/90">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-accent" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="h-px w-full bg-white/15 my-6" />
                <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Уточняется под площадку</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {extra.map((f) => (
                    <li key={f} className="text-sm text-white/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative z-10 mt-8">
                <Link
                  href="/contacts/"
                  className="inline-flex items-center gap-2.5 bg-accent hover:bg-peach text-brand-dark rounded-[14px] py-[14px] px-7 text-[15px] font-bold transition-all duration-200"
                >
                  Получить расчёт под объект <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {!compact && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full mt-6 grid md:grid-cols-4 gap-3"
          >
            {priceFactors.map((f) => (
              <motion.div key={f} variants={itemVariants} className="bg-white rounded-[16px] border border-black/5 px-5 py-4 text-sm text-[#555]">
                {f}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
