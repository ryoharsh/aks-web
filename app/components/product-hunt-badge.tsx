type Props = {
  className?: string;
};

/**
 * Product Hunt "Featured" badge for Aks.ai.
 * Uses a plain <img> (not next/image) because the asset is served
 * by api.producthunt.com and isn't in Next image remote config.
 */
export default function ProductHuntBadge({ className = "" }: Props) {
  return (
    <a
      href="https://www.producthunt.com/products/aks-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-aks-ai"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Aks.ai on Product Hunt"
      className={`inline-block ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Aks.ai - Your personal companion for guided self-reflection. | Product Hunt"
        width={250}
        height={54}
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1259309&theme=neutral&t=1790338948186"
        style={{ width: 250, height: 54 }}
      />
    </a>
  );
}
