"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Nav from "./Nav";
import { CtaButton } from "./LeadModal";
import { bg, site } from "@/lib/site";
import { keyFacts } from "@/lib/data";

export default function Hero() {
  return (
    <section className="min-h-[92vh] flex flex-col bg-[#0b0f14] relative overflow-hidden">
      {/* Фон: фото объекта + затемнение. Слот под видео (Kling) — заменить <img> на <video autoPlay muted loop playsInline>. */}
      <img
        src={bg("home-hero")}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0b0f14]/85 via-[#0b0f14]/60 to-[#0b0f14]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-accent/15 blur-[140px] z-[1]" />

      <Nav />

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-5 md:px-6 pt-[130px] md:pt-[150px] pb-20 z-10">
        <div className="flex flex-col items-center w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-5"
          >
            Управляемый аутсорсинг линейного персонала · СПб и ЛО
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
            className="text-center font-semibold text-[38px] sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.08] tracking-[-0.02em] text-white max-w-4xl mt-0 mb-5"
          >
            Закроем потребность
            <br />
            в линейном персонале <span className="italic text-peach">за 5–7 дней</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
            className="text-center text-base md:text-lg text-white/80 max-w-[560px] leading-relaxed mb-8"
          >
            Подберём и выведем персонал под сезонный пик, рост нагрузки или запуск нового объекта. Оформление,
            учёт, отчётность и материальную ответственность берём на себя.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <CtaButton
              source="Главная — hero"
              className="rounded-full px-8 py-4 text-base font-semibold bg-accent text-brand-dark hover:bg-peach transition-all shadow-2xl hover:scale-105 active:scale-95"
              style={{ boxShadow: "0 8px 32px 0 rgba(209,165,107,0.35)" }}
            >
              Получить расчёт за 30 минут
            </CtaButton>
            <a
              href={site.phoneHref}
              className="rounded-full px-7 py-4 text-base font-semibold bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Phone size={18} className="text-accent" />
              {site.phone}
            </a>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-white/50 mt-3"
          >
            Бесплатно · без обязательств · ориентир по составу и стоимости
          </motion.span>

          {/* Ключевые цифры */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl"
          >
            {keyFacts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl px-5 py-4 text-left"
              >
                <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{f.value}</p>
                <p className="text-[12px] text-white/50 leading-snug mt-1">{f.label}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
