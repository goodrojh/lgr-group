import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Metrics from "@/components/Metrics";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Risks from "@/components/Risks";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { SectionHeader } from "@/components/ui";
import { companyFaq, scenarios } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "ЛГР — операционный подрядчик по линейному персоналу",
  description: "Модель запуска персонала: требования объекта, расчёт, роли сторон, выходы и согласованная отчётность. С 2009 года в Санкт-Петербурге.",
};

export default function CompanyPage() {
  const years = new Date().getFullYear() - site.foundedYear;
  return (
    <main>
      <PageHero
        eyebrow="Компания ЛГР"
        title="ЛГР — операционный подрядчик по линейному персоналу"
        lead={`Помогаем бизнесу организовать запуск персонала под объём, график и условия конкретного объекта. Основной регион — ${site.region}.`}
        image="process-selection"
        secondary={{ label: "Как устроен запуск", href: "#process" }}
        crumbs={[{ label: "О компании", href: "/company/" }]}
        facts={[
          { value: `${years} лет`, label: `работаем с ${site.foundedYear} года` },
          { value: "1500+", label: "сотрудников в базе" },
          { value: "6 писем", label: "оригиналы благодарностей клиентов" },
          { value: "33 профессии", label: "в 5 направлениях" },
        ]}
      />

      <section className="bg-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Задачи бизнеса"
            title="Для регулярной нагрузки, пиков и новых площадок"
            text="Формат обсуждается под текущую операционную ситуацию, а не выбирается как готовый пакет."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((s, i) => (
              <Link
                key={s.id}
                href="/#scenarios"
                className="group rounded-[20px] border border-gray-100 bg-gray-50/60 p-6 hover:bg-white hover:border-accent/40 hover:shadow-xl transition-all"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">0{i + 1}</p>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{s.short}</p>
                <p className="text-xs text-accent-strong font-medium leading-relaxed">{s.chain.join(" → ")}</p>
              </Link>
            ))}
            <div className="rounded-[20px] bg-[#171f27] text-white p-6 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-3">Основной регион</p>
                <h3 className="font-semibold text-lg mb-2">{site.region}</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Санкт-Петербург и Ленинградская область остаются основным направлением. Проекты в других
                  регионах обсуждаем отдельно после проверки адреса, графика, состава и условий площадки.
                </p>
              </div>
              <Link href="/russia/spb-lo/" className="text-sm font-semibold text-accent mt-5 hover:underline">
                География работы →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Metrics />
      <Process />
      <Testimonials />
      <Risks />
      <FAQ items={companyFaq} eyebrow="О компании и модели" title="Что можно проверить до начала работы" subtitle="Запуск, доказательства и география." image="process-selection" />
      <LeadForm
        eyebrow="Этапы запуска проекта"
        title="Обсудите объект и получите предварительный расчёт"
        text="Уточним адрес, профессии, количество людей и смен, график, срочность и условия площадки."
        buttonLabel="Обсудить проект"
      />
      <Footer />
    </main>
  );
}
