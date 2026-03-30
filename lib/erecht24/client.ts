import {
  ERECHT24_API_DEFAULT_BASE,
  ERECHT24_CACHE_TAG,
  ERECHT24_PATHS,
} from "@/lib/erecht24/constants";
import type {
  Erecht24ApiErrorBody,
  Erecht24LegalPayload,
} from "@/lib/erecht24/types";

function getBaseUrl(): string {
  const raw = process.env.ERECHT24_API_BASE_URL?.trim();
  return raw && raw.length > 0 ? raw.replace(/\/$/, "") : ERECHT24_API_DEFAULT_BASE;
}

export function isErecht24Configured(): boolean {
  const api = process.env.ERECHT24_API_KEY?.trim();
  const plugin = process.env.ERECHT24_PLUGIN_KEY?.trim();
  return Boolean(api && plugin);
}

/** Za dev dijagnostiku — bez vrednosti ključeva. */
export function erecht24KeyPresence(): { api: boolean; plugin: boolean } {
  return {
    api: Boolean(process.env.ERECHT24_API_KEY?.trim()),
    plugin: Boolean(process.env.ERECHT24_PLUGIN_KEY?.trim()),
  };
}

/** API vraća `html_de` (snake_case); na svaki slučaj prihvatamo i `htmlDe`. */
export function getHtmlDeFromLegalPayload(
  p: Erecht24LegalPayload | null
): string | undefined {
  if (!p) return undefined;
  const a = p.html_de?.trim();
  if (a) return a;
  const raw = p as Record<string, unknown>;
  const b = raw.htmlDe;
  return typeof b === "string" && b.trim() ? b.trim() : undefined;
}

/**
 * GET pravnog dokumenta (isto kao zvanični PHP SDK: eRecht24-api-key + eRecht24-plugin-key).
 * Keš: ISR + tag za revalidaciju posle push-a.
 */
export async function fetchErecht24Legal(
  path: (typeof ERECHT24_PATHS)[keyof typeof ERECHT24_PATHS],
  options?: { revalidateSeconds?: number }
): Promise<Erecht24LegalPayload | null> {
  if (!isErecht24Configured()) return null;

  const apiKey = process.env.ERECHT24_API_KEY!.trim();
  const pluginKey = process.env.ERECHT24_PLUGIN_KEY!.trim();
  const url = `${getBaseUrl()}${path}`;
  const revalidate = options?.revalidateSeconds ?? 3600;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "cache-control": "no-cache",
      "content-type": "application/json",
      "eRecht24-api-key": apiKey,
      "eRecht24-plugin-key": pluginKey,
    },
    next: {
      revalidate,
      tags: [ERECHT24_CACHE_TAG],
    },
  });

  const text = await res.text();
  if (!res.ok) {
    let err: Erecht24ApiErrorBody | undefined;
    try {
      err = JSON.parse(text) as Erecht24ApiErrorBody;
    } catch {
      /* ignore */
    }
    console.error(
      "[eRecht24] API error",
      res.status,
      path,
      err?.message_de ?? err?.message ?? text.slice(0, 300)
    );
    return null;
  }

  try {
    return JSON.parse(text) as Erecht24LegalPayload;
  } catch {
    console.error("[eRecht24] Invalid JSON body");
    return null;
  }
}

export async function fetchErecht24Imprint(): Promise<Erecht24LegalPayload | null> {
  return fetchErecht24Legal(ERECHT24_PATHS.imprint);
}

export async function fetchErecht24PrivacyPolicy(): Promise<Erecht24LegalPayload | null> {
  return fetchErecht24Legal(ERECHT24_PATHS.privacyPolicy);
}
