import type { Metadata } from "next";
import Link from "next/link";

import {
  BRAND_NAME,
  LEGAL_ADDRESS_LINES,
  OWNER_NAME,
  SITE_EMAIL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutz — ${BRAND_NAME}.`,
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-terminal-bg text-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Datenschutz
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Datenschutzerklärung
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          Stand: 29. März 2026 · {BRAND_NAME}
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-slate-300">
          <section className="border-b border-white/10 pb-10">
            <h2 className="text-base font-semibold tracking-tight text-white">
              1. Verantwortliche Stelle
            </h2>
            <p className="mt-3 text-slate-400">
              Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <p className="mt-3 text-slate-300">
              {OWNER_NAME}
              <br />
              {BRAND_NAME}
              <br />
              {LEGAL_ADDRESS_LINES.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p className="mt-3 text-slate-400">
              E-Mail:{" "}
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="text-indigo-300 underline-offset-2 hover:underline"
              >
                {SITE_EMAIL}
              </a>
            </p>
          </section>

          <section className="border-b border-white/10 pb-10">
            <h2 className="text-base font-semibold tracking-tight text-white">
              2. Hosting und Server-Logfiles
            </h2>
            <p className="mt-3 text-slate-400">
              Die Website wird über einen technischen Hosting-Dienst bereitgestellt. Dabei
              können vom System automatisch Informationen in sogenannten Server-Logfiles
              erhoben werden (z. B. Browsertyp, Zeitpunkt der Anfrage). Die Verarbeitung
              erfolgt zur Gewährleistung eines störungsfreien Betriebs sowie zur IT-Sicherheit
              auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Detaillierte Angaben zum Hoster,
              zum Verarbeitungsort und zu Aufbewahrungsfristen entnehmen Sie bitte den
              Unterlagen Ihres Hosting-Vertrags oder erfragen diese beim Anbieter.
            </p>
          </section>

          <section className="border-b border-white/10 pb-10">
            <h2 className="text-base font-semibold tracking-tight text-white">
              3. Keine Tracking-Cookies, keine Marketing-Analyse
            </h2>
            <p className="mt-3 text-slate-400">
              Diese Website verwendet keine Tracking-Cookies und bindet keine
              Werbe- oder Social-Media-Tracker ein. Es kommen keine Dienste zum Einsatz, die
              Ihr Nutzerverhalten zu Marketing- oder Profilierungszwecken auswerten. Eine
              Reichweitenmessung oder vergleichbare Webanalyse findet nicht statt.
            </p>
          </section>

          <section className="border-b border-white/10 pb-10">
            <h2 className="text-base font-semibold tracking-tight text-white">
              4. Kontaktaufnahme
            </h2>
            <p className="mt-3 text-slate-400">
              Wenn Sie uns per E-Mail unter {SITE_EMAIL} oder über das auf der Website
              angezeigte Kontaktformular kontaktieren, verarbeiten wir Ihren Namen, Ihre
              E-Mail-Adresse und den Nachrichteninhalt ausschließlich zur Bearbeitung Ihrer
              Anfrage und ggf. zur Anbahnung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO).
              Die Formulardaten werden serverseitig über den Dienst Resend (resend.com) an
              unser Postfach weitergeleitet und nicht gespeichert oder an Dritte
              weitergegeben. Die direkte Kommunikation per E-Mail erfolgt bevorzugt über
              Proton Mail; zwischen Proton-Mail-Konten ist die Verbindung
              Ende-zu-Ende-verschlüsselt.
            </p>
          </section>

          <section className="border-b border-white/10 pb-10">
            <h2 className="text-base font-semibold tracking-tight text-white">
              5. Speicherdauer und Löschung
            </h2>
            <p className="mt-3 text-slate-400">
              Wir verarbeiten personenbezogene Daten nur so lange, wie dies für die jeweiligen
              Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
              Anschließend werden die Daten gelöscht oder anonymisiert, sofern keine
              berechtigten Interessen an einer weiteren Speicherung entgegenstehen.
            </p>
          </section>

          <section className="border-b border-white/10 pb-10">
            <h2 className="text-base font-semibold tracking-tight text-white">
              6. Ihre Rechte
            </h2>
            <p className="mt-3 text-slate-400">
              Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Widerspruch gegen die Verarbeitung sowie
              Datenübertragbarkeit. Außerdem haben Sie das Recht, sich bei einer
              Datenschutz-Aufsichtsbehörde zu beschweren.
            </p>
          </section>
        </div>

        <Link
          href="/#hero"
          className="mt-12 inline-flex text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          ← Zur Startseite
        </Link>
      </div>
    </div>
  );
}
