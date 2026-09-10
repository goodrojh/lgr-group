"use client";

import React from "react";
import {
  LayoutDashboard,
  Building2,
  CalendarClock,
  ClipboardCheck,
  Users,
  MessageSquare,
  FileText,
  AlertTriangle,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Download,
  MoreHorizontal,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { asset } from "@/lib/site";

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all " +
        (active ? "bg-white/10 text-white font-medium" : "text-white/50")
      }
    >
      {icon}
      {label}
    </div>
  );
}

function LegendItem({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <div className={"w-2 h-2 rounded-full " + color} />
        <span className="text-white/60">{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}

/** Демонстрационная панель отчётности по объекту — иллюстрация формата данных, которые получает клиент. */
export default function Dashboard() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4, ease: "easeOut" as const, staggerChildren: 0.1, delayChildren: 0.6 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const shifts = [
    { day: "Пн", plan: 24, fact: 24 },
    { day: "Вт", plan: 24, fact: 23 },
    { day: "Ср", plan: 26, fact: 26 },
    { day: "Чт", plan: 26, fact: 26 },
    { day: "Пт", plan: 28, fact: 27 },
    { day: "Сб", plan: 18, fact: 18 },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto rounded-[28px] md:rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row text-white/90 text-left"
    >
      {/* Sidebar */}
      <aside className="w-60 border-r border-white/10 flex-col p-6 hidden lg:flex shrink-0">
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10 px-2">
          <img src={asset("/images/lgr-logo.webp")} alt="ЛГР" className="h-8 w-auto" />
          <div className="leading-tight">
            <p className="text-sm font-semibold">ЛГР · Кабинет</p>
            <p className="text-[10px] text-white/40">отчётность по объекту</p>
          </div>
        </motion.div>
        <nav className="flex-1 space-y-1">
          {[
            { icon: <LayoutDashboard size={18} />, label: "Сводка", active: true },
            { icon: <Building2 size={18} />, label: "Объекты" },
            { icon: <CalendarClock size={18} />, label: "Смены" },
            { icon: <ClipboardCheck size={18} />, label: "План / факт" },
            { icon: <Users size={18} />, label: "Состав" },
            { icon: <AlertTriangle size={18} />, label: "Отклонения" },
            { icon: <MessageSquare size={18} />, label: "Связь" },
            { icon: <FileText size={18} />, label: "Документы" },
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <SidebarItem icon={item.icon} label={item.label} active={item.active} />
            </motion.div>
          ))}
        </nav>
        <motion.div variants={itemVariants} className="pt-6 border-t border-white/10 space-y-1 mt-auto">
          <SidebarItem icon={<HelpCircle size={18} />} label="Поддержка" />
          <SidebarItem icon={<Settings size={18} />} label="Настройки" />
        </motion.div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <motion.header
          variants={itemVariants}
          className="h-16 border-b border-white/10 flex items-center justify-between px-5 md:px-8 shrink-0"
        >
          <div className="relative w-40 sm:w-72 md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <div className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white/40">
              Поиск по объектам
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-white/60 hidden sm:block">
              <Download size={20} />
            </span>
            <span className="text-white/60 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border-2 border-black" />
            </span>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Руководитель объекта</p>
                <p className="text-xs text-white/40">Склад · Шушары</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold text-sm">
                РО
              </div>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 p-5 md:p-8 space-y-6">
          <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Сводка по объекту</h3>
              <p className="text-[11px] text-white/40">Демонстрационные данные — формат отчётности согласуется под проект</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm flex items-center gap-2">
                <CalendarClock size={16} className="text-white/40" />
                <span>Неделя 36</span>
              </div>
              <div className="bg-accent text-brand-dark rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2">
                <Sparkles size={16} />
                Отчёт
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Часы */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-colors hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white/60 text-sm font-medium">Отработано часов · месяц</h4>
                </div>
                <div className="flex items-end gap-4 mb-6 flex-wrap">
                  <span className="text-3xl font-bold">3 812 ч</span>
                  <span className="text-xs text-white/40 mb-1">план по согласованным сменам 3 840 ч</span>
                  <div className="ml-auto flex items-center gap-1 text-emerald-400 text-xs bg-emerald-400/10 px-2 py-1 rounded-full">
                    <ArrowUpRight size={12} />
                    99,3% плана
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "62%" }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full bg-accent"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "27%" }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="h-full bg-indigo-400 ml-1"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "10%" }}
                    transition={{ duration: 1, delay: 1.4 }}
                    className="h-full bg-sky-400 ml-1"
                  />
                </div>
                <div className="flex justify-between mt-4 text-xs flex-wrap gap-2">
                  <span className="text-white/40">Комплектовщики · Грузчики · Водители штабелёра</span>
                  <span className="font-semibold">24 человека в смене</span>
                </div>
              </motion.div>

              {/* График выходов */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1 flex flex-col transition-colors hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-semibold">План и факт выходов</h4>
                  <div className="flex bg-white/5 p-1 rounded-lg">
                    <span className="px-3 py-1 text-xs bg-white/10 rounded-md shadow-sm">Неделя</span>
                    <span className="px-3 py-1 text-xs text-white/40">Месяц</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col min-h-[240px]">
                  <div className="flex-1 relative">
                    <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 1.5, ease: "easeInOut" as const }}
                        d="M0,120 L160,120 L320,95 L480,95 L640,70 L800,150"
                        fill="none"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth={2}
                        strokeDasharray="6 6"
                      />
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 1.7, ease: "easeInOut" as const }}
                        d="M0,120 L160,130 L320,95 L480,95 L640,82 L800,150"
                        fill="none"
                        stroke="#d1a56b"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <motion.circle
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3 }}
                        cx={640}
                        cy={82}
                        r={4}
                        fill="#d1a56b"
                      />
                      <motion.line
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 3 }}
                        x1={640}
                        y1={82}
                        x2={640}
                        y2={200}
                        stroke="#d1a56b"
                        strokeDasharray="4"
                      />
                    </svg>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3.2 }}
                      className="absolute top-2 right-2 sm:right-auto sm:left-[80%] sm:-translate-x-1/2 bg-white text-black px-3 py-2 rounded-lg text-xs font-bold shadow-xl whitespace-nowrap"
                    >
                      <p className="text-[10px] text-black/40 font-normal">Пятница</p>
                      27 из 28 · замена согласована
                    </motion.div>
                  </div>
                  <div className="flex justify-between mt-6 text-[10px] text-white/40 px-1">
                    {shifts.map((s) => (
                      <span key={s.day}>{s.day}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              {/* Состав смены */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-colors hover:bg-white/[0.07]"
              >
                <h4 className="font-semibold mb-6">Состав по сменам</h4>
                <div className="flex items-end justify-between mb-8">
                  <span className="text-2xl font-bold">144 выхода</span>
                  <span className="text-emerald-400 text-xs flex items-center gap-1">
                    98,6% <ArrowUpRight size={12} />
                  </span>
                </div>
                <div className="flex items-end justify-between h-32 gap-2">
                  {shifts.map((s, i) => (
                    <div key={i} className="flex-1 h-full flex flex-col items-center justify-end gap-2">
                      <div
                        className="w-full bg-white/10 rounded-t-sm relative overflow-hidden"
                        style={{ height: String((s.plan / 28) * 85) + "%" }}
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: String((s.fact / s.plan) * 100) + "%" }}
                          transition={{ duration: 0.8, delay: 1.5 + i * 0.1 }}
                          className="absolute bottom-0 w-full bg-accent/60"
                        />
                      </div>
                      <span className="text-[10px] text-white/40">{s.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-3">
                  <LegendItem color="bg-accent" label="Комплектовщики" value="12" />
                  <LegendItem color="bg-indigo-400" label="Грузчики" value="8" />
                  <LegendItem color="bg-sky-400" label="Водители штабелёра" value="4" />
                </div>
              </motion.div>

              {/* Отклонения */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-colors hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold">Отклонения</h4>
                  <MoreHorizontal size={16} className="text-white/40" />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white/60">Невыходы закрыты заменой</span>
                      <span>2 из 2</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 2 }}
                        className="h-full bg-emerald-400"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white/60">Согласованные действия</span>
                      <span>на контроле</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1, delay: 2.2 }}
                        className="h-full bg-accent"
                      />
                    </div>
                  </div>
                  <div className="w-full py-2 border border-white/10 rounded-lg text-xs font-medium text-center text-white/70">
                    Итоговые документы за период
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
