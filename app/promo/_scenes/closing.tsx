import Link from "next/link";
import Image from "next/image";
import { Reveal } from "../../components/anim";
import styles from "../promo.module.css";
import { DEVELOPER_NAME, DEVELOPER_PORTFOLIO, STUDIO_NAME } from "../../lib/site";

/** Scene 12 — closing. Almost empty: orb, name, line, one CTA. */
export default function ClosingScene() {
  return (
    <section id="explore" aria-labelledby="explore-heading" className="relative scroll-mt-24 overflow-hidden text-neutral-950">
      <div className="pointer-events-none absolute left-1/2 top-[18%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.045),rgba(0,0,0,0.015)_35%,transparent_70%)] blur-2xl" />

      <div className="relative mx-auto flex min-h-[680px] w-full max-w-[1120px] flex-col items-center justify-center gap-20 px-[var(--gutter)] text-center sm:gap-24">
        <Reveal>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="relative flex h-14 w-14 items-center justify-center sm:h-[72px] sm:w-[72px]">
                <div className="absolute -inset-5 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.07),transparent_68%)] blur-xl" />
                <Image src="/logo.png" alt="Aks" width={72} height={72} className="relative z-10 h-full w-full object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.08)]" />
              </div>
              <h2 id="explore-heading" className={`${styles.d1} ${styles.wordmark} m-0 text-[clamp(58px,8vw,104px)] leading-[0.9] tracking-[-0.065em] text-neutral-950`}>aks.ai</h2>
            </div>

            <p className="mt-7 max-w-[520px] text-[17px] leading-[1.45] tracking-[-0.02em] text-neutral-500 sm:text-[21px]">
              Understand yourself, differently.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="flex flex-col items-center">
            <Link href="/" className={`${styles.btn} ${styles.btnLg} ${styles.btnPrimary} group inline-flex min-h-14 min-w-[180px] items-center justify-center gap-3 rounded-full px-6 transition-all duration-300 hover:-translate-y-0.5`}>
              <span>Explore Aks</span>
              <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </Link>

            <p className="mt-5 text-[12px] tracking-[0.01em] text-neutral-400">
              Your reflection. Your context. Your journey.
            </p>
          </div>
        </Reveal>
      </div>

      <footer className="relative mx-auto w-full max-w-[1120px] px-[var(--gutter)] pb-10 pt-12 sm:pb-12">
        <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[300px]">
            <p className="text-[17px] font-medium tracking-[-0.025em] text-neutral-900">
              Aks.ai
            </p>

            <p className="mt-2 max-w-[280px] text-[13px] leading-[1.55] text-neutral-500">
              A personal companion for understanding yourself.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-start gap-x-7 gap-y-3 md:justify-end" aria-label="Promo footer">
            <Link href="/" className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-950">Product</Link>
            <Link href="/privacy" className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-950">Privacy</Link>
            <Link href="/terms" className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-950">Terms</Link>
            <a href={DEVELOPER_PORTFOLIO} target="_blank" rel="noopener noreferrer" className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-950">Contact</a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-neutral-400">
            Built by {DEVELOPER_NAME} at {STUDIO_NAME}.
          </p>

          <p className="text-[12px] text-neutral-400">
            © 2026 {STUDIO_NAME}
          </p>
        </div>
      </footer>
    </section>
  );
}
