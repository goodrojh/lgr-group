"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, X, FileText } from "lucide-react";
import { testimonials } from "@/lib/data";
import { asset } from "@/lib/site";

export default function Testimonials() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="testimonials" className="bg-white py-20 md:py-24 px-5 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-4">Подтверждено клиентами</p>
            <h2 className="text-[34px] md:text-[48px] font-semibold text-gray-900 tracking-tight leading-[1.1]">
              Благодарственные письма — оригиналы, а не рекламные цитаты
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 leading-relaxed max-w-md"
          >
            Склады, распределительные центры, ритейл, e-commerce и агропром. Нажмите на карточку, чтобы открыть
            скан письма.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.company}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group text-left rounded-[24px] border border-gray-100 bg-gray-50/60 p-7 hover:bg-white hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">{t.sector}</span>
                <Quote size={18} className="text-gray-200 group-hover:text-accent transition-colors" />
              </div>
              <p className="text-[15px] text-gray-700 leading-relaxed flex-1">«{t.quote}»</p>
              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="font-bold text-gray-900">{t.company}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t.author} · {t.position}
                </p>
                <div className="flex items-center justify-between mt-3">
                  {t.date ? <p className="text-[11px] text-gray-400">{t.date}</p> : <span />}
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent-strong">
                    <FileText size={12} /> Открыть письмо
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              aria-label="Закрыть"
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              src={asset(`/images/letters/${testimonials[open].image}`)}
              alt={`Благодарственное письмо — ${testimonials[open].company}`}
              className="max-h-[92vh] max-w-full rounded-xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
