"use client";

import { useEffect } from "react";
import { isReducedMotion } from "../../components/anim";

/**
 * Autoplay for the promo film: glides the page top-to-bottom over
 * `seconds` (ease in-out, requestAnimationFrame). Any manual input —
 * wheel, touch, pointer, or scroll keys — cancels it immediately so it
 * never fights the visitor. Skipped under prefers-reduced-motion.
 * Renders nothing.
 */
export default function AutoScroll({
  enabled,
  seconds,
}: {
  enabled: boolean;
  seconds: number;
}) {
  useEffect(() => {
    if (!enabled || seconds <= 0) return;
    if (isReducedMotion()) return;

    let raf = 0;
    let timer = 0;
    let cancelled = false;
    // The site styles `html { scroll-behavior: smooth }`, which turns every
    // scrollTo into an animated glide — each rAF frame would interrupt the
    // previous one and stall the page. Force instant scrolling while we drive.
    let prevBehavior = "";

    const cleanup = () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      document.documentElement.style.scrollBehavior = prevBehavior;
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("keydown", cancel);
    };
    function cancel() {
      cancelled = true;
      cleanup();
    }

    const step = (startY: number, distance: number, startTime: number) => (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - startTime) / (seconds * 1000));
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      window.scrollTo({ top: startY + distance * eased, behavior: "instant" });
      if (t < 1) {
        raf = requestAnimationFrame(step(startY, distance, startTime));
      } else {
        cleanup();
      }
    };

    const begin = () => {
      if (cancelled) return;
      const startY = window.scrollY;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight - startY;
      if (distance <= 0) return;
      prevBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      raf = requestAnimationFrame(step(startY, distance, performance.now()));
    };

    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("pointerdown", cancel);
    window.addEventListener("keydown", cancel);

    // Let ScrollTrigger pins settle before measuring the full height.
    if (document.readyState === "complete") {
      timer = window.setTimeout(begin, 600);
    } else {
      const onLoad = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(begin, 600);
      };
      window.addEventListener("load", onLoad, { once: true });
      timer = window.setTimeout(begin, 4000);
    }

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enabled, seconds]);

  return null;
}
