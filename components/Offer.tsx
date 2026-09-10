"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Users } from "lucide-react";
import { CtaButton } from "./LeadModal";

const weTake = ["подбор", "оформление", "кадровый учёт", "вывод сотрудников", "контроль", "замену невыходящих сотрудников", "отчётность"];

// Ориентир: ~9 тыс. ₽ экономии в месяц на одного линейного сотрудника (консервативная оценка)
const PER_PERSON_MONTH = 9000;
const examples = [10, 50, 100];

function fmtThousands(n: number) {
  return n >= 1_000_000
    ? (n / 1_000_000).toLocaleString("ru-RU", { maximumFractionDigits: 1 }) + " млн ₽"
    : Math.round(n / 1000).toLocaleString("ru-RU") + " тыс. ₽";
}

/** Число, «набегающее» при появлении в кадре. */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

export default function Offer() {
  return (
    <section id="offer" className="relative bg-white py-20 md:py-24 px-5 md:px-12 overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="max-w-[1200px] mx-auto relative grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
        {/* Текст оффера */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-4">Выгода в цифрах</p>
          <h2 className="text-[34px] md:text-[48px] font-semibold text-gray-900 tracking-tight leading-[1.08] mb-5">
            Экономьте на содержании линейного персонала
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-[520px]">
            Не обязательно держать большой штат HR и постоянно искать новых сотрудников. Вы платите за необходимый
            объём персонала и можете увеличивать или сокращать его под загрузку бизнеса.
          </p>

          <p className="text-sm font-semibold text-gray-900 mb-3">Мы берём на себя:</p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-9">
            {weTake.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="flex items-center gap-3 text-[15px] text-gray-700"
              >
                <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-accent-strong" />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <CtaButton
              source="Оффер — экономия"
              title="Рассчитать экономию для вашего объекта"
              text="Укажите количество людей, профессии и график — подготовим сравнение штата и аутсорсинга под ваши данные."
              buttonLabel="Рассчитать экономию"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold bg-[#171f27] text-white hover:bg-accent hover:text-brand-dark transition-all"
            >
              Рассчитать мою экономию <ArrowRight size={18} />
            </CtaButton>
            <Link
              href="#calculator"
              className="inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-semibold border border-gray-200 text-gray-700 hover:border-accent hover:text-accent-strong transition-all"
            >
              Открыть калькулятор
            </Link>
          </div>
        </motion.div>

        {/* Примеры */}
        <div className="flex flex-col gap-3">
          {examples.map((people, i) => {
            const month = people * PER_PERSON_MONTH;
            const year = month * 12;
            const featured = i === 1;
            return (
              <motion.div
                key={people}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={
                  "rounded-[24px] p-6 md:p-7 flex items-center gap-5 md:gap-7 border transition-all " +
                  (featured
                    ? "bg-[#171f27] text-white border-transparent shadow-[0_30px_60px_-20px_rgba(23,31,39,0.5)] md:scale-[1.03]"
                    : "bg-gray-50/70 border-gray-100 text-gray-900 hover:bg-white hover:border-accent/40 hover:shadow-xl")
                }
              >
                <div
                  className={
                    "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 " +
                    (featured ? "bg-accent text-brand-dark" : "bg-white border border-gray-100 text-gray-900")
                  }
                >
                  <Users size={18} className={featured ? "opacity-70" : "text-accent-strong"} />
                  <span className="text-xl md:text-2xl font-bold leading-none mt-1">{people}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={"text-xs uppercase tracking-[0.15em] mb-1 " + (featured ? "text-white/50" : "text-gray-400")}>
                    {people} сотрудников · экономия
                  </p>
                  <p className="text-[24px] sm:text-[28px] md:text-[36px] font-bold tracking-tight leading-none">
                    до ~<Counter value={month / 1000} />{" "}
                    <span className="whitespace-nowrap">
                      тыс. ₽<span className={"text-sm md:text-base font-medium " + (featured ? "text-white/60" : "text-gray-400")}>/мес</span>
                    </span>
                  </p>
                  <p className={"text-sm mt-1.5 " + (featured ? "text-white/60" : "text-gray-500")}>
                    ≈ {fmtThousands(year)} в год
                  </p>
                </div>
                <ArrowRight size={20} className={"shrink-0 hidden sm:block " + (featured ? "text-accent" : "text-gray-300")} />
              </motion.div>
            );
          })}
          <p className="text-xs text-gray-400 leading-relaxed px-2 pt-1">
            Расчёт примерный: итоговая экономика зависит от зарплаты, графика, ставки аутсорсинга, текучести и условий
            проекта. При сезонной нагрузке экономия выше — штат оплачивается 12 месяцев, аутсорсинг — только в период
            потребности.
          </p>
        </div>
      </div>
    </section>
  );
}
