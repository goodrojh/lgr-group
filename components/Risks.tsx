"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { riskQuestions } from "@/lib/data";
import { asset } from "@/lib/site";

export default function Risks() {
  return (
    <section className="bg-[#0b0f14] text-white py-20 md:py-24 px-5 md:px-12 relative overflow-hidden">
      <img
        src={asset("/images/hotel.webp")}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-25 [filter:contrast(1.2)]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f14] via-[#0b0f14]/90 to-[#0b0f14]/60" />
      <div className="max-w-[1200px] mx-auto relative grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Управляемость и риски</p>
          <h2 className="text-[34px] md:text-[48px] font-semibold tracking-tight leading-[1.1] mb-5">
            Масштабирование начинается с понятных границ ответственности
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-md">
            Эти вопросы должны получить конкретный ответ до первой смены, а не после возникновения отклонения.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-3">
          {riskQuestions.map((q, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 flex gap-3 hover:bg-white/10 transition-colors"
            >
              <ShieldCheck size={18} className="text-accent shrink-0 mt-0.5" />
              <p className="text-[15px] text-white/85 leading-relaxed">{q}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
