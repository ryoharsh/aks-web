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

/** Scene 03 — "You talk." / "Aks listens." Phone enters from the right. */
export default function TalkScene() {
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
          "[data-line-a] [data-word]",
          { x: desktop ? -130 : -70, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1.4, stagger: 0.08, ease: "power3.out" }
        )
          .fromTo(
            "[data-line-b] [data-word]",
            { x: desktop ? 130 : 70, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 1.4, stagger: 0.08, ease: "power3.out" },
            "-=1.1"
          )
          .fromTo(
            "[data-talk-phone]",
            desktop ? { x: 240, rotationY: 12, autoAlpha: 0 } : { x: 90, autoAlpha: 0 },
            {
              x: 0,
              rotationY: 0,
              autoAlpha: 1,
              duration: 2,
              ease: "power3.out",
            },
            "-=1"
          )
          // NOTE: no [data-screen] drift here on purpose — translating the
          // screenshot inside the fixed frame exposes the screen background
          // and drags the capture's baked-in black display corners into view.
          .to("[data-talk-group]", { autoAlpha: 0, y: -44, duration: 1.2, ease: "power2.in" }, "+=0.4");
      };
      mm.add("(min-width: 900px)", () => build(true));
      mm.add("(max-width: 899.98px)", () => build(false));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="You talk, Aks listens" className="relative">
      <div className={styles.frame} style={{ perspective: "2000px" }}>
        <div
          data-talk-group
          className="flex w-full max-w-[1180px] flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-20"
        >
          <h2 className={`${styles.d1} text-center lg:text-right`}>
            <span data-line-a className="block">
              <Words text="You talk." />
            </span>
            <span data-line-b className={`${styles.muted} block`}>
              <Words text="Aks listens." />
            </span>
          </h2>
          <div data-talk-phone>
            <DeviceMockup
              src={SCREENS.conversation.src}
              alt={SCREENS.conversation.alt}
              sizes="(max-width: 899px) 64vw, 320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
