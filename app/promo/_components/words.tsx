import styles from "../promo.module.css";

/** Split a line into word spans for staggered GSAP reveals. */
export function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span data-word className={`${styles["pw-word"]} inline-block`}>{w}</span>
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
