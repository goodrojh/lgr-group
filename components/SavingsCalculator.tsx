"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, Info, ArrowRight } from "lucide-react";

// Допущения модели (можно править в одном месте)
const ASSUMPTIONS = {
  injuryRate: 0.2, // взносы на травматизм, % (I класс риска — 0,2%)
  absenceShare: 0.138, // отпуск 28 дн. + больничные ≈ 6 дн. из 247 рабочих дней ≈ 13,8% оплаченного нерабочего времени
  hiringCost: 15000, // подбор + адаптация одной замены, ₽ (текучесть линейного персонала ≈ 1 замена на позицию в год)
  gearCost: 8000, // спецодежда, СИЗ, медосмотр на 1 сотрудника в год, ₽
  adminCostMonthly: 2000, // кадровый учёт, табели, расчёт зарплаты — ₽/мес на сотрудника
};

const fmt = (n: number) => new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(n)) + " ₽";
const fmtShort = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toLocaleString("ru-RU", { maximumFractionDigits: 2 }) + " млн ₽";
  if (Math.abs(n) >= 1_000) return (n / 1_000).toLocaleString("ru-RU", { maximumFractionDigits: 0 }) + " тыс. ₽";
  return fmt(n);
};

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2 gap-3">
        <label className="text-sm text-white/70">{label}</label>
        <span className="text-sm font-semibold text-white bg-white/10 px-3 py-1 rounded-lg whitespace-nowrap">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 cursor-pointer"
      />
      {hint && <p className="text-[11px] text-white/35 mt-1.5">{hint}</p>}
    </div>
  );
}

