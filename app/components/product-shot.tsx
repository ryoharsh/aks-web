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
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px",
  eager = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  sizes?: string;
  eager?: boolean;
}) {
  return (
    <ShotFrame caption={caption}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="h-auto w-full"
        loading={eager ? "eager" : "lazy"}
        priority={eager}
      />
    </ShotFrame>
  );
}

/**
 * Phone screenshot in a device-like frame. The captures are 1080x2424
 * portraits with rounded corners baked in, so the frame blends into them:
 * black ground, hairline edge, soft long shadow. Displayed around 340px
 * wide — next/image serves a small variant automatically.
 */
export function PhoneShot({
  src,
  alt,
  caption,
  eager = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  eager?: boolean;
}) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[44px] border border-[#D8D8D4] bg-black shadow-[0_2px_6px_rgba(0,0,0,0.08),0_32px_72px_rgba(0,0,0,0.16)]">
        <Image
          src={src}
          alt={alt}
          width={540}
          height={1212}
          sizes="(max-width: 1024px) 74vw, 360px"
          className="h-auto w-full"
          loading={eager ? "eager" : "lazy"}
          priority={eager}
        />
      </div>
      {caption && (
        <figcaption className="mt-4 flex items-baseline justify-between gap-3 text-[13px]">
          <span className="text-[#6B6B6B]">{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
