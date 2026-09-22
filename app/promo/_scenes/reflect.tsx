"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "../../components/anim";
import DeviceMockup from "../_components/device";
import { SCREENS } from "../_components/screens";
import { Words } from "../_components/words";
import styles from "../promo.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Scene 04 — "You reflect." / "Aks helps you notice." Two phones, two depths. */
export default function ReflectScene() {
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
            end: desktop ? "+=2500" : "+=1900",
            scrub: 1.6,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          "[data-reflect-title] [data-word]",
          { y: 56, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.4, stagger: 0.08, ease: "power3.out" }
        )
          .fromTo(
            "[data-phone-front]",
            { y: 90, autoAlpha: 0, scale: 0.96 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 1.8, ease: "power3.out" },
            "-=1"
          )
          .fromTo(
            "[data-phone-back]",
            { y: 130, autoAlpha: 0, scale: 0.94 },
            { y: 60, autoAlpha: 0.92, scale: 0.96, duration: 1.8, ease: "power3.out" },
            "-=1.8"
          )
          // gentle parallax: depths drift apart, then the scene dissolves
          .to("[data-phone-front]", { y: -46, duration: 1.6, ease: "none" })
          .to("[data-phone-back]", { y: -6, duration: 1.6, ease: "none" }, "<")
          .to("[data-reflect-group]", { autoAlpha: 0, y: -40, duration: 1, ease: "power2.in" }, "-=0.6");
      };
      mm.add("(min-width: 900px)", () => build(true));
      mm.add("(max-width: 899.98px)", () => build(false));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="You reflect" className="relative">
      <div className={styles.frame}>
        <div data-reflect-group className="flex flex-col items-center gap-10 md:gap-12">
          <h2 data-reflect-title className={`${styles.d1} max-w-[1000px]`}>
            <Words text="You reflect." />
            <span className={`${styles.muted} block`}>
              <Words text="Aks helps you notice." />
            </span>
          </h2>
          <div className="relative flex items-start justify-center">
            <div
              data-phone-back
              className="absolute top-10 hidden sm:block sm:translate-x-32 lg:translate-x-40"
            >
              <DeviceMockup
                src={SCREENS.remembers.src}
                alt={SCREENS.remembers.alt}
                small
                sizes="240px"
              />
            </div>
            <div data-phone-front className="relative z-[3]">
              <DeviceMockup
                src={SCREENS.mirror.src}
                alt={SCREENS.mirror.alt}
                sizes="(max-width: 899px) 64vw, 320px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
