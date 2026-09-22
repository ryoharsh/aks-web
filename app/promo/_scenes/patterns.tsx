"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { isReducedMotion } from "../../components/anim";
import DeviceMockup from "../_components/device";
import { SCREENS } from "../_components/screens";
import { Words } from "../_components/words";
import styles from "../promo.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Scene 06 — Patterns. The backdrop warms; the device turns almost imperceptibly. */
export default function PatternsScene() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const build = (desktop: boolean) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: desktop ? "+=2250" : "+=1750",
            scrub: 1.6,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo("[data-warm]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6, ease: "none" }, 0)
          .fromTo(
            "[data-pattern-title] [data-word]",
            { y: 54, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.4, stagger: 0.07, ease: "power3.out" },
            0.2
          )
          .fromTo(
            "[data-pattern-phone]",
            desktop
              ? { y: 90, autoAlpha: 0, rotationY: -5, scale: 0.97 }
              : { y: 70, autoAlpha: 0, scale: 0.95 },
            {
              y: 0,
              autoAlpha: 1,
              rotationY: desktop ? 5 : 0,
              scale: 1,
              duration: 2,
              ease: "power3.out",
            },
            0.4
          )
          .fromTo(
            "[data-pattern-glow]",
            { autoAlpha: 0, scale: 0.86 },
            { autoAlpha: 0.85, scale: 1, duration: 2, ease: "power2.out" },
            0.6
          )
          .to("[data-pattern-phone]", { rotationY: 0, duration: 1.2, ease: "power2.inOut" })
          .to("[data-pattern-group]", { autoAlpha: 0, y: -44, duration: 1, ease: "power2.in" }, "-=0.4")
          .to("[data-warm]", { autoAlpha: 0, duration: 1, ease: "none" }, "<");
      };
      mm.add("(min-width: 900px)", () => build(true));
      mm.add("(max-width: 899.98px)", () => build(false));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="Patterns" className="relative">
      <div data-warm aria-hidden className={styles.warm} />
      <div className={`${styles.frame} relative`} style={{ perspective: "2000px" }}>
        <div data-pattern-group className="flex flex-col items-center gap-8 md:gap-10">
          <h2 data-pattern-title className={`${styles.d2} max-w-[1150px]`}>
            <Words text="Sometimes the pattern is easier to see" />
            <span className={`${styles.muted} block`}>
              <Words text="when you're not looking for it." />
            </span>
          </h2>
          <div className="relative flex items-center justify-center">
            <span data-pattern-glow className="absolute" aria-hidden>
              <Image src="/logo.png" alt="" width={230} height={230} />
            </span>
            <div data-pattern-phone className="relative">
              <DeviceMockup
                src={SCREENS.remembers.src}
                alt={SCREENS.remembers.alt}
                className={styles["device-md"]}
                sizes="(max-width: 899px) 52vw, 268px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
