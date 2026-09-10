"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/site";

export default function FAQ({
  items,
  eyebrow = "Вопросы руководства",
  title = "Как встроить ЛГР в действующую операционную систему",
  subtitle = "Коротко о запуске, ролях, управлении и сопровождении работы.",
  image = "retail",
}: {
  items: { q: string; a: string }[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  image?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-white py-20 md:py-24 px-5">
      <div className="max-w-[680px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-4">{eyebrow}</p>
          <h2 className="text-[#111011] text-[32px] md:text-[44px] font-semibold leading-[1.1] tracking-tight mb-5">{title}</h2>
          <p className="text-[#898989] text-[16px] leading-[1.6] max-w-[450px] mx-auto">{subtitle}</p>
        </div>

        <div className="relative max-w-[620px] mx-auto group">
          <div className="absolute -inset-3 md:-inset-8 bg-[#171f27] rounded-[40px] overflow-hidden z-0 shadow-inner">
            <img
              src={asset(`/images/${image}.webp`)}
              alt=""
              className="w-full h-full object-cover opacity-60 [filter:contrast(1.2)] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#171f27]/30 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 bg-white/85 backdrop-blur-2xl rounded-[28px] md:rounded-[32px] border border-white/60 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.15)]">
            {items.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={
                    "relative bg-transparent transition-colors duration-150 border-b border-black/5 last:border-b-0 " +
                    (!isOpen ? "hover:bg-white/60" : "")
                  }
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left p-[20px_22px] md:p-[24px_28px] flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-[#111011] text-[15px] md:text-[16px] font-semibold tracking-tight">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
                      className="text-[#111011]/60 flex items-center justify-center shrink-0"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={"faq-answer-" + index}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
                        className="overflow-hidden"
                      >
                        <div className="px-[22px] md:px-7 pb-6 pt-0">
                          <p className="text-[#333333] text-[15px] leading-[1.7]">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
