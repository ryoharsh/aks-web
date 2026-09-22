"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "../../components/anim";
import DeviceMockup from "../_components/device";
import { SCREENS, type ScreenKey } from "../_components/screens";
import styles from "../promo.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SEQUENCE: { key: ScreenKey; label: string }[] = [
  { key: "mirror", label: "Mirror" },
  { key: "conversation", label: "Conversation" },
  { key: "timeline", label: "Timeline" },
  { key: "remembers", label: "What Aks remembers" },
  { key: "yourdata", label: "Your data" },
  { key: "splash", label: "Aks.ai" },
];

/**
 * Scene 10 — product timeline.
 */
export default function MontageScene() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (isReducedMotion()) return;

    const el = ref.current;
    if (!el) return;

    el.classList.add(styles["is-live"]);

    const ctx = gsap.context(() => {
      const phones = gsap.utils.toArray<HTMLElement>(
        "[data-montage-phone]"
      );

      const nodes = gsap.utils.toArray<HTMLElement>(
        "[data-montage-node]"
      );

      const labels = gsap.utils.toArray<HTMLElement>(
        "[data-montage-step-label]"
      );

      const progress = el.querySelector(
        "[data-montage-progress]"
      ) as HTMLElement | null;

      const activeLabel = el.querySelector(
        "[data-montage-active-label]"
      ) as HTMLElement | null;

      if (!phones.length) return;

      // Initial phone state
      gsap.set(phones, {
        autoAlpha: 0,
        x: 70,
        scale: 0.94,
        rotationY: 4,
      });

      gsap.set(phones[0], {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        rotationY: 0,
      });

      // Initial timeline nodes
      gsap.set(nodes, {
        scale: 0.8,
        opacity: 0.35,
      });

      gsap.set(nodes[0], {
        scale: 1,
        opacity: 1,
      });

      // Initial labels
      gsap.set(labels, {
        opacity: 0.35,
      });

      gsap.set(labels[0], {
        opacity: 1,
      });

      // Timeline progress starts empty
      if (progress) {
        gsap.set(progress, {
          scaleY: 0,
          transformOrigin: "top center",
        });
      }

      if (activeLabel) {
        activeLabel.textContent = SEQUENCE[0].label;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=3750",
          scrub: 1.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      SEQUENCE.forEach((_, i) => {
        if (i === 0) return;

        const previous = phones[i - 1];
        const current = phones[i];

        const at = (i - 1) * 2;

        // Previous phone exits
        tl.to(
          previous,
          {
            autoAlpha: 0,
            x: -70,
            scale: 0.94,
            rotationY: -3,
            duration: 0.45,
            ease: "power2.inOut",
          },
          at
        );

        // Current phone enters
        tl.fromTo(
          current,
          {
            autoAlpha: 0,
            x: 70,
            scale: 0.94,
            rotationY: 3,
          },
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          at + 0.12
        );

        // Previous timeline node becomes inactive
        tl.to(
          nodes[i - 1],
          {
            scale: 0.8,
            opacity: 0.35,
            duration: 0.3,
            ease: "power2.out",
          },
          at + 0.15
        );

        // Current timeline node becomes active
        tl.to(
          nodes[i],
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          at + 0.25
        );

        // Previous label fades
        tl.to(
          labels[i - 1],
          {
            opacity: 0.35,
            duration: 0.25,
          },
          at + 0.15
        );

        // Current label becomes active
        tl.to(
          labels[i],
          {
            opacity: 1,
            duration: 0.3,
          },
          at + 0.25
        );

        // Update main heading
        if (activeLabel) {
          tl.call(
            () => {
              activeLabel.textContent = SEQUENCE[i].label;
            },
            [],
            at + 0.25
          );
        }
      });

      // Timeline progress
      if (progress) {
        tl.to(
          progress,
          {
            scaleY: 1,
            duration: (SEQUENCE.length - 1) * 2,
            ease: "none",
          },
          0
        );
      }
    }, ref);

    return () => {
      el.classList.remove(styles["is-live"]);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Product journey"
      className="relative min-h-screen flex items-center justify-center"
    >
      <div className={styles.timelineFrame}>

        {/* Timeline */}
        <div className={styles.timelineRail}>

          <div
            data-montage-progress
            className={styles.timelineProgress}
          />

          {SEQUENCE.map((step) => (
            <div
              key={step.key}
              className={styles.timelineStep}
            >
              <span
                data-montage-node
                className={styles.timelineNode}
              />

              <span
                data-montage-step-label
                className={styles.timelineStepLabel}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className={styles.timelineContent}>

          <div className={styles.timelineHeading}>
            <p className={styles.eyebrow}>
              The journey
            </p>

            <h2
              data-montage-active-label
              className={styles.timelineActiveLabel}
            >
              {SEQUENCE[0].label}
            </h2>
          </div>

          {/* Phones */}
          <div className={styles.timelineDevice}>

            {SEQUENCE.map((screen) => (
              <div
                key={screen.key}
                data-montage-phone
                className={styles.timelinePhone}
              >
                <DeviceMockup
                  src={SCREENS[screen.key].src}
                  alt={`${SCREENS[screen.key].alt} — ${screen.label}`}
                  sizes="(max-width: 899px) 41vw, 216px"
                />
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}