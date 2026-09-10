import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Политика обработки персональных данных" };

export default function Page() {
  return <LegalPage id="privacy" />;
}
