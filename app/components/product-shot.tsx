import Image from "next/image";

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
    <figure className="m-0 transition-transform duration-500 hover:-translate-y-1.5">
      <div className="overflow-hidden rounded-[44px] border border-[#D8D8D4] bg-black shadow-[0_2px_6px_rgba(0,0,0,0.08),0_32px_72px_rgba(23,23,23,0.18)] ring-1 ring-white/40">
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
