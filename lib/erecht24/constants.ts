/** Base URL — može se promeniti ako eRecht24 objavi novi host. */
export const ERECHT24_API_DEFAULT_BASE = "https://api.e-recht24.de";

export const ERECHT24_PATHS = {
  imprint: "/v2/imprint",
  privacyPolicy: "/v2/privacyPolicy",
  privacyPolicySocialMedia: "/v2/privacyPolicySocialMedia",
} as const;

/** Query parametri koje šalje eRecht24 push (Helper::ERECHT24_PUSH_PARAM_*). */
export const ERECHT24_PUSH_QUERY = {
  secret: "erecht24_secret",
  type: "erecht24_type",
} as const;

export const ERECHT24_PUSH_TYPES = [
  "ping",
  "imprint",
  "privacyPolicy",
  "privacyPolicySocialMedia",
] as const;

export type Erecht24PushType = (typeof ERECHT24_PUSH_TYPES)[number];

export const ERECHT24_CACHE_TAG = "erecht24-legal";
