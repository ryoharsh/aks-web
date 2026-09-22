import type { Metadata } from "next";
import FloatingNav from "./_components/nav";
import NoLoader from "./_components/no-loader";
import AutoScroll from "./_components/auto-scroll";
import IntroScene from "./_scenes/intro";
import HeroScene from "./_scenes/hero";
import TalkScene from "./_scenes/talk";
import ReflectScene from "./_scenes/reflect";
import ContextScene from "./_scenes/context";
import PatternsScene from "./_scenes/patterns";
import DataScene from "./_scenes/data";
import SourcesScene from "./_scenes/sources";
import HumanScene from "./_scenes/human";
import MontageScene from "./_scenes/montage";
import OrbScene from "./_scenes/orb";
import ClosingScene from "./_scenes/closing";
import styles from "./promo.module.css";

export const metadata: Metadata = {
  title: "Aks.ai — Understand yourself, differently.",
  description:
    "Aks.ai is a personal AI companion for reflection, context, and self-understanding.",
  // Unlisted promo film: reachable by URL, never indexed or linked.
  robots: { index: false, follow: false },
};

export default function PromoPage() {
  // Autoplay: glide top-to-bottom over AUTO_SCROLL_SECONDS. Any manual
  // input cancels it. Off by default — flip to true to preview the film.
  const AUTO_SCROLL = true;
  const AUTO_SCROLL_SECONDS = 80;

  return (
    <NoLoader>
      <div className={styles.page}>
        <AutoScroll enabled={AUTO_SCROLL} seconds={AUTO_SCROLL_SECONDS} />
        <FloatingNav />
        <div className={styles.grain} aria-hidden />

        <main>
          <IntroScene />
          <HeroScene />
          <TalkScene />
          <ReflectScene />
          <ContextScene />
          <PatternsScene />
          <DataScene />
          <SourcesScene />
          <HumanScene />
          <MontageScene />
          <OrbScene />
          <ClosingScene />
        </main>
      </div>
    </NoLoader>
  );
}
