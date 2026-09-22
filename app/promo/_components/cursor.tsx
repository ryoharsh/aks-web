"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A small soft orb trailing the cursor on fine-pointer desktops.
 * Transform-only, hidden entirely for reduced motion or touch.
 */
export default function CursorOrb() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.remove();
      return;
    }
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      gsap.to(el, { scale: 1, opacity: 1, duration: 0.3, overwrite: "auto" });
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onLeave = () => gsap.to(el, { scale: 0, opacity: 0, duration: 0.3 });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[200] h-7 w-7 rounded-full opacity-0"
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #f9b3a6 0%, #e58ba4 45%, rgba(229,138,164,0) 72%)",
      }}
    />
  );
}
