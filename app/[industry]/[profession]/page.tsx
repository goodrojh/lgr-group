import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { SectionHeader, CheckList, ProfessionCard } from "@/components/ui";
import { professions, getIndustry, getProfession, getProfessions, inputData } from "@/lib/data";
import { asset } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return professions.map((p) => ({ industry: p.industry, profession: p.slug }));
}

type Params = Promise<{ industry: string; profession: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { industry, profession } = await params;
  const p = getProfession(industry, profession);
  if (!p) return {};
  return { title: p.title, description: p.description };
}

export default async function ProfessionPage({ params }: { params: Params }) {
  const { industry, profession } = await params;
  const p = getProfession(industry, profession);
  const ind = getIndustry(industry);
  if (!p || !ind) notFound();
  const related = getProfessions(ind.slug).filter((x) => x.slug !== p.slug).slice(0, 4);
  const [h1Main, h1Tail] = p.h1.split(" за 5–7 дней");

  return (
    <main>
      <PageHero
        eyebrow={ind.title}
        title={
          <>
            {h1Main} <span className="italic text-peach">за 5–7 дней</span>
            {h1Tail}
          </>
        }
        lead={p.lead}
        image={ind.image}
        cta={p.cta}
        secondary={{ label: "Данные для расчёта", href: "#data" }}
        crumbs={[
          { label: "Услуги", href: "/services/" },
          { label: ind.title, href: `/${ind.slug}/` },
          { label: p.name, href: `/${ind.slug}/${p.slug}/` },
        ]}
      />

      <section className="bg-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="Задачи на объекте"
              title={`Какие задачи выполняют ${p.name.toLowerCase()}`}
              text="Перечень работ согласуем под процесс и требования вашей площадки."
            />
            <CheckList items={p.tasks} cols={1} />
          </div>
          <div className="relative rounded-[32px] overflow-hidden bg-[#171f27] min-h-[320px] lg:min-h-[420px]">
            <img
              src={asset(`/images/${p.image}.webp`)}
              alt={p.imageAlt}
              className="absolute inset-0 w-full h-full object-cover opacity-90 [filter:contrast(1.15)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171f27] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">{ind.shortTitle}</p>
              <p className="text-2xl font-semibold">{p.name}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="data" className="bg-[#f7f7f9] py-20 md:py-24 px-5 md:px-12 scroll-mt-6">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Предварительный расчёт"
            title="Что нужно для расчёта"
            text="Передайте исходные данные — менеджер рассчитает состав и проверит возможную дату запуска."
          />
          <CheckList items={inputData} cols={2} />
        </div>
      </section>

      <Process />

      {related.length > 0 && (
        <section className="bg-[#f7f7f9] py-20 md:py-24 px-5 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              eyebrow="Связанные профессии"
              title="Кого ещё можно включить в смену"
              text="Добавьте специалистов из того же направления, если для объекта нужна команда из нескольких профессий."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r, i) => (
                <ProfessionCard key={r.slug} p={r} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQ items={p.faq} eyebrow="Вопросы по профессии" title="Что важно уточнить" subtitle={p.name} image={ind.image} />
      <LeadForm eyebrow={p.name} title={p.ctaTitle} text={p.ctaText} buttonLabel={p.ctaButton} />
      <Footer />
    </main>
  );
}
