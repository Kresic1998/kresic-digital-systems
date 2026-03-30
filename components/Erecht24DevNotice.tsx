type Erecht24DevNoticeProps = {
  api: boolean;
  plugin: boolean;
  /** true ako je izvršen fetch (oba ključa postoje) */
  fetched: boolean;
  /** true ako postoji neprazan html_de za prikaz */
  gotHtml: boolean;
};

/**
 * Samo u development: objašnjava zašto eRecht24 tekst ne dolazi (bez osetljivih podataka).
 */
export function Erecht24DevNotice({
  api,
  plugin,
  fetched,
  gotHtml,
}: Erecht24DevNoticeProps) {
  if (process.env.NODE_ENV !== "development") return null;
  if (gotHtml) return null;
  if (!api && !plugin) return null;

  let body: string;
  if (api && !plugin) {
    body =
      "Imate samo API ključ. Kod poziva API samo ako postoje oba: ERECHT24_API_KEY i ERECHT24_PLUGIN_KEY. Plugin key = developer key iz API ugovora (zaglavlje eRecht24-plugin-key). Bez njega se prikazuje statički tekst.";
  } else if (!api && plugin) {
    body =
      "Nedostaje ERECHT24_API_KEY u .env.local (API ključ iz Projekt Managera).";
  } else if (!api && !plugin) {
    body =
      "Nema eRecht24 ključeva u .env.local — koristi se statički tekst.";
  } else if (fetched && !gotHtml) {
    body =
      "Oba ključa su postavljena, ali nema html_de. U terminalu traži [eRecht24] API error. Često: 401 pogrešan ključ, 404 tekst još nije kreiran u Projekt Manageru za ovaj projekat, ili 503 održavanje.";
  } else {
    return null;
  }

  return (
    <aside
      className="mt-6 rounded-lg border border-amber-500/50 bg-amber-950/40 px-4 py-3 text-sm text-amber-100/95"
      role="note"
    >
      <p className="font-semibold text-amber-200">Dev — eRecht24</p>
      <p className="mt-2 leading-relaxed text-amber-100/90">{body}</p>
    </aside>
  );
}
