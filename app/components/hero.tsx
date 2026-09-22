"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown01Icon } from "hugeicons-react";
import { DemoVideo } from "./product-video";
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
                  className="flex h-12 items-center justify-center rounded-[8px] bg-[#171717] px-7 text-[15px] font-medium text-white transition-colors hover:bg-[#2b2b2b]"
                >
                  Get Aks
                </a>
                <a
                  href="#how"
                  className="flex h-12 items-center justify-center gap-2 rounded-[8px] border border-[#E0E0DC] bg-white px-7 text-[15px] font-medium text-[#171717] transition-colors hover:border-[#d4d4d0] hover:bg-[#F4F4F1]"
                >
                  See how it works
                  <ArrowDown01Icon size={16} aria-hidden />
                </a>
              </div>
              <p className="mt-4 text-[13.5px] text-[#6B6B6B] sm:text-right">
                Available on Android · iOS coming soon
              </p>
            </div>
          </div>
        </HeroIntro>
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8">
        <div data-hero-showcase className="relative z-10 mt-12 -mb-[7vw] md:mt-16">
          <div className="overflow-hidden rounded-[12px] border border-[#E0E0DC] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05),0_24px_64px_rgba(0,0,0,0.09)]">
            <div className="flex items-center gap-3 border-b border-[#E8E8E5] px-4 py-3">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#E0E0DC]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E0E0DC]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E0E0DC]" />
              </span>
              <span className="flex-1 text-center font-mono text-[12px] text-[#9a9a96]">
                aks · mirror
              </span>
              <span className="hidden rounded-[6px] bg-[#EEF2ED] px-2 py-0.5 text-[12px] font-medium text-[#3D5A45] sm:inline">
                Live demo
              </span>
            </div>
            <DemoVideo src="/videos/slide_1.mp4" label="Product demonstration of Aks Mirror" />
          </div>
          <p className="mt-4 text-[13px] text-[#6B6B6B]">
            Mirror, in the Aks app — type or speak, review, send, continue.
          </p>
        </div>
      </div>
    </section>
  );
}
