"use client";

import { useLayoutEffect, type ReactNode } from "react";

/**
 * The root layout mounts a full-page loader for the marketing site. The promo
 * film is meant to open straight onto the orb, so this wrapper suppresses the
 * loader on this route only: it raises a flag the loader checks before it can
 * lock scrolling, and removes the (still hidden) loader node before first
 * paint. Nothing flashes — layout effects run before the browser paints.
 */
export default function NoLoader({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-aks-skip-loader", "1");
    const loader = document.querySelector<HTMLDivElement>('[aria-hidden="true"].fixed.inset-0');
    if (loader && loader.querySelector("[data-bar]")) {
      loader.remove();
    }
    return () => {
      document.documentElement.removeAttribute("data-aks-skip-loader");
    };
  }, []);

  return <>{children}</>;
}
