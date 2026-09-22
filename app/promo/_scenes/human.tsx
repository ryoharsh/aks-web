"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { isReducedMotion } from "../../components/anim";
import { Words } from "../_components/words";
import styles from "../promo.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Scene 09 — the human moment. Typography only, then the orb. */
export default function HumanScene() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    el.classList.add(styles["is-live"]);
    const ctx = gsap.context(() => {
      // Pin every word line hidden up front so the overlap grid only ever
      // shows the active statement; `.to` reveals are deterministic at any
      // scrub playhead (fromTo wouldn't hide later lines until reached).
      gsap.set("[data-h1] [data-word], [data-h2] [data-word], [data-h3] [data-word]", {
        autoAlpha: 0,
        y: 52,
      });
      gsap.set("[data-h-orb]", { autoAlpha: 0, scale: 0.88 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=3000",
          scrub: 1.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      const line = (sel: string, at: number | string) =>
        tl.to(
          `${sel} [data-word]`,
          { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.07, ease: "power3.out" },
          at
        );
      line("[data-h1]", 0);
      tl.to("[data-h1]", { autoAlpha: 0, y: -38, duration: 0.9, ease: "power2.in" }, "+=1");
      line("[data-h2]", ">");
      tl.to("[data-h2]", { autoAlpha: 0, y: -38, duration: 0.9, ease: "power2.in" }, "+=1");
      line("[data-h3]", ">");
      tl.to("[data-h-orb]", { autoAlpha: 1, scale: 1, duration: 1.4, ease: "power2.out" }, "-=0.6").to(
        "[data-human-group]",
        { autoAlpha: 0, y: -38, duration: 1, ease: "power2.in" },
        "+=0.8"
      );
    }, ref);
    return () => {
      el.classList.remove(styles["is-live"]);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={ref} aria-label="A human moment" className="relative">
      <div className={styles.frame}>
        <div data-human-group className={`${styles.hstack} w-full max-w-[1040px]`}>
          <h2 data-h1 className={styles.d2}>
            <Words text="You don't always need another answer." />
          </h2>
          <h2 data-h2 className={styles.d2}>
            <Words text="Sometimes you need a better question." />
          </h2>
          <div className="flex flex-col items-center">
            <h2 data-h3 className={styles.d2}>
              <Words text="Aks helps you notice." />
            </h2>
            <span data-h-orb className="mt-12">
              <Image src="/logo.png" alt="Aks logo" width={96} height={96} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
