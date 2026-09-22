"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { isReducedMotion } from "../../components/anim";
import styles from "../promo.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Scene 11 — everything resolves back to the orb. */
export default function OrbScene() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;

    const section = ref.current;
    if (!section) return;

    const orb = section.querySelector<HTMLElement>("[data-orb-big]");
    const group = section.querySelector<HTMLElement>("[data-orb-group]");

    if (!orb || !group) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2000",
          scrub: 1.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        group,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      )

        .fromTo(
          orb,
          {
            scale: 0.68,
          },
          {
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "<"
        )

        .to(
          orb,
          {
            scale: 1.7,
            duration: 2.2,
            ease: "power1.inOut",
          },
          "-=0.2"
        )

        .to(
          group,
          {
            autoAlpha: 0,
            scale: 0.96,
            duration: 0.8,
            ease: "power2.in",
          },
          "+=0.6"
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Aks.ai"
      className="relative"
    >
      <div className={`${styles.frame} flex items-center justify-center`}>
        <div
          data-orb-group
          className="flex items-center justify-center"
        >
          <span
            data-orb-big
            className="block will-change-transform"
          >
            <Image
              src="/logo.png"
              alt="Aks logo"
              width={132}
              height={132}
              priority
              className="block h-[132px] w-[132px] object-contain"
            />
          </span>
        </div>
      </div>
    </section>
  );
}