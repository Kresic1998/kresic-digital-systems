type Erecht24LegalDocumentProps = {
  html: string;
  /** ISO ili tekst sa API-ja (npr. modified) */
  updatedAt?: string | null;
};

/**
 * HTML sa eRecht24 API-ja (poveren izvor). Stilovi u `globals.css` (.erecht24-legal).
 */
export function Erecht24LegalDocument({
  html,
  updatedAt,
}: Erecht24LegalDocumentProps) {
  return (
    <div className="erecht24-legal mt-10 space-y-6">
      {updatedAt ? (
        <p className="text-sm text-slate-500">
          Aktualisiert (eRecht24): {updatedAt}
        </p>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
