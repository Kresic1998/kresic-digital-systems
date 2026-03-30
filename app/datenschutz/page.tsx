import type { Metadata } from "next";

import { DatenschutzPageClient } from "@/components/DatenschutzPageClient";
import { readPrivateLegalHtml } from "@/lib/readPrivateLegalHtml";
import { BRAND_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung — ${BRAND_NAME}.`,
};

export default async function DatenschutzPage() {
  const [pastedHtmlDe, pastedHtmlEn] = await Promise.all([
    readPrivateLegalHtml("datenschutz", "de"),
    readPrivateLegalHtml("datenschutz", "en"),
  ]);

  return (
    <DatenschutzPageClient
      pastedHtmlDe={pastedHtmlDe}
      pastedHtmlEn={pastedHtmlEn}
    />
  );
}
