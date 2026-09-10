import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { SectionHeader, CheckList, ProfessionCard } from "@/components/ui";
import { industries, getIndustry, getProfessions } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const ind = getIndustry(industry);
  if (!ind) return {};
  return { title: { absolute: ind.metaTitle }, description: ind.metaDescription };
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const ind = getIndustry(industry);
  if (!ind) notFound();
  const profs = getProfessions(ind.slug);
  const [h1Main, h1Tail] = ind.h1.split(" за 5–7 дней");

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
        lead={ind.lead}
        image={ind.image}
        cta={ind.cta}
        secondary={{ label: "Выбрать профессию", href: "#team" }}
        crumbs={[
          { label: "Услуги", href: "/services/" },
          { label: ind.title, href: `/${ind.slug}/` },
        ]}
      />

      <section className="bg-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <SectionHeader eyebrow="Когда подключают ЛГР" title="Когда нужен дополнительный персонал" />
            <CheckList items={ind.when} cols={1} />
          </div>
          <div>
            <SectionHeader
              eyebrow="Операции объекта"
              title="Какие задачи закроет персонал"
              text="Уточним операции и требования площадки, затем подберём профессии и состав смены."
            />
            <CheckList items={ind.operations} cols={1} />
          </div>
        </div>
      </section>

      <section id="team" className="bg-[#f7f7f9] py-20 md:py-24 px-5 md:px-12 scroll-mt-6">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Состав команды"
            title="Кого можно вывести на объект"
            text="Выберите профессию, чтобы посмотреть задачи и данные для расчёта."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {profs.map((p, i) => (
              <ProfessionCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Process />
      <FAQ items={ind.faq} eyebrow="Вопросы отрасли" title="Что важно обсудить до запуска" subtitle={ind.title} image={ind.image} />
      <LeadForm
        eyebrow={ind.title}
        title="Рассчитаем состав и план запуска"
        text="Уточним операции, количество людей, график, дату и условия площадки."
        buttonLabel={ind.cta}
      />
      <Footer />
    </main>
  );
}
