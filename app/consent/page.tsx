import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Согласие на обработку персональных данных" };

export default function Page() {
  return <LegalPage id="consent" />;
}
