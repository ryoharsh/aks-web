import Image from "next/image";
import type { Metadata } from "next";
import {
  AndroidIcon,
  AppleIcon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  CheckListIcon,
  GithubIcon,
  Mail01Icon,
  Notion01Icon,
  PlayStoreIcon,
  SlackIcon,
  Task01Icon,
} from "hugeicons-react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Steps from "./components/steps";
import { Drift, MediaReveal, Reveal, ScrubX, Stage } from "./components/anim";
import MirrorExample from "./components/mirror";
import { ClipVideo, FilmVideo } from "./components/product-video";
import { ShotFrame } from "./components/product-shot";
import {
  ANDROID_PACKAGE,
  DEVELOPER_HANDLE,
  DEVELOPER_NAME,
  DEVELOPER_PORTFOLIO,
  FAQ_ITEMS,
  FAQ_JSON_LD,
  PLAY_STORE_URL,
  STUDIO_NAME,
} from "./lib/site";

const wide = "mx-auto w-full max-w-[1320px] px-5 md:px-8";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Small editorial section label: number + hairline + name. */
function Label({ no, children }: { no: string; children: string }) {
  return (
    <p className="flex items-center gap-3 text-[12px] font-bold tracking-[0.14em] text-[#6B6B6B] uppercase">
      <span className="text-[#3D5A45]">{no}</span>
      <span className="h-px w-8 bg-[#D8D8D4]" aria-hidden />
      {children}
    </p>
  );
}

const integrations = [
  { icon: Calendar03Icon, name: "Google Calendar", desc: "Meetings and plans" },
  { icon: Task01Icon, name: "Google Tasks", desc: "What needs doing" },
  { icon: Mail01Icon, name: "Gmail", desc: "What came in" },
  { icon: CheckListIcon, name: "Todoist", desc: "Tasks and projects" },
  { icon: GithubIcon, name: "GitHub", desc: "Work in progress" },
  { icon: SlackIcon, name: "Slack", desc: "Conversations that matter" },
  { icon: Notion01Icon, name: "Notion", desc: "Notes and docs" },
];

function CrowdChip({
  item,
  dup = false,
}: {
  item: (typeof integrations)[number];
  dup?: boolean;
}) {
  return (
    <div
      aria-hidden={dup || undefined}
      className="flex shrink-0 items-center gap-4 rounded-[10px] border border-[#E2E2DE] bg-white px-6 py-5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-[#E8E8E5] bg-[#FAFAF8] text-[#171717]">
        <item.icon size={19} aria-hidden />
      </span>
      <span>
        <span className="block text-[clamp(1.3rem,2.2vw,1.9rem)] leading-none font-bold tracking-[-0.02em] whitespace-nowrap">
          {item.name}
        </span>
        <span className="mt-1.5 block text-[13px] text-[#6B6B6B]">{item.desc}</span>
      </span>
    </div>
  );
}

const problemLines = [
  { text: "Your calendar knows your meetings.", src: "Calendar" },
  { text: "Your tasks know what needs doing.", src: "Tasks" },
  { text: "Your inbox knows what people are asking.", src: "Inbox" },
  { text: "Your notes know what you've been thinking about.", src: "Notes" },
];

