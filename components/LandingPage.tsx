"use client";

import type { ReactElement, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";

import { ContactFormWithConsent } from "@/components/ContactFormWithConsent";
import { FadeIn } from "@/components/FadeIn";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  BRAND_NAME,
  GITHUB_URL,
  SITE_EMAIL,
  SITE_MAILTO,
} from "@/lib/site";
import { useI18n } from "@/lib/i18n";

type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactElement;

function IconCustomWeb(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x={3} y={4} width={18} height={14} rx={2} />
      <path d="M7 8h4M7 12h10" />
      <path d="M3 18h18" />
    </svg>
  );
}

function IconQuantFinance(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x={4} y={3} width={16} height={18} rx={2} />
      <path d="M8 7h8M8 11h5M8 15h8" />
    </svg>
  );
}

function IconTradingData(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M4 19V5M4 19h16" />
      <path d="M8 15l3-4 3 2 4-6" />
      <circle cx={8} cy={15} r={1.25} fill="currentColor" stroke="none" />
      <circle cx={11} cy={11} r={1.25} fill="currentColor" stroke="none" />
      <circle cx={14} cy={13} r={1.25} fill="currentColor" stroke="none" />
      <circle cx={18} cy={7} r={1.25} fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconOptimization(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M14.5 4.5 19 9l-7 7-4 1 1-4 7-7Z" />
      <path d="m12 15 3-3M9 18l-2 2M5 14l2-2" />
    </svg>
  );
}

