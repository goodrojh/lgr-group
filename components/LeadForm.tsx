"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import LeadFormFields from "./LeadFormFields";
import { site } from "@/lib/site";

export default function LeadForm({
  eyebrow = "Предварительный расчёт",
  title = "Начните с короткого разговора об объекте",
  text = "Уточним адрес, профессии, количество людей и смен, график, срочность и ограничения. После исходных данных подготовим предварительный расчёт — в течение 30 минут.",
  buttonLabel = "Получить расчёт",
  dark = true,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
  dark?: boolean;
}) {
  const bg = dark ? "bg-[#171f27] text-white" : "bg-[#f7f7f9] text-[#111]";

  return (
    <section id="contact" className={"py-20 md:py-24 px-5 md:px-12 " + bg}>
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className={"text-xs font-semibold tracking-[0.2em] uppercase mb-4 " + (dark ? "text-accent" : "text-accent-strong")}>
            {eyebrow}
          </p>
          <h2 className="text-[32px] md:text-[44px] font-semibold tracking-tight leading-[1.1] mb-5">{title}</h2>
          <p className={"text-lg leading-relaxed max-w-md mb-10 " + (dark ? "text-white/60" : "text-gray-500")}>{text}</p>

          <div className="space-y-4">
            <a href={site.phoneHref} className="flex items-center gap-4 group">
              <span className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                <Phone size={20} />
              </span>
              <span>
                <span className={"block text-xs " + (dark ? "text-white/40" : "text-gray-400")}>Телефон</span>
                <span className="text-lg font-semibold group-hover:text-accent transition-colors">{site.phone}</span>
              </span>
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-4 group">
              <span className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                <Mail size={20} />
              </span>
              <span>
                <span className={"block text-xs " + (dark ? "text-white/40" : "text-gray-400")}>Электронная почта</span>
                <span className="text-lg font-semibold group-hover:text-accent transition-colors">{site.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                <MapPin size={20} />
              </span>
              <span>
                <span className={"block text-xs " + (dark ? "text-white/40" : "text-gray-400")}>Адрес</span>
                <span className="text-[15px] font-medium">{site.address}</span>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={
            "rounded-[28px] p-6 md:p-8 border " +
            (dark ? "bg-white/5 border-white/10 backdrop-blur-xl" : "bg-white border-gray-100 shadow-xl")
          }
        >
          <LeadFormFields buttonLabel={buttonLabel} dark={dark} source="Секция формы на странице" />
        </motion.div>
      </div>
    </section>
  );
}
