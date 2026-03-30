import type { Metadata } from "next";
import Link from "next/link";

import { Erecht24LegalDocument } from "@/components/Erecht24LegalDocument";
import { Erecht24DevNotice } from "@/components/Erecht24DevNotice";
import {
  erecht24KeyPresence,
  fetchErecht24PrivacyPolicy,
  getHtmlDeFromLegalPayload,
  isErecht24Configured,
} from "@/lib/erecht24/client";
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

export default async function DatenschutzPage() {
  const keys = erecht24KeyPresence();
  const remote = isErecht24Configured()
    ? await fetchErecht24PrivacyPolicy()
    : null;
  const htmlDe = getHtmlDeFromLegalPayload(remote);

  return (
    <div className="min-h-screen bg-terminal-bg text-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Datenschutz
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Datenschutzerklärung
        </h1>

        <Erecht24DevNotice
          api={keys.api}
          plugin={keys.plugin}
          fetched={isErecht24Configured()}
          gotHtml={Boolean(htmlDe)}
        />

        {htmlDe ? (
          <>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Bereitgestellt über die eRecht24 Rechtstexte-API.
            </p>
            <Erecht24LegalDocument
              html={htmlDe}
              updatedAt={remote?.modified ?? remote?.created}
            />
          </>
        ) : (
          <>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Stand: 29. März 2026 · {BRAND_NAME}
            </p>

            <div className="mt-12 space-y-10 text-sm leading-relaxed text-slate-300">
              <section className="border-b border-white/10 pb-10">
                <h2 className="text-base font-semibold tracking-tight text-white">
                  1. Verantwortliche Stelle
                </h2>
                <p className="mt-3 text-slate-400">
                  Verantwortlich im Sinne der Datenschutz-Grundverordnung
                  (DSGVO) ist:
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
                  2. Hosting, Server-Logfiles und Drittlandübermittlung (USA)
                </h2>
                <p className="mt-3 text-slate-400">
                  Diese Website wird über die technische Plattform{" "}
                  <strong className="font-medium text-slate-300">Vercel Inc.</strong>
                  , 440 N Barranca Ave #4133, Covina, CA 91723, USA („Vercel“)
                  gehostet und ausgeliefert. Dabei können personenbezogene Daten
                  (z.&nbsp;B. IP-Adresse, Browsertyp, Zeitpunkt der Anfrage) in
                  den <strong className="font-medium text-slate-300">USA</strong>{" "}
                  verarbeitet werden. Die USA werden derzeit nicht als Land mit
                  einem der EU gleichwertigen Datenschutzniveau anerkannt.
                </p>
                <p className="mt-3 text-slate-400">
                  Die Verarbeitung erfolgt zur Bereitstellung und zum sicheren
                  Betrieb dieser Website (Art. 6 Abs. 1 lit. f DSGVO; soweit
                  vertraglich erforderlich Art. 6 Abs. 1 lit. b DSGVO). Mit
                  Vercel besteht ein Auftragsverarbeitungsvertrag nach Art. 28
                  DSGVO. Soweit eine Übermittlung in die USA oder andere
                  Drittländer erfolgt, stützen wir uns auf die von der
                  EU-Kommission genehmigten{" "}
                  <strong className="font-medium text-slate-300">
                    Standardvertragsklauseln (SCC)
                  </strong>{" "}
                  gemäß Art. 46 Abs. 2 lit. c DSGVO sowie ergänzende Maßnahmen,
                  soweit erforderlich. Informationen zu Datenverarbeitung und
                  SCC finden Sie in der Dokumentation von Vercel (u.&nbsp;a.
                  Data Processing Agreement).
                </p>
                <p className="mt-3 text-slate-400">
                  Beim Aufruf der Website können zudem automatisch
                  Server-Logfiles entstehen. Speicherdauer und Details ergeben
                  sich aus den Angaben des Hosters und diesem Vertrag.
                </p>
              </section>

              <section className="border-b border-white/10 pb-10">
                <h2 className="text-base font-semibold tracking-tight text-white">
                  3. Keine Tracking-Cookies, keine Marketing-Analyse
                </h2>
                <p className="mt-3 text-slate-400">
                  Diese Website verwendet keine Tracking-Cookies und bindet
                  keine Werbe- oder Social-Media-Tracker ein. Es kommen keine
                  Dienste zum Einsatz, die Ihr Nutzerverhalten zu Marketing-
                  oder Profilierungszwecken auswerten. Eine Reichweitenmessung
                  oder vergleichbare Webanalyse findet nicht statt.
                </p>
              </section>

              <section className="border-b border-white/10 pb-10">
                <h2 className="text-base font-semibold tracking-tight text-white">
                  4. Kontaktaufnahme
                </h2>
                <p className="mt-3 text-slate-400">
                  Wenn Sie uns per E-Mail unter {SITE_EMAIL} oder über das auf
                  der Website angezeigte Kontaktformular kontaktieren,
                  verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse und den
                  Nachrichteninhalt ausschließlich zur Bearbeitung Ihrer
                  Anfrage und ggf. zur Anbahnung eines Vertrags (Art. 6 Abs. 1
                  lit. b DSGVO). Die Formulardaten werden serverseitig über den
                  Dienst Resend (resend.com) an unser Postfach weitergeleitet
                  und nicht gespeichert oder an Dritte weitergegeben. Die
                  direkte Kommunikation per E-Mail erfolgt bevorzugt über
                  Proton Mail; zwischen Proton-Mail-Konten ist die Verbindung
                  Ende-zu-Ende-verschlüsselt.
                </p>
              </section>

              <section className="border-b border-white/10 pb-10">
                <h2 className="text-base font-semibold tracking-tight text-white">
                  5. Speicherdauer und Löschung
                </h2>
                <p className="mt-3 text-slate-400">
                  Wir verarbeiten personenbezogene Daten nur so lange, wie
                  dies für die jeweiligen Zwecke erforderlich ist oder
                  gesetzliche Aufbewahrungspflichten bestehen. Anschließend
                  werden die Daten gelöscht oder anonymisiert, sofern keine
                  berechtigten Interessen an einer weiteren Speicherung
                  entgegenstehen.
                </p>
              </section>

              <section className="border-b border-white/10 pb-10">
                <h2 className="text-base font-semibold tracking-tight text-white">
                  6. Ihre Rechte
                </h2>
                <p className="mt-3 text-slate-400">
                  Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft,
                  Berichtigung, Löschung, Einschränkung der Verarbeitung,
                  Widerspruch gegen die Verarbeitung sowie
                  Datenübertragbarkeit. Außerdem haben Sie das Recht, sich bei
                  einer Datenschutz-Aufsichtsbehörde zu beschweren.
                </p>
              </section>
            </div>
          </>
        )}

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
