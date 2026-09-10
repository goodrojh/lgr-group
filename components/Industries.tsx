"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Warehouse, Factory, ShoppingCart, ChefHat, Hotel, LayoutGrid, ArrowUpRight } from "lucide-react";
import { industries, getProfessions } from "@/lib/data";
import { asset, bg } from "@/lib/site";
import { CtaButton } from "./LeadModal";

const icons: Record<string, React.ElementType> = {
  "skladskoy-personal": Warehouse,
  "personal-na-proizvodstvo": Factory,
  retail: ShoppingCart,
  "rabotniki-kuhni": ChefHat,
  "gostinichnuy-personal": Hotel,
};

export default function Industries({ variant = "home" }: { variant?: "home" | "services" }) {
  return (
    <section id="industries" className="bg-[#f7f7f9] py-20 md:py-24 px-5 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div className="w-full md:w-[60%]">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-4">Отраслевые решения</p>
            <h2 className="text-[#101110] font-semibold text-[34px] md:text-[48px] leading-[1.1] mb-4 tracking-tight">
              Единая операционная логика — под разные типы площадок
            </h2>
            <p className="text-[#666767] text-[15px] leading-[1.65] max-w-[520px]">
              В карточке — задача объекта. Состав профессий и график уточняются внутри отраслевого решения. Всего
              — 5 направлений и 33 профессии.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/services/"
              className="flex-1 md:flex-none text-center bg-white text-[#101110] border border-[#e5e7ea] rounded-full px-[22px] py-3 text-sm font-medium hover:bg-[#e5e7ea] transition-colors"
            >
              Каталог профессий
            </Link>
            <CtaButton
              source="Отраслевые решения"
              title="Подобрать решение под объект"
              className="flex-1 md:flex-none text-center bg-accent text-brand-dark rounded-full px-[22px] py-3 text-sm font-semibold hover:bg-peach transition-all hover:shadow-lg"
            >
              Подобрать решение
            </CtaButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind, index) => {
            const Icon = icons[ind.slug];
            const count = getProfessions(ind.slug).length;
            return (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={`/${ind.slug}/`}
                  className="group relative block bg-white border border-[#f1f1f1] rounded-[20px] overflow-hidden hover:border-accent hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="relative h-40 overflow-hidden bg-[#171f27]">
                    <img
                      src={asset(`/images/${ind.cardImage}.webp`)}
                      alt={ind.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171f27]/70 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white text-xs font-semibold">
                      <span className="bg-white/15 backdrop-blur px-2.5 py-1 rounded-full border border-white/20">
                        {count} {count === 2 ? "профессии" : count < 5 ? "профессии" : "профессий"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-[44px] h-[44px] bg-[#f3f4f7] rounded-[12px] flex items-center justify-center text-accent-strong mb-4">
                        <Icon size={22} />
                      </div>
                      <ArrowUpRight className="text-gray-300 group-hover:text-accent-strong transition-colors" size={20} />
                    </div>
                    <h3 className="text-[#101110] font-bold text-lg mb-2">{ind.shortTitle}</h3>
                    <p className="text-[#666767] text-sm leading-[1.6]">
                      {variant === "home" ? ind.homeDescription : ind.servicesDescription}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/services/#professions"
              className="group relative flex flex-col justify-between bg-[#171f27] text-white rounded-[20px] overflow-hidden hover:shadow-xl transition-all duration-300 h-full p-6 min-h-[320px]"
            >
              <img
                src={bg("home-city")}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative">
                <div className="w-[44px] h-[44px] bg-white/10 border border-white/10 rounded-[12px] flex items-center justify-center text-accent mb-4">
                  <LayoutGrid size={22} />
                </div>
                <h3 className="font-bold text-lg mb-2">Другие специальности</h3>
                <p className="text-white/70 text-sm leading-[1.6]">
                  Полный каталог профессий под задачи и условия конкретного объекта: от разнорабочих до супервайзеров.
                </p>
              </div>
              <span className="relative inline-flex items-center gap-2 text-accent text-sm font-semibold mt-6">
                Открыть каталог <ArrowUpRight size={16} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
