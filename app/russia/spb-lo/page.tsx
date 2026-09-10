import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Industries from "@/components/Industries";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { SectionHeader, CheckList } from "@/components/ui";
import { inputData, regionFaq } from "@/lib/data";

export const metadata: Metadata = {
  title: "Аутсорсинг линейного персонала в Санкт-Петербурге и Ленинградской области",
  description: "Проверка возможности запуска персонала по адресу, составу, графику, дате и требованиям объекта. Выход персонала за 5–7 дней.",
};

export default function RegionPage() {
  return (
    <main>
      <PageHero
        eyebrow="География ЛГР"
        title={
          <>
            Выведем линейный персонал в Санкт-Петербурге и Ленинградской области{" "}
            <span className="italic text-peach">за 5–7 дней</span>
          </>
        }
        lead="Проверяем возможность запуска по адресу, составу, графику, дате и требованиям конкретного объекта."
        image="home-city"
        cta="Проверить возможность запуска"
        secondary={{ label: "Выбрать направление", href: "#industries" }}
        crumbs={[{ label: "Санкт-Петербург и Ленинградская область", href: "/russia/spb-lo/" }]}
      />
      <Industries variant="services" />
      <section className="bg-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Проверка запуска"
            title="Какие данные нужны по объекту"
            text="Передайте исходные данные — менеджер проверит логистику и возможную дату старта."
          />
          <CheckList items={inputData} cols={2} />
        </div>
      </section>
      <Process showRoles={false} />
      <FAQ items={regionFaq} eyebrow="География и условия" title="До подтверждения даты" subtitle="Объекты, сроки и другие регионы." image="home-city" />
      <LeadForm
        eyebrow="Санкт-Петербург и Ленинградская область"
        title="Проверьте возможность запуска на вашем объекте"
        text="Передайте адрес, профессии, количество людей, график и желаемую дату."
        buttonLabel="Проверить возможность запуска"
      />
      <Footer />
    </main>
  );
}