export default function SavingsCalculator() {
  const [people, setPeople] = useState(10);
  const [salary, setSalary] = useState(75000);
  const [hours, setHours] = useState(168);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(560);
  const [contrib, setContrib] = useState<30 | 15>(30);

  const r = useMemo(() => {
    const c = (contrib + ASSUMPTIONS.injuryRate) / 100;
    const salaryYear = salary * 12;
    const contributions = salaryYear * c;
    const absence = (salaryYear + contributions) * ASSUMPTIONS.absenceShare;
    const hiring = ASSUMPTIONS.hiringCost;
    const gear = ASSUMPTIONS.gearCost;
    const admin = ASSUMPTIONS.adminCostMonthly * 12;
    const inhousePer = salaryYear + contributions + absence + hiring + gear + admin;
    const inhouse = inhousePer * people;
    const outsource = rate * hours * months * people;
    const saving = inhouse - outsource;
    const pct = inhouse > 0 ? (saving / inhouse) * 100 : 0;
    const idleMonths = 12 - months;
    return {
      breakdown: [
        { label: "Фонд оплаты труда (оклад × 12)", value: salaryYear * people },
        { label: `Страховые взносы (${contrib}% + ${ASSUMPTIONS.injuryRate}% травматизм)`, value: contributions * people },
        { label: "Оплаченное нерабочее время (отпуск, больничные ≈ 13,8%)", value: absence * people },
        { label: "Подбор и замена при текучести", value: hiring * people },
        { label: "Спецодежда, СИЗ, медосмотры", value: gear * people },
        { label: "Кадровое администрирование", value: admin * people },
      ],
      inhouse,
      outsource,
      saving,
      pct,
      idleMonths,
      perMonth: saving / 12,
      hoursTotal: hours * months * people,
    };
  }, [people, salary, hours, months, rate, contrib]);

  return (
    <section id="calculator" className="relative bg-[#0b0f14] text-white py-20 md:py-28 px-5 md:px-12 overflow-hidden">
      <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-accent/10 blur-[160px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[160px]" />

      <div className="max-w-[1200px] mx-auto relative">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Экономика решения</p>
            <h2 className="text-[34px] md:text-[48px] font-semibold tracking-tight leading-[1.1]">
              Сколько стоит штатный линейный сотрудник — и сколько аутсорсинг
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60 leading-relaxed max-w-md"
          >
            Ставка «за час» — только часть сравнения. Штатный сотрудник стоит компании оклад плюс взносы, отпуска,
            больничные, подбор, СИЗ и администрирование. Подставьте свои цифры.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
          {/* Входные данные */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-xl p-6 md:p-8 space-y-7"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
                <Calculator size={20} />
              </div>
              <div>
                <p className="font-semibold">Параметры вашего объекта</p>
                <p className="text-xs text-white/40">Оценка. Итоговый расчёт — по данным площадки.</p>
              </div>
            </div>

            <Slider label="Сотрудников линейного персонала" value={people} min={1} max={100} step={1} onChange={setPeople} format={(v) => `${v} чел.`} />
            <Slider
              label="Оклад штатного сотрудника до вычета НДФЛ"
              value={salary}
              min={40000}
              max={150000}
              step={1000}
              onChange={setSalary}
              format={(v) => fmt(v) + "/мес"}
              hint="Ориентир: в вакансиях грузчиков и комплектовщиков по СПб за август 2026 — медиана 72–75 тыс. ₽, среднее 76–81 тыс. ₽ (ГородРабот.ру по данным hh.ru)"
            />
            <Slider label="Часов в месяц на сотрудника" value={hours} min={120} max={220} step={4} onChange={setHours} format={(v) => `${v} ч`} />
            <Slider
              label="Месяцев в году персонал реально нужен"
              value={months}
              min={1}
              max={12}
              step={1}
              onChange={setMonths}
              format={(v) => `${v} мес.`}
              hint="Штат оплачивается 12 месяцев. Аутсорсинг — только в период потребности."
            />
            <Slider
              label="Ставка аутсорсинга ЛГР"
              value={rate}
              min={520}
              max={700}
              step={10}
              onChange={setRate}
              format={(v) => `${v} ₽/ч`}
              hint="Базовые ставки прайс-листа: от 520 до 590 ₽/час в зависимости от профессии"
            />
            <div>
              <p className="text-sm text-white/70 mb-2">Тариф страховых взносов</p>
              <div className="flex gap-2">
                {([30, 15] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setContrib(v)}
                    className={
                      "flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold border transition-all " +
                      (contrib === v ? "bg-accent text-brand-dark border-accent" : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10")
                    }
                  >
                    {v === 30 ? "30% — общий тариф" : "15% — льгота МСП"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Результат */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-[28px] bg-gradient-to-br from-accent to-[#b8894e] text-brand-dark p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70 mb-2">Экономия в год</p>
              <div className="flex items-end gap-4 flex-wrap">
                <p className="text-[44px] md:text-[56px] font-bold leading-none tracking-tight">
                  {r.saving >= 0 ? fmtShort(r.saving) : "0 ₽"}
                </p>
                <p className="text-2xl font-semibold mb-1">{r.saving >= 0 ? `−${r.pct.toFixed(0)}%` : "экономии нет"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-black/10">
                <div>
                  <p className="text-[11px] uppercase tracking-wider opacity-60">В месяц</p>
                  <p className="text-xl font-bold">{r.saving >= 0 ? fmtShort(r.perMonth) : "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider opacity-60">Часов через ЛГР</p>
                  <p className="text-xl font-bold">{r.hoursTotal.toLocaleString("ru-RU")} ч</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-white/5 border border-white/10 p-6 md:p-8 flex-1">
              <div className="flex items-center justify-between mb-5">
                <p className="font-semibold">Штат за год: из чего складывается</p>
                <p className="font-bold text-white">{fmtShort(r.inhouse)}</p>
              </div>
              <div className="space-y-3">
                {r.breakdown.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs mb-1.5 gap-3">
                      <span className="text-white/60">{b.label}</span>
                      <span className="font-medium whitespace-nowrap">{fmtShort(b.value)}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${Math.max(2, (b.value / r.inhouse) * 100)}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-white/40"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50">Аутсорсинг ЛГР за год</p>
                  <p className="text-[11px] text-white/35">
                    {rate} ₽/ч × {hours} ч × {months} мес. × {people} чел.
                    {r.idleMonths > 0 && ` · ${r.idleMonths} мес. без оплаты`}
                  </p>
                </div>
                <p className="text-2xl font-bold text-accent">{fmtShort(r.outsource)}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-4 items-center rounded-[20px] bg-white/5 border border-white/10 p-5 md:p-6">
          <div className="flex gap-3 text-xs text-white/50 leading-relaxed">
            <Info size={16} className="shrink-0 text-accent mt-0.5" />
            <p>
              Модель учитывает: страховые взносы {contrib}% + травматизм {ASSUMPTIONS.injuryRate}%, оплаченное
              нерабочее время 13,8% (28 дней отпуска и ~6 дней больничных из 247 рабочих), {fmt(ASSUMPTIONS.hiringCost)} на подбор
              и замену на позицию в год, {fmt(ASSUMPTIONS.gearCost)} на СИЗ и медосмотры, {fmt(ASSUMPTIONS.adminCostMonthly)}/мес на кадровое
              администрирование. Не учитывает: время руководителей на найм и выходы, простои внутри месяца,
              транспорт, питание и одежду по условиям площадки — их уточняем в итоговом расчёте.
            </p>
          </div>
          <Link
            href="/contacts/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold bg-accent text-brand-dark hover:bg-peach transition-all whitespace-nowrap"
          >
            Получить точный расчёт <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
