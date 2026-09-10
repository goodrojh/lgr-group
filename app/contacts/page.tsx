import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { SectionHeader, CheckList } from "@/components/ui";
import { inputData } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты ЛГР",
  description: "Телефон, email и адрес компании ЛГР в Санкт-Петербурге. Обсудим тип объекта, требуемый состав, график и дату запуска.",
};

export default function ContactsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Связаться с ЛГР"
        title="Контакты"
        lead="Обсудим тип объекта, требуемый состав, график и дату. Проверим возможность запуска и подготовим следующий шаг."
        image="home-city"
        cta="Оставить заявку"
        crumbs={[{ label: "Контакты", href: "/contacts/" }]}
        facts={null}
        compact
      />

      <LeadForm
        dark={false}
        eyebrow="Следующий шаг"
        title="Расскажите об объекте"
        text="Сообщите тип площадки, профессии, количество людей, график, дату и основные ограничения. Менеджер уточнит детали и предложит следующий шаг."
        buttonLabel="Отправить заявку"
      />

      <section className="bg-white py-20 md:py-24 px-5 md:px-12">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader eyebrow="Данные для расчёта" title="Что подготовить к разговору" text="Достаточно короткого описания объекта — остальное уточним по телефону." />
            <CheckList items={inputData} cols={1} />
          </div>
          <div className="rounded-[28px] border border-gray-100 bg-gray-50/60 p-8 md:p-10 self-start">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-strong mb-4">Реквизиты</p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">{site.legalName}</h3>
            <dl className="space-y-4 text-[15px]">
              <div>
                <dt className="text-xs text-gray-400 uppercase tracking-wider">Адрес</dt>
                <dd className="text-gray-800 mt-1">{site.address}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400 uppercase tracking-wider">Юридический адрес</dt>
                <dd className="text-gray-800 mt-1">{site.legalAddress}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider">ОГРН</dt>
                  <dd className="text-gray-800 mt-1 font-medium">{site.ogrn}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider">ИНН</dt>
                  <dd className="text-gray-800 mt-1 font-medium">{site.inn}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400 uppercase tracking-wider">КПП</dt>
                  <dd className="text-gray-800 mt-1 font-medium">{site.kpp}</dd>
                </div>
              </div>
            </dl>
            <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <iframe
                title="Карта — офис ЛГР"
                src="https://yandex.ru/map-widget/v1/?text=Санкт-Петербург,%20проспект%20Обуховской%20Обороны,%207&z=16"
                className="w-full h-[280px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
