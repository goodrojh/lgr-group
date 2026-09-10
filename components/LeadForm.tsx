"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";

// Точка приёма заявок. Пока не задана — форма открывает письмо на info@lgr-group.ru с заполненными полями.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

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
  const [form, setForm] = useState({ name: "", phone: "", company: "", details: "", consent: true });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const update = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !form.phone.trim()) return;
    setState("sending");
    const payload = { ...form, page: typeof window !== "undefined" ? window.location.href : "" };
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("bad status");
      } else {
        const body = [
          `Имя: ${form.name}`,
          `Телефон: ${form.phone}`,
          `Компания / объект: ${form.company}`,
          `Задача: ${form.details}`,
          `Страница: ${payload.page}`,
        ].join("\n");
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Заявка с сайта — предварительный расчёт")}&body=${encodeURIComponent(body)}`;
      }
      setState("done");
    } catch {
      setState("error");
    }
  };

  const bg = dark ? "bg-[#171f27] text-white" : "bg-[#f7f7f9] text-[#111]";
  const inputCls = dark
    ? "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-[15px] text-white placeholder-white/35 outline-none focus:border-accent transition-colors"
    : "w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[15px] text-[#111] placeholder-gray-400 outline-none focus:border-accent transition-colors";

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

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={
            "rounded-[28px] p-6 md:p-8 border " +
            (dark ? "bg-white/5 border-white/10 backdrop-blur-xl" : "bg-white border-gray-100 shadow-xl")
          }
        >
          {state === "done" ? (
            <div className="py-12 text-center">
              <CheckCircle2 size={48} className="mx-auto text-accent mb-4" />
              <p className="text-xl font-semibold mb-2">Заявка отправлена</p>
              <p className={dark ? "text-white/60" : "text-gray-500"}>
                Менеджер ЛГР свяжется с вами, уточнит задачу и подготовит предварительный расчёт.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input className={inputCls} placeholder="Ваше имя" value={form.name} onChange={(e) => update("name", e.target.value)} />
                <input
                  className={inputCls}
                  placeholder="Телефон *"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <input
                className={inputCls}
                placeholder="Компания или тип объекта (склад, производство, магазин…)"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
              />
              <textarea
                className={inputCls + " min-h-[120px] resize-y"}
                placeholder="Профессии, количество людей, график, дата запуска, адрес"
                value={form.details}
                onChange={(e) => update("details", e.target.value)}
              />
              <label className={"flex items-start gap-3 text-xs leading-relaxed cursor-pointer " + (dark ? "text-white/50" : "text-gray-500")}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  className="mt-0.5 accent-[#d1a56b]"
                />
                <span>
                  Отправляя форму, я даю{" "}
                  <Link href="/consent/" className="underline hover:text-accent">
                    согласие на обработку персональных данных
                  </Link>{" "}
                  в соответствии с{" "}
                  <Link href="/privacy/" className="underline hover:text-accent">
                    политикой
                  </Link>
                  .
                </span>
              </label>
              <button
                type="submit"
                disabled={state === "sending" || !form.consent}
                className="w-full rounded-xl px-6 py-4 text-base font-semibold bg-accent text-brand-dark hover:bg-peach transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {state === "sending" ? "Отправляем…" : buttonLabel} <Send size={16} />
              </button>
              {state === "error" && (
                <p className="text-sm text-red-400">
                  Не удалось отправить. Позвоните по номеру {site.phone} или напишите на {site.email}.
                </p>
              )}
              <p className={"text-[11px] text-center " + (dark ? "text-white/35" : "text-gray-400")}>
                Предварительный ориентир — до 30 минут после получения данных
              </p>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
