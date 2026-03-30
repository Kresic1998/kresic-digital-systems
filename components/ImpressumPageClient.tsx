"use client";

import Link from "next/link";

import { LegalPageHeader } from "@/components/LegalPageHeader";
import { SITE_EMAIL } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export function ImpressumPageClient() {
  const { t, locale } = useI18n();
  const imp = t.impressum;

  const html = imp.htmlBody.trim();

  if (html) {
    return (
      <>
        <LegalPageHeader />
        <div className="min-h-screen bg-terminal-bg text-slate-100">
          <div
            className="mx-auto max-w-2xl px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-24"
            lang={locale}
          >
            <div
              className="legal-html mt-6"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <Link
              href="/#hero"
              className="mt-12 inline-flex text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {imp.backHome}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <LegalPageHeader />
      <div className="min-h-screen bg-terminal-bg text-slate-100">
        <div
          className="mx-auto max-w-2xl px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-24"
          lang={locale}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {imp.eyebrow}
          </p>

          <div className="legal-html mt-6">
            <h1>{imp.title}</h1>

            <p>
              {imp.nameLine}
              <br />
              {imp.brandLine}
              <br />
              {imp.streetLine}
              <br />
              {imp.cityLine}
            </p>

            <h2>{imp.contactHeading}</h2>
            <p>
              {imp.phoneLine}
              <br />
              {imp.emailLabel}{" "}
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </p>

            <h2>{imp.jobHeading}</h2>
            <p>
              {imp.jobSubLabel}
              <br />
              {imp.jobBody}
            </p>

            <h2>{imp.editorialHeading}</h2>
            <p>{imp.editorialName}</p>

            <h2>{imp.disputeHeading}</h2>
            <p>{imp.disputeBody}</p>
          </div>

          <aside
            className="mt-16 rounded-xl border-2 border-amber-500/40 bg-amber-500/10 p-6 sm:p-8"
            aria-label={
              locale === "de"
                ? "Umsatzsteuer Kleinunternehmer"
                : "Small business VAT (Germany)"
            }
          >
            <p className="text-base font-bold leading-snug text-amber-50">
              {imp.kleinunternehmerTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {imp.kleinunternehmerBody}
            </p>
          </aside>

          <p className="mt-12 text-xs leading-relaxed text-slate-500">
            {imp.disclaimer}
          </p>

          <Link
            href="/#hero"
            className="mt-10 inline-flex text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            {imp.backHome}
          </Link>
        </div>
      </div>
    </>
  );
}
