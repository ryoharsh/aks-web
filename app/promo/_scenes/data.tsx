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

/** Scene 07 — Your data. Two phones arrive from opposite sides. */
export default function DataScene() {
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
            end: desktop ? "+=2500" : "+=2100",
            scrub: 1.6,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          "[data-data-title] [data-word]",
          { y: 52, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
        )
          .fromTo(
            "[data-data-sub] [data-word]",
            { y: 34, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, stagger: 0.06, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            "[data-phone-left]",
            { x: desktop ? -150 : -70, autoAlpha: 0, rotationY: desktop ? -8 : 0 },
            { x: 0, autoAlpha: 1, rotationY: 0, duration: 1.8, ease: "power3.out" },
            "-=0.7"
          )
          .fromTo(
            "[data-phone-right]",
            { x: desktop ? 150 : 70, autoAlpha: 0, rotationY: desktop ? 8 : 0 },
            { x: 0, autoAlpha: 1, rotationY: 0, duration: 1.8, ease: "power3.out" },
            "-=1.8"
          )
          .fromTo(
            "[data-data-lines] > p",
            { y: 22, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.3, ease: "power2.out" },
            "-=0.9"
          )
          .to("[data-data-group]", { autoAlpha: 0, y: -44, duration: 1.1, ease: "power2.in" }, "+=0.6");
      };
      mm.add("(min-width: 900px)", () => build(true));
      mm.add("(max-width: 899.98px)", () => build(false));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="Your data, your control" className="relative">
      <div className={styles.frame} style={{ perspective: "2000px" }}>
        <div data-data-group className="flex flex-col items-center gap-8 md:gap-10">
          <h2 data-data-title className={styles.d1}>
            <Words text="Your data." />
          </h2>
          <p data-data-sub className={`${styles.d3} ${styles.muted}`}>
            <Words text="Your control." />
          </p>
          <div className="flex items-start justify-center gap-4 md:gap-10">
            <div data-phone-left>
              <DeviceMockup
                src={SCREENS.yourdata.src}
                alt={SCREENS.yourdata.alt}
                className={styles["device-xs"]}
                sizes="(max-width: 899px) 41vw, 216px"
              />
            </div>
            <div data-phone-right className="sm:mt-10">
              <DeviceMockup
                src={SCREENS.access.src}
                alt={SCREENS.access.alt}
                className={styles["device-xs"]}
                sizes="(max-width: 899px) 41vw, 216px"
              />
            </div>
          </div>
          <div data-data-lines className="flex flex-col items-center gap-3">
            <p className={styles.d3}>You decide what Aks knows.</p>
            <p className={`${styles.d3} ${styles.muted}`}>You decide what you share.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
