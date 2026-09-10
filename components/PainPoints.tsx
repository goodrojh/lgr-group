"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Layers, UserX, Clock, Rocket } from "lucide-react";
import { painPoints } from "@/lib/data";

const icons = [Rocket, TrendingUp, UserX, Clock, Layers];

export default function PainPoints() {
  return (
    <section className="bg-white py-20 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-4">Точка роста</p>
            <h2 className="text-[34px] md:text-[48px] font-semibold text-gray-900 tracking-tight leading-[1.1]">
              Бизнес готов расти.
              <br />
              Кадровый контур — не всегда.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 leading-relaxed max-w-md"
          >
            Переменную часть операций можно усиливать без постоянного расширения внутренней команды. Знакомые
            ситуации:
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {painPoints.map((p, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-[20px] border border-gray-100 bg-gray-50/60 p-6 hover:bg-white hover:border-accent/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-accent-strong transition-colors mb-5">
                  <Icon size={20} />
                </div>
                <p className="text-[15px] text-gray-700 leading-relaxed">{p}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
