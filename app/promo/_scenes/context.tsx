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

/**
 * Scene 05 — Context. The Timeline device travels vertically through the
 * viewport, then hands over to memory: "Over time, Aks learns…".
 */
export default function ContextScene() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The second device overlays the first during the film. Without motion,
    // stack it in normal flow instead so nothing overlaps or hides.
    const second = el.querySelector("[data-ctx-phone-b]");
    if (isReducedMotion()) {
      second?.classList.remove("hidden", "absolute", "inset-0");
      second?.classList.add("flex", "mt-10");
      return;
    }
    second?.classList.remove("hidden");
    second?.classList.add("flex");
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const build = (desktop: boolean) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: desktop ? "+=3000" : "+=2250",
            scrub: 1.6,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          "[data-ctx-a] [data-word]",
          { y: 54, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.07, ease: "power3.out" }
        )
          .fromTo(
            "[data-ctx-b] [data-word]",
            { y: 54, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.07, ease: "power3.out" },
            "-=0.7"
          )
          .fromTo(
            "[data-ctx-phone-a]",
            { y: 140, autoAlpha: 0, scale: 0.97 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 1.8, ease: "power3.out" },
            "-=0.8"
          )
          // the device travels upward while the statement leaves
          .to("[data-ctx-text]", { autoAlpha: 0, y: -64, duration: 1.2, ease: "power2.in" })
          .to("[data-ctx-phone-a]", { y: desktop ? -120 : -80, duration: 1.6, ease: "none" }, "<")
          // handover: timeline fades as memory arrives with the closing line
          .to("[data-ctx-phone-a]", { autoAlpha: 0, scale: 0.96, duration: 0.9, ease: "power2.in" })
          .fromTo(
            "[data-ctx-phone-b]",
            { autoAlpha: 0, scale: 0.96, y: 40 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            "[data-ctx-c]",
            { y: 34, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
            "-=0.7"
          )
          .to("[data-ctx-group]", { autoAlpha: 0, y: -44, duration: 1, ease: "power2.in" }, "+=0.6");
      };
      mm.add("(min-width: 900px)", () => build(true));
      mm.add("(max-width: 899.98px)", () => build(false));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="Context" className="relative">
      <div className={styles.frame}>
        <div data-ctx-group className="flex flex-col items-center gap-8 md:gap-10">
          <div data-ctx-text>
            <h2 className={`${styles.d2} max-w-[1150px]`}>
              <span data-ctx-a className="block">
                <Words text="Your thoughts don't exist in isolation." />
              </span>
              <span data-ctx-b className={`${styles.muted} block`}>
                <Words text="They become context." />
              </span>
            </h2>
          </div>
          <div className="relative flex items-center justify-center">
            <div data-ctx-phone-a>
              <DeviceMockup
                src={SCREENS.timeline.src}
                alt={SCREENS.timeline.alt}
                className={styles["device-md"]}
                sizes="(max-width: 899px) 52vw, 268px"
              />
            </div>
            <div data-ctx-phone-b className="absolute inset-0 hidden items-center justify-center">
              <DeviceMockup
                src={SCREENS.remembers.src}
                alt={SCREENS.remembers.alt}
                className={styles["device-md"]}
                sizes="(max-width: 899px) 52vw, 268px"
              />
            </div>
          </div>
          <p data-ctx-c className={`${styles.d3} max-w-[640px]`}>
            Over time, Aks learns what matters to you.
          </p>
        </div>
      </div>
    </section>
  );
}
