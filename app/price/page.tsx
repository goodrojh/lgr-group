import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Pricing from "@/components/Pricing";
import SavingsCalculator from "@/components/SavingsCalculator";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { SectionHeader, CheckList } from "@/components/ui";
import { inputData, priceFaq, priceList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Расчёт стоимости аутсорсинга персонала",
  description: "Базовые ставки от 520 ₽/час и факторы расчёта персонала под состав, график, операции и условия объекта. Калькулятор экономии.",
};

export default function PricePage() {
  const min = Math.min(...priceList.map((p) => p.rate));
  return (
    <main>
      <PageHero
        eyebrow="Стоимость под условия объекта"
        title="Расчёт стоимости аутсорсинга персонала"
        lead="Базовые ставки помогут оценить порядок затрат. Итоговая стоимость зависит от состава, графика, операций, условий площадки и даты запуска."
        image="pricing"
        cta="Получить расчёт под объект"
        secondary={{ label: "Посмотреть ставки", href: "#pricing" }}
        crumbs={[{ label: "Цены", href: "/price/" }]}
        facts={[
          { value: `от ${min} ₽/ч`, label: "базовые ставки прайс-листа" },
          { value: "30 минут", label: "предварительный ориентир" },
          { value: "до 20%", label: "экономии на фонде линейного персонала" },
          { value: "12 профессий", label: "в базовом прайсе + расчёт под другие" },
        ]}
      />
      <Pricing />
      <SavingsCalculator />

      <section className="bg-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader
              eyebrow="Исходные данные"
              title="Что подготовить для итогового расчёта"
              text="Предварительный ориентир подготовим после короткого разговора. Для итоговой стоимости дополнительно уточним условия объекта."
            />
            <CheckList items={inputData} cols={1} />
          </div>
          <div className="rounded-[28px] bg-[#171f27] text-white p-8 md:p-10 self-start lg:sticky lg:top-8">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Ставка и решение</p>
            <h3 className="text-[26px] md:text-[32px] font-semibold tracking-tight leading-[1.15] mb-5">
              Почасовая ставка — только одна часть сравнения
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              При сравнении учитываются не только часы работы, но и транспорт, рабочая одежда, питание, подбор,
              оформление, организация выходов, коммуникация и учёт. Итоговый эффект рассчитывается на данных
              конкретного объекта.
            </p>
            <p className="text-white/70 leading-relaxed">
              Предложения «от 280 ₽/час» на рынке часто не включают НДС, замену при невыходе, транспорт и
              оформление. Сравнивайте полную стоимость часа на объекте — калькулятор выше показывает, из чего
              она складывается для штатного сотрудника.
            </p>
          </div>
        </div>
      </section>

      <FAQ items={priceFaq} eyebrow="Вопросы о цене" title="До подготовки итогового расчёта" subtitle="Коротко о том, как формируется стоимость." image="pricing" />
      <LeadForm
        eyebrow="Расчёт под объект"
        title="Получите стоимость под ваш состав, график и условия"
        text="Уточним состав, график, количество смен, срочность и условия площадки. Предварительный ориентир подготовим до 30 минут после получения данных."
        buttonLabel="Получить предварительный расчёт"
      />
      <Footer />
    </main>
  );
}
