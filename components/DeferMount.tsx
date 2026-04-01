"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Delays mounting children until after the first paint window so FCP/LCP can
 * complete before heavy WebGL / long tasks run (reduces TBT on slow devices).
 */
export function DeferHeavyChild({
  children,
  fallback,
  delayMs = 500,
}: {
  children: ReactNode;
  fallback: ReactNode;
  /** Minimum wait before scheduling work; then prefers an idle slice (caps wait). */
  delayMs?: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;

    const timer = window.setTimeout(() => {
      const go = () => {
        if (!cancelled) setShow(true);
      };
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(go, { timeout: 1200 });
      } else {
        go();
      }
    }, delayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [delayMs]);

  return show ? children : fallback;
}

/**
 * Mounts children only when the wrapper intersects the viewport (or rootMargin).
 * Defers below-the-fold Three.js and code-split chunks until needed.
 */
export function MountWhenVisible({
  children,
  fallback,
  rootMargin = "120px",
  className,
}: {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : fallback}
    </div>
  );
}
