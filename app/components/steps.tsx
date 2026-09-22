"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "./anim";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PANELS = [
  {
    n: "01",
    kick: "Tell Aks",
    title: "Start with what's on your mind.",
    text: "Talk or type naturally. Say it the way you'd say it — no prompts to learn, no setup to get right.",
  },
  {
    n: "02",
    kick: "Add context",
    title: "Connect the things already part of your day.",
    text: "Calendar, tasks, inbox. Aks reads what's already there, so you don't start from zero.",
  },
  {
    n: "03",
    kick: "See it clearer",
    title: "Use the conversation to understand what matters.",
    text: "Reflect, organise your thoughts, and figure out what deserves your time next.",
  },
];

/**
 * Scroll-driven steps: sticky heading on desktop, three large panels that
 * take turns carrying full contrast as they pass through the viewport.
 * Without JS (or with reduced motion) every panel simply reads at full
 * strength — the dimming only switches on inside the effect.
 */
export default function Steps() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const root = ref.current;
    if (!root) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    if (panels.length === 0) return;
    root.dataset.steps = "on";
    const ctx = gsap.context(() => {
      const setActive = (active: HTMLElement) => {
        for (const p of panels) p.setAttribute("data-active", p === active ? "true" : "false");
      };
      setActive(panels[0]);
      for (const panel of panels) {
        ScrollTrigger.create({
          trigger: panel,
          start: "top 62%",
          end: "bottom 62%",
          onToggle: (self) => {
            if (self.isActive) setActive(panel);
          },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <p className="flex items-center gap-3 text-[12px] font-bold tracking-[0.14em] text-[#6B6B6B] uppercase">
            <span className="text-[#3D5A45]">04</span>
            <span className="h-px w-8 bg-[#D8D8D4]" aria-hidden />
            How it works
          </p>
          <h2
            id="how-heading"
            className="mt-5 text-[clamp(2.25rem,4.2vw,4rem)] leading-[1.02] font-bold tracking-[-0.025em]"
          >
            Three steps.
            <br className="hidden sm:block" aria-hidden />
            Nothing complicated.
          </h2>          <p className="mt-5 max-w-[380px] text-[16.5px] leading-[1.6] text-[#6B6B6B]">
            There is nothing to set up and nothing to learn. Each step follows
            from the last.
          </p>
        </div>
      </div>

      <ol className="lg:col-span-7">
        {PANELS.map((s, i) => (
          <li
            key={s.n}
            data-step
            data-active={i === 0 ? "true" : "false"}
            className={`border-t border-[#D8D8D4] py-10 md:py-14 ${
              i === PANELS.length - 1 ? "border-b" : ""
            }`}
          >
            <p className="flex items-baseline justify-between gap-4">
              <span className="text-[clamp(2.5rem,4vw,4rem)] leading-none font-black tracking-[-0.02em] text-[#171717]">
                {s.n}
              </span>
              <span className="text-[12px] font-bold tracking-[0.16em] text-[#3D5A45] uppercase">
                {s.kick}
              </span>
            </p>
            <h3
              data-step-title
              className="mt-4 text-[clamp(1.9rem,3.4vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.02em]"
            >
              {s.title}
            </h3>
            <p className="mt-4 max-w-[520px] text-[16.5px] leading-[1.65] text-[#6B6B6B] md:text-[18px]">
              {s.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
