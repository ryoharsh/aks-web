import Image from "next/image";
import { Calendar03Icon, Mail01Icon, Task01Icon } from "hugeicons-react";
import { Stage } from "./anim";

/**
 * Static hero showcase — replaces the old product video.
 * A calm, editorial "Mirror" conversation: greeting, check-in chips,
 * a short thread and a quiet input bar, beside a "today" context card.
 * Pure markup: fast, accessible, no autoplay, no heavy media.
 */
export default function HeroShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[#E0E0DC] bg-gradient-to-b from-white via-[#F7F8F5] to-[#EDF1EA] shadow-[0_1px_2px_rgba(0,0,0,0.05),0_32px_80px_rgba(61,90,69,0.12)]">
      {/* soft sage glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(560px 260px at 12% 0%, rgba(61,90,69,0.10), transparent 70%), radial-gradient(640px 300px at 92% 18%, rgba(61,90,69,0.08), transparent 70%), radial-gradient(500px 320px at 50% 115%, rgba(23,23,23,0.06), transparent 70%)",
        }}
      />

      {/* window bar */}
      <div className="relative flex items-center gap-3 border-b border-[#E8E8E5]/90 bg-white/70 px-4 py-3 backdrop-blur-sm">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#E0E0DC]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E0E0DC]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E0E0DC]" />
        </span>
        <span className="flex-1 text-center font-mono text-[12px] text-[#9a9a96]">
          aks · mirror
        </span>
        <span className="hidden rounded-full border border-[#DCE5DD] bg-[#EEF2ED] px-2.5 py-1 text-[12px] font-medium text-[#3D5A45] sm:inline">
          Private by default
        </span>
      </div>

      <Stage item="[data-msg]" className="relative grid gap-4 p-4 sm:p-6 md:p-8 lg:grid-cols-12">
        {/* conversation */}
        <div className="lg:col-span-7">
          <div data-msg className="flex items-start gap-3">
            <Image
              src="/adaptive-icon.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full border border-[#E8E8E5]"
            />
            <div className="max-w-[420px] rounded-2xl rounded-tl-md border border-[#E8E8E5] bg-white px-4 py-3 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <p className="text-[15px] leading-[1.55] font-medium">
                Good morning. How is today feeling so far?
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {["Steady", "A lot", "Low", "Hopeful"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[#E2E2DE] bg-[#FAFAF8] px-2.5 py-1 text-[12.5px] font-medium text-[#444443]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div data-msg className="mt-3 flex justify-end">
            <div className="max-w-[400px] rounded-2xl rounded-tr-md bg-[#171717] px-4 py-3 text-white shadow-[0_8px_24px_rgba(23,23,23,0.18)]">
              <p className="text-[15px] leading-[1.55]">
                A lot, honestly. Big meeting, mom&apos;s birthday, and I barely slept.
              </p>
            </div>
          </div>

          <div data-msg className="mt-3 flex items-start gap-3">
            <Image
              src="/adaptive-icon.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full border border-[#E8E8E5]"
            />
            <div className="max-w-[420px] rounded-2xl rounded-tl-md border border-[#E8E8E5] bg-white px-4 py-3 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              <p className="text-[15px] leading-[1.6] text-[#333332]">
                That&apos;s a lot to hold at once. Want to start with today —
                or with what&apos;s been on your mind all week?
              </p>
            </div>
          </div>

          {/* input */}
          <div
            data-msg
            className="mt-4 flex items-center gap-2 rounded-full border border-[#E0E0DC] bg-white py-2 pr-2 pl-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
          >
            <p className="flex-1 text-[14px] text-[#9a9a96]">Type or speak…</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B6B6B]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <path d="M12 19v3" />
              </svg>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171717] text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>

        {/* today / context card */}
        <div className="lg:col-span-5">
          <div data-msg className="h-full rounded-2xl border border-[#E8E8E5] bg-white/85 p-5 shadow-[0_1px_10px_rgba(0,0,0,0.04)] backdrop-blur-sm">
            <p className="text-[12px] font-bold tracking-[0.14em] text-[#6B6B6B] uppercase">
              Today, gently
            </p>
            <p className="mt-2 text-[22px] leading-tight font-bold tracking-[-0.02em]">
              Three things, one place.
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { icon: Calendar03Icon, t: "2 meetings", d: "Nothing before 11" },
                { icon: Task01Icon, t: "3 open tasks", d: "Birthday gift still pending" },
                { icon: Mail01Icon, t: "Inbox, skimmed", d: "2 need a reply" },
              ].map((r) => (
                <li
                  key={r.t}
                  className="flex items-center gap-3 rounded-xl border border-[#EFEFEc] bg-[#FAFAF8] px-3.5 py-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E8E8E5] bg-white text-[#171717]">
                    <r.icon size={17} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[14.5px] leading-tight font-bold">{r.t}</span>
                    <span className="mt-0.5 block text-[13px] text-[#6B6B6B]">{r.d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-[#EEF2ED] px-3.5 py-2.5 text-[13px] leading-[1.55] text-[#3D5A45]">
              Connect only what you want — remove anytime.
            </p>
          </div>
        </div>
      </Stage>
    </div>
  );
}
