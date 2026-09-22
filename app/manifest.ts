import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION } from "./lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aks — Understand Yourself",
    short_name: "Aks",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#FAFAF8",
    icons: [
      {
        src: "/favicon.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/adaptive-icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
