import type { Metadata } from "next";
import Link from "next/link";

import {
  BRAND_NAME,
  LEGAL_ADDRESS_LINES,
  OWNER_NAME,
  SITE_EMAIL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum — ${BRAND_NAME}, ${OWNER_NAME}.`,
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Rechtliche Angaben
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Impressum
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          Angaben gemäß § 5 TMG.
        </p>

        <aside
          className="mt-10 rounded-xl border-2 border-amber-500/40 bg-amber-500/10 p-6 sm:p-8"
          aria-label="Umsatzsteuer Kleinunternehmer"
        >
          <p className="text-base font-bold leading-snug text-amber-50">
            Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Es wird keine Umsatzsteuer-Identifikationsnummer (USt-IdNr.) ausgewiesen. Für
            Kleinunternehmer im Sinne des § 19 UStG ist eine USt-IdNr. nicht erforderlich.
          </p>
        </aside>

        <dl className="mt-12 space-y-8 text-sm leading-relaxed">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Name / Marke
            </dt>
            <dd className="mt-2 border-b border-white/10 pb-6 text-slate-300">
              {OWNER_NAME}
              <br />
              {BRAND_NAME}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Anschrift
            </dt>
            <dd className="mt-2 border-b border-white/10 pb-6 text-slate-300">
              {LEGAL_ADDRESS_LINES.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Kontakt
            </dt>
            <dd className="mt-2 border-b border-white/10 pb-6 text-slate-300">
              <p>
                Kontakt erfolgt ausschließlich schriftlich per E-Mail. Eine telefonische
                Erreichbarkeit besteht nicht.
              </p>
              <p className="mt-3">
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="font-medium text-indigo-300 underline-offset-2 hover:underline"
                >
                  {SITE_EMAIL}
                </a>
              </p>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Steuernummer
            </dt>
            <dd className="mt-2 border-b border-white/10 pb-6 text-slate-300">
              Die Steuernummer wird auf schriftliche Anfrage mitgeteilt.
            </dd>
          </div>
        </dl>

        <p className="mt-12 text-xs leading-relaxed text-slate-500">
          Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
          Haftung für externe Links. Für den Inhalt verlinkter Seiten sind ausschließlich
          deren Betreiber verantwortlich.
        </p>

        <Link
          href="/#hero"
          className="mt-10 inline-flex text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          ← Zur Startseite
        </Link>
      </div>
    </div>
  );
}
