"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { isReducedMotion } from "./anim";

const MIN_MS = 650;
const MAX_MS = 2600;

/**
 * Minimal loading screen. Editorial, not animated-for-effect:
 * wordmark, hairline progress, mono counter, curtain-lift exit.
 *
 * Safety properties (do not remove):
 * - Server-rendered with `hidden`, so no-JS visitors never get stuck.
 * - Skipped under prefers-reduced-motion.
 * - Visibility is toggled via refs/DOM only — no state, so no hydration
 *   mismatch and no cascading renders.
 * - Dispatches `aks:ready` on exit; the hero entrance waits for it.
 */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isReducedMotion()) return;

    // Shows on every full page load (client-side navigation never remounts
    // the layout, so repeat views in-app are unaffected).

    el.removeAttribute("hidden");
    document.documentElement.setAttribute("data-aks-loading", "1");
    document.body.style.overflow = "hidden";
    document.body.toggleAttribute("inert", true);

    const bar = el.querySelector("[data-bar]");
    const num = el.querySelector("[data-num]");
    const counter = { v: 0 };
    const startedAt = performance.now();
    const setNum = () => {
      if (num) num.textContent = String(Math.round(counter.v)).padStart(3, "0");
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power1.out" }
      );
      gsap.fromTo(
        "[data-rise]",
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.09, ease: "power2.out" }
      );
      gsap.to(counter, {
        v: 100,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: setNum,
      });
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.8, ease: "power2.out" }
        );
      }
    }, el);

    // Exit scheduling uses closure-local flags (fresh on every effect run),
    // so a StrictMode remount always gets a working exit — a persistent
    // "done" flag would let the first run's cleanup cancel the only exit.
    let waitId = 0;
    let exited = false;
    const finish = () => {
      if (waitId || exited) return;
      const wait = Math.max(0, MIN_MS - (performance.now() - startedAt));
      waitId = window.setTimeout(() => {
        waitId = 0;
        exited = true;
        ctx.add(() => {
          gsap
            .timeline({
              onComplete: () => {
                el.remove();
                document.documentElement.removeAttribute("data-aks-loading");
                document.body.style.overflow = "";
                document.body.toggleAttribute("inert", false);
                window.dispatchEvent(new Event("aks:ready"));
              },
            })
            .to(counter, {
              v: 100,
              duration: 0.25,
              ease: "power1.out",
              onUpdate: setNum,
              overwrite: true,
            })
            .to(
              "[data-rise]",
              { autoAlpha: 0, y: -12, duration: 0.4, ease: "power2.in" },
              "<"
            )
            .to(el, {
              yPercent: -100,
              duration: 0.9,
              ease: "power3.inOut",
            });
        });
      }, wait);
    };

    const onLoad = () => finish();
    const maxId = window.setTimeout(finish, MAX_MS);
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.clearTimeout(maxId);
      window.clearTimeout(waitId);
      waitId = 0;
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      hidden
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAFAF8]"
    >
      <div data-rise className="flex items-center gap-3">
        <Image
          src="/favicon.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 rounded-[9px]"
        />
        <span className="text-[30px] leading-none font-black tracking-[-0.02em] text-[#171717]">
          Aks
        </span>
      </div>

      <div data-rise className="mt-7 h-px w-40 overflow-hidden bg-[#E4E4E0]">
        <div data-bar className="h-full w-full origin-left bg-[#171717]" />
      </div>

      <div
        data-rise
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-5 md:px-8 md:pb-6"
      >
        <p className="text-[11px] font-bold tracking-[0.18em] text-[#9a9a96] uppercase">
          Personal companion
        </p>
        <p className="font-mono text-[12px] text-[#9a9a96]">
          <span data-num>000</span> / 100
        </p>
      </div>
    </div>
  );
}
