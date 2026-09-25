"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown01Icon } from "hugeicons-react";
import HeroShowcase from "./hero-showcase";
import ProductHuntBadge from "./product-hunt-badge";
import { HeroIntro, isReducedMotion } from "./anim";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Editorial hero: giant stacked headline, then a large browser-style Mirror
 * showcase that overlaps into the next section. On scroll the headline lifts,
 * the supporting row fades, and the showcase scales 0.92 → 1 — one scrubbed
 * composition, no scroll-jacking.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to("[data-hero-headline]", { y: -90, ease: "none", duration: 1 }, 0)
        .to("[data-hero-sub]", { y: -50, autoAlpha: 0, ease: "none", duration: 1 }, 0)
        .fromTo(
          "[data-hero-showcase]",
          { scale: 0.92, y: 70 },
          { scale: 1, y: 0, ease: "none", duration: 1 },
          0
        );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-labelledby="site-heading" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1320px] px-5 pt-12 md:px-8 md:pt-16">
        <HeroIntro>
          <div data-hero-item className="flex items-center justify-between gap-4">
            <p className="text-[12px] font-bold tracking-[0.18em] text-[#3D5A45] uppercase">
              Personal companion
            </p>
            <p className="hidden font-mono text-[12px] text-[#9a9a96] sm:block">
              Aks · Mirror
            </p>
          </div>

          <h1
            id="site-heading"
            data-hero-item
            data-hero-headline
            className="mt-6 text-[clamp(2.5rem,11.5vw,10.5rem)] leading-[0.9] font-black tracking-[-0.03em] text-[#171717] uppercase"
          >
            <span className="block">Understand</span>
            <span className="block">yourself.</span>
          </h1>

          <div
            data-hero-item
            data-hero-sub
            className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-12 lg:items-end"
          >
            <p className="max-w-[520px] text-[18px] leading-[1.55] text-[#444443] lg:col-span-6 md:text-[20px]">
              A place to talk about what&apos;s on your mind and make sense of
              what&apos;s happening in your life.
            </p>
            <div className="lg:col-span-6 lg:justify-self-end">
              <div className="flex flex-col gap-2.5 sm:flex-row lg:justify-end">
                <a
                  href="#availability"
                  className="flex h-12 items-center justify-center rounded-full bg-[#171717] px-7 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(23,23,23,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2b2b2b] hover:shadow-[0_12px_32px_rgba(23,23,23,0.28)]"
                >
                  Get Aks
                </a>
                <a
                  href="#how"
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-[#E0E0DC] bg-white/80 px-7 text-[15px] font-medium text-[#171717] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9c9c4] hover:bg-white hover:shadow-[0_12px_28px_rgba(23,23,23,0.10)]"
                >
                  See how it works
                  <ArrowDown01Icon size={16} aria-hidden />
                </a>
              </div>
              <p className="mt-4 text-[13.5px] text-[#6B6B6B] sm:text-right">
                Available on Android · iOS coming soon
              </p>
              <ProductHuntBadge className="mt-4 sm:ml-auto" />
            </div>
          </div>
        </HeroIntro>
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8">
        <div data-hero-showcase className="relative z-10 mt-12 -mb-[7vw] md:mt-16">
          <HeroShowcase />
          <p className="mt-4 text-[13px] text-[#6B6B6B]">
            Mirror, in the Aks app — type or speak, review, send, continue.
          </p>
        </div>
      </div>
    </section>
  );
}
