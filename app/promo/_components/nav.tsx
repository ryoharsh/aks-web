"use client";

import Link from "next/link";
import styles from "../promo.module.css";

/**
 * Floating navigation for the promo film.
 * Minimal, light, and intentionally quiet so the scenes remain the focus.
 */
export default function FloatingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Promo"
        className={`${styles.nav} mx-auto flex w-full items-center justify-between px-[var(--gutter)] py-4 md:py-5`}
      >
        {/* Brand */}
        <Link
          href="/promo"
          aria-label="Aks.ai promo — back to start"
          className="group flex items-center gap-2 text-[15.5px] font-medium tracking-[-0.02em] text-[#131312] transition-opacity duration-200 hover:opacity-65"
        >
          <span className="relative">
            Aks.ai
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#131312] transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5 sm:gap-7">
          <Link
            href="/"
            className={`${styles.link} hidden text-[13px] sm:inline-block`}
          >
            About
          </Link>

          <Link
            href="/privacy"
            className={`${styles.link} hidden text-[13px] sm:inline-block`}
          >
            Privacy
          </Link>

          <Link
            href="#explore"
            className="
              group relative
              inline-flex h-9 items-center
              gap-2 rounded-full
              bg-[#131312]
              px-4
              text-[12.5px] font-medium
              tracking-[-0.01em]
              text-white
              shadow-[0_4px_18px_rgba(0,0,0,0.08)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#242423]
              hover:shadow-[0_7px_24px_rgba(0,0,0,0.12)]
              active:translate-y-0
              sm:h-10
              sm:px-[18px]
            "
          >
            <span>Explore</span>

            <span
              aria-hidden="true"
              className="
                text-[13px]
                transition-transform duration-300
                group-hover:translate-x-0.5
              "
            >
              ↗
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}