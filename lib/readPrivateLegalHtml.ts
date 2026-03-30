import { readFile } from "fs/promises";
import { join } from "path";

export type PrivateLegalSlug = "datenschutz" | "impressum";

/**
 * Čita `private-legal/<slug>.<locale>.html` (npr. `datenschutz.de.html`).
 * Prazan fajl ili nedostatak fajla → `null` (koristi se ugrađeni sadržaj iz rečnika).
 */
export async function readPrivateLegalHtml(
  slug: PrivateLegalSlug,
  locale: "de" | "en"
): Promise<string | null> {
  const filePath = join(
    process.cwd(),
    "private-legal",
    `${slug}.${locale}.html`
  );
  try {
    const raw = await readFile(filePath, "utf-8");
    const trimmed = raw.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}
