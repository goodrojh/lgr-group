"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { asset, nav, site } from "@/lib/site";
import { industries } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
      >
        <div className="relative flex items-center justify-between p-[8px] md:p-[10px] rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3 pl-2 md:pl-3">
            <img src={asset("/images/lgr-logo.webp")} alt="ЛГР" className="h-9 w-auto" />
            <span className="hidden sm:block text-white font-semibold tracking-tight text-[15px]">
              ЛГР<span className="text-white/40 font-normal"> · линейный персонал</span>
            </span>
          </Link>

          {/* Центр */}
          <div className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services/"
                className="text-[15px] font-medium text-white/70 hover:text-white transition-colors flex items-center gap-1 py-2"
              >
                Услуги <ChevronDown size={14} className="opacity-60" />
              </Link>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                  >
                    <div className="w-[300px] rounded-2xl bg-[#171f27]/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl">
                      <Link
                        href="/services/"
                        className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                      >
                        Все услуги и профессии
                      </Link>
                      <div className="h-px bg-white/10 my-1" />
                      {industries.map((i) => (
                        <Link
                          key={i.slug}
                          href={`/${i.slug}/`}
                          className="block px-4 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {i.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Справа */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={site.phoneHref}
              className="hidden md:flex items-center gap-2 text-[15px] font-medium text-white/80 hover:text-white transition-colors px-3 py-2"
            >
              <Phone size={16} className="text-accent" />
              {site.phone}
            </a>
            <Link
              href="/contacts/"
              className="hidden sm:inline-flex rounded-full px-5 py-2.5 text-[14px] md:text-[15px] font-semibold bg-accent text-brand-dark hover:bg-peach transition-all hover:scale-105 active:scale-95"
            >
              Обсудить проект
            </Link>
            <button
              aria-label="Меню"
              onClick={() => setOpen(true)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Мобильное меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0b0f14]/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5">
              <img src={asset("/images/lgr-logo.webp")} alt="ЛГР" className="h-9 w-auto" />
              <button
                aria-label="Закрыть"
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>
            <div className="px-6 pb-10 flex flex-col gap-1">
              <p className="text-white/40 text-xs uppercase tracking-widest mt-2 mb-2">Услуги</p>
              <Link href="/services/" onClick={() => setOpen(false)} className="text-white text-xl font-semibold py-2">
                Все услуги
              </Link>
              {industries.map((i) => (
                <Link
                  key={i.slug}
                  href={`/${i.slug}/`}
                  onClick={() => setOpen(false)}
                  className="text-white/70 text-base py-2 border-b border-white/5"
                >
                  {i.title}
                </Link>
              ))}
              <p className="text-white/40 text-xs uppercase tracking-widest mt-6 mb-2">Компания</p>
              {nav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-white text-xl font-semibold py-2"
                >
                  {item.label}
                </Link>
              ))}
              <a href={site.phoneHref} className="mt-8 text-accent text-lg font-semibold">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="text-white/60">
                {site.email}
              </a>
              <Link
                href="/contacts/"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full px-6 py-4 text-center text-base font-semibold bg-accent text-brand-dark"
              >
                Обсудить проект
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
