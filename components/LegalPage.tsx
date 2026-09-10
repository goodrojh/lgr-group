import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { legal } from "@/lib/legal";

/** Простая вёрстка юридического текста: нумерованные строки становятся заголовками разделов. */
export default function LegalPage({ id }: { id: keyof typeof legal }) {
  const doc = legal[id];
  const edition = doc.lines[0]?.startsWith("Редакция") ? doc.lines[0] : undefined;
  const body = edition ? doc.lines.slice(1) : doc.lines;
  return (
    <main>
      <PageHero eyebrow="Документы" title={doc.title} lead={edition} image="home-city" facts={null} compact crumbs={[{ label: doc.title, href: `/${id}/` }]} />
      <section className="bg-white py-16 md:py-20 px-5 md:px-12">
        <article className="max-w-[800px] mx-auto text-[15px] leading-[1.75] text-gray-700">
          {body.map((line, i) => {
            if (/^\d+\.\s/.test(line) && line.length < 90) {
              return (
                <h2 key={i} className="text-xl md:text-2xl font-semibold text-gray-900 mt-10 mb-4 tracking-tight">
                  {line}
                </h2>
              );
            }
            if (/^\d+\.\d+/.test(line)) {
              return (
                <p key={i} className="mb-3 pl-5 border-l-2 border-accent/40">
                  {line}
                </p>
              );
            }
            if (/^[a-zа-я]/.test(line) && line.endsWith(";")) {
              return (
                <p key={i} className="mb-1.5 pl-6 relative before:content-['•'] before:absolute before:left-1 before:text-accent-strong">
                  {line}
                </p>
              );
            }
            return (
              <p key={i} className="mb-3">
                {line}
              </p>
            );
          })}
        </article>
      </section>
      <Footer />
    </main>
  );
}
