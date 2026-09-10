import Link from "next/link";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main>
      <PageHero
        eyebrow="Ошибка 404"
        title="Такой страницы нет"
        lead="Возможно, ссылка устарела. Перейдите к услугам или свяжитесь с нами — подберём решение под объект."
        image="home-city"
        cta="На главную"
        ctaHref="/"
        secondary={{ label: "Все услуги", href: "/services/" }}
        facts={null}
        compact
      />
      <section className="bg-white py-16 px-6 text-center">
        <Link href="/contacts/" className="text-accent-strong font-semibold hover:underline">
          Обсудить проект →
        </Link>
      </section>
      <Footer />
    </main>
  );
}
