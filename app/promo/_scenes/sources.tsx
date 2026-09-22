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

/** Scene 08 — Sources. One quiet device, slowly turning, shrinking away. */
export default function SourcesScene() {
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
            end: desktop ? "+=2000" : "+=1600",
            scrub: 1.6,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          "[data-src-phone]",
          { autoAlpha: 0, y: 70, scale: 0.96, rotationY: desktop ? -4 : 0 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotationY: desktop ? 4 : 0,
            duration: 2,
            ease: "power3.out",
          }
        )
          .fromTo(
            "[data-src-title] [data-word]",
            { y: 48, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.08, ease: "power3.out" },
            "-=1.4"
          )
          .fromTo(
            "[data-src-sub]",
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: "power2.out" },
            "-=0.8"
          )
          .to("[data-src-phone]", {
            rotationY: 0,
            scale: 0.96,
            y: -20,
            duration: 1.4,
            ease: "power2.inOut",
          })
          .to("[data-src-group]", { autoAlpha: 0, y: -44, duration: 1, ease: "power2.in" }, "-=0.5");
      };
      mm.add("(min-width: 900px)", () => build(true));
      mm.add("(max-width: 899.98px)", () => build(false));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="Connected sources" className="relative">
      <div className={styles.frame} style={{ perspective: "2000px" }}>
        <div data-src-group className="flex flex-col items-center gap-8 md:gap-10">
          <div data-src-phone>
            <DeviceMockup
              src={SCREENS.access.src}
              alt={SCREENS.access.alt}
              sizes="(max-width: 899px) 64vw, 320px"
            />
          </div>
          <h2 data-src-title className={styles.d1}>
            <Words text="Your context." />
          </h2>
          <p data-src-sub className={styles.lede}>
            Connected when you choose.
          </p>
        </div>
      </div>
    </section>
  );
}
