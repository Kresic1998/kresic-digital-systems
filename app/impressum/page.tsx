import type { Metadata } from "next";

import { ImpressumPageClient } from "@/components/ImpressumPageClient";
import { readPrivateLegalHtml } from "@/lib/readPrivateLegalHtml";
import { BRAND_NAME, OWNER_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum — ${BRAND_NAME}, ${OWNER_NAME}.`,
};

export default async function ImpressumPage() {
  const [pastedHtmlDe, pastedHtmlEn] = await Promise.all([
    readPrivateLegalHtml("impressum", "de"),
    readPrivateLegalHtml("impressum", "en"),
  ]);

  return (
    <ImpressumPageClient
      pastedHtmlDe={pastedHtmlDe}
      pastedHtmlEn={pastedHtmlEn}
    />
  );
}