const mirrorPoints = [
  {
    t: "Type it or say it",
    d: "Use your own words. Aks meets you there.",
  },
  {
    t: "Review before you send",
    d: "Check it reads the way you meant it.",
  },
  {
    t: "Follow the thread",
    d: "Go back and forth until things feel clearer.",
  },
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-[#FAFAF8] text-[#171717]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <main>
        <Hero />

        {/* ---------- 01 · THE PROBLEM ---------- */}
        <section aria-labelledby="problem-heading" className="bg-[#FAFAF8]">
          <div className={`${wide} grid gap-10 pt-[11vw] pb-20 md:pb-28 lg:grid-cols-12`}>
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <Reveal>
                  <Label no="01">The problem</Label>
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-9">
              <Reveal>
                <h2
                  id="problem-heading"
                  className="text-[clamp(2.5rem,5.4vw,5.5rem)] leading-[1.0] font-bold tracking-[-0.03em]"
                >
                  Your life doesn&apos;t live
                  <br className="hidden sm:block" aria-hidden />
                  in one place.
                </h2>
              </Reveal>
              <div className="mt-10 border-t border-[#D8D8D4] md:mt-14">
                {problemLines.map((l, i) => (
                  <Reveal key={l.src} delay={Math.min(i * 70, 210)}>
                    <div className="flex items-baseline justify-between gap-6 border-b border-[#D8D8D4] py-5 md:py-6">
                      <p className="text-[clamp(1.25rem,2.4vw,1.9rem)] leading-[1.2] font-medium tracking-[-0.015em]">
                        {l.text}
                      </p>
                      <p className="hidden shrink-0 font-mono text-[12px] text-[#9a9a96] sm:block">
                        {l.src} — 0{i + 1}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <p className="mt-10 max-w-[600px] text-[19px] leading-[1.55] text-[#171717] md:text-[22px]">
                  Aks gives you somewhere to{" "}
                  <em className="font-medium">put the whole picture together.</em>
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- 02 · MIRROR (sheet overlapping the problem) ---------- */}
        <section
          id="product"
          aria-labelledby="mirror-heading"
          className="relative z-10 -mt-[5vw] scroll-mt-[64px] rounded-t-[20px] border border-b-0 border-[#E0E0DC] bg-white"
        >
          <div className={`${wide} grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10`}>
            <div className="lg:col-span-5">
              <Reveal x={-28}>
                <Label no="02">Mirror</Label>
                <h2
                  id="mirror-heading"
                  className="mt-5 text-[clamp(2.5rem,4.4vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.025em]"
                >
                  Just tell Aks what&apos;s on your mind.
                </h2>
                <p className="mt-5 max-w-[440px] text-[17px] leading-[1.65] text-[#6B6B6B] md:text-[18.5px]">
                  Type it. Say it. Don&apos;t worry about getting the words exactly right.
                  Mirror gives you a simple place to start a conversation.
                </p>
              </Reveal>
              <div className="mt-8 border-t border-[#E8E8E5]">
                {mirrorPoints.map((p, i) => (
                  <Reveal key={p.t} delay={i * 70}>
                    <div className="flex items-baseline gap-5 border-b border-[#E8E8E5] py-4">
                      <span className="font-mono text-[12px] text-[#9a9a96]">0{i + 1}</span>
                      <span>
                        <span className="block text-[16px] font-bold">{p.t}</span>
                        <span className="mt-0.5 block text-[14.5px] text-[#6B6B6B]">{p.d}</span>
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={120}>
                <a
                  href="#availability"
                  className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#171717] underline decoration-[#D8D8D4] underline-offset-[6px] transition-colors hover:decoration-[#171717]"
                >
                  Get Aks on Android
                  <ArrowUpRight01Icon size={16} aria-hidden />
                </a>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Stage>
                <MirrorExample />
              </Stage>
              <p className="mt-4 text-[13px] text-[#6B6B6B]">
                An example conversation. Real app screenshots slot in here as they ship.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- 03 · CONTEXT ---------- */}
        <section
          id="context"
          aria-labelledby="context-heading"
          className="scroll-mt-[64px] overflow-hidden border-t border-[#E8E8E5] py-20 md:py-28"
        >
          <div className={wide}>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <Label no="03">Context</Label>
                  <h2
                    id="context-heading"
                    className="mt-5 text-[clamp(2.5rem,5vw,5.25rem)] leading-[1.0] font-bold tracking-[-0.03em]"
                  >
                    Your life doesn&apos;t live in one app.
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={100}>
                  <p className="max-w-[420px] text-[16.5px] leading-[1.65] text-[#6B6B6B] md:text-[18px] lg:ml-auto">
                    Aks can connect with the tools you already use, giving conversations
                    more context without making you explain everything from the beginning.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-3 md:mt-16">
            <ScrubX from={1} to={-9} className="flex w-max gap-3 px-5 md:px-8">
              {integrations.slice(0, 4).map((item) => (
                <CrowdChip key={item.name} item={item} />
              ))}
              {integrations.slice(0, 4).map((item) => (
                <CrowdChip key={`${item.name}-dup`} item={item} dup />
              ))}
            </ScrubX>
            <ScrubX from={-9} to={1} className="flex w-max gap-3 px-5 md:px-8 lg:ml-[8vw]">
              {integrations.slice(4).map((item) => (
                <CrowdChip key={item.name} item={item} />
              ))}
              {integrations.slice(4).map((item) => (
                <CrowdChip key={`${item.name}-dup`} item={item} dup />
              ))}
              <div
                aria-hidden
                className="flex shrink-0 items-center rounded-[10px] border border-dashed border-[#CFCFC9] px-6 py-5"
              >
                <p className="text-[15px] font-medium whitespace-nowrap text-[#6B6B6B]">
                  Connect only what you want — remove anytime.
                </p>
              </div>
            </ScrubX>
          </div>
        </section>

        {/* ---------- 04 · STEPS ---------- */}
        <section
          id="how"
          aria-labelledby="how-heading"
          className="scroll-mt-[64px] border-y border-[#E8E8E5] bg-white py-20 md:py-28"
        >
          <div className={wide}>
            <Steps />
          </div>
        </section>

        {/* ---------- PHILOSOPHY ---------- */}
        <section
          aria-labelledby="philosophy-heading"
          className="relative overflow-hidden py-24 text-center md:py-36"
        >
          <div className={`${wide} relative`}>
            <Reveal>
              <p className="flex items-center justify-center gap-3 text-[12px] font-bold tracking-[0.14em] text-[#6B6B6B] uppercase">
                <span className="h-px w-8 bg-[#D8D8D4]" aria-hidden />
                Why Aks exists
                <span className="h-px w-8 bg-[#D8D8D4]" aria-hidden />
              </p>
            </Reveal>
            <div className="mt-8">
              <Reveal y={40}>
                <h2
                  id="philosophy-heading"
                  className="mx-auto max-w-[1000px] text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.0] font-black tracking-[-0.03em]"
                >
                  Not another app
                  <br className="hidden sm:block" aria-hidden />
                  telling you what to do.
                </h2>
              </Reveal>
              {/* Reflection echo — the same sentence, flipped, in solid ink at
                  6% opacity. In normal flow so it never covers other copy. */}
              <Drift amount={20}>
                <p
                  aria-hidden
                  className="mx-auto -mt-[0.15em] max-w-[1000px] scale-y-[-1] text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.0] font-black tracking-[-0.03em] text-[#171717] opacity-[0.06] select-none"
                >
                  Not another app
                  <br className="hidden sm:block" aria-hidden />
                  telling you what to do.
                </p>
              </Drift>
            </div>
            <Reveal>
              <p className="mx-auto mt-10 max-w-[560px] text-[16.5px] leading-[1.7] text-[#6B6B6B] md:mt-14 md:text-[18px]">
                Aks is built to help you understand what&apos;s happening in your own life.
                Your decisions are still yours.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------- 05 · FILM ---------- */}
        <section
          aria-labelledby="film-heading"
          className="relative z-10 -mt-[3vw] rounded-t-[20px] border border-b-0 border-[#E0E0DC] bg-white"
        >
          <div className="mx-auto w-[88vw] max-w-[1280px] py-20 md:py-28">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <Label no="05">The Aks experience</Label>
                  <h2
                    id="film-heading"
                    className="mt-5 text-[clamp(2.5rem,5vw,5.25rem)] leading-[1.0] font-bold tracking-[-0.03em]"
                  >
                    Quiet by design.
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={100}>
                  <p className="max-w-[400px] text-[16.5px] leading-[1.65] text-[#6B6B6B] md:text-[18px] lg:ml-auto">
                    No noise. No complicated workflow. Just a place to start.
                  </p>
                </Reveal>
              </div>
            </div>
            <MediaReveal className="mt-10 md:mt-14">
              <div className="overflow-hidden rounded-[12px] border border-[#E0E0DC] bg-[#171717] shadow-[0_1px_2px_rgba(0,0,0,0.05),0_24px_64px_rgba(0,0,0,0.10)]">
                <FilmVideo src="/videos/slide_2.mp4" label="Aks product film" />
              </div>
              <p className="mt-4 text-[13px] text-[#6B6B6B]">
                From the Aks app · Android
              </p>
            </MediaReveal>
          </div>
        </section>

        {/* ---------- 06 · APP / AVAILABILITY ---------- */}
        <section
          id="availability"
          aria-labelledby="availability-heading"
          className="scroll-mt-[64px] border-t border-[#E8E8E5] py-20 md:py-32"
        >
          <div className={`${wide} grid items-center gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-6">
              <Reveal x={-28}>
                <Label no="06">Get the app</Label>
                <h2
                  id="availability-heading"
                  className="mt-5 text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.025em]"
                >
                  Take Aks with you.
                </h2>
                <p className="mt-5 max-w-[440px] text-[17px] leading-[1.65] text-[#6B6B6B] md:text-[18.5px]">
                  Aks is available now on Android. iOS is on the way — Android is
                  the way to try it today.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-9 flex items-center gap-4">
                  <Image
                    src="/adaptive-icon.png"
                    alt="Aks app icon"
                    width={60}
                    height={60}
                    sizes="60px"
                    className="h-[60px] w-[60px] rounded-[14px] border border-[#E8E8E5]"
                  />
                  <div>
                    <p className="flex items-center gap-1.5 text-[17px] font-bold">
                      Android
                      <AndroidIcon size={16} className="text-[#3D5A45]" aria-hidden />
                    </p>
                    <p className="mt-0.5 text-[14px] font-medium text-[#3D5A45]">
                      Available now
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-13 items-center justify-center gap-2 rounded-[8px] bg-[#171717] px-8 py-3.5 text-[16px] font-medium text-white transition-colors hover:bg-[#2b2b2b] sm:justify-start"
                  >
                    <PlayStoreIcon size={18} aria-hidden />
                    Get Aks on Android
                  </a>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-8 flex items-center gap-4 border-t border-[#D8D8D4] pt-8">
                  <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[14px] border border-[#E8E8E5] bg-white text-[#171717]">
                    <AppleIcon size={26} aria-hidden />
                  </span>
                  <div>
                    <p className="text-[17px] font-bold">iPhone</p>
                    <p className="mt-0.5 text-[14px] text-[#6B6B6B]">iOS coming soon</p>
                  </div>
                </div>
                <p className="mt-8 font-mono text-[11.5px] text-[#B9B9B4]">
                  Android package · {ANDROID_PACKAGE}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <MediaReveal>
                <ShotFrame caption="From the Aks app · Android">
                  <ClipVideo src="/videos/slide_3.mp4" label="Aks app walkthrough" />
                </ShotFrame>
              </MediaReveal>
            </div>
          </div>
        </section>

        {/* ---------- 07 · FOUNDER ---------- */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="scroll-mt-[64px] border-t border-[#E8E8E5] py-20 md:py-32"
        >
          <div className={`${wide} grid gap-10 lg:grid-cols-12`}>
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <Reveal>
                  <Label no="07">The human side</Label>
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <h2
                  id="about-heading"
                  className="max-w-[760px] text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1.04] font-bold tracking-[-0.025em]"
                >
                  Built by a person who wanted to make this real.
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-7 max-w-[600px] text-[18px] leading-[1.6] text-[#6B6B6B] md:text-[20px]">
                  Aks is developed by{" "}
                  <span className="font-medium text-[#171717]">Harsh Kumar Singh</span> at{" "}
                  {STUDIO_NAME} — one person, building the companion he wanted to exist.
                </p>
              </Reveal>
              <Reveal delay={140}>
                {/* Portrait slot: a founder photo can sit beside this block later
                    without changing the layout (see ProductShot). */}
                <p className="mt-8 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight font-black tracking-[-0.02em] italic">
                  {DEVELOPER_NAME}
                </p>
                <a
                  href={DEVELOPER_PORTFOLIO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[16px] font-bold text-[#171717] underline decoration-[#D8D8D4] underline-offset-[6px] transition-colors hover:decoration-[#171717]"
                >
                  @{DEVELOPER_HANDLE} — ryoharsh.vercel.app
                  <ArrowUpRight01Icon size={17} aria-hidden />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- 08 · FAQ ---------- */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="scroll-mt-[64px] border-t border-[#E8E8E5] py-20 md:py-32"
        >
          <div className={`${wide} grid gap-10 lg:grid-cols-12`}>
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <Reveal>
                  <Label no="08">Questions</Label>
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <h2
                  id="faq-heading"
                  className="max-w-[640px] text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1.04] font-bold tracking-[-0.025em]"
                >
                  Questions, answered.
                </h2>
              </Reveal>
              <dl className="mt-8 border-t border-[#D8D8D4] md:mt-10">
                {FAQ_ITEMS.map((item, i) => (
                  <Reveal key={item.q} delay={Math.min(i * 40, 160)}>
                    <div className="border-b border-[#D8D8D4] py-5 md:py-6">
                      <dt className="text-[17px] font-bold tracking-[-0.01em] md:text-[19px]">
                        {item.q}
                      </dt>
                      <dd className="mt-1.5 max-w-[620px] text-[15px] leading-[1.65] text-[#6B6B6B] md:text-[16px]">
                        {item.a}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------- 09 · FINAL ---------- */}
        <section aria-labelledby="cta-heading" className="border-t-2 border-[#171717]">
          <div className={`${wide} py-24 md:py-36`}>
            <Reveal>
              <p className="flex items-center gap-3 text-[12px] font-bold tracking-[0.14em] text-[#6B6B6B] uppercase">
                <span className="text-[#3D5A45]">09</span>
                <span className="h-px w-8 bg-[#D8D8D4]" aria-hidden />
                Begin
              </p>
              <h2
                id="cta-heading"
                className="mt-6 max-w-[1000px] text-[clamp(3rem,8.5vw,8.5rem)] leading-[0.95] font-black tracking-[-0.03em]"
              >
                Start with what&apos;s
                <br className="hidden sm:block" aria-hidden />
                on your mind.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
              <Reveal className="lg:col-span-6">
                <p className="max-w-[420px] text-[18px] leading-[1.6] text-[#6B6B6B] md:text-[20px]">
                  Talk to Aks and see where the conversation takes you.
                </p>
              </Reveal>
              <Reveal delay={90} className="lg:col-span-6 lg:justify-self-end">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 items-center justify-center gap-2 rounded-[8px] bg-[#171717] px-10 text-[17px] font-medium text-white transition-colors hover:bg-[#2b2b2b] sm:inline-flex"
                >
                  <PlayStoreIcon size={18} aria-hidden />
                  Get Aks
                </a>
                <p className="mt-4 text-[13.5px] text-[#6B6B6B] sm:text-right">
                  Available on Android · iOS coming soon
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-[#E8E8E5]">
        <div className={`${wide} pt-14 pb-8 md:pt-20`}>
          <p className="text-[clamp(4rem,12vw,10rem)] leading-[0.85] font-black tracking-[-0.04em] select-none">
            Aks
          </p>
          <p className="mt-4 max-w-[320px] text-[15px] leading-[1.6] text-[#6B6B6B]">
            A personal companion for understanding yourself.
          </p>

          <div className="mt-12 grid gap-10 border-t border-[#E8E8E5] pt-10 md:grid-cols-12">
            <nav className="md:col-span-4" aria-label="Footer">
              <p className="text-[12px] font-bold tracking-[0.14em] text-[#9a9a96] uppercase">
                Site
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: "Product", href: "#product" },
                  { label: "How it works", href: "#how" },
                  { label: "Context", href: "#context" },
                  { label: "About", href: "#about" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[15px] text-[#444443] transition-colors hover:text-[#171717]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="md:col-span-4" aria-label="Legal">
              <p className="text-[12px] font-bold tracking-[0.14em] text-[#9a9a96] uppercase">
                Legal
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="/privacy"
                    className="text-[15px] text-[#444443] transition-colors hover:text-[#171717]"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-[15px] text-[#444443] transition-colors hover:text-[#171717]"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="/delete-account"
                    className="text-[15px] text-[#444443] transition-colors hover:text-[#171717]"
                  >
                    Delete account
                  </a>
                </li>
                <li>
                  <a
                    href={DEVELOPER_PORTFOLIO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[15px] text-[#444443] transition-colors hover:text-[#171717]"
                  >
                    Contact
                    <ArrowUpRight01Icon size={13} aria-hidden />
                  </a>
                </li>
              </ul>
            </nav>
            <div className="md:col-span-4">
              <p className="text-[12px] font-bold tracking-[0.14em] text-[#9a9a96] uppercase">
                Made by
              </p>
              <p className="mt-4 text-[15px] leading-[1.65] text-[#444443]">
                Built by {DEVELOPER_NAME} at {STUDIO_NAME}.
              </p>
              <a
                href={DEVELOPER_PORTFOLIO}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[15px] font-medium text-[#171717] underline decoration-[#D8D8D4] underline-offset-4 transition-colors hover:decoration-[#171717]"
              >
                ryoharsh.vercel.app
                <ArrowUpRight01Icon size={14} aria-hidden />
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-[#E8E8E5] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-[#9a9a96]">© 2026 {STUDIO_NAME}</p>
            <p className="text-[13px] text-[#9a9a96]">Understand yourself.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
