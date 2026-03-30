"use server";

import { Resend } from "resend";

import { SITE_EMAIL } from "@/lib/site";

export type SendEmailResult =
  | { success: true }
  | { success: false; error: string };

const MAX_NAME_LEN = 200;
const MAX_EMAIL_LEN = 320;
const MAX_MESSAGE_LEN = 8000;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function messages(locale: string) {
  const de = locale === "de";
  return {
    notConfigured: de
      ? "E-Mail-Versand ist nicht konfiguriert."
      : "Email service is not configured.",
    /** Production requires RESEND_FROM_EMAIL; dev falls back to onboarding@resend.dev */
    senderNotConfigured: de
      ? "E-Mail-Absender ist für den Live-Betrieb nicht konfiguriert."
      : "Email sender is not configured for production.",
    fillAll: de
      ? "Bitte füllen Sie alle Felder aus."
      : "Please fill in all fields.",
    tooLong: de
      ? "Ein Eingabefeld überschreitet die maximale Länge."
      : "An input field exceeds the maximum allowed length.",
    consent: de ? "Einwilligung ist erforderlich." : "Consent is required.",
    invalidEmail: de
      ? "Bitte geben Sie eine gültige E-Mail-Adresse ein."
      : "Please enter a valid email address.",
    sendFailed: de
      ? "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut."
      : "Could not send your message. Please try again later.",
  };
}

const isDev = process.env.NODE_ENV === "development";

/** Resend returns `error` as JSON (often `{ name, message, statusCode }`); log a full string for Vercel. */
function formatResendError(error: unknown): string {
  if (error == null) return String(error);
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (typeof error === "object") {
    const o = error as Record<string, unknown>;
    if (typeof o.message === "string") return o.message;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

export async function sendEmail(formData: FormData): Promise<SendEmailResult> {
  // Locale is a UI hint for error message language only; unknown values default to EN
  const rawLocale = String(formData.get("locale") ?? "en");
  const locale = rawLocale === "de" ? "de" : "en";
  const t = messages(locale);

  // RESEND_API_KEY must be trimmed — Vercel dashboard pastes often include trailing whitespace
  const rawKey = process.env.RESEND_API_KEY;
  const apiKey = typeof rawKey === "string" ? rawKey.trim() : "";

  // Development-only diagnostics — never runs in production
  if (isDev) {
    console.log("[sendEmail] API Key present:", apiKey.length > 0);
  }

  if (!apiKey) {
    console.warn(
      isDev
        ? "[sendEmail] RESEND_API_KEY missing. Add it to .env.local and restart."
        : "[sendEmail] RESEND_API_KEY is missing on this deployment. Set it in the host (e.g. Vercel) for Production and Preview, then redeploy."
    );
    return { success: false, error: t.notConfigured };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = formData.get("consent");

  // Server-side required-field validation (never trust HTML `required` alone)
  if (!name || !email || !message) {
    return { success: false, error: t.fillAll };
  }

  // Server-side length enforcement (mirrors client maxLength attributes)
  if (
    name.length > MAX_NAME_LEN ||
    email.length > MAX_EMAIL_LEN ||
    message.length > MAX_MESSAGE_LEN
  ) {
    return { success: false, error: t.tooLong };
  }

  // Server-side consent check (GDPR/DACH requirement — double-keyed)
  if (consent !== "on" && consent !== "true") {
    return { success: false, error: t.consent };
  }

  // Strict email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { success: false, error: t.invalidEmail };
  }

  // Sender address: RESEND_FROM_EMAIL must be a verified domain in production.
  // onboarding@resend.dev is a Resend test sender — reject it in production to avoid delivery failures.
  const fromRaw = process.env.RESEND_FROM_EMAIL?.trim() ?? "";
  const from =
    fromRaw.length > 0
      ? fromRaw
      : process.env.NODE_ENV === "production"
        ? null
        : "Kresic Digital Systems <onboarding@resend.dev>";

  if (!from) {
    console.warn(
      isDev
        ? "[sendEmail] RESEND_FROM_EMAIL is not set. Required when simulating production (e.g. next start)."
        : "[sendEmail] RESEND_FROM_EMAIL is not set. Production requires a verified Resend sender (e.g. Name <noreply@yourdomain.com>). Set it on the host and redeploy."
    );
    return { success: false, error: t.senderNotConfigured };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: [SITE_EMAIL],
      replyTo: email,
      subject: `New Lead: ${name} from Kresic Digital Systems`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: [
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
        `<p><strong>Message:</strong></p>`,
        `<p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
      ].join(""),
    });

    if (error) {
      console.error("[sendEmail] Resend error:", formatResendError(error));
      console.error("[sendEmail] Resend error (raw):", JSON.stringify(error));
      return { success: false, error: t.sendFailed };
    }

    return { success: true };
  } catch (err) {
    console.error(
      "[sendEmail] Send failed:",
      err instanceof Error ? err.message : err
    );
    return { success: false, error: t.sendFailed };
  }
}
