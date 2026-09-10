"use client";

import React from "react";
import { motion } from "framer-motion";
import { asset, site } from "@/lib/site";

const years = new Date().getFullYear() - site.foundedYear;

const stats = [
  { index: "001", value: `${years} лет`, label: `На рынке с ${site.foundedYear} года`, barHeights: [40, 60, 30, 80], litCount: 1 },
  { index: "002", value: "1500+", label: "Сотрудников в базе исполнителей", barHeights: [30, 50, 80, 40], litCount: 2 },
  { index: "003", value: "5–7", label: "Дней до выхода персонала на объект", barHeights: [20, 40, 60, 90], litCount: 3 },
  { index: "004", value: "30 мин", label: "Предварительный расчёт после получения данных", barHeights: [30, 50, 70, 100], litCount: 4 },
];

function MiniBarChart({ heights, litCount }: { heights: number[]; litCount: number }) {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-colors duration-500"
          style={{ height: h + "%", backgroundColor: i < litCount ? "#d1a56b" : "#e5e7eb" }}
        />
      ))}
    </div>
  );
}

export default function Metrics() {
  return (
    <section className="w-full bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20 mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[38px] md:text-6xl font-bold text-black leading-tight tracking-tight"
        >
          Проверяемые цифры.
          <br />
          Без рекламных допущений.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-gray-500 max-w-xs md:text-right leading-relaxed"
        >
          Год регистрации — по ОГРН {site.ogrn}. Отзывы — оригинальные благодарственные письма клиентов, которые
          можно открыть и прочитать.
        </motion.p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-[520px] md:h-[450px] w-full">
          <img
            src={asset("/images/production.webp")}
            alt=""
            className="absolute inset-0 w-full h-full object-cover [filter:contrast(1.2)]"
          />
          <div className="absolute inset-0 bg-[#171f27]/50" />
          <div className="absolute inset-0 flex items-center justify-center px-5 md:px-16 lg:px-20 py-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white w-full max-w-7xl rounded-[16px] shadow-2xl overflow-hidden grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-gray-100"
            >
              {stats.map((stat) => (
                <div key={stat.index} className="px-5 py-8 md:px-8 md:py-12 flex flex-col justify-between min-h-[180px] md:min-h-[220px]">
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <span className="text-xs font-medium text-gray-400 tracking-widest">{stat.index}</span>
                    <MiniBarChart heights={stat.barHeights} litCount={stat.litCount} />
                  </div>
                  <div>
                    <div className="text-[34px] md:text-5xl lg:text-6xl font-bold text-black mb-3 md:mb-4 tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-[0.15em] leading-tight uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
