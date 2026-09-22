import Image from "next/image";

export default function Logo({ sub = true }: { sub?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Aks — back to top">
      <Image
        src="/favicon.png"
        alt=""
        width={26}
        height={26}
        className="h-[26px] w-[26px] rounded-[7px]"
        priority
      />
      <span className="text-[17px] font-bold tracking-[-0.01em] text-[#171717]">Aks</span>
      {sub && (
        <span className="hidden rounded-[6px] border border-[#E8E8E5] bg-white px-1.5 py-0.5 text-[11px] font-medium text-[#6B6B6B] sm:inline">
          Mirror
        </span>
      )}
    </a>
  );
}
