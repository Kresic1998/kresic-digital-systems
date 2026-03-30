export type LocaleCode = "en" | "de";

export type LandingDictionary = {
  nav: {
    expertise: string;
    about: string;
    work: string;
    contact: string;
    liveDemo: string;
  };
  headerCta: string;
  hero: {
    kicker: string;
    title: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    eyebrow: string;
    title: string;
    body: string;
    cards: readonly { title: string; description: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    altText: string;
    figcaptionSub: string;
    pills: readonly string[];
  };
  projects: {
    title: string;
    intro: string;
    tagline: string;
    caseStudy: string;
    viewOnGithub: string;
    restrictedAccess: string;
    legalNote: string;
    demoIntro: string;
    featured: readonly {
      role: string;
      name: string;
      summary: string;
      outcome: string;
      tags: readonly string[];
      githubUrl?: string;
    }[];
  };
  opSec: {
    title: string;
    intro: string;
    items: readonly { title: string; body: string }[];
  };
  legalFooter: {
    impressum: string;
    privacy: string;
  };
  form: {
    name: string;
    email: string;
    message: string;
    consent: string;
    consentError: string;
    submit: string;
    sending: string;
    success: string;
  };
  contact: {
    title: string;
    body: string;
    writtenContactLead: string;
  };
};
