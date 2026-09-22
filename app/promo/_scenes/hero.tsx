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

/** Scene 02 — hero. The statement, then the Mirror phone emerges. */
export default function HeroScene() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const build = (rotate: boolean, travel: number) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: rotate ? "+=2750" : "+=2000",
            scrub: 1.6,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          "[data-hero-title] [data-word]",
          { y: 62, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.6, stagger: 0.09, ease: "power3.out" }
        )
          .fromTo(
            "[data-hero-sub]",
            { y: 22, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
            "-=1"
          )
          .fromTo(
            "[data-hero-phone]",
            rotate
              ? { scale: 0.88, rotationY: -8, rotationX: 4, autoAlpha: 0, y: 70 }
              : { scale: 0.92, autoAlpha: 0, y: 56 },
            {
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              autoAlpha: 1,
              y: 0,
              duration: 2,
              ease: "power3.out",
            },
            "-=0.8"
          )
          .to(
            "[data-hero-text]",
            { y: -travel, autoAlpha: 0, duration: 1.4, ease: "power2.in" },
            "+=0.8"
          )
          .to("[data-hero-phone]", { y: -24, duration: 1.2, ease: "power2.inOut" }, "<");
      };
      mm.add("(min-width: 900px)", () => build(true, 120));
      mm.add("(max-width: 899.98px)", () => build(false, 64));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="Aks.ai hero" className={`${styles.heroSection} relative`}>
      <div className={styles.heroLayout} style={{ perspective: "2000px" }}>
        <div data-hero-text className={styles.heroCopy}>
          <h1 data-hero-title className={styles.heroTitle}>
            <Words text="Understand yourself, differently." />
          </h1>
          <p data-hero-sub className={`${styles.lede} mt-8`}>
            A personal AI companion for reflection, context, and self-understanding.
          </p>
        </div>
        <div data-hero-phone className={styles.heroPhone}>
          <DeviceMockup
            src={SCREENS.mirror.src}
            alt={SCREENS.mirror.alt}
            eager
            className={styles.heroDevice}
            sizes="(max-width: 899px) 58vw, 322px"
          />
        </div>
      </div>
    </section>
  );
}
