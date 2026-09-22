import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Static OG card — plain warm background, near-black type. No gradients,
 * no illustration. Generated once at build time.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#FAFAF8",
          padding: "96px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#171717",
              color: "#FAFAF8",
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ fontSize: "32px", fontWeight: 600, color: "#171717" }}>
            Aks
          </div>
        </div>
        <div
          style={{
            fontSize: "84px",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 600,
            color: "#171717",
          }}
        >
          Understand yourself.
        </div>
        <div style={{ marginTop: "24px", fontSize: "30px", color: "#6B6B6B" }}>
          A personal companion for what&apos;s on your mind.
        </div>
      </div>
    ),
    { ...size }
  );
}