function IconOpSecIsolation(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconOpSecEncrypted(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x={5} y={11} width={14} height={10} rx={2} />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx={12} cy={16} r={1} fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconOpSecDiscretion(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M12 3 20 6v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const expertiseIcons: readonly IconComponent[] = [
  IconCustomWeb,
  IconQuantFinance,
  IconTradingData,
  IconOptimization,
];

const opSecIcons: readonly IconComponent[] = [
  IconOpSecIsolation,
  IconOpSecEncrypted,
  IconOpSecDiscretion,
];

const projectAccents = [
  "from-violet-500/20 to-fuchsia-500/10",
  "from-cyan-500/20 to-emerald-500/10",
  "from-amber-500/20 to-orange-500/10",
] as const;

function SiteHeader() {
  const { t } = useI18n();
  const nav = [
    { href: "#expertise", label: t.nav.expertise },
    { href: "#about", label: t.nav.about },
    { href: "#work", label: t.nav.work },
    { href: "/demo/market-analytics", label: t.nav.liveDemo },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/80 bg-zinc-50/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-slate-950/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <Link
          href="#hero"
          className="inline-flex min-h-11 max-w-[min(100%,14rem)] items-center rounded-md text-sm font-semibold leading-tight tracking-tight text-zinc-900 [-webkit-tap-highlight-color:transparent] dark:text-white sm:max-w-xs"
        >
          {BRAND_NAME}
        </Link>
        <nav
          className="hidden items-center gap-8 text-sm font-medium text-zinc-600 dark:text-slate-400 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-4">
          <LanguageSwitcher />
          <Link
            href="#contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-zinc-900 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-800 [-webkit-tap-highlight-color:transparent] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:px-5 sm:text-sm"
          >
            {t.headerCta}
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section
      id="hero"
      className="scroll-mt-24 relative overflow-hidden border-b border-zinc-200/80 pt-24 pb-20 dark:border-white/[0.06] sm:pt-28 sm:pb-24 md:pt-32 md:pb-32 lg:pb-40"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-100"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/15" />
        <div className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-500/10" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            {h.kicker}
          </p>
          <h1
            id="hero-heading"
            className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
              {h.title}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-slate-400 sm:text-xl">
            {h.sub}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:bg-zinc-800 dark:bg-white dark:text-slate-950 dark:shadow-none dark:hover:bg-slate-200"
            >
              {h.ctaPrimary}
            </Link>
            <Link
              href="#expertise"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white/50 px-8 text-sm font-semibold text-zinc-800 backdrop-blur-sm transition hover:border-zinc-400 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/[0.06]"
            >
              {h.ctaSecondary}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t } = useI18n();
  const s = t.services;

  return (
    <section
      id="expertise"
      className="scroll-mt-24 border-y border-zinc-800/80 bg-slate-950 py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400/90">
              {s.eyebrow}
            </p>
            <h2
              id="services-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              {s.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">{s.body}</p>
          </div>
        </FadeIn>
        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {s.cards.map((card, index) => {
            const Icon = expertiseIcons[index];
            return (
              <li key={index} className="h-full min-h-0">
                <FadeIn delay={index * 0.1} className="h-full">
                  <article className="group flex h-full flex-col rounded-2xl border border-zinc-800/90 bg-zinc-900/30 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-zinc-900/50 hover:shadow-lg hover:shadow-indigo-500/5">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/80 text-indigo-300 transition-all duration-300 group-hover:border-indigo-500/25 group-hover:text-indigo-200"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                      {card.description}
                    </p>
                  </article>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function AboutSection() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-zinc-800/80 bg-slate-950 py-20 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="max-w-xl lg:max-w-none">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400/90">
              {a.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-tight"
            >
              {a.title}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-relaxed">
              <p className="text-slate-300">{a.body}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-2 sm:gap-2.5">
              {a.pills.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium tracking-wide text-slate-300 backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          </FadeIn>
          <FadeIn
            delay={0.12}
            className="flex w-full justify-center lg:pt-2"
          >
            <figure
              className="relative mx-auto w-full max-w-[160px] overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_64px_-12px_rgba(99,102,241,0.25),0_0_80px_-20px_rgba(129,140,248,0.35)] lg:max-w-[192px]"
            >
              <Image
                src="/images/portret.webp"
                alt={a.altText}
                width={192}
                height={240}
                priority
                sizes="(min-width: 1024px) 192px, 160px"
                className="block h-auto w-full rounded-2xl"
              />
            </figure>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { t } = useI18n();
  const p = t.projects;

  return (
    <section
      id="work"
      className="scroll-mt-24 border-b border-zinc-200/80 py-20 dark:border-white/[0.06] md:py-28"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2
                id="work-heading"
                className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
              >
                {p.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-slate-400">
                {p.intro}
              </p>
              <Link
                href="/demo/market-analytics"
                className="mt-5 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/25 transition hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-900/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:shadow-emerald-950/50 dark:hover:bg-emerald-400 dark:hover:shadow-emerald-950/60"
              >
                {t.nav.liveDemo}
                <span aria-hidden className="text-base leading-none">
                  →
                </span>
              </Link>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-zinc-500 dark:text-slate-500">
                {p.demoIntro}
              </p>
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-slate-500">
              {p.tagline}
            </p>
          </div>
        </FadeIn>
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
          {p.featured.map((project, index) => (
            <FadeIn key={project.name} delay={index * 0.12} className="min-h-0">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-zinc-300 hover:shadow-xl dark:border-white/[0.06] dark:bg-slate-900/40 dark:shadow-none dark:hover:border-white/[0.14] dark:hover:shadow-2xl dark:hover:shadow-black/50">
                <div
                  className={`relative aspect-[16/10] bg-gradient-to-br ${projectAccents[index] ?? projectAccents[0]} from-zinc-100 to-zinc-50 dark:from-slate-800/80 dark:to-slate-900`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-zinc-200/80 bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-400">
                      {p.caseStudy}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {project.role}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-slate-400">
                    {project.summary}
                  </p>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-800 dark:text-slate-200">
                    {project.outcome}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={`${project.name}-${tag}`}
                        className="rounded-md border border-zinc-200/80 bg-zinc-100/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-zinc-700 dark:border-white/10 dark:bg-terminal-800/50 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2} className="mt-10 lg:mt-12">
          <p className="max-w-4xl text-xs leading-relaxed text-zinc-500 dark:text-slate-500">
            {p.legalNote}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function ContactOpSecTrustModule() {
  const { t } = useI18n();
  const o = t.opSec;

  return (
    <aside
      className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 lg:p-10"
      aria-labelledby="opsec-trust-heading"
    >
      <h3
        id="opsec-trust-heading"
        className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
      >
        {o.title}
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{o.intro}</p>
      <ul className="mt-8 divide-y divide-white/10 border-t border-white/10">
        {o.items.map((item, index) => {
          const Icon = opSecIcons[index];
          return (
            <li key={index} className="flex gap-4 py-6 first:pt-8">
              <div className="mt-0.5 shrink-0 text-slate-500" aria-hidden>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium tracking-tight text-slate-300">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function ContactSection() {
  const { t, locale } = useI18n();

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <FadeIn>
            <h2
              id="contact-heading"
              className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
            >
              {t.contact.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-slate-400">
              {t.contact.body}
            </p>
            <p className="mt-6 text-sm font-medium text-zinc-600 dark:text-slate-400">
              {t.contact.writtenContactLead}
            </p>
            <a
              href={SITE_MAILTO}
              className="mt-2 inline-flex max-w-full items-center gap-2 break-all text-sm font-medium text-zinc-700 underline-offset-4 transition hover:underline dark:text-slate-400 dark:hover:text-slate-300"
            >
              {SITE_EMAIL}
              <span aria-hidden className="shrink-0">
                →
              </span>
            </a>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-white/[0.06] dark:bg-slate-900/40 dark:shadow-none sm:p-8">
              <ContactFormWithConsent labels={t.form} locale={locale} />
            </div>
          </FadeIn>
          <div className="lg:col-span-2">
            <FadeIn delay={0.18} className="mt-12 lg:mt-16">
              <ContactOpSecTrustModule />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-zinc-200/80 py-10 dark:border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="text-sm text-zinc-500 dark:text-slate-500">
          © 2026 Danijel Kresic | Kresic Digital Systems
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
          <Link
            href="/impressum"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-zinc-900 dark:hover:text-white"
          >
            {t.legalFooter.impressum}
          </Link>
          <Link
            href="/datenschutz"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-zinc-900 dark:hover:text-white"
          >
            {t.legalFooter.privacy}
          </Link>
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="min-w-0 overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
