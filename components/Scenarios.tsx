"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Building2, TrendingUp, Rocket, Boxes, UserPlus, ArrowRight, CheckCircle2 } from "lucide-react";
import { scenarios } from "@/lib/data";
import { bg } from "@/lib/site";
import { CtaButton } from "./LeadModal";

const icons = [Building2, TrendingUp, Rocket, Boxes, UserPlus];

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

function ChainMockup({ chain, active }: { chain: string[]; active: number }) {
  return (
    <div className="space-y-5">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-3">
        {chain.map((step, i) => (
          <motion.div
            key={step}
            variants={item}
            className="bg-white p-3.5 md:p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={
                  "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold " +
                  (i <= active ? "bg-accent text-brand-dark" : "bg-gray-50 text-gray-400 border border-gray-100")
                }
              >
                {i + 1}
              </div>
              <p className="font-semibold text-[13px] md:text-sm text-[#111] leading-tight">{step}</p>
            </div>
            {i <= active ? (
              <CheckCircle2 className="w-4 h-4 text-accent-strong" />
            ) : (
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider shrink-0">далее</span>
            )}
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#171f27] p-5 rounded-2xl text-white shadow-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Предварительный расчёт</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          Ориентир по составу и стоимости — в течение 30 минут после получения исходных данных об объекте.
        </p>
      </motion.div>
    </div>
  );
}

export default function Scenarios() {
  const [activeTab, setActiveTab] = useState(0);
  const s = scenarios[activeTab];

  return (
    <motion.section
      id="scenarios"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white py-20 md:py-24 px-5 md:px-12 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-4">Сценарии запуска</p>
          <h2 className="font-semibold text-[34px] md:text-[48px] text-[#111111] leading-tight mb-4 tracking-tight">
            Подключаем персонал под тот сценарий,
            <br className="hidden md:block" /> который нужен бизнесу сейчас
          </h2>
          <p className="text-[16px] text-[#898988] max-w-[560px] mx-auto leading-relaxed">
            Сначала определяем входные данные и формат запуска, затем согласовываем контроль и итоговую отчётность.
          </p>
        </div>

        <div className="bg-[#f5f4f4] rounded-t-[32px] flex flex-row overflow-x-auto no-scrollbar border-x border-t border-[#e5e5e4] p-2">
          {scenarios.map((sc, index) => {
            const Icon = icons[index];
            const active = activeTab === index;
            return (
              <motion.button
                key={sc.id}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.02 }}
                className={
                  "flex-1 min-w-[190px] md:min-w-0 py-4 px-4 flex items-center justify-center gap-3 transition-all duration-500 relative rounded-[22px] group outline-none border " +
                  (active ? "bg-white border-gray-100 text-[#111]" : "border-transparent text-[#777] hover:text-[#333] hover:bg-white/50")
                }
              >
                <div
                  className={
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 " +
                    (active
                      ? "bg-accent text-brand-dark shadow-[0_8px_20px_-4px_rgba(209,165,107,0.5)]"
                      : "bg-white border border-gray-200 text-[#888] group-hover:border-accent/40 group-hover:text-accent-strong")
                  }
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={"text-[14px] whitespace-nowrap tracking-tight " + (active ? "font-bold" : "font-medium")}>
                  {sc.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="bg-white rounded-b-[32px] border-x border-b border-[#efefef] min-h-[520px] p-6 md:p-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              className="grid lg:grid-cols-[45%_55%] gap-10 lg:gap-16 items-center"
            >
              <div className="flex flex-col gap-7">
                <div>
                  <span className="inline-block border border-accent/30 rounded-full px-4 py-1 text-[11px] font-bold tracking-[2px] text-accent-strong bg-accent/10 mb-4 uppercase">
                    {s.badge}
                  </span>
                  <h3 className="font-semibold text-[28px] md:text-[38px] text-[#111111] leading-[1.15] mt-2 tracking-tight">
                    {s.heading}
                  </h3>
                </div>
                <p className="text-[16px] text-[#676767] leading-[1.7] max-w-[440px]">{s.description}</p>
                <p className="text-sm text-gray-400">{s.short}</p>
                <div>
                  <CtaButton
                    source={`Сценарий: ${s.title}`}
                    title={`Рассчитать сценарий «${s.title}»`}
                    className="relative overflow-hidden bg-[#171f27] text-white rounded-2xl px-8 py-4 text-[15px] font-bold inline-flex items-center gap-3 hover:bg-accent hover:text-brand-dark transition-all duration-500 group"
                  >
                    <span className="relative z-10">Рассчитать этот сценарий</span>
                    <div className="relative z-10 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </CtaButton>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[600px] md:aspect-[4/3] bg-[#171f27] rounded-[36px] md:rounded-[48px] p-5 py-8 md:p-12 flex items-center justify-center overflow-hidden group border border-gray-100">
                  <div className="absolute inset-0 z-0">
                    <img
                      src={bg(s.image)}
                      alt=""
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[3000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171f27]/80 to-transparent" />
                  </div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity as number, duration: 4, ease: "easeInOut" as const }}
                    className="w-full relative z-10 bg-white/70 backdrop-blur-[24px] border border-white/80 rounded-[28px] p-5 md:p-7 shadow-[0_40px_80px_rgba(0,0,0,0.25)] overflow-hidden"
                  >
                    <ChainMockup chain={s.chain} active={Math.min(activeTab + 1, 3)} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
