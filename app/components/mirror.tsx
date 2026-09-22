import Image from "next/image";

function AksAvatar() {
  return (
    <Image
      src="/favicon.png"
      alt=""
      width={28}
      height={28}
      className="h-7 w-7 shrink-0 rounded-full border border-[#E8E8E5]"
    />
  );
}

function ContextChips() {
  const chips = [
    { label: "Calendar", detail: "4 events" },
    { label: "Todoist", detail: "3 tasks" },
    { label: "Gmail", detail: "2 unread" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {chips.map((c) => (
        <span
          key={c.label}
          className="inline-flex items-center gap-1.5 rounded-[6px] border border-[#E8E8E5] bg-white px-2 py-1 text-[12px] leading-none"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#3D5A45]" aria-hidden />
          <span className="font-medium text-[#171717]">{c.label}</span>
          <span className="text-[#6B6B6B]">{c.detail}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * An example Mirror conversation — illustrative copy showing the shape of
 * the experience, not a screenshot. Real app screenshots slot into
 * <ProductShot /> (see components/product-shot.tsx) when available.
 */
export default function MirrorExample() {
  return (
    <div
      className="overflow-hidden rounded-[12px] border border-[#E8E8E5] bg-white text-left shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.06)]"
      role="img"
      aria-label="Example of a Mirror conversation with Aks"
    >
      <div className="flex items-center justify-between border-b border-[#E8E8E5] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <AksAvatar />
          <div>
            <p className="text-[13.5px] leading-none font-semibold text-[#171717]">Mirror</p>
            <p className="mt-1 text-[12px] leading-none text-[#6B6B6B]">Tuesday, 9:12 AM</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-[6px] bg-[#EEF2ED] px-2 py-1 text-[12px] font-medium text-[#3D5A45] sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3D5A45]" aria-hidden />
            Connected
          </span>
          <span className="inline-flex items-center rounded-[6px] border border-[#E8E8E5] px-2 py-1 text-[12px] text-[#6B6B6B]">
            Voice + Text
          </span>
        </div>
      </div>

      <div className="space-y-5 px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex justify-center">
          <span className="rounded-[6px] bg-[#F4F4F1] px-2.5 py-1 text-[12px] text-[#6B6B6B]">
            Today
          </span>
        </div>

        <div data-msg className="flex justify-end">
          <div className="max-w-[85%] rounded-[10px] rounded-br-[4px] border border-[#E8E8E5] bg-[#F7F7F4] px-4 py-3 sm:max-w-[75%]">
            <p className="text-[12px] font-medium text-[#6B6B6B]">You · 9:12 AM</p>
            <p className="mt-1 text-[14.5px] leading-[1.55] text-[#171717]">
              I have too much going on this week and I keep putting off the project I actually
              care about.
            </p>
          </div>
        </div>

        <div data-msg className="flex gap-2.5">
          <AksAvatar />
          <div className="max-w-[88%] sm:max-w-[78%]">
            <p className="text-[12px] font-medium text-[#6B6B6B]">Aks · 9:12 AM</p>
            <div className="mt-1 rounded-[10px] rounded-tl-[4px] border border-[#E8E8E5] bg-white px-4 py-3">
              <p className="text-[14.5px] leading-[1.6] text-[#171717]">
                You&apos;ve got several things competing for your attention. Want to look at
                what&apos;s taking up your time?
              </p>
              <div className="mt-3">
                <ContextChips />
              </div>
              <div className="mt-3 overflow-hidden rounded-[8px] border border-[#E8E8E5]">
                <div className="flex items-center justify-between border-b border-[#E8E8E5] px-3 py-2.5">
                  <span className="text-[13px] text-[#171717]">Design review — Wed 10:00</span>
                  <span className="text-[12px] text-[#6B6B6B]">Calendar</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E8E8E5] px-3 py-2.5">
                  <span className="text-[13px] text-[#171717]">Dentist — Thu 3:30</span>
                  <span className="text-[12px] text-[#6B6B6B]">Calendar</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5">
                  <span className="text-[13px] text-[#171717]">Draft outline — no date yet</span>
                  <span className="text-[12px] text-[#6B6B6B]">Todoist</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-msg className="flex justify-end">
          <div className="max-w-[85%] rounded-[10px] rounded-br-[4px] border border-[#E8E8E5] bg-[#F7F7F4] px-4 py-3 sm:max-w-[75%]">
            <p className="text-[12px] font-medium text-[#6B6B6B]">You · 9:14 AM</p>
            <p className="mt-1 text-[14.5px] leading-[1.55] text-[#171717]">
              Yes. Thursday afternoon, if I can move things around.
            </p>
          </div>
        </div>
      </div>

      <div data-msg className="border-t border-[#E8E8E5] bg-white px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 rounded-[10px] border border-[#E8E8E5] bg-[#FAFAF8] px-3 py-2">
          <span className="flex-1 truncate text-[14px] text-[#6B6B6B]">Reply to Aks…</span>
          <span className="flex h-8 items-center rounded-[6px] bg-[#171717] px-3 text-[13px] font-medium text-white">
            Send
          </span>
        </div>
        <p className="mt-2 text-center text-[12px] text-[#9a9a96]">
          Speak or type. Review what you said. Send it. Continue the conversation.
        </p>
      </div>
    </div>
  );
}
