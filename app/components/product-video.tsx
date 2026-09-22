"use client";

import { useEffect, useRef, useState } from "react";
import { isReducedMotion } from "./anim";

const W = 1280;
const H = 720;

function usePauseOffscreen<T extends HTMLVideoElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting && !el.paused) el.pause();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/**
 * Hero product demonstration. One muted autoplay loop only — paused whenever
 * it leaves the viewport. With reduced motion there is no autoplay; the
 * visitor gets controls and the first frame instead.
 */
export function DemoVideo({ src, label }: { src: string; label: string }) {
  const ref = usePauseOffscreen<HTMLVideoElement>();
  // Decided once at mount: autoplay the loop, unless the visitor prefers
  // reduced motion — then show controls and the first frame instead.
  const [reduced] = useState(() => isReducedMotion());

  useEffect(() => {
    if (!reduced) ref.current?.play().catch(() => {});
  }, [reduced, ref]);

  return (
    <video
      ref={ref}
      src={src}
      width={W}
      height={H}
      className="aspect-video w-full bg-[#171717] object-cover"
      muted
      loop
      playsInline
      controls={reduced}
      // `reduced` is decided client-side via matchMedia; never warn if the
      // server-rendered value differs.
      suppressHydrationWarning
      preload="auto"
      aria-label={label}
      title={label}
      disablePictureInPicture
    />
  );
}

/**
 * Product-film video: muted loop that only plays while substantially in
 * view, paused everywhere else. Reduced-motion visitors get controls and
 * the first frame instead of any autoplay.
 */
export function FilmVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced] = useState(() => isReducedMotion());

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) el.play().catch(() => {});
          else el.pause();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={src}
      width={W}
      height={H}
      className="aspect-video w-full bg-[#171717] object-cover"
      muted
      loop
      playsInline
      controls={reduced}
      // `reduced` is decided client-side via matchMedia; never warn if the
      // server-rendered value differs.
      suppressHydrationWarning
      preload="metadata"
      aria-label={label}
      title={label}
      disablePictureInPicture
    />
  );
}
