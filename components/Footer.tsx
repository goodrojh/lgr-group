import React from "react";
import Link from "next/link";
import { asset, site } from "@/lib/site";
import { industries, getProfessions } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-[#010101] text-white">
      {/* Верх — CTA */}
      <div className="px-6 md:px-20 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#2f2f2b]">
        <div>
          <h2 className="font-bold text-[26px] md:text-[28px] leading-[1.25] max-w-[520px]">
            Рассчитаем запуск вашего объекта в течение 30 минут после получения исходных данных
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href={site.phoneHref}
            className="w-full sm:w-auto text-center px-6 py-3.5 rounded-[10px] border border-[#3b3b36] text-white text-[14px] font-semibold hover:border-accent transition-colors whitespace-nowrap"
          >
            {site.phone}
          </a>
          <Link
            href="/contacts/"
            className="w-full sm:w-auto text-center px-6 py-3.5 rounded-[10px] bg-accent text-brand-dark text-[14px] font-semibold hover:bg-peach transition-all whitespace-nowrap"
          >
            Обсудить проект
          </Link>
        </div>
      </div>

      {/* Колонки */}
      <div className="px-6 md:px-20 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-[#2f2f2b]">
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <img src={asset("/images/lgr-logo.webp")} alt="ЛГР" className="h-10 w-auto" />
            <div>
              <p className="font-bold text-[15px]">{site.legalName}</p>
              <p className="text-[#888981] text-xs">операционный подрядчик по линейному персоналу</p>
            </div>
          </div>
          <p className="text-[#888981] text-[13px] leading-[1.8] max-w-[380px]">{site.tagline}. Основной регион — {site.region}; другие регионы обсуждаем отдельно.</p>
          <div className="mt-6 text-[13px] leading-[2] text-[#888981]">
            <a href={site.phoneHref} className="block text-white font-semibold hover:text-accent transition-colors">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block hover:text-white transition-colors">
              {site.email}
            </a>
            <p>{site.address}</p>
          </div>
        </div>

        {industries.slice(0, 3).map((ind) => (
          <div key={ind.slug} className="flex flex-col">
            <Link href={`/${ind.slug}/`} className="text-white font-bold text-[14px] mb-4 hover:text-accent transition-colors">
              {ind.title}
            </Link>
            <div className="flex flex-col gap-1">
              {getProfessions(ind.slug).map((p) => (
                <Link
                  key={p.slug}
                  href={`/${ind.slug}/${p.slug}/`}
                  className="text-[#888981] text-[13px] leading-[2] hover:text-white transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 md:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-[#2f2f2b]">
        <div className="lg:col-span-2 flex flex-col">
          <h3 className="text-white font-bold text-[14px] mb-4">Компания</h3>
          <div className="flex flex-col gap-1">
            {[
              { l: "Все услуги", h: "/services/" },
              { l: "Цены", h: "/price/" },
              { l: "О компании", h: "/company/" },
              { l: "География работы", h: "/russia/spb-lo/" },
              { l: "Контакты", h: "/contacts/" },
            ].map((x) => (
              <Link key={x.h} href={x.h} className="text-[#888981] text-[13px] leading-[2] hover:text-white transition-colors">
                {x.l}
              </Link>
            ))}
          </div>
        </div>
        {industries.slice(3).map((ind) => (
          <div key={ind.slug} className="flex flex-col">
            <Link href={`/${ind.slug}/`} className="text-white font-bold text-[14px] mb-4 hover:text-accent transition-colors">
              {ind.title}
            </Link>
            <div className="flex flex-col gap-1">
              {getProfessions(ind.slug).map((p) => (
                <Link
                  key={p.slug}
                  href={`/${ind.slug}/${p.slug}/`}
                  className="text-[#888981] text-[13px] leading-[2] hover:text-white transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col">
          <h3 className="text-white font-bold text-[14px] mb-4">Документы</h3>
          <div className="flex flex-col gap-1">
            <Link href="/privacy/" className="text-[#888981] text-[13px] leading-[2] hover:text-white transition-colors">
              Политика обработки персональных данных
            </Link>
            <Link href="/consent/" className="text-[#888981] text-[13px] leading-[2] hover:text-white transition-colors">
              Согласие на обработку данных
            </Link>
            <Link href="/cookie/" className="text-[#888981] text-[13px] leading-[2] hover:text-white transition-colors">
              Политика cookies
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#676761] text-[12px]">
        <p>
          © {site.foundedYear}–{year} {site.legalName}. Все права защищены.
        </p>
        <p>
          ОГРН {site.ogrn} · ИНН {site.inn} · КПП {site.kpp}
        </p>
      </div>
    </footer>
  );
}
