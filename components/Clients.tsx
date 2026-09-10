"use client";

import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function Clients() {
  return (
    <section className="bg-white border-b border-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 whitespace-nowrap">
          Подтверждено письмами клиентов
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10">
          {testimonials.map((t, i) => (
            <motion.a
              key={t.company}
              href="#testimonials"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="text-base md:text-lg font-bold text-gray-300 hover:text-brand-dark transition-colors tracking-tight"
            >
              {t.company}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
