"use client";

import type { FormEvent } from "react";
import { useState, useTransition } from "react";

import { sendEmail } from "@/app/actions/sendEmail";
import type { LocaleCode } from "@/dictionaries/types";

export type ContactFormLabels = {
  name: string;
  email: string;
  message: string;
  consent: string;
  submit: string;
  sending: string;
  success: string;
};

type ContactFormWithConsentProps = {
  labels: ContactFormLabels;
  locale: LocaleCode;
};

export function ContactFormWithConsent({
  labels,
  locale,
}: ContactFormWithConsentProps) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setFeedback(null);

    startTransition(async () => {
      const result = await sendEmail(formData);
      if (result.success) {
        setFeedback({ type: "success", message: labels.success });
        form.reset();
      } else {
        setFeedback({ type: "error", message: result.error });
      }
    });
  }

  return (
    <form
      className="space-y-5"
      aria-label="Contact form"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="locale" value={locale} />

      {feedback ? (
        <div
          role="status"
          aria-live="polite"
          className={
            feedback.type === "success"
              ? "rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200"
              : "rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-800 dark:text-red-200"
          }
        >
          {feedback.message}
        </div>
      ) : null}

      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-slate-500"
        >
          {labels.name}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={200}
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-600"
          disabled={isPending}
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-slate-500"
        >
          {labels.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={320}
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-600"
          disabled={isPending}
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-slate-500"
        >
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          maxLength={8000}
          className="mt-2 w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-600"
          disabled={isPending}
        />
      </div>

      <div className="flex gap-3 rounded-xl border border-white/10 bg-slate-950/40 p-4 dark:bg-slate-950/60">
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          value="true"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-400 bg-zinc-100 text-emerald-600 focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60 dark:border-white/20 dark:bg-slate-900 dark:text-emerald-500 dark:focus:ring-emerald-400/30"
          disabled={isPending}
        />
        <label
          htmlFor="contact-consent"
          className="text-sm leading-relaxed text-zinc-700 dark:text-slate-300"
        >
          {labels.consent}
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-zinc-900 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
      >
        {isPending ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
