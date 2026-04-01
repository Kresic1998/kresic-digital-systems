import dynamic from "next/dynamic";

/**
 * Server Component shell: the interactive landing UI is code-split into a
 * separate client chunk so the main thread parses less JS before hydration.
 * Heavy Three.js visuals are additionally lazy-loaded inside `LandingPage`
 * via `components/landing/HeavyVisuals.tsx` (ssr: false).
 */
const LandingPage = dynamic(
  () =>
    import("@/components/LandingPage").then((mod) => ({
      default: mod.LandingPage,
    })),
  {
    loading: () => <LandingPageLoadingFallback />,
  },
);

function LandingPageLoadingFallback() {
  return (
    <div
      className="min-h-[100dvh] bg-terminal-bg"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-32 sm:px-6 lg:px-8">
        <div className="h-9 w-40 animate-pulse rounded-lg bg-white/[0.06]" />
        <div className="mt-10 h-12 max-w-xl animate-pulse rounded-lg bg-white/[0.05]" />
        <div className="mt-4 h-12 max-w-lg animate-pulse rounded-lg bg-white/[0.04]" />
        <div className="mt-16 h-11 w-full max-w-sm animate-pulse rounded-full bg-white/[0.05]" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return <LandingPage />;
}
