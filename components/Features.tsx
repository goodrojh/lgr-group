"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, FileCheck2, Radio, MousePointer2 } from "lucide-react";
import { reporting } from "@/lib/data";

function FeatureCard({
  title,
  description,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={"relative p-6 md:p-8 group overflow-hidden flex flex-col " + className}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-accent-strong transition-colors duration-300">
            <Icon size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h3>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-[320px]">{description}</p>
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

// Детерминированные высоты столбцов (без Math.random в рендере)
const BARS = Array.from({ length: 24 }, (_, i) => ({
  a: 70 + ((i * 37) % 25),
  b: 40 + ((i * 53) % 40),
}));

export default function Features() {
  const [activeMetric, setActiveMetric] = useState(0);
  const metrics = [
    { label: "Выходы", value: "27 / 28", trend: "+ замена согласована" },
    { label: "Часы", value: "3 812 ч", trend: "99,3% от плана" },
    { label: "Отклонения", value: "2", trend: "закрыты в смену" },
  ];

  return (
    <section id="control" className="bg-white py-20 md:py-24 px-5 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-14 md:mb-20 relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-4">Роли и управление</p>
              <h2 className="text-[34px] md:text-[48px] font-semibold text-gray-900 tracking-tight leading-[1.1]">
                Контроль остаётся у бизнеса. <br className="hidden md:block" />
                Кадровый контур — на стороне ЛГР.
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-500 leading-relaxed max-w-md"
            >
              Руководство видит согласованный план, факт и отклонения. Подбор, оформление, выходы и учёт — забота
              ЛГР. Финальное разделение ответственности закрепляется договором.
            </motion.p>
          </div>
        </div>

        <div className="relative border border-gray-200 rounded-[32px] overflow-hidden bg-gray-50/30">
          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[600px]">
            {/* 1. Отчётность */}
            <FeatureCard
              title="Отчётность для управления"
              description="План и факт по сменам, отработанные часы, отклонения и согласованные действия — в формате, который определяем до запуска."
              icon={Activity}
              className="md:col-span-2 md:row-span-2 border-b md:border-b-0 md:border-r border-gray-200"
            >
              <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm relative overflow-hidden group/chart flex flex-col">
                <div className="flex justify-between items-start mb-8 gap-3 flex-wrap">
                  <div className="flex gap-2">
                    {metrics.map((m, i) => (
                      <button
                        key={m.label}
                        onClick={() => setActiveMetric(i)}
                        className={
                          "px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all " +
                          (activeMetric === i ? "bg-brand-dark text-white" : "bg-gray-50 text-gray-400 hover:bg-gray-100")
                        }
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 tracking-tight">{metrics[activeMetric].value}</p>
                    <p className="text-[10px] font-bold text-accent-strong">{metrics[activeMetric].trend}</p>
                  </div>
                </div>

                <div className="flex-1 flex items-end gap-1.5 min-h-[180px]">
                  {BARS.map((bar, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: "20%" }}
                      animate={{
                        height:
                          activeMetric === 0
                            ? bar.a + "%"
                            : activeMetric === 1
                              ? bar.b + "%"
                              : i % 7 === 3
                                ? "35%"
                                : "8%",
                      }}
                      transition={{ duration: 1.5, repeat: Infinity as number, repeatType: "reverse" as const, delay: i * 0.05 }}
                      className={
                        "flex-1 rounded-t-sm " +
                        (i > 19 ? "bg-gray-100" : "bg-accent/30 group-hover/chart:bg-accent/60 transition-colors")
                      }
                    />
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  {reporting.map((r) => (
                    <p key={r} className="text-[11px] text-gray-500 flex items-start gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                      {r}
                    </p>
                  ))}
                </div>
                <div className="absolute bottom-2 right-4 font-mono text-[9px] text-gray-300 uppercase tracking-widest hidden sm:block">
                  Демо-данные
                </div>
              </div>
            </FeatureCard>

            {/* 2. Материальная ответственность */}
            <FeatureCard
              title="Материальная ответственность ЛГР"
              description="Ответственность сторон, порядок фиксации невыходов и разбора отклонений закреплены договором — до первой смены, а не после."
              icon={ShieldCheck}
              className="md:col-span-2 border-b border-gray-200"
            >
              <div className="mt-2 flex flex-col gap-3">
                {[
                  { label: "Невыход исполнителя", status: "Замена и фиксация", color: "#d1a56b" },
                  { label: "Отклонение по объёму", status: "Разбор и действия", color: "#171f27" },
                  { label: "Ущерб на объекте", status: "По договору", color: "#01bc7d" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-medium text-gray-700">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.status}</span>
                  </motion.div>
                ))}
              </div>
            </FeatureCard>

            {/* 3. Оформление */}
            <FeatureCard
              title="Оформление и учёт"
              description="Подбор, оформление, документы и учёт часов — на стороне ЛГР. Ваш HR и бухгалтерия не участвуют."
              icon={FileCheck2}
              className="border-b md:border-b-0 md:border-r border-gray-200"
            >
              <div className="mt-2 bg-[#171f27] rounded-xl p-4 font-mono text-[10px] leading-tight overflow-hidden relative">
                <div className="flex gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <div className="space-y-1.5 text-gray-300">
                  <p>
                    <span className="text-accent">договор</span> ............ подписан
                  </p>
                  <p>
                    <span className="text-accent">регламент</span> .......... согласован
                  </p>
                  <p>
                    <span className="text-accent">состав</span> ............. 24 чел.
                  </p>
                  <p>
                    <span className="text-accent">табель</span> ............. 3 812 ч
                  </p>
                  <p>
                    <span className="text-accent">акт</span> ................ за период
                  </p>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity as number }}
                  className="absolute bottom-4 right-4 w-1.5 h-3 bg-accent/70"
                />
              </div>
            </FeatureCard>

            {/* 4. Коммуникация */}
            <FeatureCard
              title="Единая коммуникация"
              description="Один ответственный менеджер ЛГР, согласованные каналы связи и порядок решения вопросов до первой смены."
              icon={Radio}
              className=""
            >
              <div className="mt-2 relative h-28 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-dashed border-gray-200 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute w-24 h-24 rounded-full border border-dashed border-gray-100 animate-[spin_15s_linear_infinite_reverse]" />
                </div>
                <div className="relative flex -space-x-3">
                  {["РО", "ЛГР", "Бр", "См"].map((t, i) => (
                    <motion.div
                      key={t}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className={
                        "relative w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold " +
                        (i === 1 ? "bg-accent text-brand-dark" : "bg-gray-100 text-gray-600")
                      }
                    >
                      {t}
                      {i === 1 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />}
                    </motion.div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-100 shadow-sm whitespace-nowrap">
                  <MousePointer2 size={10} className="text-accent-strong fill-accent-strong" />
                  <span className="text-[9px] font-bold text-gray-600">Менеджер ЛГР на связи</span>
                </div>
              </div>
            </FeatureCard>
          </div>
        </div>
      </div>
    </section>
  );
}
