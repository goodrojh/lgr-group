"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import LeadFormFields from "./LeadFormFields";
import { site } from "@/lib/site";

interface OpenOptions {
  title?: string;
  text?: string;
  buttonLabel?: string;
  source?: string;
}

const Ctx = createContext<(o?: OpenOptions) => void>(() => {});

/** Хук: открыть модальную форму заявки из любой кнопки. */
export function useLeadModal() {
  return useContext(Ctx);
}

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<OpenOptions | null>(null);
  const open = useCallback((o?: OpenOptions) => setOpts(o ?? {}), []);
  const close = useCallback(() => setOpts(null), []);

  useEffect(() => {
    if (!opts) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [opts, close]);

  return (
    <Ctx.Provider value={open}>
      {children}
      <AnimatePresence>
        {opts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              className="w-full sm:max-w-[560px] max-h-[94vh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px] bg-[#171f27] text-white border border-white/10 shadow-2xl p-6 md:p-8 relative"
            >
              <button
                aria-label="Закрыть"
                onClick={close}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-3">Предварительный расчёт</p>
              <h3 className="text-[24px] md:text-[28px] font-semibold tracking-tight leading-[1.15] pr-10 mb-2">
                {opts.title ?? "Расскажите об объекте"}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                {opts.text ??
                  "Профессии, количество людей, график, дата и адрес. Менеджер ЛГР уточнит детали и подготовит ориентир по составу и стоимости — до 30 минут после получения данных."}
              </p>
              <LeadFormFields buttonLabel={opts.buttonLabel ?? "Получить расчёт"} source={opts.source} dark />
              <a
                href={site.phoneHref}
                className="mt-5 flex items-center justify-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-accent" /> Или позвоните: {site.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

/** Кнопка, открывающая модальную форму заявки. Стили передаются через className. */
export function CtaButton({
  children,
  className = "",
  title,
  text,
  buttonLabel,
  source,
  style,
  onClick,
}: OpenOptions & { children: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void }) {
  const open = useLeadModal();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open({ title, text, buttonLabel, source });
      }}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
