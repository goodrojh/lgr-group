import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Политика использования cookies" };

export default function Page() {
  return <LegalPage id="cookie" />;
}
