"use client";

import React from "react";
import { motion } from "framer-motion";
import { processSteps, roles } from "@/lib/data";
import { CtaButton } from "./LeadModal";

export default function Process({ showRoles = true }: { showRoles?: boolean }) {
  return (
    <section id="process" className="bg-white py-20 md:py-24 px-5 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-4">Операционная модель</p>
            <h2 className="text-[34px] md:text-[48px] font-semibold text-gray-900 tracking-tight leading-[1.1]">
              От первого звонка до управляемой работы смен
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 leading-relaxed max-w-md"
          >
            Сначала собираем исходные данные и готовим предварительный расчёт. Затем согласовываем условия и
            договор, готовим исполнителей, запускаем смены и сопровождаем работу.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-gray-200 to-transparent" />
          <div className="space-y-6 md:space-y-0">
            {processSteps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={"relative md:grid md:grid-cols-2 md:gap-16 " + (i > 0 ? "md:-mt-6" : "")}
                >
                  <div className={"pl-20 md:pl-0 " + (left ? "md:pr-0 md:col-start-1" : "md:col-start-2")}>
                    <div
                      className={
                        "absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center font-bold text-accent-strong text-sm"
                      }
                    >
                      {s.n}
                    </div>
                    <div className="rounded-[20px] border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-accent/40 hover:shadow-xl transition-all p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">{s.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {showRoles && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-3">Разделение ответственности</p>
              <h3 className="text-[26px] md:text-[34px] font-semibold text-gray-900 tracking-tight">
                Что обсуждается до первой смены
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {roles.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={
                    "rounded-[20px] p-7 border " +
                    (i === 1 ? "bg-[#171f27] text-white border-transparent" : "bg-white border-gray-100 text-gray-900")
                  }
                >
                  <p className={"text-xs font-bold uppercase tracking-[0.15em] mb-3 " + (i === 1 ? "text-accent" : "text-gray-400")}>
                    {r.title}
                  </p>
                  <p className={"text-[15px] leading-relaxed " + (i === 1 ? "text-white/80" : "text-gray-600")}>{r.text}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-400 mt-6">
              Финальное разделение ответственности закрепляется в договоре и регламенте конкретного проекта.
            </p>
            <div className="text-center mt-8">
              <CtaButton
                source="Операционная модель"
                className="inline-flex rounded-full px-8 py-4 text-base font-semibold bg-[#171f27] text-white hover:bg-accent hover:text-brand-dark transition-all"
              >
                Обсудить проект
              </CtaButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
