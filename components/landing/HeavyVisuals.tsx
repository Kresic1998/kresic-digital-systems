"use client";

import dynamic from "next/dynamic";

/** Hero 3D canvas — largest three.js cost; load only on the client after paint. */
function HeroVisualSkeleton() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 min-h-full w-full overflow-hidden bg-terminal-bg"
      aria-hidden
    />
  );
}

/** Project card header visuals — same aspect as DataFlowVisual / siblings. */
function CardThreeSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={[
        "relative isolate w-full min-h-[12rem] h-48 overflow-hidden rounded-lg border border-white/5 bg-[#050505]",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    />
  );
}

export const DynamicHeroVisual = dynamic(
  () => import("@/components/HeroVisual"),
  { ssr: false, loading: HeroVisualSkeleton },
);

export const DynamicDataFlowVisual = dynamic(
  () => import("@/components/DataFlowVisual"),
  { ssr: false, loading: () => <CardThreeSkeleton /> },
);

export const DynamicInfrastructureGrid = dynamic(
  () => import("@/components/InfrastructureGrid"),
  { ssr: false, loading: () => <CardThreeSkeleton /> },
);

export const DynamicMarketPulseVisual = dynamic(
  () => import("@/components/MarketPulseVisual"),
  { ssr: false, loading: () => <CardThreeSkeleton /> },
);

export const projectHeaderVisuals = [
  DynamicDataFlowVisual,
  DynamicInfrastructureGrid,
  DynamicMarketPulseVisual,
] as const;
