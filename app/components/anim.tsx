"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function isReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Subtle once-only entrance. Renders fully visible with no JS;
 * animation is only applied (and cleaned up) when JS + GSAP run.
 * `delay` is in milliseconds (converted to seconds for GSAP).
 */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  y = 18,
  x = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  x?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { x, y, autoAlpha: 0 },
        {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: delay / 1000,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, x, y]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyTag = Tag as any;
  return (
    <AnyTag ref={ref} className={className} style={style}>
      {children}
    </AnyTag>
  );
}

/** Staggered entrance for the hero, played once on mount. */
export function HeroIntro({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    // The loading screen shows on every full page load (except reduced
    // motion), so hold the entrance until it lifts. Event + fallback means
    // the hero can never get stuck waiting.
    let onReady: (() => void) | null = null;
    let fallback = 0;
    const ctx = gsap.context(() => {
      const tw = gsap.fromTo(
        "[data-hero-item]",
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.09,
          overwrite: "auto",
          paused: true,
        }
      );
      onReady = () => tw.play();
      fallback = window.setTimeout(() => tw.play(), 3500);
      window.addEventListener("aks:ready", onReady);
    }, ref);
    return () => {
      if (onReady) window.removeEventListener("aks:ready", onReady);
      if (fallback) window.clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Barely-there scroll drift for large media. Disabled on reduced motion. */
export function Drift({
  children,
  className,
  amount = 24,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: amount },
        {
          y: -amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Compact-on-scroll state for the navbar. Cheap passive listener. */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/**
 * Clip/scale entrance for large media — the frame wipes open while the
 * image settles. One composition-level move instead of many small ones.
 */
export function MediaReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 56, scale: 0.96, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/**
 * Horizontal scroll drift (scrubbed). Used for the counter-moving
 * integration rows — depth you feel, not motion you watch.
 */
export function ScrubX({
  children,
  className,
  from = 0,
  to = -10,
  ariaHidden = false,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
  ariaHidden?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: from },
        {
          xPercent: to,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [from, to]);

  return (
    <div ref={ref} className={className} aria-hidden={ariaHidden || undefined}>
      {children}
    </div>
  );
}

/**
 * Staged entrance for grouped children (e.g. Mirror conversation blocks).
 * Static content, revealed in sequence — the UI feels alive without faking
 * functionality.
 */
export function Stage({
  children,
  className,
  item = "[data-msg]",
  stagger = 0.14,
}: {
  children: ReactNode;
  className?: string;
  item?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      gsap.fromTo(
        q(item),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [item, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
