import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Industries from "@/components/Industries";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { SectionHeader, ProfessionCard } from "@/components/ui";
import { industries, getProfessions, scenarios, servicesFaq } from "@/lib/data";

export const metadata: Metadata = {
  title: "Аутсорсинг линейного персонала для бизнеса — услуги ЛГР",
  description:
    "Сценарии запуска, отраслевые решения и каталог из 33 профессий. Подберём линейный персонал под задачи бизнеса за 5–7 дней. Санкт-Петербург и Ленинградская область.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Услуги ЛГР"
        title={
          <>
            Подберём линейный персонал под задачи бизнеса <span className="italic text-peach">за 5–7 дней</span>
          </>
        }
        lead="Выберите сценарий, тип площадки или конкретную профессию. Уточним задачи и рассчитаем состав, график и дату запуска."
        image="services"
        cta="Подобрать решение под объект"
        secondary={{ label: "Перейти к профессиям", href: "#professions" }}
        crumbs={[{ label: "Услуги", href: "/services/" }]}
      />

      {/* Сценарии */}
      <section className="bg-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Сценарии"
            title="Начните с бизнес-задачи"
            text="Регулярный объект, сезонный пик, новая площадка, массовая задача или временное усиление требуют разных входных данных."
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
          </div>
        </div>
      </section>

      <Industries variant="services" />

      {/* Каталог профессий */}
      <section id="professions" className="bg-white py-20 md:py-24 px-5 md:px-12 scroll-mt-10">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Каталог профессий"
            title="Специалисты под задачи объекта"
            text="Одинаковые профессии показаны отдельно для каждого типа объекта — так проще выбрать подходящий вариант."
          />
          <div className="space-y-14">
            {industries.map((ind) => (
              <div key={ind.slug}>
                <div className="flex items-end justify-between gap-4 mb-5">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{ind.title}</h3>
                  <Link href={`/${ind.slug}/`} className="text-sm font-semibold text-accent-strong hover:underline whitespace-nowrap">
                    Отраслевое решение →
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getProfessions(ind.slug).map((p, i) => (
                    <ProfessionCard key={p.slug} p={p} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <FAQ
        items={servicesFaq}
        eyebrow="Выбор услуги"
        title="Как найти подходящую страницу"
        subtitle="Отрасль или профессия — с чего начать и как собрать команду."
        image="services"
      />
      <LeadForm
        eyebrow="Подбор решения"
        title="Соберём предварительную модель под ваш объект"
        text="Уточним сценарий, операции, профессии, график, дату и ограничения."
        buttonLabel="Подобрать решение под объект"
      />
      <Footer />
    </main>
  );
}
