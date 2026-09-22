import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Drop future app screenshots in /public/screenshots/ and render them with
 * <ProductShot src="/screenshots/mirror.png" ... /> — no page redesign needed.
 * Do not add AiConversationScreen: it is not part of the shipped product.
 */
export const SCREENSHOT_DIR = "/screenshots";

export function ShotFrame({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: string;
}) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[12px] border border-[#E8E8E5] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.06)]">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[13px] text-[#6B6B6B]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ProductShot({
  src,
  alt,
  caption,
  width = 1280,
  height = 720,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <ShotFrame caption={caption}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
        className="h-auto w-full"
        loading="lazy"
      />
    </ShotFrame>
  );
}
