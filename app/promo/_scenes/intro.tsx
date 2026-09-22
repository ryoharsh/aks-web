"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "../../components/anim";
import Image from "next/image";
import { Words } from "../_components/words";
import styles from "../promo.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Scene 01 — near-empty opening. The orb materialises, then the name. */
export default function IntroScene() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Entrance plays once on arrival (not scrubbed) so the opening frame
      // is alive even before the visitor scrolls.
      gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      })
        .fromTo(
          "[data-orb]",
          { autoAlpha: 0, scale: 0.92, filter: "blur(6px)" },
          { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" }
        )
        .fromTo(
          "[data-title] [data-word]",
          { y: 34, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.1, ease: "power3.out" },
          "-=1"
        )
        .fromTo(
          "[data-tag] [data-word]",
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.05, ease: "power3.out" },
          "-=0.7"
        );
      // Exit is scrubbed: the group lifts away as the hero approaches.
      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=1750",
          scrub: 1.6,
          pin: true,
          anticipatePin: 1,
        },
      }).to("[data-intro-group]", { y: -48, autoAlpha: 0, duration: 1, ease: "power2.in" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="Introduction" className="relative">
      <div className={styles.frame}>
        <div data-intro-group className="flex flex-col items-center">
          <span data-orb>
            <Image src="/logo.png" alt="Aks logo" width={112} height={112} priority />
          </span>
          <p data-title className={`${styles.d0} ${styles.wordmark} mt-12`}>
            <Words text="Welcome, Aksiyar" />
          </p>
          <p data-tag className={`${styles.d4} ${styles.muted} mt-6`}>
            <Words text="Understand yourself, differently." />
          </p>
        </div>
      </div>
    </section>
  );
}
