import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import PainPoints from "@/components/PainPoints";
import Scenarios from "@/components/Scenarios";
import Industries from "@/components/Industries";
import Features from "@/components/Features";
import SavingsCalculator from "@/components/SavingsCalculator";
import Metrics from "@/components/Metrics";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Risks from "@/components/Risks";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { homeFaq } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Clients />
      <PainPoints />
      <Scenarios />
      <Industries />
      <Features />
      <SavingsCalculator />
      <Metrics />
      <Process />
      <Pricing />
      <Testimonials />
      <Risks />
      <FAQ items={homeFaq} />
      <LeadForm />
      <Footer />
    </main>
  );
}
