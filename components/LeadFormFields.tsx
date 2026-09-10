"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";

// Точка приёма заявок. Пока не задана — форма открывает письмо на info@lgr-group.ru с заполненными полями.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export default function LeadFormFields({
  buttonLabel = "Получить расчёт",
  dark = true,
  source = "",
  onDone,
}: {
  buttonLabel?: string;
  dark?: boolean;
  source?: string;
  onDone?: () => void;
}) {
  const [form, setForm] = useState({ name: "", phone: "", company: "", details: "", consent: true });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const update = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !form.phone.trim()) return;
    setState("sending");
    const page = typeof window !== "undefined" ? window.location.href : "";
    const payload = { ...form, source, page };
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
          source ? `Откуда: ${source}` : "",
          `Страница: ${page}`,
        ]
          .filter(Boolean)
          .join("\n");
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Заявка с сайта — предварительный расчёт")}&body=${encodeURIComponent(body)}`;
      }
      setState("done");
      onDone?.();
    } catch {
      setState("error");
    }
  };

  const inputCls = dark
    ? "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-[15px] text-white placeholder-white/35 outline-none focus:border-accent transition-colors"
    : "w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[15px] text-[#111] placeholder-gray-400 outline-none focus:border-accent transition-colors";

  if (state === "done") {
    return (
      <div className="py-10 text-center">
        <CheckCircle2 size={48} className="mx-auto text-accent mb-4" />
        <p className={"text-xl font-semibold mb-2 " + (dark ? "text-white" : "text-[#111]")}>Заявка отправлена</p>
        <p className={dark ? "text-white/60" : "text-gray-500"}>
          Менеджер ЛГР свяжется с вами, уточнит задачу и подготовит предварительный расчёт.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
        className={inputCls + " min-h-[110px] resize-y"}
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
    </form>
  );
}
