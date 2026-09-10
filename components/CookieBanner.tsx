"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "lgr-cookie-choice";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        if (!localStorage.getItem(KEY)) setVisible(true);
      } catch {
        /* приватный режим — просто не показываем */
      }
    }, 800);
    return () => window.clearTimeout(t);
  }, []);

  const choose = (v: "accepted" | "rejected") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[90] rounded-2xl bg-[#171f27]/95 backdrop-blur-xl border border-white/10 text-white p-5 shadow-2xl"
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Используем cookies для работы сайта и аналитики. Аналитические cookies включаются только с вашего
            согласия.{" "}
            <Link href="/cookie/" className="underline hover:text-accent">
              Подробнее
            </Link>
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => choose("accepted")}
              className="flex-1 rounded-xl bg-accent text-brand-dark text-sm font-semibold py-2.5 hover:bg-peach transition-colors"
            >
              Принять
            </button>
            <button
              onClick={() => choose("rejected")}
              className="flex-1 rounded-xl border border-white/20 text-sm font-semibold py-2.5 hover:bg-white/10 transition-colors"
            >
              Отклонить
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
